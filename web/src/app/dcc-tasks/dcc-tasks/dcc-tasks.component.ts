/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SearchOperator, PartPlanStateType } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { ExpandSelectCountInfo, FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { MyTasks } from 'src/app/model/my-tasks/my-tasks';
import { MyTasksService } from 'src/app/services/my-tasks/my-tasks.service';
import { SapPartInspectionPlanViewComponent } from 'src/app/admin/sap-part-inspection-plan/sap-part-inspection-plan-view/sap-part-inspection-plan-view.component';
import { ColumnType, FilterCondition, TableColumn } from 'src/app/model/table/table';
import { ConfirmationModalComponent } from '../../shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { AssignReassignSAPPartInspectionPlanToUserModel } from '../../model/sap-part-inspection-plan/assign-reassign-sap-part-inspection-plan-to-user-model';
import { Automapper } from '../../shared/automapper/automapper';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { WorkCellUserService } from '../../services/work-cell-user/work-cell-user.service';

@Component({
  selector: 'app-dcc-tasks',
  templateUrl: './dcc-tasks.component.html',
  styleUrls: ['./dcc-tasks.component.css']
})
export class DCCTasksComponent extends BaseListComponent implements OnInit {

  dynamicTypeCollection: Record<string, any[]> = {};
  dataSourceApproveReject: any;
  public displayColumnsApproveReject: TableColumn[];
  activeTab = 'pendingApproval';
  assignToUserField = 'AssignTo';
  lastPageSortFilterInfo: PageSortFilterInfo = new PageSortFilterInfo(new MyTasks());
  totalRecordsApprovedRejected = 0;

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
    private _workcellUserService: WorkCellUserService,
    private _sapPartInspectionPlanService: SAPPartInspectionPlanService
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService,
      _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new MyTasks()));

    this.displayColumns = (new MyTasks()).displayColumns();
    this.displayColumnsApproveReject = (new MyTasks()).displayColumns();
    this.displayColumnsApproveReject.forEach((element, index) => {
      if (element.field.toLowerCase() === this.assignToUserField.toLowerCase()) {
        this.displayColumnsApproveReject.splice(index, 1);
      }
    });
    this.canAccessPermissionType = PermissionType.AdminDCCTaskCanAccess;
    this.lastPageSortFilterInfo.paginationInfo.currentPage = 1;
    this.lastPageSortFilterInfo.paginationInfo.pageSize = 10;

    this.checkPermissions();
  }

  ngOnInit() {
    this.getUserList();
    this.getPendingForApprovalList();
  }

  onPageSortEvent(event) {
    this.updateSort(event.sortInfo, this.isAuditLog);
    this.updatePage(event, this.isAuditLog);
    this.getPageListByTab();
  }


  onFilterEvent(event) {
    this.updateFilter(event, this.isAuditLog);
    this.getPageListByTab();
  }

  getPageListByTab() {
    if (this.activeTab === 'pendingApproval') {
      this.getPendingForApprovalList();
    } else {
      this.getIPApprovedRejectedList();
    }
  }

  getPendingForApprovalList() {
    const currentUser = this.authService.retrieveUser();
    if (!(this.pageSortFilterInfo.filterInfo) || this.pageSortFilterInfo.filterInfo.length === 0) {
      this.pageSortFilterInfo.filterInfo = [];
      const filterInfo = new FilterInfo();
      filterInfo.columnName = 'StateTypeId';
      filterInfo.columnType = ColumnType.Number;
      filterInfo.mappingField = 'StateTypeId';
      filterInfo.value = PartPlanStateType.Approved_By_SQE;
      filterInfo.operator = SearchOperator.IsEqualTo;
      this.pageSortFilterInfo.filterInfo.push(filterInfo);
    }

    this.dataSource = [];
    this._apiService.getDccTasksData(this.pageSortFilterInfo)
      .subscribe(data => {
        setTimeout(() => {
          this.dataSource = data.value;
          this.totalRecords = data.count;
          for (let i = 0; i < this.dataSource.length; i++) {
            this.dataSource[i]['selectedDynamicId'] = this.dataSource[i]['assignToUserId'];
            if (!(this.dataSource[i]['assignToUserId'] > 0)) {
              this.dataSource[i]['enableRowDetail'] = false;
            }
            if (this.dataSource[i]['assignToUserId'] > 0 && this.dataSource[i]['assignToUserId'] !== currentUser.id) {
              this.dataSource[i]['enableRowDetail'] = false;
              this.dataSource[i]['enableRowAssignToUser'] = false;
            }
          }

        }, 5000);
      });
  }

  getIPApprovedRejectedList() {
    const currentUser = this.authService.retrieveUser();
    if (!(this.pageSortFilterInfo.filterInfo) || this.pageSortFilterInfo.filterInfo.length === 0) {
      this.pageSortFilterInfo.filterInfo = [];
      const filterInfoApproved = new FilterInfo();
      filterInfoApproved.columnName = 'StateTypeId';
      filterInfoApproved.columnType = ColumnType.Number;
      filterInfoApproved.mappingField = 'StateTypeId';
      filterInfoApproved.value = PartPlanStateType.Approved_By_DCC;
      filterInfoApproved.operator = SearchOperator.IsEqualTo;
      filterInfoApproved.filterCondition = FilterCondition.Or;
      this.pageSortFilterInfo.filterInfo.push(filterInfoApproved);

      const filterInfoRejected = new FilterInfo();
      filterInfoRejected.columnName = 'StateTypeId';
      filterInfoRejected.columnType = ColumnType.Number;
      filterInfoRejected.mappingField = 'StateTypeId';
      filterInfoRejected.value = PartPlanStateType.Rejected_By_DCC;
      filterInfoRejected.operator = SearchOperator.IsEqualTo;
      filterInfoRejected.filterCondition = FilterCondition.Or;
      this.pageSortFilterInfo.filterInfo.push(filterInfoRejected);
    }

    this.dataSourceApproveReject = [];
    this._apiService.getApprovedRejectDataByUser(currentUser.id, this.pageSortFilterInfo)
      .subscribe(data => {
        this.dataSourceApproveReject = data.value;
        this.totalRecordsApprovedRejected = data.count;
      });
  }

  checkExistenceRecord(objectModelData: any, id: number, workCellId: number): boolean {
    return (objectModelData.some(r => r.optionKey === id) && objectModelData.some(r => r.colValToMatch === workCellId));
  }

  getUserList() {
    const dccUserPageSortInfo = new PageSortFilterInfo();
    dccUserPageSortInfo.expandInfo = new ExpandSelectCountInfo();
    dccUserPageSortInfo.expandInfo.expand = [{ 'DccUsers': new ExpandSelectCountInfo() }];

    this._workcellUserService.getAllData(dccUserPageSortInfo)
      .subscribe(data => {
        this.dynamicTypeCollection['assignTo'] = [];
        const users = [];
        data.value.forEach((e: any) => {
          if (e.dccUsers !== undefined) {
            e.dccUsers.forEach((u: any) => {
              // if (!this.checkExistenceRecord(users, u.id, e.workCellId)) {
              users.push({ colValToMatch: e.workCellId, optionKey: u.id, optionValue: u.name });
              // }
            });
          }
        });



        this.dynamicTypeCollection['assignTo'] = [users];
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
        modalRef.componentInstance.isDCCTask = true;
        modalRef.componentInstance.isApprovedRejectVisible = this.activeTab === 'pendingApproval' ? true : false;
        modalRef.result.then(
          (response) => {
          },
          () => {
            this.getPageListByTab();
          }
        );
      }
    });
  }

  handleAssignToUserEvent(record: any): void {
    this.openConfirmationModal().result.then(
      (response) => {
        if (response) {
          const updateModel = this.getAssignReassignModel(record);
          this._apiService.AssignReassignToUser(record.id, updateModel).subscribe(() => {
            this.getPageListByTab();
          });
        }
      },
      () => { }
    );
  }

  openConfirmationModal() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Message.AssignToUserConformation';
    return modalRef;
  }

  getAssignReassignModel(detail: any): AssignReassignSAPPartInspectionPlanToUserModel {

    const assignReassignSAPPartInspectionPlanToUserModel = new AssignReassignSAPPartInspectionPlanToUserModel();

    Automapper.map(detail, assignReassignSAPPartInspectionPlanToUserModel);
    assignReassignSAPPartInspectionPlanToUserModel.assignToUserId = detail.selectedDynamicId;

    return assignReassignSAPPartInspectionPlanToUserModel;
  }

  pending(activeTab) {
    if (activeTab === this.activeTab) {
      this.getPendingForApprovalList();
      return;
    }
    const tempInfo = this.pageSortFilterInfo;
    this.activeTab = activeTab;
    this.pageSortFilterInfo = this.lastPageSortFilterInfo;
    this.updatePage({ currentPage: this.lastPageSortFilterInfo.paginationInfo.currentPage - 1, pageSize: this.lastPageSortFilterInfo.paginationInfo.pageSize});
    this.getPendingForApprovalList();
    this.lastPageSortFilterInfo = tempInfo;
  }



  approved(activeTab) {
    if (activeTab === this.activeTab) {
      this.getPendingForApprovalList();
      return;
    }
    const tempInfo = this.pageSortFilterInfo;
    this.activeTab = activeTab;
    this.pageSortFilterInfo = this.lastPageSortFilterInfo;
    this.updatePage({ currentPage: this.lastPageSortFilterInfo.paginationInfo.currentPage - 1, pageSize: this.lastPageSortFilterInfo.paginationInfo.pageSize});
    this.getIPApprovedRejectedList();
    this.lastPageSortFilterInfo = tempInfo;
  }

}
