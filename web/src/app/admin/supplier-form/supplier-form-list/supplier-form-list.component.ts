/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormService } from 'src/app/services/supplier-form/supplier-form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierForm } from 'src/app/model/supplier-form/supplier-form';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormModel } from 'src/app/model/supplier-form/update-supplier-form-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-list',
    templateUrl: './supplier-form-list.component.html',
    styleUrls: ['./supplier-form-list.component.css']
})
export class SupplierFormListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierForm()));
        this.entity = AuditLogEntityTypes.SupplierForm;
        this.editEntityPath = '../EditSupplierForm';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierForm()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.SupplierForm;
    }

    getUpdateModel(record: SupplierForm): UpdateSupplierFormModel {
        const updateSupplierFormModel = new UpdateSupplierFormModel();
        Automapper.map(record, updateSupplierFormModel);


        return updateSupplierFormModel;
    }

}
