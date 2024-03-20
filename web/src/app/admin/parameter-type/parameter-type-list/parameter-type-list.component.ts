/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ParameterTypeService } from 'src/app/services/parameter-type/parameter-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { ParameterType } from 'src/app/model/parameter-type/parameter-type';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateParameterTypeModel } from 'src/app/model/parameter-type/update-parameter-type-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-parameter-type-list',
    templateUrl: './parameter-type-list.component.html',
    styleUrls: ['./parameter-type-list.component.css']
})
export class ParameterTypeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: ParameterTypeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new ParameterType()));
        this.entity = AuditLogEntityTypes.ParameterType;
        this.editEntityPath = '../EditParameterType';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new ParameterType()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminParameterTypeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminParameterTypeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminParameterTypeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminParameterTypeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: ParameterType): UpdateParameterTypeModel {
        const updateParameterTypeModel = new UpdateParameterTypeModel();
        Automapper.map(record, updateParameterTypeModel);


        return updateParameterTypeModel;
    }

}
