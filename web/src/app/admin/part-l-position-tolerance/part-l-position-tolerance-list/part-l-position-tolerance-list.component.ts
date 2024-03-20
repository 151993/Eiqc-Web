/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartLPositionToleranceService } from 'src/app/services/part-l-position-tolerance/part-l-position-tolerance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartLPositionTolerance } from 'src/app/model/part-l-position-tolerance/part-l-position-tolerance';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartLPositionToleranceModel } from 'src/app/model/part-l-position-tolerance/update-part-l-position-tolerance-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-l-position-tolerance-list',
    templateUrl: './part-l-position-tolerance-list.component.html',
    styleUrls: ['./part-l-position-tolerance-list.component.css']
})
export class PartLPositionToleranceListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartLPositionToleranceService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartLPositionTolerance()));
        this.entity = AuditLogEntityTypes.PartLPositionTolerance;
        this.editEntityPath = '../EditPartLPositionTolerance';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartLPositionTolerance()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartLPositionToleranceCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartLPositionToleranceCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartLPositionToleranceCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartLPositionToleranceCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartLPositionTolerance;
    }

    getUpdateModel(record: PartLPositionTolerance): UpdatePartLPositionToleranceModel {
        const updatePartLPositionToleranceModel = new UpdatePartLPositionToleranceModel();
        Automapper.map(record, updatePartLPositionToleranceModel);


        return updatePartLPositionToleranceModel;
    }

}
