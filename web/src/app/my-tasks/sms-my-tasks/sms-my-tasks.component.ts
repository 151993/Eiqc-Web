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
import { ColumnType, FilterCondition, TableColumn } from 'src/app/model/table/table';
import { ConfirmationModalComponent } from '../../shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { AssignReassignSAPPartInspectionPlanToUserModel } from '../../model/sap-part-inspection-plan/assign-reassign-sap-part-inspection-plan-to-user-model';
import { Automapper } from '../../shared/automapper/automapper';
import { WorkCellUserService } from '../../services/work-cell-user/work-cell-user.service';
import { SMSMyTasks } from 'src/app/model/sms-my-tasks/sms-my-tasks';
import { SMSMyTasksService } from 'src/app/services/sms-my-tasks/smsmy-tasks.service';
import { SupplierMeasurementViewComponent } from 'src/app/supplier-measurement/supplier-measurement-view/supplier-measurement-view.component';

@Component({
  selector: 'app-sms-my-tasks',
  templateUrl: './sms-my-tasks.component.html',
  styleUrls: ['./sms-my-tasks.component.css']
})
export class SmsMyTasksComponent extends BaseListComponent implements OnInit {
  dynamicTypeCollection: Record<string, any[]> = {};
  dataSourceApproveReject: any;
  public displayColumnsApproveReject: TableColumn[];
  activeTab = 'pendingApproval';
  assignToUserField = 'AssignTo';
  lastPageSortFilterInfo: PageSortFilterInfo = new PageSortFilterInfo(new SMSMyTasks());
  approvedRejectedTotalRecords = 0;

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: SMSMyTasksService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private _workcellUserService: WorkCellUserService,
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService,
      _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SMSMyTasks()));

    this.displayColumns = (new SMSMyTasks()).displayColumns();
    this.displayColumnsApproveReject = (new SMSMyTasks()).displayColumns();
    // this.displayColumnsApproveReject.forEach((element, index) => {
    //   if (element.field.toLowerCase() === this.assignToUserField.toLowerCase()) {
    //     this.displayColumnsApproveReject.splice(index, 1);
    //   }
    // });
    this.canAccessPermissionType = PermissionType.AdminSMSMyTaskCanAccess;
    this.lastPageSortFilterInfo.paginationInfo.currentPage = 1;
    this.lastPageSortFilterInfo.paginationInfo.pageSize = 10;

    this.checkPermissions();
  }

  ngOnInit() {
    // this.getUserList();
    this.getPendingForApprovalList();
  }

  getDataByTabName() {
    if (this.activeTab === 'pendingApproval') {
      this.getPendingForApprovalList();
    } else {
      this.getIPApprovedRejectedList();
    }
  }

  onFilterEvent(event) {
    this.updateFilter(event, this.isAuditLog);
    this.getDataByTabName();
  }

  onPageSortEvent(event) {
    this.updateSort(event.sortInfo, this.isAuditLog);
    this.updatePage(event, this.isAuditLog);
    this.getDataByTabName();
  }

  getPendingForApprovalList() {
    if (this.pageSortFilterInfo.filterInfo === undefined || this.pageSortFilterInfo.filterInfo.length === 0) {
      this.pageSortFilterInfo.filterInfo = [];
      const filterInfo = new FilterInfo();
      filterInfo.columnName = 'StateTypeId';
      filterInfo.columnType = ColumnType.Number;
      filterInfo.mappingField = 'StateTypeId';
      filterInfo.value = PartPlanStateType.Pending_Approval_By_Jabil;
      filterInfo.operator = SearchOperator.IsEqualTo;
      this.pageSortFilterInfo.filterInfo.push(filterInfo);
    }
    // const currentUser = this.authService.retrieveUser();
    this.dataSource = [];

    this._apiService.getAllData(this.pageSortFilterInfo)
      .subscribe(data => {
        setTimeout(() => {
          this.totalRecords = data.count;
          this.dataSource = data.value;
        }, 5000);
      });
  }

  getIPApprovedRejectedList() {
    if (this.pageSortFilterInfo.filterInfo === undefined || this.pageSortFilterInfo.filterInfo.length === 0) {
      this.pageSortFilterInfo.filterInfo = [];
      const filterInfoApproved = new FilterInfo();
      filterInfoApproved.columnName = 'StateTypeId';
      filterInfoApproved.columnType = ColumnType.Number;
      filterInfoApproved.mappingField = 'StateTypeId';
      filterInfoApproved.value = PartPlanStateType.Approved_By_SQE;
      filterInfoApproved.operator = SearchOperator.IsEqualTo;
      filterInfoApproved.filterCondition = FilterCondition.Or;
      this.pageSortFilterInfo.filterInfo.push(filterInfoApproved);
      const filterInfoRejected = new FilterInfo();
      filterInfoRejected.columnName = 'StateTypeId';
      filterInfoRejected.columnType = ColumnType.Number;
      filterInfoRejected.mappingField = 'StateTypeId';
      filterInfoRejected.value = PartPlanStateType.Rejected_By_SQE;
      filterInfoRejected.operator = SearchOperator.IsEqualTo;
      filterInfoRejected.filterCondition = FilterCondition.Or;
      this.pageSortFilterInfo.filterInfo.push(filterInfoRejected);
    }
    this.dataSourceApproveReject = [];
    this._apiService.getAllData(this.pageSortFilterInfo)
      .subscribe(data => {
        this.approvedRejectedTotalRecords = data.count;
        this.dataSourceApproveReject = data.value;
      });
  }

  checkExistenceRecord(objectModelData: any, id: number, workCellId: number): boolean {
    return (objectModelData.some(r => r.optionKey === id) && objectModelData.some(r => r.colValToMatch === workCellId));
  }

  getUserList() {
    const jabilUserPageSortInfo = new PageSortFilterInfo();
    jabilUserPageSortInfo.expandInfo = new ExpandSelectCountInfo();
    jabilUserPageSortInfo.expandInfo.expand = [{ 'JabilUsers': new ExpandSelectCountInfo() }];

    this._workcellUserService.getAllData(jabilUserPageSortInfo)
      .subscribe(data => {
        this.dynamicTypeCollection['assignTo'] = [];
        const users = [];
        data.value.forEach((e: any) => {
          if (e.jabilUsers !== undefined) {
            e.jabilUsers.forEach((u: any) => {
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
    const modalRef = this.modalService.open(SupplierMeasurementViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.details = record;
    modalRef.componentInstance.isApprovedRejectVisible = this.activeTab === 'pendingApproval' ? true : false;
    modalRef.componentInstance.isApprovedInspectionPlan = true;

    modalRef.result.then(
      (response) => { },
      () => {
        // this.getPendingForApprovalList();
        // this.getIPApprovedRejectedList();
      }
    );

  }

  handleAssignToUserEvent(record: any): void {
    this.openConfirmationModal().result.then(
      (response) => {
        if (response) {
          const updateModel = this.getAssignReassignModel(record);
          this._apiService.AssignReassignToUser(record.id, updateModel).subscribe(() => {
            this.getPendingForApprovalList();
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
      this.getDataByTabName();
      return;
    }
    const tempInfo = this.pageSortFilterInfo;
    this.activeTab = activeTab;
    this.pageSortFilterInfo = this.lastPageSortFilterInfo;
    this.updatePage({ currentPage: this.lastPageSortFilterInfo.paginationInfo.currentPage - 1, pageSize: this.lastPageSortFilterInfo.paginationInfo.pageSize});
    this.getDataByTabName();
    this.lastPageSortFilterInfo = tempInfo;
  }



  approved(activeTab) {
    if (activeTab === this.activeTab) {
      this.getDataByTabName();
      return;
    }
    const tempInfo = this.pageSortFilterInfo;
    this.activeTab = activeTab;
    this.pageSortFilterInfo = this.lastPageSortFilterInfo;
    this.updatePage({ currentPage: this.lastPageSortFilterInfo.paginationInfo.currentPage - 1, pageSize: this.lastPageSortFilterInfo.paginationInfo.pageSize});
    this.getDataByTabName();
    this.lastPageSortFilterInfo = tempInfo;
  }
}
