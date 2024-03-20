/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormLPositionService } from 'src/app/services/form-l-position/form-l-position.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormLPosition } from 'src/app/model/form-l-position/form-l-position';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormLPositionModel } from 'src/app/model/form-l-position/update-form-l-position-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-l-position-list',
    templateUrl: './form-l-position-list.component.html',
    styleUrls: ['./form-l-position-list.component.css']
})
export class FormLPositionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormLPositionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormLPosition()));
        this.entity = AuditLogEntityTypes.FormLPosition;
        this.editEntityPath = '../EditFormLPosition';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormLPosition()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormLPositionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormLPositionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormLPositionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormLPositionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormLPosition;
    }

    getUpdateModel(record: FormLPosition): UpdateFormLPositionModel {
        const updateFormLPositionModel = new UpdateFormLPositionModel();
        Automapper.map(record, updateFormLPositionModel);


        return updateFormLPositionModel;
    }

}
