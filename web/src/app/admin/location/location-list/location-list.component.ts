import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Location } from 'src/app/model/location/location';
import { UpdateLocationModel } from 'src/app/model/location/update-location-model';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { LocationService } from 'src/app/services/location/location.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent extends BaseListComponent implements OnInit {

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: LocationService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Location()));
    this.entity = AuditLogEntityTypes.Location;
    this.editEntityPath = '../EditLocation';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new Location()).displayColumns();

    this.canCreatPermissionType = PermissionType.AdminLocationCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminLocationCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminLocationCanDelete;
    this.checkPermissions();
  }

  ngOnInit() {
    super.getData();
  }

  getUpdateModel(record: Location): UpdateLocationModel {
    const updateLocationModel = new UpdateLocationModel();
    Automapper.map(record, updateLocationModel);

    return updateLocationModel;
  }

}
