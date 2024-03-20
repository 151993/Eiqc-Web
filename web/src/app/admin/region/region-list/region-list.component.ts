import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { RegionService } from 'src/app/services/region/region.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Region } from 'src/app/model/region/region';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateRegionModel } from 'src/app/model/region/update-region-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent  extends BaseListComponent implements OnInit {

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: RegionService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Region()));
    this.entity = AuditLogEntityTypes.Region;
    this.editEntityPath = '../EditRegion';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new Region()).displayColumns();

    this.canCreatPermissionType = PermissionType.AdminRegionCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminRegionCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminRegionCanDelete;
    this.checkPermissions();
}

ngOnInit() {
  super.getData();
}

getUpdateModel(record: Region): UpdateRegionModel {
  const updateRegionModel = new UpdateRegionModel();
  Automapper.map(record, updateRegionModel);

  return updateRegionModel;
}

}
