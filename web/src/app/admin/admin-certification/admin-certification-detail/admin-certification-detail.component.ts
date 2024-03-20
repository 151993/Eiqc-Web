import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminCertificationAttachment } from 'src/app/model/admin-certification-attachment/admin-certification-attachment';
import { AddAdminCertificationModel } from 'src/app/model/admin-certification/add-admin-certification-model';
import { AdminCertification } from 'src/app/model/admin-certification/admin-certification';
import { UpdateAdminCertificationModel } from 'src/app/model/admin-certification/update-admin-certification-model';
import { Attachment } from 'src/app/model/attachment/attachment';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { AdminCertificationService } from 'src/app/services/admin-certification/admin-certification.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ControlStates, PrimeNGDateSelectionMode, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-certification-detail',
  templateUrl: './admin-certification-detail.component.html',
  styleUrls: ['./admin-certification-detail.component.css']
})
export class AdminCertificationDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy, AfterViewInit {
  //#region Attachment
  files: FileUpload[] = [];
  attachments: Attachment[] = [];
  tempFolder = '';
  savePath = 'admin-certification';
  maxFileSize = 0;
  //#endregion Attachment

  adminCertification: AdminCertification;
  selectionModeSingle = PrimeNGDateSelectionMode.Single;
  properties = {
    id: 'id',
    number: 'number',
    name: 'name',
    description: 'description',
    assessmentBodyId: 'assessmentBodyId',
    assessmentBodyName: 'assessmentBodyName',
    certificateStartDate: 'certificateStartDate',
    certificateEndDate: 'certificateEndDate',
    files: 'files',
  };
  maxFileUploadLimit: number;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: AdminCertificationService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService
  ) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService,
      apiService
    );
    this.initForm();
    this.adminCertification = new AdminCertification();
    this.entity = this.adminCertification;
    this.cancelRoute = '/Admin/AdminCertification';
    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;
    this.canAccessPermissionType = PermissionType.AdminCertificationCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminCertificationCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminCertificationCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      number: new FormControl(Constants.Empty, [Validators.required, Validators.maxLength(15)]),
      name: new FormControl(Constants.Empty, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(Constants.Empty, [Validators.required, Validators.maxLength(150)]),
      assessmentBodyId: new FormControl(Constants.Empty, [Validators.required, Validators.maxLength(15)]),
      assessmentBodyName: new FormControl(Constants.Empty, [Validators.required, Validators.maxLength(50)]),
      certificateStartDate: new FormControl(new Date(), Validators.required),
      certificateEndDate: new FormControl(new Date(), Validators.required),
      files: new FormControl(null, Validators.required),
      isEnabled: new FormControl(true, Validators.required)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();
    this.maxFileSize = 5;
    this.maxFileUploadLimit = 5;
    this.tempFolder = this.getFileUploadId();
    this.tempFolder =
      this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
  }

  ngAfterViewInit() {
    this.tempFolder = this.getFileUploadId();
  }

  getData() {
    if (this.recId === null) {
      setTimeout(() => {
        this.formInput.controls[this.properties.name].setAsyncValidators(
          uniqueAsyncValidator(
            this.apiService,
            this.adminCertification.name,
            this.properties.name
          )
        );
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.adminCertification = new AdminCertification(data);
      this.formDetails = this.entity;
      this.entity = this.adminCertification;

      this.formInput.patchValue({
        id: this.adminCertification.id,
        number: this.adminCertification.number,
        name: this.adminCertification.name,
        description: this.adminCertification.description,
        assessmentBodyId: this.adminCertification.assessmentBodyId,
        assessmentBodyName: this.adminCertification.assessmentBodyName,
        certificateStartDate: this.adminCertification.certificateStartDate ? new Date(this.adminCertification.certificateStartDate) : null,
        certificateEndDate: this.adminCertification.certificateEndDate ? new Date(this.adminCertification.certificateEndDate) : null,
        files: this.adminCertification.adminCertificationAttachments,
        isEnabled : this.adminCertification.isEnabled
      });

      if (this.adminCertification.adminCertificationAttachments.length > 0) {
        this.files = [];
        this.adminCertification.adminCertificationAttachments.forEach(element => {
          this.attachments.push(element.attachment);
          const file = new File([''], element.attachment.name, {
            type: 'text/plain',
          });
          const f = new FileUpload(file, true);
          f.id = element.attachment.id.toString();
          f.name = element.attachment.name;
          f.filePath = element.attachment.savePath;
          f.status = true;
          f.isWithinSizeLimit = true;
          this.files.push(f);
        });
      }

      this.formInput.controls[this.properties.name].setAsyncValidators(
        uniqueAsyncValidator(
          this.apiService,
          this.adminCertification.name,
          this.properties.name
        )
      );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getAddModel(): AddAdminCertificationModel {
    const addAdminCertificationModel = new AddAdminCertificationModel();
    Automapper.map(this.adminCertification, addAdminCertificationModel);
    this.files = this.formInput.controls[this.properties.files].value;
    const path = this.savePath;
    const fArray: Attachment[] = [];
    this.files.forEach(function (value) {
      const file = new Attachment();
      file.name = value.file.name;
      file.savePath = path;
      file.tempSavePath = value.filePath;
      fArray.push(file);
    });
    addAdminCertificationModel.attachments = fArray;
    addAdminCertificationModel.isEnabled = true;
    return addAdminCertificationModel;
  }

  getUpdateModel(): UpdateAdminCertificationModel {
    const updateAdminCertificationModel = new UpdateAdminCertificationModel();
    Automapper.map(this.adminCertification, updateAdminCertificationModel);
    updateAdminCertificationModel.certificateStartDate = this.formInput.controls[this.properties.certificateStartDate].value;
    updateAdminCertificationModel.certificateEndDate = this.formInput.controls[this.properties.certificateEndDate].value;
    updateAdminCertificationModel.removedAttachmentIds = [];
    this.attachments.forEach(a => {
      if (!this.files.map(f => Number(f.id)).includes(a.id)) {
        updateAdminCertificationModel.removedAttachmentIds.push(a.id);
      }
    });

    const path = this.savePath;
    updateAdminCertificationModel.adminCertificationAttachments = [];
    this.files.forEach((value) => {
      if (value.id === Constants.Empty) {
        const certificationAttachment = new AdminCertificationAttachment();
        certificationAttachment.adminCertificationId = updateAdminCertificationModel.id;
        certificationAttachment.attachment = new Attachment();
        certificationAttachment.attachment.name = value.file.name;
        certificationAttachment.attachment.savePath = path;
        certificationAttachment.attachment.tempSavePath = value.filePath;
        updateAdminCertificationModel.adminCertificationAttachments.push(certificationAttachment);
      }
    });
    return updateAdminCertificationModel;
  }

  getAttachmentFromFile(file: FileUpload): Attachment {
    const attachment = new Attachment();
    Automapper.map(file, attachment);
    attachment.id = Constants.Empty as any;
    attachment.savePath = this.getSavePath(file.name, file.filePath);
    return attachment;
  }

  getSavePath(fileName: string, filePath: string) {
    if (filePath && filePath !== Constants.Empty) {
      filePath = decodeURIComponent(filePath);
      return filePath.substring(0, filePath.indexOf(fileName) + fileName.length);
    }
    return Constants.Empty;
  }

  getFileUploadId() {
    return this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
  }

  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.number].status ===
      ControlStates.PENDING
    );
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

  isFileUploadModified() {
    return this.isModified(this.properties.files);
  }

  isFileUploadEmpty() {
    return this.hasError(this.properties.files, ValidationErrorCodes.required);
  }

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameHasWhiteSpace() {
    return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
  }

  isNameExists() {
    return this.hasError(this.properties.name, ValidationErrorCodes.alreadyExists);
  }

  isNumberEmpty() {
    return this.hasError(this.properties.number, ValidationErrorCodes.required);
  }

  isNumberModified() {
    return this.isModified(this.properties.number);
  }

  isNumberHasWhiteSpace() {
    return this.hasError(this.properties.number, ValidationErrorCodes.validateWhiteSpace);
  }

  isDescriptionEmpty() {
    return this.hasError(this.properties.description, ValidationErrorCodes.required);
  }

  isDescriptionModified() {
    return this.isModified(this.properties.description);
  }

  isDescriptionHasWhiteSpace() {
    return this.hasError(this.properties.description, ValidationErrorCodes.validateWhiteSpace);
  }

  isAssessmentBodyIdEmpty() {
    return this.hasError(this.properties.assessmentBodyId, ValidationErrorCodes.required);
  }

  isAssessmentBodyIdModified() {
    return this.isModified(this.properties.assessmentBodyId);
  }

  isAssessmentBodyIdHasWhiteSpace() {
    return this.hasError(this.properties.assessmentBodyId, ValidationErrorCodes.validateWhiteSpace);
  }

  isAssessmentBodyNameEmpty() {
    return this.hasError(this.properties.assessmentBodyName, ValidationErrorCodes.required);
  }

  isAssessmentBodyNameModified() {
    return this.isModified(this.properties.assessmentBodyName);
  }

  isAssessmentBodyNameHasWhiteSpace() {
    return this.hasError(this.properties.assessmentBodyName, ValidationErrorCodes.validateWhiteSpace);
  }

  isCertificateStartDateEmpty() {
    return this.hasError(this.properties.certificateStartDate, ValidationErrorCodes.required);
  }

  isCertificateStartDateModified() {
    return this.isModified(this.properties.certificateStartDate);
  }

  isCertificateStartDateHasWhiteSpace() {
    return this.hasError(this.properties.certificateStartDate, ValidationErrorCodes.validateWhiteSpace);
  }

  isCertificateEndDateEmpty() {
    return this.hasError(this.properties.certificateEndDate, ValidationErrorCodes.required);
  }

  isCertificateEndDateModified() {
    return this.isModified(this.properties.certificateEndDate);
  }

  isertificateEndDateHasWhiteSpace() {
    return this.hasError(this.properties.certificateEndDate, ValidationErrorCodes.validateWhiteSpace);
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

}
