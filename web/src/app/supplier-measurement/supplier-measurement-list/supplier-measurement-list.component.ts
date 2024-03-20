/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, purchaseOrderState, PurchaseOrderState } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SupplierMeasurementSubmissionService } from 'src/app/services/supplier-measurement-submission/supplier-measurement-submission.service';
import { SupplierMeasurementSubmission } from 'src/app/model/supplier-measurement-submission/supplier-measurement-submission';
import { UpdateSupplierMeasurementSubmissionModel } from 'src/app/model/supplier-measurement-submission/update-supplier-measurement-submission-model';
import { SupplierMeasurementViewComponent } from '../supplier-measurement-view/supplier-measurement-view.component';

@Component({
    selector: 'app-supplier-measurement-list',
    templateUrl: './supplier-measurement-list.component.html',
    styleUrls: ['./supplier-measurement-list.component.css']
})
export class SupplierMeasurementListComponent extends BaseListComponent implements OnInit {
    purchaseOrderState: any;

   constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SupplierMeasurementSubmissionService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierMeasurementSubmission()));
        this.entity = AuditLogEntityTypes.SupplierMeasurement;
        this.editEntityPath = '../EditSupplierMeasurementSubmission';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SupplierMeasurementSubmission()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSupplierMeasurementCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSupplierMeasurementCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSupplierMeasurementCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSupplierMeasurementCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        super.getData();
        this.purchaseOrderState = purchaseOrderState;
    }

    getUpdateModel(record: SupplierMeasurementSubmission): UpdateSupplierMeasurementSubmissionModel {
        const updateSupplierMeasurementModel = new UpdateSupplierMeasurementSubmissionModel();
        updateSupplierMeasurementModel.smspoStateTypeId = record.smspoStateTypeId === this.purchaseOrderState.get(PurchaseOrderState.Complete)
            ? PurchaseOrderState.Complete : PurchaseOrderState.Pending;
        Automapper.map(record, updateSupplierMeasurementModel);
        return updateSupplierMeasurementModel;
    }

    detailSelected(record: any): void {

        const modalRef = this.modalService.open(SupplierMeasurementViewComponent, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'table-modal',
            size: 'lg'
        });
        modalRef.componentInstance.details = record;
        modalRef.componentInstance.isApprovedRejectVisible = false;
    }

}
