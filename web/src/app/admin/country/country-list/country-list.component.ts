import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Country } from 'src/app/model/country/country';
import { UpdateCountryModel } from 'src/app/model/country/update-country-model';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CountryService } from 'src/app/services/country/country.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent extends BaseListComponent implements OnInit  {

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: CountryService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Country()));
    this.entity = AuditLogEntityTypes.Country;
    this.editEntityPath = '../EditCountry';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new Country()).displayColumns();

    this.canCreatPermissionType = PermissionType.AdminCountryCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminCountryCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminCountryCanDelete;
    this.checkPermissions();
  }

  ngOnInit() {
    super.getData();
  }

  getUpdateModel(record: Country): UpdateCountryModel {
    const updateCountryModel = new UpdateCountryModel();
    Automapper.map(record, updateCountryModel);
    return updateCountryModel;
  }

}
