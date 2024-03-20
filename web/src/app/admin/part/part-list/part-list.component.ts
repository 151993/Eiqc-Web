/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartService } from 'src/app/services/part/part.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, Constants, FieldNameList, SearchOperator, ToastMessage } from 'src/app/shared/constant/global';
import { Part } from 'src/app/model/part/part';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartModel } from 'src/app/model/part/update-part-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';
import { ColumnType } from 'src/app/model/table/table';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-part-list',
    templateUrl: './part-list.component.html',
    styleUrls: ['./part-list.component.css']
})
export class PartListComponent extends BaseListComponent implements OnInit {
    lastSAPSyncDate: any;
    dataSource: any;
    Site = 'SITE';
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal,
        private datePipe: TimeZonePipe
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Part()));
        this.entity = AuditLogEntityTypes.Part;
        this.editEntityPath = '../EditPart';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Part()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartCanCreate;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
       // this.getSAPLastSyncDate();
    }

    getUpdateModel(record: Part): UpdatePartModel {
        const updatePartModel = new UpdatePartModel();
        Automapper.map(record, updatePartModel);


        return updatePartModel;
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

    onFilterEvent(event) {
        if (event.fieldName.toLowerCase() === FieldNameList.Commodity) {
            this.notificationService.showError(ToastMessage.FilterByColumnNotExist);
            return false;
        }
        this.dataSource = [];
        this.pageSortFilterInfo = new PageSortFilterInfo();
        this.pageSortFilterInfo.entity = new Part();
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
}
