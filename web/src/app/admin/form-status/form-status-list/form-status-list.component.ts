/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormStatusService } from 'src/app/services/form-status/form-status.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormStatus } from 'src/app/model/form-status/form-status';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormStatusModel } from 'src/app/model/form-status/update-form-status-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-status-list',
    templateUrl: './form-status-list.component.html',
    styleUrls: ['./form-status-list.component.css']
})
export class FormStatusListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormStatusService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormStatus()));
        this.entity = AuditLogEntityTypes.FormStatus;
        this.editEntityPath = '../EditFormStatus';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormStatus()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormStatusCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormStatusCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormStatusCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormStatusCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormStatus;
    }

    getUpdateModel(record: FormStatus): UpdateFormStatusModel {
        const updateFormStatusModel = new UpdateFormStatusModel();
        Automapper.map(record, updateFormStatusModel);


        return updateFormStatusModel;
    }

}
