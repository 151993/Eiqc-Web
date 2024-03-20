/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, Constants, SearchOperator } from 'src/app/shared/constant/global';
import { Part } from 'src/app/model/part/part';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { ColumnType } from 'src/app/model/table/table';
import { environment } from 'src/environments/environment';
import { SamplingPlanService } from 'src/app/services/sampling-plan/sampling-plan.service';
import { SamplingPlan } from 'src/app/model/sampling-plan/sampling-plan';

@Component({
    selector: 'app-sampling-plan-list',
    templateUrl: './sampling-plan-list.component.html',
    styleUrls: ['./sampling-plan-list.component.css']
})
export class SamplingPlanListComponent extends BaseListComponent implements OnInit {
    lastSAPSyncDate: any;
    dataSource: any;
    Site = 'SITE';
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SamplingPlanService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SamplingPlan()));
        this.entity = AuditLogEntityTypes.SamplingPlan;
        this.editEntityPath = '../EditPart';
        this.displayColumns = (new SamplingPlan()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSamplingPlanCanAccess;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }


    onFilterEvent(event) {
        // if (event.fieldName.toLowerCase() === FieldNameList.Commodity) {
        //     this.notificationService.showError(ToastMessage.FilterByColumnNotExist);
        //     return false;
        // }
        this.dataSource = [];
        this.pageSortFilterInfo = new PageSortFilterInfo();
        this.pageSortFilterInfo.entity = new Part();
        if (event && event.valueToFilter !== Constants.Empty) {
            this.getFilterByColumnName(event.valueToFilter, event.mapField,
                SearchOperator.Contains, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, event.filterCondition);
            this.getSAPSamplingData();
        } else {
            this.getSAPSamplingData();
        }
    }

    getSAPSamplingData() {
        this.pageSortFilterInfo.paginationInfo.pageSize = environment.limit.maxResult;
        this._apiService.getAllData(this.pageSortFilterInfo).subscribe(data => {
            this.totalRecords = data.count;
            this.dataSource = data.value.splice(
                0,
                environment.limit.maxResult
            );
        });
    }
}
