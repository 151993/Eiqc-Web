/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormPartDateCodeService } from 'src/app/services/supplier-form-part-date-code/supplier-form-part-date-code.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormPartDateCode } from 'src/app/model/supplier-form-part-date-code/supplier-form-part-date-code';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormPartDateCodeModel } from 'src/app/model/supplier-form-part-date-code/update-supplier-form-part-date-code-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-part-date-code-list',
    templateUrl: './supplier-form-part-date-code-list.component.html',
    styleUrls: ['./supplier-form-part-date-code-list.component.css']
})
export class SupplierFormPartDateCodeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormPartDateCodeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormPartDateCode()));
        this.entity = AuditLogEntityTypes.SupplierFormPartDateCode;
        this.editEntityPath = '../EditSupplierFormPartDateCode';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormPartDateCode()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormPartDateCodeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormPartDateCodeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormPartDateCodeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormPartDateCodeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormPartDateCode): UpdateSupplierFormPartDateCodeModel {
        const updateSupplierFormPartDateCodeModel = new UpdateSupplierFormPartDateCodeModel();
        Automapper.map(record, updateSupplierFormPartDateCodeModel);


        return updateSupplierFormPartDateCodeModel;
    }

}
