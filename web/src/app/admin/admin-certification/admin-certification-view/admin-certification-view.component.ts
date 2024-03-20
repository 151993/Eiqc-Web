import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminCertification } from 'src/app/model/admin-certification/admin-certification';
import { Attachment } from 'src/app/model/attachment/attachment';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { AdminCertificationService } from 'src/app/services/admin-certification/admin-certification.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-certification-view',
  templateUrl: './admin-certification-view.component.html',
  styleUrls: ['./admin-certification-view.component.css']
})
export class AdminCertificationViewComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  tempFolder = '';
  recordId: number;
  files: FileUpload[] = [];
  attachments: Attachment[] = [];
  adminCertification: AdminCertification;
  properties = {
    id: 'id',
    name: 'name'
  };
  detail: any;

  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    private apiService: AdminCertificationService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService,
    private activeModal: NgbActiveModal) {

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
    this.canAccessPermissionType = PermissionType.AdminCertificationCanAccess;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
    });
  }
  ngOnInit() {
    super.ngOnInit();
    this.getData();
  }

  close() {
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  getData() {
    if (this.recordId === null) {
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
    if (this.detail.length > 0) {
      this.files = [];
      this.detail.forEach(element => {
        this.attachments.push(element.attachment);
        const file = new File([''], element.attachment.name, {
          type: 'text/plain',
        });
        const f = new FileUpload(file, true);
        f.id = element.attachment.id.toString();
        f.name = element.attachment.name;
        f.filePath = element.attachment.savePath;
        f.status = true;
        this.files.push(f);
      });
    }
  }
}
