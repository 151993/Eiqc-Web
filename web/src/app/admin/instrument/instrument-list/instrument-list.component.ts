/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { InstrumentService } from 'src/app/services/instrument/instrument.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Instrument } from 'src/app/model/instrument/instrument';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateInstrumentModel } from 'src/app/model/instrument/update-instrument-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-instrument-list',
    templateUrl: './instrument-list.component.html',
    styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: InstrumentService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Instrument()));
        this.entity = AuditLogEntityTypes.Instrument;
        this.editEntityPath = '../EditInstrument';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Instrument()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminInstrumentCanAccess;
        this.canCreatPermissionType = PermissionType.AdminInstrumentCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminInstrumentCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminInstrumentCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: Instrument): UpdateInstrumentModel {
        const updateInstrumentModel = new UpdateInstrumentModel();
        Automapper.map(record, updateInstrumentModel);


        return updateInstrumentModel;
    }

}
