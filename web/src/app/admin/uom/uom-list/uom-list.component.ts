/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { UOMService } from 'src/app/services/uom/uom.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { UOM } from 'src/app/model/uom/uom';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateUOMModel } from 'src/app/model/uom/update-uom-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-uom-list',
    templateUrl: './uom-list.component.html',
    styleUrls: ['./uom-list.component.css']
})
export class UOMListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: UOMService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new UOM()));
        this.entity = AuditLogEntityTypes.UOM;
        this.editEntityPath = '../EditUOM';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new UOM()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminUOMCanAccess;
        this.canCreatPermissionType = PermissionType.AdminUOMCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminUOMCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminUOMCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.UOM;
    }

    getUpdateModel(record: UOM): UpdateUOMModel {
        const updateUOMModel = new UpdateUOMModel();
        Automapper.map(record, updateUOMModel);


        return updateUOMModel;
    }

}
