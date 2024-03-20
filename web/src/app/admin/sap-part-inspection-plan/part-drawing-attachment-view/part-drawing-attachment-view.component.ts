import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { PartDrawingModel } from 'src/app/model/sap-part-inspection-plan/part-drawing-model';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-part-drawing-attachment-view',
  templateUrl: './part-drawing-attachment-view.component.html',
  styleUrls: ['./part-drawing-attachment-view.component.css']
})
export class PartDrawingAttachmentViewComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  isFileUploadDisabled: any;
  maxFileUploadLimit = 0;
  maxFileSize = 0;
  tempFolder = '';
  recordId: number;
  drawingAttachments: FileUpload[] = [];
  partDrawingModel: PartDrawingModel;
  properties = {
    drawingAttachments: 'drawingAttachments'
  };
  detail: any;


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
    this.canAccessPermissionType = PermissionType.AdminSAPPartInspectionPlanCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSAPPartInspectionPlanCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSAPPartInspectionPlanCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      drawingAttachments: new FormControl(this.drawingAttachments),
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


    if (this.detail !== undefined && this.detail.recId != null) {

      if (this.detail.partInspectionDrawingAttachments !== undefined) {
        this.detail.partInspectionDrawingAttachments.forEach(element => {
          this.drawingAttachments.push(this.attachmentService.getFilesFromUpload(element));
        });
      }

      this.formInput.patchValue({
        drawingAttachments: this.drawingAttachments
      });

    } else {
      this.formInput.patchValue({
        drawingAttachments: this.detail
      });
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
      || !this.formInput.dirty;
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
