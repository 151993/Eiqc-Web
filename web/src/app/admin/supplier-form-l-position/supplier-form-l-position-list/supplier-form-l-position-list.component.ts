/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormLPositionService } from 'src/app/services/supplier-form-l-position/supplier-form-l-position.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormLPosition } from 'src/app/model/supplier-form-l-position/supplier-form-l-position';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormLPositionModel } from 'src/app/model/supplier-form-l-position/update-supplier-form-l-position-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-l-position-list',
    templateUrl: './supplier-form-l-position-list.component.html',
    styleUrls: ['./supplier-form-l-position-list.component.css']
})
export class SupplierFormLPositionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormLPositionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormLPosition()));
        this.entity = AuditLogEntityTypes.SupplierFormLPosition;
        this.editEntityPath = '../EditSupplierFormLPosition';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormLPosition()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormLPositionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormLPositionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormLPositionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormLPositionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormLPosition): UpdateSupplierFormLPositionModel {
        const updateSupplierFormLPositionModel = new UpdateSupplierFormLPositionModel();
        Automapper.map(record, updateSupplierFormLPositionModel);


        return updateSupplierFormLPositionModel;
    }

}
