/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ReceiveGoodsInfoService } from 'src/app/services/receive-goods-info/receive-goods-info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { ReceiveGoodsInfo } from 'src/app/model/receive-goods-info/receive-goods-info';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateReceiveGoodsInfoModel } from 'src/app/model/receive-goods-info/update-receive-goods-info-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-receive-goods-info-list',
    templateUrl: './receive-goods-info-list.component.html',
    styleUrls: ['./receive-goods-info-list.component.css']
})
export class ReceiveGoodsInfoListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: ReceiveGoodsInfoService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new ReceiveGoodsInfo()));
        this.entity = AuditLogEntityTypes.ReceiveGoodsInfo;
        this.editEntityPath = '../EditReceiveGoodsInfo';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new ReceiveGoodsInfo()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminReceiveGoodsInfoCanAccess;
        this.canCreatPermissionType = PermissionType.AdminReceiveGoodsInfoCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminReceiveGoodsInfoCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminReceiveGoodsInfoCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: ReceiveGoodsInfo): UpdateReceiveGoodsInfoModel {
        const updateReceiveGoodsInfoModel = new UpdateReceiveGoodsInfoModel();
        Automapper.map(record, updateReceiveGoodsInfoModel);


        return updateReceiveGoodsInfoModel;
    }

}
