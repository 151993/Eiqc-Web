import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UpdateWorkCellModel } from 'src/app/model/workcell/update-work-cell-model';
import { WorkCell } from 'src/app/model/workcell/work-cell';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { WorkCellService } from 'src/app/services/workcell/work-cell.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';

@Component({
  selector: 'app-work-cell-list',
  templateUrl: './work-cell-list.component.html',
  styleUrls: ['./work-cell-list.component.css']
})
export class WorkCellListComponent extends BaseListComponent implements OnInit {

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: WorkCellService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new WorkCell()));
    this.entity = AuditLogEntityTypes.WorkCell;
    this.editEntityPath = '../EditWorkCell';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new WorkCell()).displayColumns();

    this.canCreatPermissionType = PermissionType.AdminWorkCellCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminWorkCellCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminWorkCellCanDelete;
    this.checkPermissions();
  }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this._apiService.getWorkCellWithSite(this.pageSortFilterInfo).subscribe((data) => {
      this.totalRecords = data.count;
      this.dataSource = data.value;
    });
  }

  onExportEvent(event) {
    this._apiService.getWorkCellWithSite(this.pageSortFilterInfo).subscribe((data) => {
      this.csvExportService.ExportCSV(
        event.dataColumn,
        data.value,
        event.fileName
      );
    });
  }

  getUpdateModel(record: WorkCell): UpdateWorkCellModel {
    const updateWorkCellModel = new UpdateWorkCellModel();
    Automapper.map(record, updateWorkCellModel);
    return updateWorkCellModel;
  }
}
