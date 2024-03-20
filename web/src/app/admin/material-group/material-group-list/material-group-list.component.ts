import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MaterialGroup } from 'src/app/model/material-group/material-group';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { MaterialGroupService } from 'src/app/services/material-group/material-group.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes, ToastMessage } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';

@Component({
  selector: 'app-material-group-list',
  templateUrl: './material-group-list.component.html',
  styleUrls: ['./material-group-list.component.css']
})
export class MaterialGroupListComponent extends BaseListComponent implements OnInit {
  lastSAPSyncDate: any;
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: MaterialGroupService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private datePipe: TimeZonePipe
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new MaterialGroup()));
    this.entity = AuditLogEntityTypes.MaterialGroup;
    this.displayColumns = (new MaterialGroup()).displayColumns();
    this.canAccessPermissionType = PermissionType.AdminMaterialGroupCanAccess;
    this.canCreatPermissionType = PermissionType.AdminMaterialGroupCanCreate;
    this.checkPermissions();
  }

  ngOnInit() {
    super.getData();
    this.getSAPLastSyncDate();
  }

  syncFromSAP() {
    this._apiService
      .syncFromSAP()
      .subscribe((res) => {
        if (res) {
          super.getData();
          this.notificationService.showSuccess(ToastMessage.SyncFromSAP);
          this.getSAPLastSyncDate();
        } else {
          this.notificationService.showError(ToastMessage.ServerError);
        }
      });
  }

  getSAPLastSyncDate() {
    this._apiService.getSAPLastSyncDate().subscribe(response => {
      this.lastSAPSyncDate = this.datePipe.transform(response, true);
    });
  }

}
