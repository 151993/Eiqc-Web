/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormPartDateCodeService } from 'src/app/services/form-part-date-code/form-part-date-code.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormPartDateCode } from 'src/app/model/form-part-date-code/form-part-date-code';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormPartDateCodeModel } from 'src/app/model/form-part-date-code/update-form-part-date-code-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-part-date-code-list',
    templateUrl: './form-part-date-code-list.component.html',
    styleUrls: ['./form-part-date-code-list.component.css']
})
export class FormPartDateCodeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormPartDateCodeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormPartDateCode()));
        this.entity = AuditLogEntityTypes.FormPartDateCode;
        this.editEntityPath = '../EditFormPartDateCode';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormPartDateCode()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormPartDateCodeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormPartDateCodeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormPartDateCodeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormPartDateCodeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormPartDateCode;
    }

    getUpdateModel(record: FormPartDateCode): UpdateFormPartDateCodeModel {
        const updateFormPartDateCodeModel = new UpdateFormPartDateCodeModel();
        Automapper.map(record, updateFormPartDateCodeModel);


        return updateFormPartDateCodeModel;
    }

}
