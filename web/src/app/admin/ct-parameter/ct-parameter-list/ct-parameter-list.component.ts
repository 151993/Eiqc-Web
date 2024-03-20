/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { CTParameterService } from 'src/app/services/ct-parameter/ct-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { CTParameter } from 'src/app/model/ct-parameter/ct-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateCTParameterModel } from 'src/app/model/ct-parameter/update-ct-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
@Component({
    selector: 'app-ct-parameter-list',
    templateUrl: './ct-parameter-list.component.html',
    styleUrls: ['./ct-parameter-list.component.css']
})
export class CTParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: CTParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new CTParameter()));
        this.entity = AuditLogEntityTypes.CTParameter;
        this.editEntityPath = '../EditCTParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new CTParameter()).displayColumns();
        this.canAccessPermissionType = PermissionType.AdminCTParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminCTParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminCTParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminCTParameterCanDelete;
        this.checkPermissions();
    }
    ngOnInit() {
        super.getData();
    }
    getUpdateModel(record: CTParameter): UpdateCTParameterModel {
        const updateCTParameterModel = new UpdateCTParameterModel();
        Automapper.map(record, updateCTParameterModel);
        return updateCTParameterModel;
    }
}
