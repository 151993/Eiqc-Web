/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormMicroSectionActualService } from 'src/app/services/supplier-form-micro-section-actual/supplier-form-micro-section-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormMicroSectionActual } from 'src/app/model/supplier-form-micro-section-actual/supplier-form-micro-section-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormMicroSectionActualModel } from 'src/app/model/supplier-form-micro-section-actual/update-supplier-form-micro-section-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-micro-section-actual-list',
    templateUrl: './supplier-form-micro-section-actual-list.component.html',
    styleUrls: ['./supplier-form-micro-section-actual-list.component.css']
})
export class SupplierFormMicroSectionActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormMicroSectionActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormMicroSectionActual()));
        this.entity = AuditLogEntityTypes.SupplierFormMicroSectionActual;
        this.editEntityPath = '../EditSupplierFormMicroSectionActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormMicroSectionActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormMicroSectionActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormMicroSectionActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormMicroSectionActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormMicroSectionActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormMicroSectionActual): UpdateSupplierFormMicroSectionActualModel {
        const updateSupplierFormMicroSectionActualModel = new UpdateSupplierFormMicroSectionActualModel();
        Automapper.map(record, updateSupplierFormMicroSectionActualModel);


        return updateSupplierFormMicroSectionActualModel;
    }

}
