/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormCountParameterService } from 'src/app/services/form-count-parameter/form-count-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormCountParameter } from 'src/app/model/form-count-parameter/form-count-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormCountParameterModel } from 'src/app/model/form-count-parameter/update-form-count-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-count-parameter-list',
    templateUrl: './form-count-parameter-list.component.html',
    styleUrls: ['./form-count-parameter-list.component.css']
})
export class FormCountParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormCountParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormCountParameter()));
        this.entity = AuditLogEntityTypes.FormCountParameter;
        this.editEntityPath = '../EditFormCountParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormCountParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormCountParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormCountParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormCountParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormCountParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormCountParameter;
    }

    getUpdateModel(record: FormCountParameter): UpdateFormCountParameterModel {
        const updateFormCountParameterModel = new UpdateFormCountParameterModel();
        Automapper.map(record, updateFormCountParameterModel);



        return updateFormCountParameterModel;
    }

}
