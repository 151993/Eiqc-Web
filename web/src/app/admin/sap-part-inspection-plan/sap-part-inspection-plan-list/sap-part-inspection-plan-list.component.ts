/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, PartPlanStateType, SearchOperator } from 'src/app/shared/constant/global';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/update-sap-part-inspection-plan-model';
import { ExpandSelectCountInfo, FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SapPartInspectionPlanViewComponent } from '../sap-part-inspection-plan-view/sap-part-inspection-plan-view.component';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';

@Component({
    selector: 'app-sap-part-inspection-plan-list',
    templateUrl: './sap-part-inspection-plan-list.component.html',
    styleUrls: ['./sap-part-inspection-plan-list.component.css']
})
export class SAPPartInspectionPlanListComponent extends BaseListComponent implements OnInit {

    constructor(
        private _router: Router, // tslint:disable-line
        private _activatedRoute: ActivatedRoute, // tslint:disable-line
        private _apiService: SAPPartInspectionPlanService, // tslint:disable-line
        private _csvExportService: CSVExportService, // tslint:disable-line
        auditLogService: AuditLogService,
        authService: AuthService,
        notificationService: NotificationService,
        public translateService: TranslateService,
        modalService: NgbModal
    ) {
        super(authService, auditLogService, modalService, translateService, notificationService,
            _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SAPPartInspectionPlan()));
        this.entity = AuditLogEntityTypes.SAPPartInspectionPlan;
        this.editEntityPath = '../EditSAPPartInspectionPlan';
        this.getUpdateModelFunction = this.getUpdateModel;
        this.displayColumns = (new SAPPartInspectionPlan()).displayColumns();

        this.canAccessPermissionType = PermissionType.AdminSAPPartInspectionPlanCanAccess;
        this.canCreatPermissionType = PermissionType.AdminSAPPartInspectionPlanCanCreate;
        this.canUpdatePermissionType = PermissionType.AdminSAPPartInspectionPlanCanUpdate;
        this.canDeletePermissionType = PermissionType.AdminSAPPartInspectionPlanCanDelete;
        this.checkPermissions();
    }

    ngOnInit() {
        // super.getData();
        this.getIPList();
    }

    onPageSortEvent(event) {
      this.updateSort(event.sortInfo, this.isAuditLog);
      this.updatePage(event, this.isAuditLog);
      this.getIPList();
    }

    onFilterEvent(event) {
      this.updateFilter(event, this.isAuditLog);
      this.getIPList();
    }

    getIPList() {
        if (!this.pageSortFilterInfo.filterInfo || this.pageSortFilterInfo.filterInfo.length === 0) {
          this.pageSortFilterInfo.filterInfo = [];
          const filterInfoApprovedIPSqe = new FilterInfo();
          filterInfoApprovedIPSqe.columnName = 'StateTypeId';
          filterInfoApprovedIPSqe.columnType = ColumnType.Number;
          filterInfoApprovedIPSqe.mappingField = 'StateTypeId';
          filterInfoApprovedIPSqe.value = PartPlanStateType.Approved_By_SQE;
          filterInfoApprovedIPSqe.operator = SearchOperator.NotEqualTo;
          this.pageSortFilterInfo.filterInfo.push(filterInfoApprovedIPSqe);
          const filterInfoApprovedDcc = new FilterInfo();
          filterInfoApprovedDcc.columnName = 'StateTypeId';
          filterInfoApprovedDcc.columnType = ColumnType.Number;
          filterInfoApprovedDcc.mappingField = 'StateTypeId';
          filterInfoApprovedDcc.value = PartPlanStateType.Approved_By_DCC;
          filterInfoApprovedDcc.operator = SearchOperator.NotEqualTo;
          filterInfoApprovedDcc.filterCondition = FilterCondition.And;
          this.pageSortFilterInfo.filterInfo.push(filterInfoApprovedDcc);
        }
        this.dataSource = [];
        const tempFilter = [];
        Object.assign(tempFilter, this.pageSortFilterInfo.filterInfo);
        this._apiService.getAllData(this.pageSortFilterInfo)
            .subscribe(data => {
                this.totalRecords = data.count;
                this.dataSource = data.value;
                this.pageSortFilterInfo.filterInfo = tempFilter;
            });
    }

    getUpdateModel(record: SAPPartInspectionPlan): UpdateSAPPartInspectionPlanModel {
        const updateSAPPartInspectionPlanModel = new UpdateSAPPartInspectionPlanModel();
        Automapper.map(record, updateSAPPartInspectionPlanModel);
        updateSAPPartInspectionPlanModel.assignToUserId = updateSAPPartInspectionPlanModel.assignToUserId === 0 ? null : updateSAPPartInspectionPlanModel.assignToUserId;
        updateSAPPartInspectionPlanModel.submittedByUserId = updateSAPPartInspectionPlanModel.submittedByUserId === 0 ? null : updateSAPPartInspectionPlanModel.submittedByUserId;
        updateSAPPartInspectionPlanModel.approveRejectedId = updateSAPPartInspectionPlanModel.approveRejectedId === 0 ? null : updateSAPPartInspectionPlanModel.approveRejectedId;

        return updateSAPPartInspectionPlanModel;
    }
    detailSelected(record: any): void {
        const pageSortFilterInfo = new PageSortFilterInfo();
        pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
            {
                expand: <Record<string, ExpandSelectCountInfo>[]>
                    [
                        this._apiService.expandPartInspectionSpecifications(),
                        this._apiService.expandPartInspectionDrawings(),
                        this._apiService.expandPartInspectionCertificationAttachments(),
                        this._apiService.expandProductLifeCycleStage(),
                        this._apiService.expandAdminCertifications(),
                        this._apiService.expandSAPPartInspectionPlanAdminCertifications(),
                        this._apiService.expandPartWorkCell(),
                        this._apiService.expandCommodity(),
                        this._apiService.expandPartInspectionSamplingPlans(),
                        this._apiService.expandComments(),
                        this._apiService.expandSupplier()

                    ]
            };
        this._apiService.getDataById(record.id, pageSortFilterInfo).subscribe(data => {
            if (data && data.value.length > 0) {
                const sAPPartInspectionPlan = new SAPPartInspectionPlan(data.value[0]);

                const modalRef = this.modalService.open(SapPartInspectionPlanViewComponent, {
                    ariaLabelledBy: 'modal-basic-title',
                    windowClass: 'table-modal',
                    size: 'lg'
                });
                modalRef.componentInstance.detail = sAPPartInspectionPlan;
                modalRef.componentInstance.isSubmitted = false;
            }
        });
    }
}
