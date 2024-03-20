/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormFunParaService } from 'src/app/services/form-fun-para/form-fun-para.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormFunPara } from 'src/app/model/form-fun-para/form-fun-para';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormFunParaModel } from 'src/app/model/form-fun-para/update-form-fun-para-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-fun-para-list',
    templateUrl: './form-fun-para-list.component.html',
    styleUrls: ['./form-fun-para-list.component.css']
})
export class FormFunParaListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormFunParaService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormFunPara()));
        this.entity = AuditLogEntityTypes.FormFunPara;
        this.editEntityPath = '../EditFormFunPara';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormFunPara()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormFunParaCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormFunParaCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormFunParaCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormFunParaCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormFunPara;
    }

    getUpdateModel(record: FormFunPara): UpdateFormFunParaModel {
        const updateFormFunParaModel = new UpdateFormFunParaModel();
        Automapper.map(record, updateFormFunParaModel);



        return updateFormFunParaModel;
    }

}
