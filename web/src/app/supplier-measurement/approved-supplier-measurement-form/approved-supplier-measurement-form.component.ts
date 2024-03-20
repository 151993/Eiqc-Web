import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { PartPlanStateType, SearchOperator } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles'; import { ColumnType, TableColumn } from 'src/app/model/table/table';
import { ConfirmationModalComponent } from 'src/app/shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { SupplierMeasurementViewComponent } from '../supplier-measurement-view/supplier-measurement-view.component';
import { SMSMyTasks } from 'src/app/model/sms-my-tasks/sms-my-tasks';
import { SMSMyTasksService } from 'src/app/services/sms-my-tasks/smsmy-tasks.service';

@Component({
  selector: 'app-approved-supplier-measurement-form',
  templateUrl: './approved-supplier-measurement-form.component.html',
  styleUrls: ['./approved-supplier-measurement-form.component.css']
})
export class ApprovedSupplierMeasurementSubmissionComponent extends BaseListComponent implements OnInit {
  dynamicTypeCollection: Record<string, any[]> = {};
  dataSourceApproveReject: any;
  public displayColumnsApproveReject: TableColumn[];
  activeTab = 'pendingApproval';
  assignToUserField = 'AssignTo';
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: SMSMyTasksService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService,
      _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new SMSMyTasks()));

    this.displayColumnsApproveReject = (new SMSMyTasks()).displayColumns();
    this.canAccessPermissionType = PermissionType.AdminSMSMyTaskCanAccess;

    this.checkPermissions();
  }

  ngOnInit() {
    this.getIPApprovedRejectedList();
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
      this.pageSortFilterInfo.filterInfo.push(filterInfoApproved);
    }
    this.dataSourceApproveReject = [];
    this._apiService.getAllData(this.pageSortFilterInfo)
      .subscribe(data => {
        this.dataSourceApproveReject = data.value;
        this.totalRecords = data.count;
      });
  }


  detailSelected(record: any): void {
    const modalRef = this.modalService.open(SupplierMeasurementViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.details = record;

    modalRef.result.then(
      (response) => { },
      () => {
      }
    );

  }

  openConfirmationModal() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Message.AssignToUserConformation';
    return modalRef;
  }


  onPageSortEvent(event) {
    this.updateSort(event.sortInfo, this.isAuditLog);
    this.updatePage(event, this.isAuditLog);
    this.getIPApprovedRejectedList();
  }

  onFilterEvent(event) {
    this.updateFilter(event, this.isAuditLog);
    this.getIPApprovedRejectedList();
  }
}
