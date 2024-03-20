/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormFunParaService } from 'src/app/services/supplier-form-fun-para/supplier-form-fun-para.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormFunPara } from 'src/app/model/supplier-form-fun-para/supplier-form-fun-para';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormFunParaModel } from 'src/app/model/supplier-form-fun-para/update-supplier-form-fun-para-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-fun-para-list',
    templateUrl: './supplier-form-fun-para-list.component.html',
    styleUrls: ['./supplier-form-fun-para-list.component.css']
})
export class SupplierFormFunParaListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormFunParaService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormFunPara()));
        this.entity = AuditLogEntityTypes.SupplierFormFunPara;
        this.editEntityPath = '../EditSupplierFormFunPara';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormFunPara()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormFunParaCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormFunParaCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormFunParaCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormFunParaCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormFunPara): UpdateSupplierFormFunParaModel {
        const updateSupplierFormFunParaModel = new UpdateSupplierFormFunParaModel();
        Automapper.map(record, updateSupplierFormFunParaModel);



        return updateSupplierFormFunParaModel;
    }

}
