/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormCountParameterService } from 'src/app/services/supplier-form-count-parameter/supplier-form-count-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormCountParameter } from 'src/app/model/supplier-form-count-parameter/supplier-form-count-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormCountParameterModel } from 'src/app/model/supplier-form-count-parameter/update-supplier-form-count-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-count-parameter-list',
    templateUrl: './supplier-form-count-parameter-list.component.html',
    styleUrls: ['./supplier-form-count-parameter-list.component.css']
})
export class SupplierFormCountParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormCountParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormCountParameter()));
        this.entity = AuditLogEntityTypes.SupplierFormCountParameter;
        this.editEntityPath = '../EditSupplierFormCountParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormCountParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormCountParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormCountParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormCountParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormCountParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormCountParameter): UpdateSupplierFormCountParameterModel {
        const updateSupplierFormCountParameterModel = new UpdateSupplierFormCountParameterModel();
        Automapper.map(record, updateSupplierFormCountParameterModel);


        return updateSupplierFormCountParameterModel;
    }

}
