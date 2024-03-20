/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { CertificateTypeService } from 'src/app/services/certificate-type/certificate-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, DefaultCommonConstants, SearchOperator } from 'src/app/shared/constant/global';
import { CertificateType } from 'src/app/model/certificate-type/certificate-type';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateCertificateTypeModel } from 'src/app/model/certificate-type/update-certificate-type-model';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { ColumnType } from 'src/app/model/table/table';

@Component({
    selector: 'app-certificate-type-list',
    templateUrl: './certificate-type-list.component.html',
    styleUrls: ['./certificate-type-list.component.css']
})
export class CertificateTypeListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: CertificateTypeService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new CertificateType()));
        this.entity = AuditLogEntityTypes.CertificateType;
        this.editEntityPath = '../EditCertificateType';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new CertificateType()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminCertificateTypeCanAccess;
        this.canCreatPermissionType = PermissionType.AdminCertificateTypeCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminCertificateTypeCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminCertificateTypeCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
         this.getCertificateList();
    }

    getUpdateModel(record: CertificateType): UpdateCertificateTypeModel {
        const updateCertificateTypeModel = new UpdateCertificateTypeModel();
        Automapper.map(record, updateCertificateTypeModel);


        return updateCertificateTypeModel;
    }

    getCertificateList() {
        this.pageSortFilterInfo.filterInfo = [];
        const filterInfoApprovedIPSqe = new FilterInfo();
        filterInfoApprovedIPSqe.columnName = 'Name';
        filterInfoApprovedIPSqe.columnType = ColumnType.String;
        filterInfoApprovedIPSqe.mappingField = 'Name';
        filterInfoApprovedIPSqe.value = DefaultCommonConstants.Default;
        filterInfoApprovedIPSqe.operator = SearchOperator.NotEqualTo;
        this.pageSortFilterInfo.filterInfo.push(filterInfoApprovedIPSqe);
        this.dataSource = [];
        this._apiService.getAllData(this.pageSortFilterInfo)
            .subscribe(data => {
                this.totalRecords = data.count;
                this.dataSource = data.value;
            });
    }

}
