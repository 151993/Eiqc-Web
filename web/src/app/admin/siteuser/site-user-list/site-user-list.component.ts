/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, SearchOperator, ToastMessage } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { SiteUser } from 'src/app/model/siteuser/site-user';
import { UpdateSiteUserModel } from 'src/app/model/siteuser/update-site-user-model';
import { SiteUserService } from 'src/app/services/site-user/site-user.service';
import { DeleteSiteUserModel } from 'src/app/model/siteuser/delete-site-user-model';
import { Site } from 'src/app/model/site/site';
import { ColumnType } from 'src/app/model/table/table';

@Component({
    selector: 'app-site-user-list',
    templateUrl: './site-user-list.component.html',
    styleUrls: ['./site-user-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SiteUserListComponent extends BaseListComponent implements OnInit, OnChanges {
    @Input() totalRecords: number;
    @Input() site: Site;
    dataSource: SiteUser[];
    constructor(
        _router: Router,
        _activatedRoute: ActivatedRoute,
        private _apiService: SiteUserService,
        _csvExportService: CSVExportService,
        authService: AuthService,
        auditLogService: AuditLogService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {

        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SiteUser()));
        this.entity = AuditLogEntityTypes.SiteUser;

        this.displayColumns = (new SiteUser()).displayColumns();
        this.getUpdateModelFunction = this.getUpdateModel;

        this.canCreatPermissionType = PermissionType.AdminSiteCanCreate;
        this.canDeletePermissionType = PermissionType.AdminSiteCanDelete;

        this.checkPermissions();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    getGridData() {
        if (this.site) {
            this._apiService.getAllData(this.pageSortFilterInfo)
                .subscribe(data => {
                    this.totalRecords = data.count;
                    this.dataSource = data.value;
                });
        }
    }

    getSiteFilterInfo() {
        if (this.site) {
            this.pageSortFilterInfo.filterInfo = [];
            const filterInfo = new FilterInfo();
            filterInfo.columnName = 'siteId';
            filterInfo.columnType = ColumnType.Number;
            filterInfo.mappingField = 'SiteId';
            filterInfo.value = this.site ? this.site.id : 0;
            filterInfo.operator = SearchOperator.IsEqualTo;
            this.pageSortFilterInfo.filterInfo.push(filterInfo);
        }
    }

    getUpdateModel(record: SiteUser): UpdateSiteUserModel {
        const updateSiteUserModel = new UpdateSiteUserModel();
        Automapper.map(record, updateSiteUserModel);
        updateSiteUserModel.site = this.site;
        return updateSiteUserModel;
    }

    deleteRecord(record: SiteUser) {
        this.showDeleteChangeReasonModal().then(
            changeReason => {
                const deleteModel = new DeleteSiteUserModel();
                deleteModel.id = record.id;
                deleteModel.changeReason = changeReason;
                deleteModel.site = this.site;
                this.apiDataService.deleteData(record.id, deleteModel).subscribe(() => {
                    this.getGridData();
                    this.notificationService.showSuccess(ToastMessage.DataDeleted);
                });
            },
            () => { }
        );
    }

    toggleStatus(record: SiteUser) {
        this.showChangeReasonModal().result.then(
            changeReason => {
                const rec = this.getUpdateModelFunction(record);
                rec.isEnabled = !record.isEnabled;
                rec.changeReason = changeReason;
                this.apiDataService.updateData(record.id, rec).subscribe(() => {
                    this.getGridData();
                    this.notificationService.showSuccess(ToastMessage.Saved);
                });
            },
            () => { }
        );
    }

    onFilterEvent(event) {
        this.updateFilter(event);
        this.getGridData();
    }

    onPageSortEvent(event) {
        this.updateSort(event.sortInfo, this.isAuditLog);
        this.updatePage(event, this.isAuditLog);
        this.getGridData();
    }

    ngOnChanges() {
        if (this.site) {
            this.getSiteFilterInfo();
            this.getGridData();
        }
    }

}
