/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, SearchOperator, ToastMessage } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierModel } from 'src/app/model/supplier/update-supplier-model';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { LoadingService } from 'src/app/shared/controls/loading/loading.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Supplier } from 'src/app/model/supplier/supplier';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';
import { ColumnType } from 'src/app/model/table/table';
import { LoadingIcon, LoadingMessage } from 'src/app/shared/controls/loading/loadingState';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent extends BaseListComponent implements OnInit {
    lastSAPSyncDate: any;
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal,
        private datePipe: TimeZonePipe,
        private loadingService: LoadingService
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Supplier()));
        this.entity = AuditLogEntityTypes.Supplier;
        this.editEntityPath = '../EditSupplier';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Supplier()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierCanUpdate;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.Supplier;
        this.getSAPLastSyncDate();
    }

    getUpdateModel(record: Supplier): UpdateSupplierModel {
        const updateSupplierModel = new UpdateSupplierModel();
        Automapper.map(record, updateSupplierModel);


        return updateSupplierModel;
    }

    syncFromSAP() {
        this.pageSortFilterInfo.entity = new Supplier();
        this.pageSortFilterInfo.filterInfo = [];
        this.loadingService.show(LoadingMessage.SavingChanges, LoadingIcon.Default, true);
        const pageSortFilterInf = new PageSortFilterInfo();
        const pageSortFilterInfo = this.getPageFilterInfoCriteriaFromSAP(pageSortFilterInf);
        this._apiService
            .syncFromSAP(pageSortFilterInfo)
            .subscribe((res) => {
                if (res) {
                    this.loadingService.hide();
                    this.pageSortFilterInfo.entity = new Supplier();
                    this.pageSortFilterInfo.filterInfo = [];
                    this.pageSortFilterInfo.paginationInfo.pageSize = 10;
                    super.getData();
                    this.notificationService.showSuccess(ToastMessage.SyncFromSAP);
                    this.getSAPLastSyncDate();
                }
            });
    }

    getSAPLastSyncDate() {
        this._apiService.getSAPLastSyncDate().subscribe(response => {
            this.lastSAPSyncDate = this.datePipe.transform(response, true);
        });
    }

    getPageFilterInfoCriteriaFromSAP(pageSortFilterInfo): PageSortFilterInfo {

        this.pageSortFilterInfo = new PageSortFilterInfo();
        pageSortFilterInfo.entity = null;
        pageSortFilterInfo.paginationInfo.pageSize = 0;
        pageSortFilterInfo.expandInfo = {};
        pageSortFilterInfo.filterInfo = [];

        const statusFilterInfo = new FilterInfo();
        statusFilterInfo.columnName = 'STATUS';
        statusFilterInfo.columnType = ColumnType.String;
        statusFilterInfo.mappingField = 'STATUS';
        statusFilterInfo.value = 'X';
        statusFilterInfo.operator = SearchOperator.NotEqualTo;
        pageSortFilterInfo.filterInfo.push(statusFilterInfo);

        const emailFilterInfo = new FilterInfo();
        emailFilterInfo.columnName = 'EMAIL';
        emailFilterInfo.columnType = ColumnType.String;
        emailFilterInfo.mappingField = '';
        emailFilterInfo.operator = SearchOperator.IsNotNull;
        pageSortFilterInfo.filterInfo.push(emailFilterInfo);

        const siteFilterInfo = new FilterInfo();
        siteFilterInfo.columnName = 'VALUATION_AREA';
        siteFilterInfo.columnType = ColumnType.StringWithoutLowerCase;
        siteFilterInfo.mappingField = 'VALUATION_AREA';
        siteFilterInfo.value = this.authService.retrieveSite().code;
        siteFilterInfo.operator = SearchOperator.IsEqualTo;

        pageSortFilterInfo.filterInfo.push(siteFilterInfo);
        return pageSortFilterInfo;
    }

    onExportEvent(event) {
        const pageSortFilterInfoClone = Object.create(this.pageSortFilterInfo);

        this.apiDataService.getAllData(pageSortFilterInfoClone).subscribe(data => {

            data.value?.map((value) => {value['sapSupplierModel_ID'] = '\' ' + value['sapSupplierModel_ID']; return value; });
            this.csvExportService.ExportCSV(
                event.dataColumn,
                data.value,
                event.fileName
                );
            });
        }
}
