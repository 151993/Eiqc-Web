/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormPackagingService } from 'src/app/services/form-packaging/form-packaging.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormPackaging } from 'src/app/model/form-packaging/form-packaging';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormPackagingModel } from 'src/app/model/form-packaging/update-form-packaging-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-packaging-list',
    templateUrl: './form-packaging-list.component.html',
    styleUrls: ['./form-packaging-list.component.css']
})
export class FormPackagingListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormPackagingService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormPackaging()));
        this.entity = AuditLogEntityTypes.FormPackaging;
        this.editEntityPath = '../EditFormPackaging';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormPackaging()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormPackagingCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormPackagingCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormPackagingCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormPackagingCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormPackaging;
    }

    getUpdateModel(record: FormPackaging): UpdateFormPackagingModel {
        const updateFormPackagingModel = new UpdateFormPackagingModel();
        Automapper.map(record, updateFormPackagingModel);


        return updateFormPackagingModel;
    }

}
