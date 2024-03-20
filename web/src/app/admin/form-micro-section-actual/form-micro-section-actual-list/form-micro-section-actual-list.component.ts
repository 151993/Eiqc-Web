/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormMicroSectionActualService } from 'src/app/services/form-micro-section-actual/form-micro-section-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormMicroSectionActual } from 'src/app/model/form-micro-section-actual/form-micro-section-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormMicroSectionActualModel } from 'src/app/model/form-micro-section-actual/update-form-micro-section-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-micro-section-actual-list',
    templateUrl: './form-micro-section-actual-list.component.html',
    styleUrls: ['./form-micro-section-actual-list.component.css']
})
export class FormMicroSectionActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormMicroSectionActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormMicroSectionActual()));
        this.entity = AuditLogEntityTypes.FormMicroSectionActual;
        this.editEntityPath = '../EditFormMicroSectionActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormMicroSectionActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormMicroSectionActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormMicroSectionActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormMicroSectionActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormMicroSectionActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormMicroSectionActual;
    }

    getUpdateModel(record: FormMicroSectionActual): UpdateFormMicroSectionActualModel {
        const updateFormMicroSectionActualModel = new UpdateFormMicroSectionActualModel();
        Automapper.map(record, updateFormMicroSectionActualModel);



        return updateFormMicroSectionActualModel;
    }

}
