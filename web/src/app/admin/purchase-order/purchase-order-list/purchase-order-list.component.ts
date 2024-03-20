import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PurchaseOrder } from 'src/app/model/purchase-order/purchase-order';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order/purchase-order.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes, SearchOperator, ToastMessage } from 'src/app/shared/constant/global';
import { LoadingService } from 'src/app/shared/controls/loading/loading.service';
import { LoadingIcon, LoadingMessage } from 'src/app/shared/controls/loading/loadingState';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';
import { PermissionType } from 'src/app/shared/constant/roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent extends BaseListComponent implements OnInit {
  partNumber = '';
  properties = {
    vendorCode: 'vendorCode',
    partNo: 'partNumber'
  };
  isPartNoFilled: boolean;
  lastSAPSyncDate: any;
  lastSyncDate: string;
  purchaseOrder: PurchaseOrder[];
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: PurchaseOrderService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private datePipe: TimeZonePipe,
    private loadingService: LoadingService,
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new PurchaseOrder()));
    this.entity = AuditLogEntityTypes.PurchaseOrder;
    this.displayColumns = (new PurchaseOrder()).displayColumns();
    this.canCreatPermissionType = PermissionType.AdminPurchaseOrderCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminPurchaseOrderCanUpdate;
    this.checkPermissions();
  }

  ngOnInit() {
    super.getData();
    this.getSAPLastSyncDate();
  }



  syncFromSAP() {
    this.pageSortFilterInfo.entity = new PurchaseOrder();
    this.pageSortFilterInfo.filterInfo = [];
    this.loadingService.show(LoadingMessage.SavingChanges, LoadingIcon.Default, true);
    const pageSortFilterInf = new PageSortFilterInfo();
    const pageSortFilterInfo = this.getPageFilterInfoCriteriaFromSAP(pageSortFilterInf);
    this._apiService
      .syncFromSAPData(pageSortFilterInfo)
      .subscribe((res) => {
        if (res) {
          this.loadingService.hide();
          this.pageSortFilterInfo.entity = new PurchaseOrder();
          this.pageSortFilterInfo.filterInfo = [];
          this.pageSortFilterInfo.paginationInfo.pageSize = 10;
          super.getData();
          this.notificationService.showSuccess(ToastMessage.SyncFromSAP);
          this.getSAPLastSyncDate();
        } else {
          this.notificationService.showError(ToastMessage.ServerError);
        }
      });
  }

  search() {
    this.pageSortFilterInfo.entity = new PurchaseOrder();
    this.pageSortFilterInfo.paginationInfo.currentPage = 1;
    this.pageSortFilterInfo.filterInfo = [];
    this.applyDBFilters(this.pageSortFilterInfo);
    this._apiService.getAllData(this.pageSortFilterInfo).subscribe(data => {
      this.totalRecords = data.count;
      this.dataSource = data.value.splice(
        0,
        environment.limit.maxResult
      );
    });
  }

  isPartNumberEmpty() {
    const partNo = (<HTMLInputElement>document.getElementById(this.properties.partNo)).value;
    if (partNo && partNo.trim().length > 0) {
      this.isPartNoFilled = true;
    } else {
      this.isPartNoFilled = false;
    }
    this.partNumber = partNo;
    return this.isPartNoFilled;
  }

  getSAPLastSyncDate() {
    this._apiService.getSAPLastSyncDate().subscribe(response => {
      this.lastSAPSyncDate = this.datePipe.transform(response, true);
      this.lastSyncDate = response !== null ? this.getSyncDateFilterFromSAP(response) : null;
    });
  }

  getSyncDateFilterFromSAP(lastUpdatedDate) {
    const lastSyncDate = new Date(lastUpdatedDate);
    const date = ('0' + lastSyncDate.getDate()).slice(-2);
    const month = ('0' + (lastSyncDate.getMonth() + 1)).slice(-2);
    const year = lastSyncDate.getFullYear();
    const result = `${month}/${date}/${year}`;
    return result;
  }



  onExportEvent(event) {
    this.pageSortFilterInfo.entity = new PurchaseOrder();
    this.pageSortFilterInfo.paginationInfo.pageSize = 0;
    this.applyDBFilters(this.pageSortFilterInfo);
    const batchSize = Number(environment.batchExecution.batchSize);
    const currentLength = Number(this.totalRecords) / Number(batchSize);
    this.purchaseOrder = [];
    for (let i = 0; i < currentLength; i++) {
      this.pageSortFilterInfo.paginationInfo.currentPage = i + 1;
      this.pageSortFilterInfo.paginationInfo.pageSize = batchSize;
      this._apiService.getAllData(this.pageSortFilterInfo).subscribe((purchaseOrderData) => {
        this.purchaseOrder = this.purchaseOrder.concat(purchaseOrderData.value);
      }, () => { }, () => {
        if (this.purchaseOrder.length === Number(this.totalRecords)) {
          this.csvExportService.ExportCSV(
            event.dataColumn,
            this.purchaseOrder,
            event.fileName
          );
        }
      });

    }
  }

  private applySAPFilters(pageSortFilterInfo: any) {
    const partNo = (<HTMLInputElement>document.getElementById(this.properties.partNo)).value;
    const vendorCode = (<HTMLInputElement>document.getElementById(this.properties.vendorCode)).value;
    if (partNo && partNo.length > 0) {
      this.getFilterByColumnName(partNo, 'PART_NO', SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterInfo, FilterCondition.And);
    }
    if (vendorCode && vendorCode.length > 0) {
      this.getFilterByColumnName(vendorCode, 'VENDOR_CODE', SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterInfo, FilterCondition.And);
    }
  }

  private applyDBFilters(pageSortFilterInfo: any) {
    const partNo = (<HTMLInputElement>document.getElementById(this.properties.partNo)).value;
    const vendorCode = (<HTMLInputElement>document.getElementById(this.properties.vendorCode)).value;
    if (partNo && partNo.length > 0) {
      this.getFilterByColumnName(partNo, 'partNo', SearchOperator.Contains, ColumnType.String, pageSortFilterInfo, FilterCondition.And);
    }
    if (vendorCode && vendorCode.length > 0) {
      this.getFilterByColumnName(vendorCode, 'vendorCode', SearchOperator.Contains, ColumnType.String, pageSortFilterInfo, FilterCondition.And);
    }
  }

  getPageFilterInfoCriteriaFromSAP(pageSortFilterInfo): PageSortFilterInfo {
    pageSortFilterInfo.entity = new PurchaseOrder();
    pageSortFilterInfo.paginationInfo.pageSize = 0;
    pageSortFilterInfo.expandInfo = {};
    pageSortFilterInfo.filterInfo = [];
    const filterInfoSite = new FilterInfo();
    filterInfoSite.columnName = 'SITE';
    filterInfoSite.columnType = ColumnType.StringWithoutLowerCase;
    filterInfoSite.mappingField = 'SITE';
    filterInfoSite.value = this.authService.retrieveSite().code;
    filterInfoSite.operator = SearchOperator.IsEqualTo;
    filterInfoSite.filterCondition = FilterCondition.And;
    pageSortFilterInfo.filterInfo.push(filterInfoSite);
    this.applySAPFilters(pageSortFilterInfo);
    return pageSortFilterInfo;
  }
}
