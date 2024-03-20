/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierFormVISService } from 'src/app/services/supplier-form-vis/supplier-form-vis.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierFormVIS } from 'src/app/model/supplier-form-vis/supplier-form-vis';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierFormVISModel } from 'src/app/model/supplier-form-vis/update-supplier-form-vis-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-form-vis-list',
    templateUrl: './supplier-form-vis-list.component.html',
    styleUrls: ['./supplier-form-vis-list.component.css']
})
export class SupplierFormVISListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierFormVISService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierFormVIS()));
        this.entity = AuditLogEntityTypes.SupplierFormVIS;
        this.editEntityPath = '../EditSupplierFormVIS';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierFormVIS()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierFormVISCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierFormVISCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierFormVISCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierFormVISCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierFormVIS): UpdateSupplierFormVISModel {
        const updateSupplierFormVISModel = new UpdateSupplierFormVISModel();
        Automapper.map(record, updateSupplierFormVISModel);


        return updateSupplierFormVISModel;
    }

}
