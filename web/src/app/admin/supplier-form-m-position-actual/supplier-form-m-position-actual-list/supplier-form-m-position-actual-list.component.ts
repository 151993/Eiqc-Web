/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormMPositionActualService } from 'src/app/services/supplier-form-m-position-actual/supplier-form-m-position-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormMPositionActual } from 'src/app/model/supplier-form-m-position-actual/supplier-form-m-position-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormMPositionActualModel } from 'src/app/model/supplier-form-m-position-actual/update-supplier-form-m-position-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-m-position-actual-list',
    templateUrl: './supplier-form-m-position-actual-list.component.html',
    styleUrls: ['./supplier-form-m-position-actual-list.component.css']
})
export class SupplierFormMPositionActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormMPositionActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormMPositionActual()));
        this.entity = AuditLogEntityTypes.SupplierFormMPositionActual;
        this.editEntityPath = '../EditSupplierFormMPositionActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormMPositionActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormMPositionActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormMPositionActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormMPositionActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormMPositionActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormMPositionActual): UpdateSupplierFormMPositionActualModel {
        const updateSupplierFormMPositionActualModel = new UpdateSupplierFormMPositionActualModel();
        Automapper.map(record, updateSupplierFormMPositionActualModel);


        return updateSupplierFormMPositionActualModel;
    }

}
