import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Division } from 'src/app/model/division/division';
import { UpdateDivisionModel } from 'src/app/model/division/update-division-model';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { DivisionService } from 'src/app/services/division/division.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes, ToastMessage } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css']
})
export class DivisionListComponent extends BaseListComponent implements OnInit {
  lastTM1SyncDate: any;
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: DivisionService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private datePipe: TimeZonePipe
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Division()));
    this.entity = AuditLogEntityTypes.Division;
    this.editEntityPath = '../EditDivision';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new Division()).displayColumns();

    this.canCreatPermissionType = PermissionType.AdminDivisionCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminDivisionCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminDivisionCanDelete;
    this.checkPermissions();
  }

  ngOnInit() {
    super.getData();
    this.getTM1LastSyncDate();
  }

  getUpdateModel(record: Division): UpdateDivisionModel {
    const updateDivisionModel = new UpdateDivisionModel();
    Automapper.map(record, updateDivisionModel);

    return updateDivisionModel;
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
