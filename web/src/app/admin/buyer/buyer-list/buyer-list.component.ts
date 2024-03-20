
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { BuyerService } from 'src/app/services/buyer/buyer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Buyer } from 'src/app/model/buyer/buyer';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateBuyerModel } from 'src/app/model/buyer/update-buyer-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { CSVExportService } from 'src/app/services/export/csv-export.service';

@Component({
    selector: 'app-buyer-list',
    templateUrl: './buyer-list.component.html',
    styleUrls: ['./buyer-list.component.css']
})
export class BuyerListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: BuyerService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Buyer()));
        this.entity = AuditLogEntityTypes.Buyer;
        this.editEntityPath = '../EditBuyer';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Buyer()).displayColumns();

        this.canCreatPermissionType = PermissionType.AdminBuyerCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminBuyerCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminBuyerCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: Buyer): UpdateBuyerModel {
        const updateBuyerModel = new UpdateBuyerModel();
        Automapper.map(record, updateBuyerModel);

        return updateBuyerModel;
    }

}
