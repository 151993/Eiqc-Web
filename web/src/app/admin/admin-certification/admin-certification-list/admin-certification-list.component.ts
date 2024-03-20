import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminCertification } from 'src/app/model/admin-certification/admin-certification';
import { UpdateAdminCertificationModel } from 'src/app/model/admin-certification/update-admin-certification-model';
import { AdminCertificationService } from 'src/app/services/admin-certification/admin-certification.service';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { AdminCertificationViewComponent } from '../admin-certification-view/admin-certification-view.component';

@Component({
  selector: 'app-admin-certification-list',
  templateUrl: './admin-certification-list.component.html',
  styleUrls: ['./admin-certification-list.component.css']
})
export class AdminCertificationListComponent extends BaseListComponent implements OnInit {

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: AdminCertificationService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal) {
    super(authService, auditLogService, modalService, translateService, notificationService,
      _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new AdminCertification()));
    this.entity = AuditLogEntityTypes.AdminCertification;
    this.editEntityPath = '../EditAdminCertification';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new AdminCertification()).displayColumns();

    this.canAccessPermissionType = PermissionType.AdminCertificationCanAccess;
    this.canCreatPermissionType = PermissionType.AdminCertificationCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminCertificationCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminCertificationCanDelete;
    this.checkPermissions();
  }

  ngOnInit() {
    super.getData();
  }

  getUpdateModel(record: AdminCertification): UpdateAdminCertificationModel {
    const updateAdminCertificationModel = new UpdateAdminCertificationModel();
    Automapper.map(record, updateAdminCertificationModel);
    return updateAdminCertificationModel;
  }

  detailSelected(record: any): void {
    const modalRef = this.modalService.open(AdminCertificationViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record.adminCertificationAttachments;
  }

}
