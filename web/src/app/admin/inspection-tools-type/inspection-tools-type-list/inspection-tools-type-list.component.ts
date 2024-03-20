/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { InspectionToolsTypeService } from 'src/app/services/inspection-tools-type/inspection-tools-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { InspectionToolsType } from 'src/app/model/inspection-tools-type/inspection-tools-type';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateInspectionToolsTypeModel } from 'src/app/model/inspection-tools-type/update-inspection-tools-type-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-inspection-tools-type-list',
    templateUrl: './inspection-tools-type-list.component.html',
    styleUrls: ['./inspection-tools-type-list.component.css']
})
export class InspectionToolsTypeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: InspectionToolsTypeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new InspectionToolsType()));
        this.entity = AuditLogEntityTypes.InspectionToolsType;
        this.editEntityPath = '../EditInspectionToolsType';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new InspectionToolsType()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminInspectionToolsTypeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminInspectionToolsTypeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminInspectionToolsTypeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminInspectionToolsTypeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: InspectionToolsType): UpdateInspectionToolsTypeModel {
        const updateInspectionToolsTypeModel = new UpdateInspectionToolsTypeModel();
        Automapper.map(record, updateInspectionToolsTypeModel);


        return updateInspectionToolsTypeModel;
    }

}
