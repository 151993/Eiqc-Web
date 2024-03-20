/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormMeasurementParameterService } from 'src/app/services/form-measurement-parameter/form-measurement-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormMeasurementParameter } from 'src/app/model/form-measurement-parameter/form-measurement-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormMeasurementParameterModel } from 'src/app/model/form-measurement-parameter/update-form-measurement-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-measurement-parameter-list',
    templateUrl: './form-measurement-parameter-list.component.html',
    styleUrls: ['./form-measurement-parameter-list.component.css']
})
export class FormMeasurementParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormMeasurementParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormMeasurementParameter()));
        this.entity = AuditLogEntityTypes.FormMeasurementParameter;
        this.editEntityPath = '../EditFormMeasurementParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormMeasurementParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormMeasurementParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormMeasurementParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormMeasurementParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormMeasurementParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormMeasurementParameter;
    }

    getUpdateModel(record: FormMeasurementParameter): UpdateFormMeasurementParameterModel {
        const updateFormMeasurementParameterModel = new UpdateFormMeasurementParameterModel();
        Automapper.map(record, updateFormMeasurementParameterModel);


        return updateFormMeasurementParameterModel;
    }

}
