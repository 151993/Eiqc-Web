/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormPartSAPFailedQtyService } from 'src/app/services/form-part-sap-failed-qty/form-part-sap-failed-qty.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormPartSAPFailedQty } from 'src/app/model/form-part-sap-failed-qty/form-part-sap-failed-qty';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormPartSAPFailedQtyModel } from 'src/app/model/form-part-sap-failed-qty/update-form-part-sap-failed-qty-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-part-sap-failed-qty-list',
    templateUrl: './form-part-sap-failed-qty-list.component.html',
    styleUrls: ['./form-part-sap-failed-qty-list.component.css']
})
export class FormPartSAPFailedQtyListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormPartSAPFailedQtyService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormPartSAPFailedQty()));
        this.entity = AuditLogEntityTypes.FormPartSAPFailedQty;
        this.editEntityPath = '../EditFormPartSAPFailedQty';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormPartSAPFailedQty()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormPartSAPFailedQtyCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormPartSAPFailedQtyCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormPartSAPFailedQtyCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormPartSAPFailedQtyCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: FormPartSAPFailedQty): UpdateFormPartSAPFailedQtyModel {
        const updateFormPartSAPFailedQtyModel = new UpdateFormPartSAPFailedQtyModel();
        Automapper.map(record, updateFormPartSAPFailedQtyModel);


        return updateFormPartSAPFailedQtyModel;
    }

}
