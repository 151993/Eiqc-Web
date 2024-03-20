/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Customer } from 'src/app/model/customer/customer';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateCustomerModel } from 'src/app/model/customer/update-customer-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: CustomerService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Customer()));
        this.entity = AuditLogEntityTypes.Customer;
        this.editEntityPath = '../EditCustomer';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new Customer()).displayColumns();
        this.canAccessPermissionType = PermissionType.AdminCustomerCanAccess;
        this.canCreatPermissionType = PermissionType.AdminCustomerCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminCustomerCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminCustomerCanDelete;
        this.checkPermissions();
    }
    ngOnInit() {
        this.fileName = AuditLogEntityTypes.Customer;
    }
    getUpdateModel(record: Customer): UpdateCustomerModel {
        const updateCustomerModel = new UpdateCustomerModel();
        Automapper.map(record, updateCustomerModel);
        return updateCustomerModel;
    }
}
