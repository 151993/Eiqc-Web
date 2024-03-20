/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormVISService } from 'src/app/services/form-vis/form-vis.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormVIS } from 'src/app/model/form-vis/form-vis';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormVISModel } from 'src/app/model/form-vis/update-form-vis-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-vis-list',
    templateUrl: './form-vis-list.component.html',
    styleUrls: ['./form-vis-list.component.css']
})
export class FormVISListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormVISService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormVIS()));
        this.entity = AuditLogEntityTypes.FormVIS;
        this.editEntityPath = '../EditFormVIS';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormVIS()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormVISCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormVISCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormVISCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormVISCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormVIS;
    }

    getUpdateModel(record: FormVIS): UpdateFormVISModel {
        const updateFormVISModel = new UpdateFormVISModel();
        Automapper.map(record, updateFormVISModel);


        return updateFormVISModel;
    }

}
