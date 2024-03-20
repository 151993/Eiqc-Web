/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { TestReportService } from 'src/app/services/test-report/test-report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { TestReport } from 'src/app/model/test-report/test-report';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateTestReportModel } from 'src/app/model/test-report/update-test-report-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-test-report-list',
    templateUrl: './test-report-list.component.html',
    styleUrls: ['./test-report-list.component.css']
})
export class TestReportListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: TestReportService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new TestReport()));
        this.entity = AuditLogEntityTypes.TestReport;
        this.editEntityPath = '../EditTestReport';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new TestReport()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminTestReportCanAccess;
        this.canCreatPermissionType = PermissionType.AdminTestReportCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminTestReportCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminTestReportCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.getData();
    }

    getUpdateModel(record: TestReport): UpdateTestReportModel {
        const updateTestReportModel = new UpdateTestReportModel();
        Automapper.map(record, updateTestReportModel);


        return updateTestReportModel;
    }

}
