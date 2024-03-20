/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormMicroSectionService } from 'src/app/services/supplier-form-micro-section/supplier-form-micro-section.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormMicroSection } from 'src/app/model/supplier-form-micro-section/supplier-form-micro-section';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormMicroSectionModel } from 'src/app/model/supplier-form-micro-section/update-supplier-form-micro-section-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-micro-section-list',
    templateUrl: './supplier-form-micro-section-list.component.html',
    styleUrls: ['./supplier-form-micro-section-list.component.css']
})
export class SupplierFormMicroSectionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormMicroSectionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormMicroSection()));
        this.entity = AuditLogEntityTypes.SupplierFormMicroSection;
        this.editEntityPath = '../EditSupplierFormMicroSection';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormMicroSection()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormMicroSectionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormMicroSectionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormMicroSectionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormMicroSectionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormMicroSection): UpdateSupplierFormMicroSectionModel {
        const updateSupplierFormMicroSectionModel = new UpdateSupplierFormMicroSectionModel();
        Automapper.map(record, updateSupplierFormMicroSectionModel);


        return updateSupplierFormMicroSectionModel;
    }

}
