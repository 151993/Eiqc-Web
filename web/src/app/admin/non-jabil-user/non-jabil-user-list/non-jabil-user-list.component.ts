import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NonJabilUserService } from 'src/app/services/non-jabil-user/non-jabil-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { NonJabilUser } from 'src/app/model/non-jabil-user/non-jabil-user';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateNonJabilUserModel } from 'src/app/model/non-jabil-user/update-non-jabil-user-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-non-jabil-user-list',
    templateUrl: './non-jabil-user-list.component.html',
    styleUrls: ['./non-jabil-user-list.component.css']
})
export class NonJabilUserListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: NonJabilUserService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new NonJabilUser()));
        this.entity = AuditLogEntityTypes.User;
        this.editEntityPath = '../EditNonJabilUser';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new NonJabilUser()).displayColumns();
        this.canAccessPermissionType = PermissionType.AdminNonJabilUserCanAccess;
        this.canCreatPermissionType = PermissionType.AdminNonJabilUserCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminNonJabilUserCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminNonJabilUserCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.NonJabilUser;
    }

    getUpdateModel(record: NonJabilUser): UpdateNonJabilUserModel {
        const updateNonJabilUserModel = new UpdateNonJabilUserModel();
        Automapper.map(record, updateNonJabilUserModel);
        return updateNonJabilUserModel;
    }
}
