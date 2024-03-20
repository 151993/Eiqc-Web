/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormSpecialParameterService } from 'src/app/services/form-special-parameter/form-special-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormSpecialParameter } from 'src/app/model/form-special-parameter/form-special-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormSpecialParameterModel } from 'src/app/model/form-special-parameter/update-form-special-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-special-parameter-list',
    templateUrl: './form-special-parameter-list.component.html',
    styleUrls: ['./form-special-parameter-list.component.css']
})
export class FormSpecialParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormSpecialParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormSpecialParameter()));
        this.entity = AuditLogEntityTypes.FormSpecialParameter;
        this.editEntityPath = '../EditFormSpecialParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormSpecialParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormSpecialParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormSpecialParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormSpecialParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormSpecialParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormSpecialParameter;
    }

    getUpdateModel(record: FormSpecialParameter): UpdateFormSpecialParameterModel {
        const updateFormSpecialParameterModel = new UpdateFormSpecialParameterModel();
        Automapper.map(record, updateFormSpecialParameterModel);


        return updateFormSpecialParameterModel;
    }

}
