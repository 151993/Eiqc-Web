/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormMeasurementParameterActualService } from 'src/app/services/form-measurement-parameter-actual/form-measurement-parameter-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormMeasurementParameterActual } from 'src/app/model/form-measurement-parameter-actual/form-measurement-parameter-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormMeasurementParameterActualModel } from 'src/app/model/form-measurement-parameter-actual/update-form-measurement-parameter-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-measurement-parameter-actual-list',
    templateUrl: './form-measurement-parameter-actual-list.component.html',
    styleUrls: ['./form-measurement-parameter-actual-list.component.css']
})
export class FormMeasurementParameterActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormMeasurementParameterActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormMeasurementParameterActual()));
        this.entity = AuditLogEntityTypes.FormMeasurementParameterActual;
        this.editEntityPath = '../EditFormMeasurementParameterActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormMeasurementParameterActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormMeasurementParameterActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormMeasurementParameterActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormMeasurementParameterActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormMeasurementParameterActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormMeasurementParameterActual;
    }

    getUpdateModel(record: FormMeasurementParameterActual): UpdateFormMeasurementParameterActualModel {
        const updateFormMeasurementParameterActualModel = new UpdateFormMeasurementParameterActualModel();
        Automapper.map(record, updateFormMeasurementParameterActualModel);


        return updateFormMeasurementParameterActualModel;
    }

}
