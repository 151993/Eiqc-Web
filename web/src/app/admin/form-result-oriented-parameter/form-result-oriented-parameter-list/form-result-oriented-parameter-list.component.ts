/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormResultOrientedParameterService } from 'src/app/services/form-result-oriented-parameter/form-result-oriented-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormResultOrientedParameter } from 'src/app/model/form-result-oriented-parameter/form-result-oriented-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormResultOrientedParameterModel } from 'src/app/model/form-result-oriented-parameter/update-form-result-oriented-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-result-oriented-parameter-list',
    templateUrl: './form-result-oriented-parameter-list.component.html',
    styleUrls: ['./form-result-oriented-parameter-list.component.css']
})
export class FormResultOrientedParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormResultOrientedParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormResultOrientedParameter()));
        this.entity = AuditLogEntityTypes.FormResultOrientedParameter;
        this.editEntityPath = '../EditFormResultOrientedParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormResultOrientedParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormResultOrientedParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormResultOrientedParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormResultOrientedParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormResultOrientedParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormResultOrientedParameter;
    }

    getUpdateModel(record: FormResultOrientedParameter): UpdateFormResultOrientedParameterModel {
        const updateFormResultOrientedParameterModel = new UpdateFormResultOrientedParameterModel();
        Automapper.map(record, updateFormResultOrientedParameterModel);


        return updateFormResultOrientedParameterModel;
    }

}
