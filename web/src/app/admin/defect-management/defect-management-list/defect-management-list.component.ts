/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { DefectManagementService } from 'src/app/services/defect-management/defect-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { DefectManagement } from 'src/app/model/defect-management/defect-management';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateDefectManagementModel } from 'src/app/model/defect-management/update-defect-management-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-defect-management-list',
    templateUrl: './defect-management-list.component.html',
    styleUrls: ['./defect-management-list.component.css']
})
export class DefectManagementListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: DefectManagementService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new DefectManagement()));
        this.entity = AuditLogEntityTypes.DefectManagement;
        this.editEntityPath = '../EditDefectManagement';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new DefectManagement()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminDefectManagementCanAccess;
        this.canCreatPermissionType = PermissionType.AdminDefectManagementCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminDefectManagementCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminDefectManagementCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: DefectManagement): UpdateDefectManagementModel {
        const updateDefectManagementModel = new UpdateDefectManagementModel();
        Automapper.map(record, updateDefectManagementModel);


        return updateDefectManagementModel;
    }

}
