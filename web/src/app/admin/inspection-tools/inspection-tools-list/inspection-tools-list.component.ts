/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { InspectionToolsService } from 'src/app/services/inspection-tools/inspection-tools.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { InspectionTools } from 'src/app/model/inspection-tools/inspection-tools';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateInspectionToolsModel } from 'src/app/model/inspection-tools/update-inspection-tools-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-inspection-tools-list',
    templateUrl: './inspection-tools-list.component.html',
    styleUrls: ['./inspection-tools-list.component.css']
})
export class InspectionToolsListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: InspectionToolsService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new InspectionTools()));
        this.entity = AuditLogEntityTypes.InspectionTools;
        this.editEntityPath = '../EditInspectionTools';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new InspectionTools()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminInspectionToolsCanAccess;
        this.canCreatPermissionType = PermissionType.AdminInspectionToolsCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminInspectionToolsCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminInspectionToolsCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.InspectionTools;
    }

    getUpdateModel(record: InspectionTools): UpdateInspectionToolsModel {
        const updateInspectionToolsModel = new UpdateInspectionToolsModel();
        Automapper.map(record, updateInspectionToolsModel);


        return updateInspectionToolsModel;
    }

}
