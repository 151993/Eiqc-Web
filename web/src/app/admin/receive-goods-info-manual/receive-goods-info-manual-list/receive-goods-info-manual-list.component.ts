/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ReceiveGoodsInfoManualService } from 'src/app/services/receive-goods-info-manual/receive-goods-info-manual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { ReceiveGoodsInfoManual } from 'src/app/model/receive-goods-info-manual/receive-goods-info-manual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateReceiveGoodsInfoManualModel } from 'src/app/model/receive-goods-info-manual/update-receive-goods-info-manual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-receive-goods-info-manual-list',
    templateUrl: './receive-goods-info-manual-list.component.html',
    styleUrls: ['./receive-goods-info-manual-list.component.css']
})
export class ReceiveGoodsInfoManualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: ReceiveGoodsInfoManualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new ReceiveGoodsInfoManual()));
        this.entity = AuditLogEntityTypes.ReceiveGoodsInfoManual;
        this.editEntityPath = '../EditReceiveGoodsInfoManual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new ReceiveGoodsInfoManual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminReceiveGoodsInfoManualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminReceiveGoodsInfoManualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminReceiveGoodsInfoManualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminReceiveGoodsInfoManualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.ReceiveGoodsInfoManual;
    }

    getUpdateModel(record: ReceiveGoodsInfoManual): UpdateReceiveGoodsInfoManualModel {
        const updateReceiveGoodsInfoManualModel = new UpdateReceiveGoodsInfoManualModel();
        Automapper.map(record, updateReceiveGoodsInfoManualModel);


        return updateReceiveGoodsInfoManualModel;
    }

}
