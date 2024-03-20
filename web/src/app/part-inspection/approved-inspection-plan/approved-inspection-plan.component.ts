import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, Constants, SearchOperator } from 'src/app/shared/constant/global';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/update-sap-part-inspection-plan-model';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { SapPartInspectionPlanViewComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-view/sap-part-inspection-plan-view.component';
import { MyTasksService } from 'src/app/services/my-tasks/my-tasks.service';
import { MyTasks } from 'src/app/model/my-tasks/my-tasks';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approved-inspection-plan',
  templateUrl: './approved-inspection-plan.component.html',
  styleUrls: ['./approved-inspection-plan.component.css']
})
export class ApprovedInspectionPlanComponent extends BaseListComponent implements OnInit {
  activeTab: string;
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: MyTasksService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private _sapPartInspectionPlanService: SAPPartInspectionPlanService

  ) {
    super(authService, auditLogService, modalService, translateService, notificationService,
      _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new MyTasks()));
    this.entity = AuditLogEntityTypes.SAPPartInspectionPlan;
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new MyTasks()).displayColumns();
    this.displayColumns.forEach((element, index) => {
      if (element.field.toLowerCase() === 'AssignTo'.toLowerCase()) {
        this.displayColumns.splice(index, 1);
      }
    });
    this.canAccessPermissionType = PermissionType.AdminApprovedPartInspectionPlanCanAccess;
    this.checkPermissions();
  }

  ngOnInit() {
    this.getIPApprovedList();
  }

  getIPApprovedList() {
    const currentUser = this.authService.retrieveUser();
    // this.pageSortFilterInfo.filterInfo = [];
    this.dataSource = [];
    // const userId = currentUser.userTypeId === UserType.Supplier ? currentUser.supplierId : currentUser.id;
    this._apiService.getApprovedRejectedDataBySite(currentUser.site.id, this.pageSortFilterInfo)
      .subscribe(data => {
        this.totalRecords = data.count;
        this.dataSource = data.value;
      });


  }

  onExportEvent(event) {

    const pageSortFilterInfoClone = Object.create(this.pageSortFilterInfo);
    pageSortFilterInfoClone.paginationInfo.pageSize = 0;
    const currentUser = this.authService.retrieveUser();
    // const userId = currentUser.userTypeId === UserType.Supplier ? currentUser.supplierId : currentUser.id;
    this._apiService.getApprovedRejectedDataBySite(currentUser.site.id, this.pageSortFilterInfo).subscribe(data => {
      this.csvExportService.ExportCSV(
        event.dataColumn,
        data.value,
        event.fileName
      );
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
        modalRef.componentInstance.isApprovedRejectVisible = true;
        modalRef.componentInstance.isApprovedInspectionPlan = false;
        modalRef.result.then(
          (response) => { },
          () => {
            // this.getPendingForApprovalList();
            // this.getIPApprovedRejectedList();
          }
        );
      }
    });
  }

  onPageSortEvent(event) {
    this.updateSort(event.sortInfo, this.isAuditLog);
    this.updatePage(event, this.isAuditLog);
    this.getIPApprovedList();
  }

  onFilterEvent(event) {
    this.dataSource = [];
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.entity = new MyTasks();
    if (event && event.valueToFilter !== Constants.Empty) {
      event.mapField = event.fieldName === 'partNo' ? 'partNo' : event.fieldName;
      this.getFilterByColumnName(event.valueToFilter, event.mapField,
        SearchOperator.Contains, event.columnType, this.pageSortFilterInfo, event.filterCondition);
      this.getAllData();
    } else {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      this.getAllData();
    }
  }

  getAllData() {
    const currentUser = this.authService.retrieveUser();
    this.pageSortFilterInfo.paginationInfo.pageSize = environment.limit.maxResult;
    this.pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this._sapPartInspectionPlanService.expandPartWorkCell(),
            this._sapPartInspectionPlanService.expandCommodity(),
            this._sapPartInspectionPlanService.expandSupplier(),
            this._sapPartInspectionPlanService.expandSupplierContact(),
            this._sapPartInspectionPlanService.expandSubmittedByUser(),
            this._sapPartInspectionPlanService.expandState(),
            this._sapPartInspectionPlanService.expandCreatedByUser()
          ]
      };
    this.dataSource = [];
    // const userId = currentUser.userTypeId === UserType.Supplier ? currentUser.supplierId : currentUser.id;
    this._apiService.getApprovedRejectedDataBySite(currentUser.site.id, this.pageSortFilterInfo)
      .subscribe(data => {
        this.totalRecords = data.count;
        this.dataSource = data.value.splice(
          0,
          environment.limit.maxResult
        );
      });
  }

  handleRedefineEvent(record: any): void {
    this._router.navigate([`/PartInspection/EditSAPPartInspectionPlan/${record.id}`, { isRedefine: true }]);
  }
}
