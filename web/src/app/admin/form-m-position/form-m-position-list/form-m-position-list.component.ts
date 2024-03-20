/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormMPositionService } from 'src/app/services/form-m-position/form-m-position.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormMPosition } from 'src/app/model/form-m-position/form-m-position';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormMPositionModel } from 'src/app/model/form-m-position/update-form-m-position-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-m-position-list',
    templateUrl: './form-m-position-list.component.html',
    styleUrls: ['./form-m-position-list.component.css']
})
export class FormMPositionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormMPositionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormMPosition()));
        this.entity = AuditLogEntityTypes.FormMPosition;
        this.editEntityPath = '../EditFormMPosition';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormMPosition()).displayColumns();
        this.canAccessPermissionType = PermissionType.AdminFormMPositionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormMPositionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormMPositionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormMPositionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormMPosition;
    }

    getUpdateModel(record: FormMPosition): UpdateFormMPositionModel {
        const updateFormMPositionModel = new UpdateFormMPositionModel();
        Automapper.map(record, updateFormMPositionModel);
        return updateFormMPositionModel;
    }

}
