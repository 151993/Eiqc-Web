/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { GoodsReceiveUserService } from 'src/app/services/goods-receive-user/goods-receive-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { GoodsReceiveUser } from 'src/app/model/goods-receive-user/goods-receive-user';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateGoodsReceiveUserModel } from 'src/app/model/goods-receive-user/update-goods-receive-user-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-goods-receive-user-list',
    templateUrl: './goods-receive-user-list.component.html',
    styleUrls: ['./goods-receive-user-list.component.css']
})
export class GoodsReceiveUserListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: GoodsReceiveUserService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new GoodsReceiveUser()));
        this.entity = AuditLogEntityTypes.GoodsReceiveUser;
        this.editEntityPath = '../EditGoodsReceiveUser';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new GoodsReceiveUser()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminGoodsReceiveUserCanAccess;
        this.canCreatPermissionType = PermissionType.AdminGoodsReceiveUserCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminGoodsReceiveUserCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminGoodsReceiveUserCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: GoodsReceiveUser): UpdateGoodsReceiveUserModel {
        const updateGoodsReceiveUserModel = new UpdateGoodsReceiveUserModel();
        Automapper.map(record, updateGoodsReceiveUserModel);


        return updateGoodsReceiveUserModel;
    }

}
