/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartMPositionToleranceService } from 'src/app/services/part-m-position-tolerance/part-m-position-tolerance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartMPositionTolerance } from 'src/app/model/part-m-position-tolerance/part-m-position-tolerance';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartMPositionToleranceModel } from 'src/app/model/part-m-position-tolerance/update-part-m-position-tolerance-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-m-position-tolerance-list',
    templateUrl: './part-m-position-tolerance-list.component.html',
    styleUrls: ['./part-m-position-tolerance-list.component.css']
})
export class PartMPositionToleranceListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartMPositionToleranceService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartMPositionTolerance()));
        this.entity = AuditLogEntityTypes.PartMPositionTolerance;
        this.editEntityPath = '../EditPartMPositionTolerance';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartMPositionTolerance()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartMPositionToleranceCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartMPositionToleranceCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartMPositionToleranceCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartMPositionToleranceCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartMPositionTolerance;
    }

    getUpdateModel(record: PartMPositionTolerance): UpdatePartMPositionToleranceModel {
        const updatePartMPositionToleranceModel = new UpdatePartMPositionToleranceModel();
        Automapper.map(record, updatePartMPositionToleranceModel);


        return updatePartMPositionToleranceModel;
    }

}
