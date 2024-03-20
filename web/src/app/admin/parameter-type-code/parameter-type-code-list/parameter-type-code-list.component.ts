import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ParameterTypeCodeService } from 'src/app/services/parameter-type-code/parameter-type-code.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { ParameterTypeCode } from 'src/app/model/parameter-type-code/parameter-type-code';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateParameterTypeCodeModel } from 'src/app/model/parameter-type-code/update-parameter-type-code-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-parameter-type-code-list',
    templateUrl: './parameter-type-code-list.component.html',
    styleUrls: ['./parameter-type-code-list.component.css']
})
export class ParameterTypeCodeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: ParameterTypeCodeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new ParameterTypeCode()));
        this.entity = AuditLogEntityTypes.ParameterTypeCode;
        this.editEntityPath = '../EditParameterTypeCode';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new ParameterTypeCode()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminParameterTypeCodeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminParameterTypeCodeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminParameterTypeCodeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminParameterTypeCodeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: ParameterTypeCode): UpdateParameterTypeCodeModel {
        const updateParameterTypeCodeModel = new UpdateParameterTypeCodeModel();
        Automapper.map(record, updateParameterTypeCodeModel);
        return updateParameterTypeCodeModel;
    }

}
