/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { CompletedGRSService } from 'src/app/services/completed-grs/completed-grs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { CompletedGRS } from 'src/app/model/completed-grs/completed-grs';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateCompletedGRSModel } from 'src/app/model/completed-grs/update-completed-grs-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-completed-grs-list',
    templateUrl: './completed-grs-list.component.html',
    styleUrls: ['./completed-grs-list.component.css']
})
export class CompletedGRSListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: CompletedGRSService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new CompletedGRS()));
        this.entity = AuditLogEntityTypes.CompletedGRS;
        this.editEntityPath = '../EditCompletedGRS';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new CompletedGRS()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminCompletedGRSCanAccess;
        this.canCreatPermissionType = PermissionType.AdminCompletedGRSCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminCompletedGRSCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminCompletedGRSCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: CompletedGRS): UpdateCompletedGRSModel {
        const updateCompletedGRSModel = new UpdateCompletedGRSModel();
        Automapper.map(record, updateCompletedGRSModel);


        return updateCompletedGRSModel;
    }

}
