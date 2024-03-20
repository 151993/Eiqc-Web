/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormPackagingService } from 'src/app/services/supplier-form-packaging/supplier-form-packaging.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormPackaging } from 'src/app/model/supplier-form-packaging/supplier-form-packaging';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormPackagingModel } from 'src/app/model/supplier-form-packaging/update-supplier-form-packaging-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-packaging-list',
    templateUrl: './supplier-form-packaging-list.component.html',
    styleUrls: ['./supplier-form-packaging-list.component.css']
})
export class SupplierFormPackagingListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormPackagingService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormPackaging()));
        this.entity = AuditLogEntityTypes.SupplierFormPackaging;
        this.editEntityPath = '../EditSupplierFormPackaging';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormPackaging()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormPackagingCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormPackagingCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormPackagingCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormPackagingCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormPackaging): UpdateSupplierFormPackagingModel {
        const updateSupplierFormPackagingModel = new UpdateSupplierFormPackagingModel();
        Automapper.map(record, updateSupplierFormPackagingModel);


        return updateSupplierFormPackagingModel;
    }

}
