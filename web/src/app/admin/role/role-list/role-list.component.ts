


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { RoleService } from 'src/app/services/role/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, RoleType, SearchOperator } from 'src/app/shared/constant/global';
import { Role } from 'src/app/model/role/role';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateRoleModel } from 'src/app/model/role/update-role-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { AuthService } from 'src/app/auth/auth.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';

const roleEnumField = 'RoleEnumId';
@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends BaseListComponent implements OnInit {
    constructor(
        _router: Router, // tslint:disable-line
        _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: RoleService, // tslint:disable-line
        _csvExportService: CSVExportService, // tslint:disable-line
        authService: AuthService,
        auditLogService: AuditLogService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Role()));

        this.entity = AuditLogEntityTypes.Role;
        this.editEntityPath = '../EditRole';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Role()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminRoleCanAccess;
        this.canCreatPermissionType = PermissionType.AdminRoleCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminRoleCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminRoleCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        const currentUser = this.authService.retrieveUser();
        if (currentUser && currentUser.roles) {
            const roleEnumId = currentUser.roles[0].roleEnumId;
            this.pageSortFilterInfo.filterInfo = [];
            if (roleEnumId === RoleType.Site_SME) {
                this.getFilterByColumnName(RoleType.Site_SME, roleEnumField, SearchOperator.NotEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.And);
                this.getFilterByColumnName(RoleType.Global_Admin, roleEnumField, SearchOperator.NotEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.And);

            } else if (roleEnumId === RoleType.Jabil_SQE) {
                this.getFilterByColumnName(RoleType.Supplier, roleEnumField, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.Or);
                this.getFilterByColumnName(RoleType.Customer, roleEnumField, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, FilterCondition.Or);
            }
        }
        this._apiService.getAllData(this.pageSortFilterInfo)
            .subscribe(data => {
                this.totalRecords = data.count;
                this.dataSource = data.value;
            });

    }

    getUpdateModel(record: Role): UpdateRoleModel {
        const updateRoleModel = new UpdateRoleModel();
        Automapper.map(record, updateRoleModel);

        return updateRoleModel;
    }

}
