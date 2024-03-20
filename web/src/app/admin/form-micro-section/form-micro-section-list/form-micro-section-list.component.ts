/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormMicroSectionService } from 'src/app/services/form-micro-section/form-micro-section.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormMicroSection } from 'src/app/model/form-micro-section/form-micro-section';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormMicroSectionModel } from 'src/app/model/form-micro-section/update-form-micro-section-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-micro-section-list',
    templateUrl: './form-micro-section-list.component.html',
    styleUrls: ['./form-micro-section-list.component.css']
})
export class FormMicroSectionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormMicroSectionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormMicroSection()));
        this.entity = AuditLogEntityTypes.FormMicroSection;
        this.editEntityPath = '../EditFormMicroSection';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormMicroSection()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormMicroSectionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormMicroSectionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormMicroSectionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormMicroSectionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormMicroSection;
    }

    getUpdateModel(record: FormMicroSection): UpdateFormMicroSectionModel {
        const updateFormMicroSectionModel = new UpdateFormMicroSectionModel();
        Automapper.map(record, updateFormMicroSectionModel);


        return updateFormMicroSectionModel;
    }

}
