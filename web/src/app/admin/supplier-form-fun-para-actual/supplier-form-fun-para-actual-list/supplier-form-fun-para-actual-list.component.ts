/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormFunParaActualService } from 'src/app/services/supplier-form-fun-para-actual/supplier-form-fun-para-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormFunParaActual } from 'src/app/model/supplier-form-fun-para-actual/supplier-form-fun-para-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormFunParaActualModel } from 'src/app/model/supplier-form-fun-para-actual/update-supplier-form-fun-para-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-fun-para-actual-list',
    templateUrl: './supplier-form-fun-para-actual-list.component.html',
    styleUrls: ['./supplier-form-fun-para-actual-list.component.css']
})
export class SupplierFormFunParaActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormFunParaActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormFunParaActual()));
        this.entity = AuditLogEntityTypes.SupplierFormFunParaActual;
        this.editEntityPath = '../EditSupplierFormFunParaActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormFunParaActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormFunParaActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormFunParaActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormFunParaActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormFunParaActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormFunParaActual): UpdateSupplierFormFunParaActualModel {
        const updateSupplierFormFunParaActualModel = new UpdateSupplierFormFunParaActualModel();
        Automapper.map(record, updateSupplierFormFunParaActualModel);


        return updateSupplierFormFunParaActualModel;
    }

}
