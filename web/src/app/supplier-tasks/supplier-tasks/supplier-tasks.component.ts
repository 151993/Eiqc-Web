import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SapPartInspectionPlanViewComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-view/sap-part-inspection-plan-view.component';
import { AuthService } from 'src/app/auth/auth.service';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { SupplierTasks } from 'src/app/model/supplier-tasks/supplier-tasks';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { SupplierTasksService } from 'src/app/services/supplier-tasks/supplier-tasks.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { PartPlanStateType, SearchOperator } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ExpandSelectCountInfo, FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';

@Component({
  selector: 'app-supplier-tasks',
  templateUrl: './supplier-tasks.component.html',
  styleUrls: ['./supplier-tasks.component.css']
})
export class SupplierTasksComponent extends BaseListComponent implements OnInit {
  isSupplier: boolean;
  currentUser: any;
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: SupplierTasksService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private _sapPartInspectionPlanService: SAPPartInspectionPlanService
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService,
      _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SupplierTasks()));

    this.displayColumns = (new SupplierTasks()).displayColumns();
    this.canAccessPermissionType = PermissionType.AdminSupplierTaskCanAccess;
    this.canCreatPermissionType = PermissionType.AdminSupplierTaskCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminSupplierTaskCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminSupplierTaskCanDelete;


    this.checkPermissions();
  }

  ngOnInit() {
    this.currentUser = this.authService.retrieveUser();
    this.getPendingForApprovalList();
  }

  onPageSortEvent(event) {
    this.updateSort(event.sortInfo, this.isAuditLog);
    this.updatePage(event, this.isAuditLog);
    this.getPendingForApprovalList();
  }

  onFilterEvent(event) {
    this.updateFilter(event, this.isAuditLog);
    this.getPendingForApprovalList();
  }

  setPendingListFilter() {
    const filterInfo = new FilterInfo();
    filterInfo.columnName = 'StateTypeId';
    filterInfo.columnType = ColumnType.Number;
    filterInfo.mappingField = 'StateTypeId';
    filterInfo.value = PartPlanStateType.New_Inspection_Plan_Submission_Required_By_Supplier;
    filterInfo.operator = SearchOperator.IsEqualTo;
    filterInfo.filterCondition = FilterCondition.Or;
    this.pageSortFilterInfo.filterInfo.push(filterInfo);
    const filterInfoForDraft = new FilterInfo();
    filterInfoForDraft.columnName = 'StateTypeId';
    filterInfoForDraft.columnType = ColumnType.Number;
    filterInfoForDraft.mappingField = 'StateTypeId';
    filterInfoForDraft.value = PartPlanStateType.Draft;
    filterInfoForDraft.operator = SearchOperator.IsEqualTo;
    filterInfoForDraft.filterCondition = FilterCondition.Or;
    this.pageSortFilterInfo.filterInfo.push(filterInfoForDraft);
    const filterInfoLoginUserSupplier = new FilterInfo();
    filterInfoLoginUserSupplier.columnName = 'SupplierId';
    filterInfoLoginUserSupplier.columnType = ColumnType.Number;
    filterInfoLoginUserSupplier.mappingField = 'SupplierId';
    filterInfoLoginUserSupplier.value = this.currentUser.supplierId;
    filterInfoLoginUserSupplier.operator = SearchOperator.IsEqualTo;
    filterInfoLoginUserSupplier.filterCondition = FilterCondition.And;
    this.pageSortFilterInfo.filterInfo.push(filterInfoLoginUserSupplier);
  }

  getPendingForApprovalList() {
    this.setPendingListFilter();
    this._apiService.getAllData(this.pageSortFilterInfo)
      .subscribe(data => {
        const pendingSupplierList = data.value.map(x => ({
          ...x,
          enableRowEdit: true
        }));
        this.totalRecords = data.count;
        this.dataSource = pendingSupplierList;
      });
  }

  detailSelected(record: any): void {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this._sapPartInspectionPlanService.expandPartInspectionSpecifications(),
            this._sapPartInspectionPlanService.expandPartInspectionDrawings(),
            this._sapPartInspectionPlanService.expandPartInspectionCertificationAttachments(),
            this._sapPartInspectionPlanService.expandProductLifeCycleStage(),
            this._sapPartInspectionPlanService.expandAdminCertifications(),
            this._sapPartInspectionPlanService.expandSAPPartInspectionPlanAdminCertifications(),
            this._sapPartInspectionPlanService.expandPartWorkCell(),
            this._sapPartInspectionPlanService.expandCommodity(),
            this._sapPartInspectionPlanService.expandPartInspectionSamplingPlans(),
            this._sapPartInspectionPlanService.expandSupplier(),
            this._sapPartInspectionPlanService.expandSupplierContact(),
            this._sapPartInspectionPlanService.expandComments()
          ]
      };
    this._sapPartInspectionPlanService.getDataById(record.id, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        const modalRef = this.modalService.open(SapPartInspectionPlanViewComponent, {
          ariaLabelledBy: 'modal-basic-title',
          windowClass: 'table-modal',
          size: 'lg'
        });
        const sapPartInspectionPlan = new SAPPartInspectionPlan(data.value[0]);
        modalRef.componentInstance.detail = sapPartInspectionPlan;
        modalRef.result.then(
          (response) => { },
          () => {
            this.getPendingForApprovalList();
          }
        );
      }

    });
  }

  onFileExportEvent(event) {
    this.setPendingListFilter();
    const pageSortFilterInfoClone = Object.create(this.pageSortFilterInfo);
    pageSortFilterInfoClone.paginationInfo.pageSize = 0;

    this._apiService.getAllData(this.pageSortFilterInfo)
    .subscribe(data => {
      this.csvExportService.ExportCSV(
        event.dataColumn,
        data.value,
        event.fileName
      );
    });
  }

  editRecord(row) {
    if (row && row !== null) {
      this._router.navigate(['/PartInspection/EditSAPPartInspectionPlan/', row.id]);
    }
  }

}
