/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormResultOrientedParameterService } from 'src/app/services/supplier-form-result-oriented-parameter/supplier-form-result-oriented-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormResultOrientedParameter } from 'src/app/model/supplier-form-result-oriented-parameter/supplier-form-result-oriented-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormResultOrientedParameterModel } from 'src/app/model/supplier-form-result-oriented-parameter/update-supplier-form-result-oriented-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-result-oriented-parameter-list',
    templateUrl: './supplier-form-result-oriented-parameter-list.component.html',
    styleUrls: ['./supplier-form-result-oriented-parameter-list.component.css']
})
export class SupplierFormResultOrientedParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormResultOrientedParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormResultOrientedParameter()));
        this.entity = AuditLogEntityTypes.SupplierFormResultOrientedParameter;
        this.editEntityPath = '../EditSupplierFormResultOrientedParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormResultOrientedParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormResultOrientedParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormResultOrientedParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormResultOrientedParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormResultOrientedParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormResultOrientedParameter): UpdateSupplierFormResultOrientedParameterModel {
        const updateSupplierFormResultOrientedParameterModel = new UpdateSupplierFormResultOrientedParameterModel();
        Automapper.map(record, updateSupplierFormResultOrientedParameterModel);


        return updateSupplierFormResultOrientedParameterModel;
    }

}
