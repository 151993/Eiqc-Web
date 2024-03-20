/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormSAPParameterService } from 'src/app/services/supplier-form-sap-parameter/supplier-form-sap-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormSAPParameter } from 'src/app/model/supplier-form-sap-parameter/supplier-form-sap-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormSAPParameterModel } from 'src/app/model/supplier-form-sap-parameter/update-supplier-form-sap-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-sap-parameter-list',
    templateUrl: './supplier-form-sap-parameter-list.component.html',
    styleUrls: ['./supplier-form-sap-parameter-list.component.css']
})
export class SupplierFormSAPParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormSAPParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormSAPParameter()));
        this.entity = AuditLogEntityTypes.SupplierFormSAPParameter;
        this.editEntityPath = '../EditSupplierFormSAPParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormSAPParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormSAPParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormSAPParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormSAPParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormSAPParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormSAPParameter): UpdateSupplierFormSAPParameterModel {
        const updateSupplierFormSAPParameterModel = new UpdateSupplierFormSAPParameterModel();
        Automapper.map(record, updateSupplierFormSAPParameterModel);


        return updateSupplierFormSAPParameterModel;
    }

}
