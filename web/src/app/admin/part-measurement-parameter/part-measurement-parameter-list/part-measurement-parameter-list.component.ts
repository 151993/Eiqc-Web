/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartMeasurementParameterService } from 'src/app/services/part-measurement-parameter/part-measurement-parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartMeasurementParameter } from 'src/app/model/part-measurement-parameter/part-measurement-parameter';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartMeasurementParameterModel } from 'src/app/model/part-measurement-parameter/update-part-measurement-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-measurement-parameter-list',
    templateUrl: './part-measurement-parameter-list.component.html',
    styleUrls: ['./part-measurement-parameter-list.component.css']
})
export class PartMeasurementParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartMeasurementParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartMeasurementParameter()));
        this.entity = AuditLogEntityTypes.PartMeasurementParameter;
        this.editEntityPath = '../EditPartMeasurementParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartMeasurementParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartMeasurementParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartMeasurementParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartMeasurementParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartMeasurementParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartMeasurementParameter;
    }

    getUpdateModel(record: PartMeasurementParameter): UpdatePartMeasurementParameterModel {
        const updatePartMeasurementParameterModel = new UpdatePartMeasurementParameterModel();
        Automapper.map(record, updatePartMeasurementParameterModel);


        return updatePartMeasurementParameterModel;
    }

}
