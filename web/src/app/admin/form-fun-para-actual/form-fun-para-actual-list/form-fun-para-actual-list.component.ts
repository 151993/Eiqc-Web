/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormFunParaActualService } from 'src/app/services/form-fun-para-actual/form-fun-para-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormFunParaActual } from 'src/app/model/form-fun-para-actual/form-fun-para-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormFunParaActualModel } from 'src/app/model/form-fun-para-actual/update-form-fun-para-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-fun-para-actual-list',
    templateUrl: './form-fun-para-actual-list.component.html',
    styleUrls: ['./form-fun-para-actual-list.component.css']
})
export class FormFunParaActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormFunParaActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormFunParaActual()));
        this.entity = AuditLogEntityTypes.FormFunParaActual;
        this.editEntityPath = '../EditFormFunParaActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormFunParaActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormFunParaActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormFunParaActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormFunParaActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormFunParaActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormFunParaActual;
    }

    getUpdateModel(record: FormFunParaActual): UpdateFormFunParaActualModel {
        const updateFormFunParaActualModel = new UpdateFormFunParaActualModel();
        Automapper.map(record, updateFormFunParaActualModel);


        return updateFormFunParaActualModel;
    }

}
