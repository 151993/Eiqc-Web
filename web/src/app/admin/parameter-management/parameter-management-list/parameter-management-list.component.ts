import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ParameterManagementService } from 'src/app/services/parameter-management/parameter-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { ParameterManagement } from 'src/app/model/parameter-management/parameter-management';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateParameterManagementModel } from 'src/app/model/parameter-management/update-parameter-management-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-parameter-management-list',
    templateUrl: './parameter-management-list.component.html',
    styleUrls: ['./parameter-management-list.component.css']
})
export class ParameterManagementListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: ParameterManagementService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new ParameterManagement()));
        this.entity = AuditLogEntityTypes.ParameterManagement;
        this.editEntityPath = '../EditParameterManagement';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new ParameterManagement()).displayColumns();
        this.canAccessPermissionType = PermissionType.AdminParameterManagementCanAccess;
        this.canCreatPermissionType = PermissionType.AdminParameterManagementCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminParameterManagementCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminParameterManagementCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: ParameterManagement): UpdateParameterManagementModel {
        const updateParameterManagementModel = new UpdateParameterManagementModel();
        Automapper.map(record, updateParameterManagementModel);
        return updateParameterManagementModel;
    }

}
