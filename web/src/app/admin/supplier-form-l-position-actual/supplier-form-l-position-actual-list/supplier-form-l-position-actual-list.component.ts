/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormLPositionActualService } from 'src/app/services/supplier-form-l-position-actual/supplier-form-l-position-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormLPositionActual } from 'src/app/model/supplier-form-l-position-actual/supplier-form-l-position-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormLPositionActualModel } from 'src/app/model/supplier-form-l-position-actual/update-supplier-form-l-position-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-l-position-actual-list',
    templateUrl: './supplier-form-l-position-actual-list.component.html',
    styleUrls: ['./supplier-form-l-position-actual-list.component.css']
})
export class SupplierFormLPositionActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormLPositionActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormLPositionActual()));
        this.entity = AuditLogEntityTypes.SupplierFormLPositionActual;
        this.editEntityPath = '../EditSupplierFormLPositionActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormLPositionActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormLPositionActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormLPositionActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormLPositionActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormLPositionActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormLPositionActual): UpdateSupplierFormLPositionActualModel {
        const updateSupplierFormLPositionActualModel = new UpdateSupplierFormLPositionActualModel();
        Automapper.map(record, updateSupplierFormLPositionActualModel);


        return updateSupplierFormLPositionActualModel;
    }

}
