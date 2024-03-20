import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../notification/notification.service';
import {
  AuditLogEntityTypes,
  changeReasonModalConfig,
  ChangeReasonButton,
  ToastMessage,
  SearchOperator
} from '../../constant/global';
import { AuditModalComponent } from '../../controls/modal/auditModal/audit-modal/audit-modal.component';
import { ColumnType, FilterCondition, TableColumn } from 'src/app/model/table/table';
import { FormGroup } from '@angular/forms';
import { ChangeReasonModalComponent } from '../../controls/modal/change-reason-modal/change-reason-modal.component';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import {
  PaginationInfo,
  PageSortFilterInfo,
  FilterInfo
} from '../../odata-query-builder/page-sort-filter-config';
import { BaseFilterPageSort } from '../base-filter-page-sort/base-filter-page-sort';
import { IBaseModel, BaseModel } from 'src/app/model/base/base-model';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseDataService } from '../base-data.service';
import { DeleteModel } from 'src/app/model/base/delete-model';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PermissionType } from '../../constant/roles';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  template: ''
})
export class BaseListComponent extends BaseFilterPageSort
  implements OnInit, OnDestroy {
  public dataSource: IBaseModel[];
  public displayColumns: TableColumn[];

  protected formInput: FormGroup;

  protected entity: AuditLogEntityTypes;
  protected editEntityPath: string;

  protected getUpdateModelFunction: any;

  public totalRecords = 0;
  public fileName = 'download';
  public isAuditLog: boolean;

  public getData$ = new Subject<PageSortFilterInfo>();

  public canAccess: boolean;
  public canCreate: boolean;
  public canUpdate: boolean;
  public canDelete: boolean;

  protected canAccessPermissionType: PermissionType;
  protected canCreatPermissionType: PermissionType;
  protected canUpdatePermissionType: PermissionType;
  protected canDeletePermissionType: PermissionType;

  constructor(
    protected authService: AuthService,
    protected auditLogService: AuditLogService,
    protected modalService: NgbModal,
    protected translateService: TranslateService,
    protected notificationService: NotificationService,
    private routerService?: Router,
    private activatedRouteService?: ActivatedRoute,
    protected apiDataService?: BaseDataService,
    protected csvExportService?: CSVExportService,
    _pageSortFilterInfo?: PageSortFilterInfo
  ) {
    super(_pageSortFilterInfo);

    this.getData$
      .pipe(
        switchMap((pageSortInfo: PageSortFilterInfo) =>
          this.apiDataService.getAllData(pageSortInfo)
        )
      )
      .subscribe(data => {
        this.totalRecords = data.count;
        this.dataSource = data.value;
      });

    this.updatePage({ currentPage: 0, pageSize: this.pageSize });
  }

  ngOnInit() {
    this.authService.userPermissions$.subscribe(x => {
      this.checkPermissions();
    });

    this.checkPermissions();
  }

  checkPermissions() {
    this.canAccess = this.authService.isPermissionExists([this.canAccessPermissionType]);
    this.canCreate = this.authService.isPermissionExists([this.canCreatPermissionType]);
    this.canUpdate = this.authService.isPermissionExists([this.canUpdatePermissionType]);
    this.canDelete = this.authService.isPermissionExists([this.canDeletePermissionType]);
  }

  getData() {
    this.getData$.next(this.pageSortFilterInfo);
  }

  showAuditLog(record: BaseModel): void {
    const modalRef = this.modalService.open(AuditModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });

    modalRef.componentInstance.title = this.translateService.instant(
      'Label.AuditTrail'
    );
    modalRef.componentInstance.recordId = record.id;
    modalRef.componentInstance.entity = this.entity;
  }

  showChangeReasonModal() {
    return this.modalService.open(
      ChangeReasonModalComponent,
      changeReasonModalConfig
    );
  }

  showDeleteChangeReasonModal() {
    const modalRef = this.modalService.open(
      ChangeReasonModalComponent,
      changeReasonModalConfig
    );

    modalRef.componentInstance.buttonText = ChangeReasonButton.Delete;

    return modalRef.result;
  }

  ngOnDestroy(): void {
    this.pageSortFilterInfo.paginationInfo = new PaginationInfo();
    this.pageSortFilterInfo.sortingInfo = [];
    this.pageSortFilterInfo.filterInfo = [];
    this.displayColumns = [];
  }

  onFilterEvent(event) {
    this.updateFilter(event, this.isAuditLog);
    this.getData();
  }

  onPageSortEvent(event) {
    this.updateSort(event.sortInfo, this.isAuditLog);
    this.updatePage(event, this.isAuditLog);
    this.getData();
  }

  editRecord(record: BaseModel) {
    this.routerService.navigate([this.editEntityPath, record.id], {
      relativeTo: this.activatedRouteService
    });
  }

  deleteRecord(record: BaseModel) {
    this.showDeleteChangeReasonModal().then(
      changeReason => {
        const deleteModel = new DeleteModel();
        deleteModel.id = record.id;
        deleteModel.changeReason = changeReason;

        this.apiDataService.deleteData(record.id, deleteModel).subscribe(() => {
          this.getData();
          this.notificationService.showSuccess(ToastMessage.DataDeleted);
        });
      },
      () => {}
    );
  }

  toggleStatus(record: BaseModel) {
    this.showChangeReasonModal().result.then(
      changeReason => {
        const rec = this.getUpdateModelFunction(record);

        rec.isEnabled = !record.isEnabled;
        rec.changeReason = changeReason;

        this.apiDataService.updateData(record.id, rec).subscribe(() => {
          this.getData();
          this.notificationService.showSuccess(ToastMessage.Saved);
        });
      },
      () => {}
    );
  }

  onExportEvent(event) {
    const pageSortFilterInfoClone = Object.create(this.pageSortFilterInfo);
    pageSortFilterInfoClone.paginationInfo.pageSize = 0;

    this.apiDataService.getAllData(pageSortFilterInfoClone).subscribe(data => {
      this.csvExportService.ExportCSV(
        event.dataColumn,
        data.value,
        event.fileName
      );
    });
  }

  getFilterByColumnName(value: any, mappingField, operator: SearchOperator, columnType: ColumnType, pageSortFilterInfo: PageSortFilterInfo, filterCondition?: FilterCondition) {
    const filterInfo = new FilterInfo();
    filterInfo.columnName = mappingField;
    filterInfo.columnType = columnType;
    filterInfo.mappingField = mappingField;
    filterInfo.value = value;
    filterInfo.operator = operator;
    filterInfo.filterCondition = filterCondition;
    pageSortFilterInfo.filterInfo.push(filterInfo);
}
}
