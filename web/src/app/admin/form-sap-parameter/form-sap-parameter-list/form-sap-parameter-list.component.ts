/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormSAPParameterService } from 'src/app/services/form-sap-parameter/form-sap-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormSAPParameter } from 'src/app/model/form-sap-parameter/form-sap-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormSAPParameterModel } from 'src/app/model/form-sap-parameter/update-form-sap-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-sap-parameter-list',
    templateUrl: './form-sap-parameter-list.component.html',
    styleUrls: ['./form-sap-parameter-list.component.css']
})
export class FormSAPParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormSAPParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormSAPParameter()));
        this.entity = AuditLogEntityTypes.FormSAPParameter;
        this.editEntityPath = '../EditFormSAPParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormSAPParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormSAPParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormSAPParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormSAPParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormSAPParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormSAPParameter;
    }

    getUpdateModel(record: FormSAPParameter): UpdateFormSAPParameterModel {
        const updateFormSAPParameterModel = new UpdateFormSAPParameterModel();
        Automapper.map(record, updateFormSAPParameterModel);



        return updateFormSAPParameterModel;
    }

}
