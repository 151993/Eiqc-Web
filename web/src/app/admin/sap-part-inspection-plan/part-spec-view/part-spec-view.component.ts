import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { PartSpecModel } from 'src/app/model/sap-part-inspection-plan/part-spec-model';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';

const maxFileLimit = 5;
const maxSize = 5;
@Component({
  selector: 'app-part-spec-view',
  templateUrl: './part-spec-view.component.html',
  styleUrls: ['./part-spec-view.component.css']
})
export class PartSpecViewComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  maxFileUploadLimit = 0;
  maxFileSize = 0;
  tempFolder = '';
  recordId: number;
  specAttachments: FileUpload[] = [];
  partSpecModel: PartSpecModel;
  properties = {
    specAttachments: 'specAttachments',
    specNumber: 'specNumber',
    specRevisionNumber: 'specRevisionNumber',
    specDescription: 'specDescription'
  };
  detail: PartSpecModel;


  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  showSelectFile: boolean;
  isFileUploadDisabled: any;
  isEnabled: boolean;
  isSpecNumberDisabled: boolean;

  constructor(private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService,
    public activeModal: NgbActiveModal,
    private attachmentService: AttachmentService) {

    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService
    );
    this.initForm();
    this.partSpecModel = new PartSpecModel();
    this.entity = this.partSpecModel;
    this.canAccessPermissionType = PermissionType.AdminSAPPartInspectionPlanCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSAPPartInspectionPlanCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSAPPartInspectionPlanCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      specAttachments: new FormControl(null),
      specNumber: new FormControl(Constants.Empty, [Validators.required, validateWhiteSpace]),
      specRevisionNumber: new FormControl(Constants.Empty),
      specDescription: new FormControl(Constants.Empty),
      isEnabled: new FormControl(true)
    });
    this.isFileUploadDisabled = this.isFileUploadDisabled;
  }
  ngOnInit() {
    super.ngOnInit();
    this.maxFileUploadLimit = maxFileLimit;
    this.maxFileSize = maxSize;
    this.tempFolder = this.getFileUploadId();
    this.tempFolder =
      this.authService.getUserId() + '_' + DateHelper.getDateTimeString();

    if (this.detail !== undefined) {
      this.isSpecNumberDisabled = true;
      this.isEnabled = this.detail.isEnabled;
      if (this.detail.recId != null) {
        if (this.detail.partInspectionSpecAttachments !== undefined) {
          this.detail.partInspectionSpecAttachments.forEach(element => {
            if (this.isEnabled) {
              element.attachment.canDelete = true;
            } else {
              element.attachment.canDelete = false;
            }
            this.specAttachments.push(this.attachmentService.getFilesFromUpload(element));
          });
        }

        this.formInput.patchValue({
          specAttachments: this.specAttachments,
          specNumber: this.detail.specNumber,
          specRevisionNumber: this.detail.specRevisionNumber,
          specDescription: this.detail.specDescription
        });
      } else {
        this.formInput.patchValue({
          specAttachments: this.detail.specAttachments,
          specNumber: this.detail.specNumber,
          specRevisionNumber: this.detail.specRevisionNumber,
          specDescription: this.detail.specDescription
        });
      }
    } else {
      this.isEnabled = true;
    }

    if (this.isEnabled) {
      this.formInput.controls[this.properties.specAttachments].enable();
      this.formInput.controls[this.properties.specNumber].enable();
      this.formInput.controls[this.properties.specRevisionNumber].enable();
      this.formInput.controls[this.properties.specDescription].enable();
    }
  }

  getFileUploadId() {
    return this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
  }
  close() {
    this.AttachPartSpecFiles();
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }


  isSpecNumberEmpty() {
    return this.hasError(this.properties.specNumber, ValidationErrorCodes.required);
  }

  isSpecNumberHasWhiteSpace() {
    return this.hasError(this.properties.specNumber, ValidationErrorCodes.validateWhiteSpace);
  }

  isSpecNumberModified() {
    return this.isModified(this.properties.specNumber);
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }


  AttachPartSpecFiles() {
    const partSpecfiles = this.formInput.controls[this.properties.specAttachments].value;
    this.specAttachments = partSpecfiles;
    this.formInput.patchValue({
      specAttachments: this.specAttachments
    });
  }
}
