


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { User } from 'src/app/model/user/user';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateUserModel } from 'src/app/model/user/update-user-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: UserService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new User()));
        this.entity = AuditLogEntityTypes.User;
        this.editEntityPath = '../EditUser';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new User()).displayColumns();

        this.canCreatPermissionType = PermissionType.AdminUserCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminUserCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminUserCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: User): UpdateUserModel {
        const updateUserModel = new UpdateUserModel();
        Automapper.map(record, updateUserModel);

        return updateUserModel;
    }

}
