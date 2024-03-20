/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { InspectionService } from 'src/app/services/inspection/inspection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Inspection } from 'src/app/model/inspection/inspection';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateInspectionModel } from 'src/app/model/inspection/update-inspection-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-inspection-list',
    templateUrl: './inspection-list.component.html',
    styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: InspectionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Inspection()));
        this.entity = AuditLogEntityTypes.Inspection;
        this.editEntityPath = '../EditInspection';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Inspection()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminInspectionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminInspectionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminInspectionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminInspectionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.Inspection;
    }

    getUpdateModel(record: Inspection): UpdateInspectionModel {
        const updateInspectionModel = new UpdateInspectionModel();
        Automapper.map(record, updateInspectionModel);



        return updateInspectionModel;
    }

}
