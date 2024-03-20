/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { RosettaService } from 'src/app/services/rosetta/rosetta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Rosetta } from 'src/app/model/rosetta/rosetta';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateRosettaModel } from 'src/app/model/rosetta/update-rosetta-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-rosetta-list',
    templateUrl: './rosetta-list.component.html',
    styleUrls: ['./rosetta-list.component.css']
})
export class RosettaListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: RosettaService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Rosetta()));
        this.entity = AuditLogEntityTypes.Rosetta;
        this.editEntityPath = '../EditRosetta';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Rosetta()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminRosettaCanAccess;
        this.canCreatPermissionType = PermissionType.AdminRosettaCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminRosettaCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminRosettaCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: Rosetta): UpdateRosettaModel {
        const updateRosettaModel = new UpdateRosettaModel();
        Automapper.map(record, updateRosettaModel);


        return updateRosettaModel;
    }

}
