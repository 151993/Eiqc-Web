/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartTestReportParameterService } from 'src/app/services/part-test-report-parameter/part-test-report-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartTestReportParameter } from 'src/app/model/part-test-report-parameter/part-test-report-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartTestReportParameterModel } from 'src/app/model/part-test-report-parameter/update-part-test-report-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-test-report-parameter-list',
    templateUrl: './part-test-report-parameter-list.component.html',
    styleUrls: ['./part-test-report-parameter-list.component.css']
})
export class PartTestReportParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartTestReportParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartTestReportParameter()));
        this.entity = AuditLogEntityTypes.PartTestReportParameter;
        this.editEntityPath = '../EditPartTestReportParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartTestReportParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartTestReportParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartTestReportParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartTestReportParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartTestReportParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartTestReportParameter;
    }

    getUpdateModel(record: PartTestReportParameter): UpdatePartTestReportParameterModel {
        const updatePartTestReportParameterModel = new UpdatePartTestReportParameterModel();
        Automapper.map(record, updatePartTestReportParameterModel);


        return updatePartTestReportParameterModel;
    }

}
