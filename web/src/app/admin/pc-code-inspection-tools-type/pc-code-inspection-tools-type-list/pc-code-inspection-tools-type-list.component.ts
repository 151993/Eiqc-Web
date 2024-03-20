/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PCCodeInspectionToolsTypeService } from 'src/app/services/pc-code-inspection-tools-type/pc-code-inspection-tools-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PCCodeInspectionToolsType } from 'src/app/model/pc-code-inspection-tools-type/pc-code-inspection-tools-type';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePCCodeInspectionToolsTypeModel } from 'src/app/model/pc-code-inspection-tools-type/update-pc-code-inspection-tools-type-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-pc-code-inspection-tools-type-list',
    templateUrl: './pc-code-inspection-tools-type-list.component.html',
    styleUrls: ['./pc-code-inspection-tools-type-list.component.css']
})
export class PCCodeInspectionToolsTypeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PCCodeInspectionToolsTypeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PCCodeInspectionToolsType()));
        this.entity = AuditLogEntityTypes.PCCodeInspectionToolsType;
        this.editEntityPath = '../EditPCCodeInspectionToolsType';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PCCodeInspectionToolsType()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPCCodeInspectionToolsTypeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPCCodeInspectionToolsTypeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPCCodeInspectionToolsTypeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPCCodeInspectionToolsTypeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PCCodeInspectionToolsType;
    }

    getUpdateModel(record: PCCodeInspectionToolsType): UpdatePCCodeInspectionToolsTypeModel {
        const updatePCCodeInspectionToolsTypeModel = new UpdatePCCodeInspectionToolsTypeModel();
        Automapper.map(record, updatePCCodeInspectionToolsTypeModel);


        return updatePCCodeInspectionToolsTypeModel;
    }

}
