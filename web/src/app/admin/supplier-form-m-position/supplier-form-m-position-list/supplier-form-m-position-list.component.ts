/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormMPositionService } from 'src/app/services/supplier-form-m-position/supplier-form-m-position.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormMPosition } from 'src/app/model/supplier-form-m-position/supplier-form-m-position';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormMPositionModel } from 'src/app/model/supplier-form-m-position/update-supplier-form-m-position-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-m-position-list',
    templateUrl: './supplier-form-m-position-list.component.html',
    styleUrls: ['./supplier-form-m-position-list.component.css']
})
export class SupplierFormMPositionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormMPositionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormMPosition()));
        this.entity = AuditLogEntityTypes.SupplierFormMPosition;
        this.editEntityPath = '../EditSupplierFormMPosition';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormMPosition()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormMPositionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormMPositionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormMPositionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormMPositionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormMPosition): UpdateSupplierFormMPositionModel {
        const updateSupplierFormMPositionModel = new UpdateSupplierFormMPositionModel();
        Automapper.map(record, updateSupplierFormMPositionModel);
        return updateSupplierFormMPositionModel;
    }

}
