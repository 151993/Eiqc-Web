/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormBowTwistActualService } from 'src/app/services/supplier-form-bow-twist-actual/supplier-form-bow-twist-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormBowTwistActual } from 'src/app/model/supplier-form-bow-twist-actual/supplier-form-bow-twist-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormBowTwistActualModel } from 'src/app/model/supplier-form-bow-twist-actual/update-supplier-form-bow-twist-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-bow-twist-actual-list',
    templateUrl: './supplier-form-bow-twist-actual-list.component.html',
    styleUrls: ['./supplier-form-bow-twist-actual-list.component.css']
})
export class SupplierFormBowTwistActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormBowTwistActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormBowTwistActual()));
        this.entity = AuditLogEntityTypes.SupplierFormBowTwistActual;
        this.editEntityPath = '../EditSupplierFormBowTwistActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormBowTwistActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormBowTwistActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormBowTwistActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormBowTwistActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormBowTwistActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormBowTwistActual): UpdateSupplierFormBowTwistActualModel {
        const updateSupplierFormBowTwistActualModel = new UpdateSupplierFormBowTwistActualModel();
        Automapper.map(record, updateSupplierFormBowTwistActualModel);


        return updateSupplierFormBowTwistActualModel;
    }

}
