/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { CommodityCategoryService } from 'src/app/services/commodity-category/commodity-category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { CommodityCategory } from 'src/app/model/commodity-category/commodity-category';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateCommodityCategoryModel } from 'src/app/model/commodity-category/update-commodity-category-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-commodity-category-list',
    templateUrl: './commodity-category-list.component.html',
    styleUrls: ['./commodity-category-list.component.css']
})
export class CommodityCategoryListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: CommodityCategoryService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new CommodityCategory()));
        this.entity = AuditLogEntityTypes.CommodityCategory;
        this.editEntityPath = '../EditCommodityCategory';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new CommodityCategory()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminCommodityCategoryCanAccess;
        this.canCreatPermissionType = PermissionType.AdminCommodityCategoryCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminCommodityCategoryCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminCommodityCategoryCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: CommodityCategory): UpdateCommodityCategoryModel {
        const updateCommodityCategoryModel = new UpdateCommodityCategoryModel();
        Automapper.map(record, updateCommodityCategoryModel);


        return updateCommodityCategoryModel;
    }

}
