/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { GRSSAPResultService } from 'src/app/services/grssap-result/grssap-result.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { GRSSAPResult } from 'src/app/model/grssap-result/grssap-result';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateGRSSAPResultModel } from 'src/app/model/grssap-result/update-grssap-result-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-grssap-result-list',
    templateUrl: './grssap-result-list.component.html',
    styleUrls: ['./grssap-result-list.component.css']
})
export class GRSSAPResultListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: GRSSAPResultService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new GRSSAPResult()));
        this.entity = AuditLogEntityTypes.GRSSAPResult;
        this.editEntityPath = '../EditGRSSAPResult';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new GRSSAPResult()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminGRSSAPResultCanAccess;
        this.canCreatPermissionType = PermissionType.AdminGRSSAPResultCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminGRSSAPResultCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminGRSSAPResultCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.GRSSAPResult;
    }

    getUpdateModel(record: GRSSAPResult): UpdateGRSSAPResultModel {
        const updateGRSSAPResultModel = new UpdateGRSSAPResultModel();
        Automapper.map(record, updateGRSSAPResultModel);


        return updateGRSSAPResultModel;
    }

}
