/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { GRSSupplierFormService } from 'src/app/services/grs-supplier-form/grs-supplier-form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { GRSSupplierForm } from 'src/app/model/grs-supplier-form/grs-supplier-form';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateGRSSupplierFormModel } from 'src/app/model/grs-supplier-form/update-grs-supplier-form-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-grs-supplier-form-list',
    templateUrl: './grs-supplier-form-list.component.html',
    styleUrls: ['./grs-supplier-form-list.component.css']
})
export class GRSSupplierFormListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: GRSSupplierFormService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new GRSSupplierForm()));
        this.entity = AuditLogEntityTypes.GRSSupplierForm;
        this.editEntityPath = '../EditGRSSupplierForm';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new GRSSupplierForm()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminGRSSupplierFormCanAccess;
        this.canCreatPermissionType = PermissionType.AdminGRSSupplierFormCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminGRSSupplierFormCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminGRSSupplierFormCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.GRSSupplierForm;
    }

    getUpdateModel(record: GRSSupplierForm): UpdateGRSSupplierFormModel {
        const updateGRSSupplierFormModel = new UpdateGRSSupplierFormModel();
        Automapper.map(record, updateGRSSupplierFormModel);


        return updateGRSSupplierFormModel;
    }

}
