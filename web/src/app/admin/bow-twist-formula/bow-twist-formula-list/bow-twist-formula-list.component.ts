import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { BowTwistFormulaService } from 'src/app/services/bow-twist-formula/bow-twist-formula.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { BowTwistFormula } from 'src/app/model/bow-twist-formula/bow-twist-formula';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateBowTwistFormulaModel } from 'src/app/model/bow-twist-formula/update-bow-twist-formula-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';

@Component({
    selector: 'app-bow-twist-formula-list',
    templateUrl: './bow-twist-formula-list.component.html',
    styleUrls: ['./bow-twist-formula-list.component.css']
})
export class BowTwistFormulaListComponent extends BaseListComponent implements OnInit {
    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: BowTwistFormulaService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new BowTwistFormula()));
        this.entity = AuditLogEntityTypes.BowTwistFormula;
        this.editEntityPath = '../EditBowTwistFormula';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new BowTwistFormula()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminBowTwistFormulaCanAccess;
        this.canCreatPermissionType = PermissionType.AdminBowTwistFormulaCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminBowTwistFormulaCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminBowTwistFormulaCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        this.fileName = AuditLogEntityTypes.BowTwistFormula;
    }

    getUpdateModel(record: BowTwistFormula): UpdateBowTwistFormulaModel {

        const updateBowTwistFormulaModel = new UpdateBowTwistFormulaModel();

        Automapper.map(record, updateBowTwistFormulaModel);

        return updateBowTwistFormulaModel;
    }

}
