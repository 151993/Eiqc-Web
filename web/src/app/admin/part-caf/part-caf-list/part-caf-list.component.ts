/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartCAFService } from 'src/app/services/part-caf/part-caf.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartCAF } from 'src/app/model/part-caf/part-caf';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartCAFModel } from 'src/app/model/part-caf/update-part-caf-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-caf-list',
    templateUrl: './part-caf-list.component.html',
    styleUrls: ['./part-caf-list.component.css']
})
export class PartCAFListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartCAFService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartCAF()));
        this.entity = AuditLogEntityTypes.PartCAF;
        this.editEntityPath = '../EditPartCAF';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartCAF()).displayColumns();
        this.canAccessPermissionType = PermissionType.AdminPartCAFCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartCAFCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartCAFCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartCAFCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartCAF;
    }

    getUpdateModel(record: PartCAF): UpdatePartCAFModel {
        const updatePartCAFModel = new UpdatePartCAFModel();
        Automapper.map(record, updatePartCAFModel);


        return updatePartCAFModel;
    }

}
