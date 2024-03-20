/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PartMicrosectionService } from 'src/app/services/part-microsection/part-microsection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PartMicrosection } from 'src/app/model/part-microsection/part-microsection';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdatePartMicrosectionModel } from 'src/app/model/part-microsection/update-part-microsection-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-part-microsection-list',
    templateUrl: './part-microsection-list.component.html',
    styleUrls: ['./part-microsection-list.component.css']
})
export class PartMicrosectionListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: PartMicrosectionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PartMicrosection()));
        this.entity = AuditLogEntityTypes.PartMicrosection;
        this.editEntityPath = '../EditPartMicrosection';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new PartMicrosection()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminPartMicrosectionCanAccess;
        this.canCreatPermissionType = PermissionType.AdminPartMicrosectionCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminPartMicrosectionCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminPartMicrosectionCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.PartMicrosection;
    }

    getUpdateModel(record: PartMicrosection): UpdatePartMicrosectionModel {
        const updatePartMicrosectionModel = new UpdatePartMicrosectionModel();
        Automapper.map(record, updatePartMicrosectionModel);


        return updatePartMicrosectionModel;
    }

}
