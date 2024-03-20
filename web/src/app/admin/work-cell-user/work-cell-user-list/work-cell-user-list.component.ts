import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { WorkCellUserService } from 'src/app/services/work-cell-user/work-cell-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { WorkCellUser } from 'src/app/model/work-cell-user/work-cell-user';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateWorkCellUserModel } from 'src/app/model/work-cell-user/update-work-cell-user-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';


@Component({
    selector: 'app-work-cell-user-list',
    templateUrl: './work-cell-user-list.component.html',
    styleUrls: ['./work-cell-user-list.component.css']
})
export class WorkCellUserListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: WorkCellUserService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new WorkCellUser()));
        this.entity = AuditLogEntityTypes.WorkCellUser;
        this.editEntityPath = '../EditWorkCellUser';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new WorkCellUser()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminWorkCellUserCanAccess;
        this.canCreatPermissionType = PermissionType.AdminWorkCellUserCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminWorkCellUserCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminWorkCellUserCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: WorkCellUser): UpdateWorkCellUserModel {
        const updateWorkCellUserModel = new UpdateWorkCellUserModel();
        Automapper.map(record, updateWorkCellUserModel);
        return updateWorkCellUserModel;
    }

}
