/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormBowTwistActualService } from 'src/app/services/form-bow-twist-actual/form-bow-twist-actual.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormBowTwistActual } from 'src/app/model/form-bow-twist-actual/form-bow-twist-actual';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormBowTwistActualModel } from 'src/app/model/form-bow-twist-actual/update-form-bow-twist-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-bow-twist-actual-list',
    templateUrl: './form-bow-twist-actual-list.component.html',
    styleUrls: ['./form-bow-twist-actual-list.component.css']
})
export class FormBowTwistActualListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormBowTwistActualService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormBowTwistActual()));
        this.entity = AuditLogEntityTypes.FormBowTwistActual;
        this.editEntityPath = '../EditFormBowTwistActual';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormBowTwistActual()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormBowTwistActualCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormBowTwistActualCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormBowTwistActualCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormBowTwistActualCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormBowTwistActual;
    }

    getUpdateModel(record: FormBowTwistActual): UpdateFormBowTwistActualModel {
        const updateFormBowTwistActualModel = new UpdateFormBowTwistActualModel();
        Automapper.map(record, updateFormBowTwistActualModel);


        return updateFormBowTwistActualModel;
    }

}
