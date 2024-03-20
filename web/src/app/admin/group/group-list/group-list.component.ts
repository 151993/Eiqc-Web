/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { GroupService } from 'src/app/services/group/group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Group } from 'src/app/model/group/group';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateGroupModel } from 'src/app/model/group/update-group-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: GroupService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Group()));
        this.entity = AuditLogEntityTypes.Group;
        this.editEntityPath = '../EditGroup';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Group()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminGroupCanAccess;
        this.canCreatPermissionType = PermissionType.AdminGroupCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminGroupCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminGroupCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: Group): UpdateGroupModel {
        const updateGroupModel = new UpdateGroupModel();
        Automapper.map(record, updateGroupModel);
        return updateGroupModel;
    }

}
