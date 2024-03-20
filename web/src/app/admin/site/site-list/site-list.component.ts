/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SiteService } from 'src/app/services/site/site.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, ToastMessage } from 'src/app/shared/constant/global';
import { Site } from 'src/app/model/site/site';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSiteModel } from 'src/app/model/site/update-site-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent extends BaseListComponent implements OnInit {
  lastTM1SyncDate: any;
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: SiteService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private datePipe: TimeZonePipe
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Site()));
    this.entity = AuditLogEntityTypes.Site;
    this.editEntityPath = '../EditSite';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new Site()).displayColumns();

    this.canCreatPermissionType = PermissionType.AdminSiteCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminSiteCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminSiteCanDelete;
    this.checkPermissions();
  }

  ngOnInit() {
    super.getData();
    this.getTM1LastSyncDate();
  }

  getUpdateModel(record: Site): UpdateSiteModel {
    const updateSiteModel = new UpdateSiteModel();
    Automapper.map(record, updateSiteModel);

    return updateSiteModel;
  }

  syncFromTM1() {
    this._apiService
      .syncFromTM1()
      .subscribe((res) => {
        if (res) {
          super.getData();
          this.notificationService.showSuccess(ToastMessage.SyncFromTM1);
          this.getTM1LastSyncDate();
        } else {
          this.notificationService.showError(ToastMessage.ServerError);
        }
      });
  }

  getTM1LastSyncDate() {
    this._apiService.getTM1LastSyncDate().subscribe(response => {
      this.lastTM1SyncDate = this.datePipe.transform(response, true);
    });
  }
}
