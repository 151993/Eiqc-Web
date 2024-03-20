import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { PartSpecModel } from 'src/app/model/sap-part-inspection-plan/part-spec-model';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { NotificationService } from 'src/app/shared/notification/notification.service';

const maxFileLimit = 5;
const maxSize = 5;
@Component({
  selector: 'app-part-spec-attachment-view',
  templateUrl: './part-spec-attachment-view.component.html',
  styleUrls: ['./part-spec-attachment-view.component.css']
})
export class PartSpecAttachmentViewComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  maxFileUploadLimit = 0;
  maxFileSize = 0;
  tempFolder = '';
  recordId: number;
  specAttachments: FileUpload[] = [];
  partSpecModel: PartSpecModel;
  properties = {
    specAttachments: 'specAttachments'
  };
  detail: any;


  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  showSelectFile: boolean;
  isFileUploadDisabled: any;

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

    if (this.detail !== undefined && this.detail.recId != null) {

      if (this.detail.partInspectionSpecAttachments !== undefined) {
        this.detail.partInspectionSpecAttachments.forEach(element => {
          this.specAttachments.push(this.attachmentService.getFilesFromUpload(element));
        });
      }

      this.formInput.patchValue({
        specAttachments: this.specAttachments
      });

    } else {
      this.formInput.patchValue({
        specAttachments: this.detail
      });
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

  AttachPartSpecFiles() {
    const partSpecfiles = this.formInput.controls[this.properties.specAttachments].value;
    this.specAttachments = partSpecfiles;
    this.formInput.patchValue({
      specAttachments: this.specAttachments
    });
  }
}
