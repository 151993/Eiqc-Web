/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SupplierAttachmentService } from 'src/app/services/supplier-attachment/supplier-attachment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { SupplierAttachment } from 'src/app/model/supplier-attachment/supplier-attachment';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSupplierAttachmentModel } from 'src/app/model/supplier-attachment/update-supplier-attachment-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-supplier-attachment-list',
    templateUrl: './supplier-attachment-list.component.html',
    styleUrls: ['./supplier-attachment-list.component.css']
})
export class SupplierAttachmentListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierAttachmentService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierAttachment()));
        this.entity = AuditLogEntityTypes.SupplierAttachment;
        this.editEntityPath = '../EditSupplierAttachment';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierAttachment()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierAttachmentCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierAttachmentCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierAttachmentCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierAttachmentCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
    }

    getUpdateModel(record: SupplierAttachment): UpdateSupplierAttachmentModel {
        const updateSupplierAttachmentModel = new UpdateSupplierAttachmentModel();
        Automapper.map(record, updateSupplierAttachmentModel);



        return updateSupplierAttachmentModel;
    }

}
