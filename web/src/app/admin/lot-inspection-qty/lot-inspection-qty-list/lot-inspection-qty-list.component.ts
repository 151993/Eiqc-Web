/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { LotInspectionQtyService } from 'src/app/services/lot-inspection-qty/lot-inspection-qty.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { LotInspectionQty } from 'src/app/model/lot-inspection-qty/lot-inspection-qty';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateLotInspectionQtyModel } from 'src/app/model/lot-inspection-qty/update-lot-inspection-qty-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-lot-inspection-qty-list',
    templateUrl: './lot-inspection-qty-list.component.html',
    styleUrls: ['./lot-inspection-qty-list.component.css']
})
export class LotInspectionQtyListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: LotInspectionQtyService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new LotInspectionQty()));
        this.entity = AuditLogEntityTypes.LotInspectionQty;
        this.editEntityPath = '../EditLotInspectionQty';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new LotInspectionQty()).displayColumns();
        this.canAccessPermissionType = PermissionType.AdminLotInspectionQtyCanAccess;
        this.canCreatPermissionType = PermissionType.AdminLotInspectionQtyCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminLotInspectionQtyCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminLotInspectionQtyCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.LotInspectionQty;
    }

    getUpdateModel(record: LotInspectionQty): UpdateLotInspectionQtyModel {
        const updateLotInspectionQtyModel = new UpdateLotInspectionQtyModel();
        Automapper.map(record, updateLotInspectionQtyModel);
        return updateLotInspectionQtyModel;
    }

}
