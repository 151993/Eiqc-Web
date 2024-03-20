/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { GRSService } from 'src/app/services/grs/grs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { GRS } from 'src/app/model/grs/grs';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateGRSModel } from 'src/app/model/grs/update-grs-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-grs-list',
    templateUrl: './grs-list.component.html',
    styleUrls: ['./grs-list.component.css']
})
export class GRSListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: GRSService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new GRS()));
        this.entity = AuditLogEntityTypes.GRS;
        this.editEntityPath = '../EditGRS';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new GRS()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminGRSCanAccess;
        this.canCreatPermissionType = PermissionType.AdminGRSCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminGRSCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminGRSCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.GRS;
    }

    getUpdateModel(record: GRS): UpdateGRSModel {
        const updateGRSModel = new UpdateGRSModel();
        Automapper.map(record, updateGRSModel);


        return updateGRSModel;
    }

}
