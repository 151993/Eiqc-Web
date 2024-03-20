/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartFunParameterService } from 'src/app/services/part-fun-parameter/part-fun-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartFunParameter } from 'src/app/model/part-fun-parameter/part-fun-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartFunParameterModel } from 'src/app/model/part-fun-parameter/update-part-fun-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-fun-parameter-list',
    templateUrl: './part-fun-parameter-list.component.html',
    styleUrls: ['./part-fun-parameter-list.component.css']
})
export class PartFunParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartFunParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartFunParameter()));
        this.entity = AuditLogEntityTypes.PartFunParameter;
        this.editEntityPath = '../EditPartFunParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartFunParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartFunParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartFunParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartFunParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartFunParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartFunParameter;
    }

    getUpdateModel(record: PartFunParameter): UpdatePartFunParameterModel {
        const updatePartFunParameterModel = new UpdatePartFunParameterModel();
        Automapper.map(record, updatePartFunParameterModel);



        return updatePartFunParameterModel;
    }

}
