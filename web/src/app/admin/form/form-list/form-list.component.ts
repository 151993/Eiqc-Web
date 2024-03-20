/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormService } from 'src/app/services/form/form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Form } from 'src/app/model/form/form';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormModel } from 'src/app/model/form/update-form-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.css']
})
export class FormListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Form()));
        this.entity = AuditLogEntityTypes.Form;
        this.editEntityPath = '../EditForm';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Form()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.Form;
    }

    getUpdateModel(record: Form): UpdateFormModel {
        const updateFormModel = new UpdateFormModel();
        Automapper.map(record, updateFormModel);


        return updateFormModel;
    }

}
