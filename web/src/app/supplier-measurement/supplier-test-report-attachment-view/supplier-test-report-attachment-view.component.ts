import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { SupplierTestReport } from 'src/app/model/supplier-test-report/supplier-test-report';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-supplier-test-report-attachment-view',
  templateUrl: './supplier-test-report-attachment-view.component.html',
  styleUrls: ['./supplier-test-report-attachment-view.component.css']
})
export class SupplierTestReportAttachmentViewComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  maxFileUploadLimit = 0;
  maxFileSize = 0;
  tempFolder = '';
  recordId: number;
  testReportAttachments: FileUpload[] = [];
  testReportTab: SupplierTestReport;
  properties = {
    id: 'id',
    testReportAttachments: 'testReportAttachments'
  };

  isViewDisable: boolean;

  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  detail: any;
  supplierTestReportParameterId: number;
  savePath: string;
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
    this.testReportTab = new SupplierTestReport();
    this.entity = this.testReportTab;
    this.canAccessPermissionType = PermissionType.AdminTestReportCanAccess;
    this.canCreatPermissionType = PermissionType.AdminTestReportCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminTestReportCanUpdate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      testReportAttachments: new FormControl(null),
      isEnabled: new FormControl(true)
    });
  }
  ngOnInit() {
    super.ngOnInit();
    this.maxFileUploadLimit = 5;
    this.maxFileSize = 5;
    this.tempFolder = this.getFileUploadId();
    this.tempFolder =
      this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
    this.savePath = 'supplier-test-report-attachment';
    this.testReportAttachments = [];
    this.isFileUploadDisabled = this.isFileUploadDisabled;
    this.isViewDisable = this.isViewDisable !== undefined ? this.isViewDisable : false;
    // && this.detail.recId != null
    if (this.detail !== undefined) {

      if (this.detail.supplierTestReportAttachments !== undefined) {

        this.detail.supplierTestReportAttachments.forEach(element => {
          this.testReportAttachments.push(this.attachmentService.getFilesFromUpload(element));
        });
      }

      this.formInput.patchValue({
        testReportAttachments: this.testReportAttachments
      });

    } else {
      this.formInput.patchValue({
        testReportAttachments: this.detail
      });
    }
  }

  getFileUploadId() {
    return this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
  }

  close() {
    this.attachTestReportFiles();
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.dirty;
  }

  attachTestReportFiles() {
    if (this.detail != null) {
      const testReportAttachments = this.formInput.controls[this.properties.testReportAttachments].value;
      this.detail = testReportAttachments;
    }
  }

}
