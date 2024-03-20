import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { PartDrawingModel } from 'src/app/model/sap-part-inspection-plan/part-drawing-model';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { Constants, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';

@Component({
  selector: 'app-part-drawing-view',
  templateUrl: './part-drawing-view.component.html',
  styleUrls: ['./part-drawing-view.component.css']
})
export class PartDrawingViewComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  isFileUploadDisabled: any;
  maxFileUploadLimit = 0;
  maxFileSize = 0;
  tempFolder = '';
  recordId: number;
  drawingAttachments: FileUpload[] = [];
  partDrawingModel: PartDrawingModel;
  properties = {
    drawingAttachments: 'drawingAttachments',
    drawingNumber: 'drawingNumber',
    drawingRevisionNumber: 'drawingRevisionNumber',
    drawingDescription: 'drawingDescription',
  };
  detail: PartDrawingModel;
  isEnabled: boolean;
  isDrawingDisabled: boolean;

  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();

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
    this.partDrawingModel = new PartDrawingModel();
    this.entity = this.partDrawingModel;
   // this.canAccessPermissionType = PermissionType.AdminSAPPartInspectionPlanCanAccess;
    // this.canUpdatePermissionType = PermissionType.AdminSAPPartInspectionPlanCanUpdate;
   // this.canCreatPermissionType = PermissionType.AdminSAPPartInspectionPlanCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      drawingNumber: new FormControl(Constants.Empty, [Validators.required, validateWhiteSpace]),
      drawingRevisionNumber: new FormControl(Constants.Empty, [Validators.required, validateWhiteSpace]),
      drawingDescription: new FormControl(Constants.Empty, [Validators.required, validateWhiteSpace]),
      drawingAttachments: new FormControl(this.drawingAttachments, Validators.required),
      isEnabled: new FormControl(true)
    });
    this.isFileUploadDisabled = this.isFileUploadDisabled;
  }
  ngOnInit() {
    super.ngOnInit();
    this.maxFileUploadLimit = 5;
    this.maxFileSize = 5;
    this.tempFolder = this.getFileUploadId();
    this.tempFolder =
      this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
    if (this.detail !== undefined) {
      this.isDrawingDisabled = true;
      this.isEnabled = this.detail.isEnabled;
      if (this.detail.recId != null) {
        if (this.detail.partInspectionDrawingAttachments !== undefined) {
          this.detail.partInspectionDrawingAttachments.forEach(element => {
            if (this.isEnabled) {
              element.attachment.canDelete = true;
            } else {
              element.attachment.canDelete = false;
            }
            this.drawingAttachments.push(this.attachmentService.getFilesFromUpload(element));
          });
        }
        this.formInput.patchValue({
          drawingAttachments: this.drawingAttachments,
          drawingNumber: this.detail.drawingNumber,
          drawingRevisionNumber: this.detail.drawingRevisionNumber,
          drawingDescription: this.detail.drawingDescription
        });
      } else {
        this.formInput.patchValue({
          drawingAttachments: this.detail.drawingAttachments,
          drawingNumber: this.detail.drawingNumber,
          drawingRevisionNumber: this.detail.drawingRevisionNumber,
          drawingDescription: this.detail.drawingDescription
        });
      }
    } else {
      this.isEnabled = true;
    }

    if (this.isEnabled) {
      this.formInput.controls[this.properties.drawingNumber].enable();
      this.formInput.controls[this.properties.drawingRevisionNumber].enable();
      this.formInput.controls[this.properties.drawingDescription].enable();
      this.formInput.controls[this.properties.drawingAttachments].enable();
    } else {
      this.formInput.controls[this.properties.drawingDescription].disable();
    }
  }

  getFileUploadId() {
    return this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
  }
  close() {
    this.AttachPartDrawingFiles();
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty
      || !this.isUploadFileExistsAndSuccess();
  }

  isUploadFileExistsAndSuccess() {
    if (this.drawingAttachments.length === 0) {
        return false;
    }
    for (const file of this.drawingAttachments) {
      if (!file.isValid || !file.status) {
        return false;
      }
    }
    return true;
  }

  isDrawingNumberEmpty() {
    return this.hasError(this.properties.drawingNumber, ValidationErrorCodes.required);
  }

  isDrawingNumberHasWhiteSpace() {
    return this.hasError(this.properties.drawingNumber, ValidationErrorCodes.validateWhiteSpace);
  }
  isDrawingRevisionEmpty() {
    return this.hasError(this.properties.drawingRevisionNumber, ValidationErrorCodes.required);
  }

  isDrawingRevisionHasWhiteSpace() {
    return this.hasError(this.properties.drawingRevisionNumber, ValidationErrorCodes.validateWhiteSpace);
  }
  isDrawingDescriptionEmpty() {
    return this.hasError(this.properties.drawingDescription, ValidationErrorCodes.required);
  }

  isDrawingDescriptionHasWhiteSpace() {
    return this.hasError(this.properties.drawingDescription, ValidationErrorCodes.validateWhiteSpace);
  }
  isDrawingAttachmentsEmpty() {
    return this.hasError(this.properties.drawingAttachments, ValidationErrorCodes.required);
  }
  isDrawingNumberModified() {
    return this.isModified(this.properties.drawingNumber);
  }
  isDrawingRevisionModified() {
    return this.isModified(this.properties.drawingRevisionNumber);
  }
  isDrawingDescriptionModified() {
    return this.isModified(this.properties.drawingDescription);
  }
  isDrawingAttachmentsModified() {
    return this.isModified(this.properties.drawingAttachments);
  }
  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  AttachPartDrawingFiles() {
    const partDrawingfiles = this.formInput.controls[this.properties.drawingAttachments].value;
    this.drawingAttachments = partDrawingfiles;
    this.formInput.patchValue({
      drawingAttachments: this.drawingAttachments
    });
  }

  saveForm() {
    this.AttachPartDrawingFiles();
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }
}
