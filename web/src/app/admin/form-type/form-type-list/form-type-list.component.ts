/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormTypeService } from 'src/app/services/form-type/form-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormType } from 'src/app/model/form-type/form-type';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormTypeModel } from 'src/app/model/form-type/update-form-type-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-type-list',
    templateUrl: './form-type-list.component.html',
    styleUrls: ['./form-type-list.component.css']
})
export class FormTypeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormTypeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormType()));
        this.entity = AuditLogEntityTypes.FormType;
        this.editEntityPath = '../EditFormType';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormType()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormTypeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormTypeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormTypeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormTypeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormType;
    }

    getUpdateModel(record: FormType): UpdateFormTypeModel {
        const updateFormTypeModel = new UpdateFormTypeModel();
        Automapper.map(record, updateFormTypeModel);


        return updateFormTypeModel;
    }

}
