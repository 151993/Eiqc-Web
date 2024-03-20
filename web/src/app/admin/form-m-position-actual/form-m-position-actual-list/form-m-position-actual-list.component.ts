/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormMPositionActualService } from 'src/app/services/form-m-position-actual/form-m-position-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormMPositionActual } from 'src/app/model/form-m-position-actual/form-m-position-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormMPositionActualModel } from 'src/app/model/form-m-position-actual/update-form-m-position-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-m-position-actual-list',
    templateUrl: './form-m-position-actual-list.component.html',
    styleUrls: ['./form-m-position-actual-list.component.css']
})
export class FormMPositionActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormMPositionActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormMPositionActual()));
        this.entity = AuditLogEntityTypes.FormMPositionActual;
        this.editEntityPath = '../EditFormMPositionActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormMPositionActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormMPositionActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormMPositionActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormMPositionActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormMPositionActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormMPositionActual;
    }

    getUpdateModel(record: FormMPositionActual): UpdateFormMPositionActualModel {
        const updateFormMPositionActualModel = new UpdateFormMPositionActualModel();
        Automapper.map(record, updateFormMPositionActualModel);



        return updateFormMPositionActualModel;
    }

}
