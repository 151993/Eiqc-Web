/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormBowTwistParameterService } from 'src/app/services/form-bow-twist-parameter/form-bow-twist-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormBowTwistParameter } from 'src/app/model/form-bow-twist-parameter/form-bow-twist-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormBowTwistParameterModel } from 'src/app/model/form-bow-twist-parameter/update-form-bow-twist-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-bow-twist-parameter-list',
    templateUrl: './form-bow-twist-parameter-list.component.html',
    styleUrls: ['./form-bow-twist-parameter-list.component.css']
})
export class FormBowTwistParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormBowTwistParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormBowTwistParameter()));
        this.entity = AuditLogEntityTypes.FormBowTwistParameter;
        this.editEntityPath = '../EditFormBowTwistParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormBowTwistParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormBowTwistParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormBowTwistParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormBowTwistParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormBowTwistParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormBowTwistParameter;
    }

    getUpdateModel(record: FormBowTwistParameter): UpdateFormBowTwistParameterModel {
        const updateFormBowTwistParameterModel = new UpdateFormBowTwistParameterModel();
        Automapper.map(record, updateFormBowTwistParameterModel);


        return updateFormBowTwistParameterModel;
    }

}
