/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { InstrumentTypeService } from 'src/app/services/instrument-type/instrument-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { InstrumentType } from 'src/app/model/instrument-type/instrument-type';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateInstrumentTypeModel } from 'src/app/model/instrument-type/update-instrument-type-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-instrument-type-list',
    templateUrl: './instrument-type-list.component.html',
    styleUrls: ['./instrument-type-list.component.css']
})
export class InstrumentTypeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: InstrumentTypeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new InstrumentType()));
        this.entity = AuditLogEntityTypes.InstrumentType;
        this.editEntityPath = '../EditInstrumentType';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new InstrumentType()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminInstrumentTypeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminInstrumentTypeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminInstrumentTypeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminInstrumentTypeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: InstrumentType): UpdateInstrumentTypeModel {
        const updateInstrumentTypeModel = new UpdateInstrumentTypeModel();
        Automapper.map(record, updateInstrumentTypeModel);


        return updateInstrumentTypeModel;
    }

}
