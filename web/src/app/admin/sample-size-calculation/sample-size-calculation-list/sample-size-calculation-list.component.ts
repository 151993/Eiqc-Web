/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, Constants, SearchOperator } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SampleSize } from 'src/app/model/sample-size/sample-size';
import { SampleSizeService } from 'src/app/services/sample-size/sample-size.service';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-sample-size-calculation-list',
    templateUrl: './sample-size-calculation-list.component.html',
    styleUrls: ['./sample-size-calculation-list.component.css']
})
export class SampleSizeCalculationListComponent extends BaseListComponent implements OnInit {
    partNumber = '';
    properties = {
        vendorCode: 'vendorCode',
        partNo: 'partNumber'
    };
    isPartNoFilled: boolean;
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SampleSizeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SampleSize()));
        this.entity = AuditLogEntityTypes.SampleSizeCalculation;
        this.displayColumns = (new SampleSize()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSampleSizeCalculationCanAccess;
        this.checkPermissions();
    }


    onExportEvent(event) {
        this.pageSortFilterInfo.entity = new SampleSize();
        this.pageSortFilterInfo.paginationInfo.pageSize = 0;
        this.pageSortFilterInfo.filterInfo = [];
        this.applyFormFilters();
        this._apiService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
            this.csvExportService.ExportCSV(
                event.dataColumn,
                data.value,
                event.fileName
            );
        });
    }

    ngOnInit() {
        this.isPartNoFilled = false;
    }



    isPartNumberEmpty() {
        const partNo = (<HTMLInputElement>document.getElementById(this.properties.partNo)).value;
        if (partNo && partNo.trim().length > 0) {
            this.isPartNoFilled = true;
        } else {
            this.isPartNoFilled = false;
        }
        this.partNumber = partNo;
        return this.isPartNoFilled;
    }


    onFilterEvent(event) {
        this.dataSource = [];
        this.pageSortFilterInfo = new PageSortFilterInfo();
        this.pageSortFilterInfo.entity = new SampleSize();
        this.applyFormFilters();
        if (event && event.valueToFilter !== Constants.Empty) {
            this.getFilterByColumnName(event.valueToFilter, event.mapField,
                SearchOperator.Contains, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, event.filterCondition);
            this.getSAPPartData();
        } else {
            this.getSAPPartData();
        }
    }

    getSAPPartData() {
        this.pageSortFilterInfo.paginationInfo.pageSize = environment.limit.maxResult;
        this._apiService.getAllData(this.pageSortFilterInfo).subscribe(data => {
            this.totalRecords = data.count;
            this.dataSource = data.value.splice(
                0,
                environment.limit.maxResult
            );
        });
    }

    search() {
        this.pageSortFilterInfo.entity = new SampleSize();
        this.pageSortFilterInfo.filterInfo = [];
        this.applyFormFilters();
        this._apiService.getAllData(this.pageSortFilterInfo).subscribe(data => {
            this.totalRecords = data.count;
            this.dataSource = data.value.splice(
                0,
                environment.limit.maxResult
            );
        });
    }



    private applyFormFilters() {
        const partNo = (<HTMLInputElement>document.getElementById(this.properties.partNo)).value;
        const vendorCode = (<HTMLInputElement>document.getElementById(this.properties.vendorCode)).value;
        if (partNo && partNo.length > 0) {
            this.getFilterByColumnName(partNo, 'PART_NO', SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.And);
        }
        if (vendorCode && vendorCode.length > 0) {
            this.getFilterByColumnName(vendorCode, 'VENDOR_CODE', SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.And);
        }
    }
}
