/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormMeasurementParameterService } from 'src/app/services/supplier-form-measurement-parameter/supplier-form-measurement-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormMeasurementParameter } from 'src/app/model/supplier-form-measurement-parameter/supplier-form-measurement-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormMeasurementParameterModel } from 'src/app/model/supplier-form-measurement-parameter/update-supplier-form-measurement-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-measurement-parameter-list',
    templateUrl: './supplier-form-measurement-parameter-list.component.html',
    styleUrls: ['./supplier-form-measurement-parameter-list.component.css']
})
export class SupplierFormMeasurementParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormMeasurementParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormMeasurementParameter()));
        this.entity = AuditLogEntityTypes.SupplierFormMeasurementParameter;
        this.editEntityPath = '../EditSupplierFormMeasurementParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormMeasurementParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormMeasurementParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormMeasurementParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormMeasurementParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormMeasurementParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
    }

    getUpdateModel(record: SupplierFormMeasurementParameter): UpdateSupplierFormMeasurementParameterModel {
        const updateSupplierFormMeasurementParameterModel = new UpdateSupplierFormMeasurementParameterModel();
        Automapper.map(record, updateSupplierFormMeasurementParameterModel);


        return updateSupplierFormMeasurementParameterModel;
    }

}
