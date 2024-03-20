/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormSpecialParameterService } from 'src/app/services/supplier-form-special-parameter/supplier-form-special-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormSpecialParameter } from 'src/app/model/supplier-form-special-parameter/supplier-form-special-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormSpecialParameterModel } from 'src/app/model/supplier-form-special-parameter/update-supplier-form-special-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-special-parameter-list',
    templateUrl: './supplier-form-special-parameter-list.component.html',
    styleUrls: ['./supplier-form-special-parameter-list.component.css']
})
export class SupplierFormSpecialParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormSpecialParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormSpecialParameter()));
        this.entity = AuditLogEntityTypes.SupplierFormSpecialParameter;
        this.editEntityPath = '../EditSupplierFormSpecialParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormSpecialParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormSpecialParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormSpecialParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormSpecialParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormSpecialParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormSpecialParameter): UpdateSupplierFormSpecialParameterModel {
        const updateSupplierFormSpecialParameterModel = new UpdateSupplierFormSpecialParameterModel();
        Automapper.map(record, updateSupplierFormSpecialParameterModel);


        return updateSupplierFormSpecialParameterModel;
    }

}
