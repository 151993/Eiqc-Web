/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { PartInspectionBowTwistParameterService } from 'src/app/services/part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter.service';
import { PartInspectionBowTwistParameter } from 'src/app/model/part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter';
import { UpdatePartInspectionBowTwistParameterModel } from 'src/app/model/part-inspection-bow-twist-parameter/update-part-inspection-bow-twist-parameter-model';

@Component({
    selector: 'app-part-bow-twist-parameter-list',
    templateUrl: './part-bow-twist-parameter-list.component.html',
    styleUrls: ['./part-bow-twist-parameter-list.component.css']
})
export class PartInspectionBowTwistParameterListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartInspectionBowTwistParameterService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartInspectionBowTwistParameter()));
        this.entity = AuditLogEntityTypes.PartBowTwistParameter;
        this.editEntityPath = '../EditPartInspectionBowTwistParameter';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartInspectionBowTwistParameter()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartBowTwistParameterCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartBowTwistParameterCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartBowTwistParameterCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartBowTwistParameterCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartBowTwistParameter;
    }

    getUpdateModel(record: PartInspectionBowTwistParameter): UpdatePartInspectionBowTwistParameterModel {
        const updatePartInspectionBowTwistParameterModel = new UpdatePartInspectionBowTwistParameterModel();
        Automapper.map(record, updatePartInspectionBowTwistParameterModel);


        return updatePartInspectionBowTwistParameterModel;
    }

}
