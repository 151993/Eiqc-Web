/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormTestReportService } from 'src/app/services/form-test-report/form-test-report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { FormTestReport } from 'src/app/model/form-test-report/form-test-report';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateFormTestReportModel } from 'src/app/model/form-test-report/update-form-test-report-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-form-test-report-list',
    templateUrl: './form-test-report-list.component.html',
    styleUrls: ['./form-test-report-list.component.css']
})
export class FormTestReportListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: FormTestReportService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new FormTestReport()));
        this.entity = AuditLogEntityTypes.FormTestReport;
        this.editEntityPath = '../EditFormTestReport';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new FormTestReport()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminFormTestReportCanAccess;
        this.canCreatPermissionType = PermissionType.AdminFormTestReportCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminFormTestReportCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminFormTestReportCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.FormTestReport;
    }

    getUpdateModel(record: FormTestReport): UpdateFormTestReportModel {
        const updateFormTestReportModel = new UpdateFormTestReportModel();
        Automapper.map(record, updateFormTestReportModel);


        return updateFormTestReportModel;
    }

}
