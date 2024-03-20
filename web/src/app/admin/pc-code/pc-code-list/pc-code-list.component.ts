/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PCCodeService } from 'src/app/services/pc-code/pc-code.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PCCode } from 'src/app/model/pc-code/pc-code';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePCCodeModel } from 'src/app/model/pc-code/update-pc-code-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-pc-code-list',
    templateUrl: './pc-code-list.component.html',
    styleUrls: ['./pc-code-list.component.css']
})
export class PCCodeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PCCodeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PCCode()));
        this.entity = AuditLogEntityTypes.PCCode;
        this.editEntityPath = '../EditPCCode';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PCCode()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPCCodeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPCCodeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPCCodeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPCCodeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: PCCode): UpdatePCCodeModel {
        const updatePCCodeModel = new UpdatePCCodeModel();
        Automapper.map(record, updatePCCodeModel);



        return updatePCCodeModel;
    }

}
