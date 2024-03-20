/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartDimensionService } from 'src/app/services/part-dimension/part-dimension.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartDimension } from 'src/app/model/part-dimension/part-dimension';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartDimensionModel } from 'src/app/model/part-dimension/update-part-dimension-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-dimension-list',
    templateUrl: './part-dimension-list.component.html',
    styleUrls: ['./part-dimension-list.component.css']
})
export class PartDimensionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartDimensionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartDimension()));
        this.entity = AuditLogEntityTypes.PartDimension;
        this.editEntityPath = '../EditPartDimension';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartDimension()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartDimensionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartDimensionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartDimensionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartDimensionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: PartDimension): UpdatePartDimensionModel {
        const updatePartDimensionModel = new UpdatePartDimensionModel();
        Automapper.map(record, updatePartDimensionModel);
        return updatePartDimensionModel;
    }

}
