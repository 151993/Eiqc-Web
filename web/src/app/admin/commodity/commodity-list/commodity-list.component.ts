import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Commodity } from 'src/app/model/commodity/commodity';
import { UpdateCommodityModel } from 'src/app/model/commodity/update-commodity-model';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CommodityClassificationService } from 'src/app/services/commodity-classification/commodity-classification.service';
import { CommodityService } from 'src/app/services/commodity/commodity.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuditLogEntityTypes, Constants, SearchOperator, ToastMessage } from 'src/app/shared/constant/global';
import { PermissionType } from 'src/app/shared/constant/roles';
import { LoadingService } from 'src/app/shared/controls/loading/loading.service';
import { LoadingIcon, LoadingMessage } from 'src/app/shared/controls/loading/loadingState';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { TimeZonePipe } from 'src/app/shared/pipe/timezone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commodity-list',
  templateUrl: './commodity-list.component.html',
  styleUrls: ['./commodity-list.component.css']
})
export class CommodityListComponent extends BaseListComponent implements OnInit {
  partNumber = '';
  properties = {
    partNo: 'partNumber'
  };
  lastSAPSyncDate: any;
  lastSyncDate: string;
  isPartNoFilled: boolean;
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: CommodityService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal,
    private datePipe: TimeZonePipe,
    private _commodityClassificationService: CommodityClassificationService,
    private loadingService: LoadingService,
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Commodity()));
    this.entity = AuditLogEntityTypes.Commodity;
    this.editEntityPath = '../EditCommodity';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new Commodity()).displayColumns();
    this.canCreatPermissionType = PermissionType.AdminCommodityCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminCommodityCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminCommodityCanDelete;
    this.checkPermissions();
  }

  ngOnInit() {
    this.getData();
    this.getSAPLastSyncDate();
  }

  getUpdateModel(record: Commodity): UpdateCommodityModel {
    const updateCommodityModel = new UpdateCommodityModel();
    Automapper.map(record, updateCommodityModel);
    return updateCommodityModel;
  }

  getData() {
    this._apiService.getAllDataWithPartAndSite(this.pageSortFilterInfo).subscribe((data) => {
      this.totalRecords = data.count;
      this.dataSource = data.value;
    });
  }


  search() {
    this.pageSortFilterInfo.entity = new Commodity();
    this.pageSortFilterInfo.paginationInfo.currentPage = 1;
    this.pageSortFilterInfo.filterInfo = [];
    this.applyDBFilters(this.pageSortFilterInfo);
    this._apiService.getAllDataWithPartAndSite(this.pageSortFilterInfo).subscribe(data => {
      this.totalRecords = data.count;
      this.dataSource = data.value.splice(
        0,
        environment.limit.maxResult
      );
    });
  }

  private applySAPFilters(pageSortFilterInfo: any) {
    const partNo = (<HTMLInputElement>document.getElementById(this.properties.partNo)).value;
    if (partNo && partNo.length > 0) {
      this.getFilterByColumnName(partNo, 'PART_NO', SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterInfo, FilterCondition.And);
    }
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


  private applyDBFilters(pageSortFilterInfo: any) {
    const partNo = (<HTMLInputElement>document.getElementById(this.properties.partNo)).value;
    if (partNo && partNo.length > 0) {
      this.getFilterByColumnName(partNo, 'PART_NO', SearchOperator.Contains, ColumnType.StringWithoutLowerCase, pageSortFilterInfo, FilterCondition.And);
    }
  }

  onFilterEvent(event) {
    this.dataSource = [];
    this.pageSortFilterInfo.entity = new Commodity();
    this.pageSortFilterInfo.paginationInfo.currentPage = 1;
    if (event && event.valueToFilter !== Constants.Empty) {
      this.getFilterByColumnName(event.valueToFilter, event.mapField,
        SearchOperator.Contains, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo, event.filterCondition);
      this.getData();
    } else {
      this.getData();
    }
  }

  editRecord(record: any) {
    this._router.navigate([this.editEntityPath, record.id, record.parT_NO, record.siteNo], {
      relativeTo: this._activatedRoute
    });
  }

  syncFromSAP() {
    this.pageSortFilterInfo.entity = new Commodity();
    this.pageSortFilterInfo.filterInfo = [];
    this.loadingService.show(LoadingMessage.SavingChanges, LoadingIcon.Default, true);
    const pageSortFilterInf = new PageSortFilterInfo();
    const pageSortFilterInfo = this.getPageFilterInfoCriteriaFromSAP(pageSortFilterInf);
    this._commodityClassificationService
      .syncFromSAPData(pageSortFilterInfo)
      .subscribe((res) => {
        if (res) {
          this.loadingService.hide();
          this.pageSortFilterInfo.entity = new Commodity();
          this.pageSortFilterInfo.filterInfo = [];
          this.pageSortFilterInfo.paginationInfo.pageSize = 10;
          this.getData();
          this.notificationService.showSuccess(ToastMessage.SyncFromSAP);
          this.getSAPLastSyncDate();
        } else {
          this.notificationService.showError(ToastMessage.ServerError);
        }
      });
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
    const result = `${year}${month}${date}`;
    return result;
  }

  onExportEvent(event) {
    this.pageSortFilterInfo.entity = new Commodity();
    this.pageSortFilterInfo.paginationInfo.pageSize = 0;
    this._apiService.getAllDataWithPartAndSiteForExport(this.pageSortFilterInfo).subscribe((data) => {
      this.csvExportService.ExportCSV(
        event.dataColumn,
        data.value,
        event.fileName
      );
    });
  }

  getPageFilterInfoCriteriaFromSAP(pageSortFilterInfo): PageSortFilterInfo {
    pageSortFilterInfo.entity = null;
    pageSortFilterInfo.paginationInfo.pageSize = 0;
    pageSortFilterInfo.expandInfo = {};
    pageSortFilterInfo.filterInfo = [];
    const statusFilterInfo = new FilterInfo();
    statusFilterInfo.columnName = 'STATUS';
    statusFilterInfo.columnType = ColumnType.StringWithoutLowerCase;
    statusFilterInfo.mappingField = '';
    statusFilterInfo.value = '1';
    statusFilterInfo.operator = SearchOperator.IsEqualTo;
    pageSortFilterInfo.filterInfo.push(statusFilterInfo);

    const siteFilterInfo = new FilterInfo();
    siteFilterInfo.columnName = 'SITE_NO';
    siteFilterInfo.columnType = ColumnType.StringWithoutLowerCase;
    siteFilterInfo.mappingField = 'SITE_NO';
    siteFilterInfo.value = this.authService.retrieveSite().code;
    siteFilterInfo.operator = SearchOperator.IsEqualTo;


    pageSortFilterInfo.filterInfo.push(siteFilterInfo);

    this.applySAPFilters(pageSortFilterInfo);

    return pageSortFilterInfo;
  }
}
