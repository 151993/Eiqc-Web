/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormLPositionActualService } from 'src/app/services/form-l-position-actual/form-l-position-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormLPositionActual } from 'src/app/model/form-l-position-actual/form-l-position-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormLPositionActualModel } from 'src/app/model/form-l-position-actual/update-form-l-position-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-l-position-actual-list',
    templateUrl: './form-l-position-actual-list.component.html',
    styleUrls: ['./form-l-position-actual-list.component.css']
})
export class FormLPositionActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormLPositionActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormLPositionActual()));
        this.entity = AuditLogEntityTypes.FormLPositionActual;
        this.editEntityPath = '../EditFormLPositionActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormLPositionActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormLPositionActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormLPositionActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormLPositionActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormLPositionActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormLPositionActual;
    }

    getUpdateModel(record: FormLPositionActual): UpdateFormLPositionActualModel {
        const updateFormLPositionActualModel = new UpdateFormLPositionActualModel();
        Automapper.map(record, updateFormLPositionActualModel);


        return updateFormLPositionActualModel;
    }

}
