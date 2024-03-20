import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { TableColumn, SelectItem, ColumnType, RowOptionsType } from 'src/app/model/table/table';
import { TimeZonePipe } from '../../../pipe/timezone';
import { UserDisplayTableSettings } from 'src/app/model/table/userDisplayTableSettings';
import {
  LocalStorage,
  YesNo,
  Constants,
  Status,
  SortOrderDirection,
} from 'src/app/shared/constant/global';
import * as _ from 'lodash';
import { DisplayFormatAndStatusPipe } from '../../../pipe/displayFormatAndStatus';
import { FilterConditions } from 'src/app/shared/constant/global';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import * as moment from 'moment-timezone';
import { IBaseModel } from 'src/app/model/base/base-model';

@Component({
  selector: 'app-configuration-ptable',
  templateUrl: './configuration-ptable.component.html',
  styleUrls: ['./configuration-ptable.component.css'],
  providers: [TimeZonePipe, DisplayFormatAndStatusPipe],
})
export class ConfigurationPtableComponent implements OnInit, OnDestroy, OnChanges {
  //#region Ghost/Skeleton Loading
  skeletonRow = new Array(5);
  @Input() enableSkeleton = false;
  //#endregion Ghost/Skeleton Loading

  optionType = RowOptionsType;

  // cType is used on HTML
  // tslint:disable-next-line:no-unused-variable
  private cType = ColumnType;
  filterConditions = FilterConditions;
  multiSortMeta: any[];

  @ViewChild('cpdt') dataTable;
  currentRecords = 0;
  currentPageNum = 1;
  currentPage = 0; // for pagination
  totalPage = 1;

  filterTimeout: any;
  updatePagingDisplayTimeout: any;
  detailEnable = false;
  optionWidthValue = '15%';
  tableWidthValue = '100%';

  @Input() showInactiveStatus = true;
  @Input() isDisplayColumnReload = false;
  @Input() canAssignToUser = false;
  @Output() assignToUserEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() canAddDefectTypes = false;
  @Output() addDefectTypesEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() canAddChartType = false;
  @Output() addChartTypeEvent: EventEmitter<any> = new EventEmitter<any>();


  @Input() canRedefine = false;
  @Output() redefineEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() dynamicCollectionColumnReference = '';



  // #region START : Toggle State
  toggleCollection: SelectItem[] = [
    {
      label: Constants.All,
      value: null,
    },
    {
      label: Status.Active,
      value: true,
    },
    {
      label: Status.Inactive,
      value: false,
    },
  ];
  /** Enables status type toggle */
  @Input() enableToggle = true;
  @Output() toggleEvent: EventEmitter<any> = new EventEmitter<any>();
  // #endregion END : Toggle State

  // #region START : Select
  @Input() enableSelect = false;
  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();
  // #endregion END : Select

  // #region START : Display Time
  @Input() displayTime = false;
  // #endregion END : Display Time

  // #region START : Boolean Type Column
  booleanCollection: SelectItem[] = [
    {
      label: Constants.All,
      value: null,
    },
    {
      label: YesNo.Yes,
      value: true,
    },
    {
      label: YesNo.No,
      value: false,
    },
  ];
  // #endregion END: Boolean Type Column

  // #region START : Edit
  /** Enables edition column */
  @Input() enableEdit = true;
  @Input() enableAttachment = false;
  @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
  // #endregion END : Edit

  // #region START : View
  /** Enables detail icon */
  @Input() enableView = false;
  rowIndex: number;
  // #endregion END : View

  // #region START : set option w to colum
  /** Enables detail icon */
  @Input()
  public set optionsColumnWidth(_value: string) {
    if (_value !== undefined) {
      this.optionWidthValue = `${_value}%`;
    }
  }
  // #endregion END : View

  @Input()
  public set tableWidth(_value: string) {
    if (_value !== undefined) {
      this.tableWidthValue = `${_value}%`;
    }
  }

  // #region START : Delete
  /** Enables delete icon */
  @Input() enableDelete = true;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  // #endregion END : Delete

  // #region START : AuditTrail
  /** Enables audit trail */
  @Input() enableAuditTrail = true;
  @Output() auditTrailEvent: EventEmitter<any> = new EventEmitter<any>();
  // #endregion END : AuditTrail

  // #region START : DynamicType Collection
  @Input() dynamicTypeCollection = [];
  // #endregion END : DynamicType Collection

  @Input() dynamicRadioCollection = [];

  // #region START : ServerFilterPageSort
  // #region START : Filter
  @Output() filterEvent = new EventEmitter<any>();
  filterDebouncer: Subject<any> = new Subject<any>();
  // #endregion END : Filter

  // #region START : Sort
  @Output() sortEvent = new EventEmitter<any>();
  // #endregion END : Sort

  // #endregion END : ServerFilterPageSort

  //#region  Expand Row
  @Input() enableRowExpand = false;
  @Output() rowExpandEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() childDataSource: any[];
  @Input() childDisplayColumns: TableColumn[];
  //#endregion

  @Input() enableFilter = false;

  // #region START: Detail action
  @Input()
  public set enableDetail(_value: boolean) {
    this.detailEnable = _value;
  }
  public get enableDetail(): boolean {
    return this.detailEnable;
  }
  @Output()
  public detailClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  // #endregion END: Detail action

  @Output()
  public textChangedEvent: EventEmitter<any> = new EventEmitter<any>();


  @Output()
  public childTextChangedEvent: EventEmitter<any> = new EventEmitter<any>();


  @Output()
  public dropDownChangedEvent: EventEmitter<any> = new EventEmitter<any>();


  @Output()
  public radioButtonChangedEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public checkBoxChangedEvent: EventEmitter<any> = new EventEmitter<any>();

  // #region START : Column
  dataColumn: TableColumn[];
  @Input()
  public set column(_column: TableColumn[]) {
    this.dataColumn = _column;
  }

  displayColumns: TableColumn[];
  public get column(): TableColumn[] {
    return this.dataColumn;
  }
  // #endregion END : Column

  // #region START : Page
  @Input() totalRecords;
  @Output() pageSortEvent = new EventEmitter<any>();
  @Input() first = 0;
  @Input() pageSize = 10;
  @Input() enableServerFilterPageSort = true;
  @Input() lazy = true;
  @Input() enableCustomSort = true;
  @Input() fileName = 'download';
  @Input() height = '52vh';
  @Input() isToggleEnabled = false;
  @Input() isHeaderChecked = false;
  // #endregion END : Page

  // #region START : Select
  @Input() enableTblBottomPageInfo = true;
  @Input() enablePaginator = true;
  @Input() enableColumnFilter = true;
  // #endregion END : Select

  // #region START : DataSource
  dataSource: any;
  @Input()

  public set source(_source: any[]) {
    if (_source) {
      _source.forEach((data: any) => {
        this.column.forEach((column: TableColumn) => {
          if (
            column.columnInfo &&
            Object.keys(column.columnInfo).length > 0 &&
            column.columnInfo.type === ColumnType.Date
          ) {
            data[column.field + '_sort'] = data[column.field];
            data[column.field] = this.timeZoneService.transform(
              data[column.field],
              this.displayTime
            );
          }
          if (column.field.toLowerCase() === 'enable_display') {
            if (data['isEnabled'] != null) {
              data[column.field] = (data['isEnabled'] as boolean)
                ? Status.Active
                : Status.Inactive;
            }
          }
        });
      });

      this.currentRecords = _source.length;
      this.totalPage = Math.ceil(this.totalRecords / this.pageSize);
      this.currentPageNum = Math.ceil(this.first / this.pageSize) + 1;

      if (!this.enableServerFilterPageSort) {
        this.calculatePagingDisplay(0, this.pageSize);
        this.totalRecords = _source.length;
      }
    } else {
      this.defaultSort();
    }

    this.dataSource = _source;

    this.checkHeader();
  }

  public get source(): any[] {
    return this.dataSource;
  }
  // #endregion END : DataSource

  // #region START : Export
  @Output() exportEvent: EventEmitter<any> = new EventEmitter<any>();
  // #endregion END : Export

  constructor(
    private timeZoneService: TimeZonePipe,
    private csvExportService: CSVExportService
  ) {
    this.filterDebouncer
      .pipe(distinctUntilChanged(), debounceTime(1200))
      .subscribe((obj) => {
        this.filterEvent.emit({
          columnType: obj.type,
          fieldName: obj.fieldName,
          valueToFilter: obj.valueToFilter,
          filterCondition: obj.filterCondition,
          mapField: obj.mapField,
          pageSize: obj.pageSize,
          currentPage: obj.currentPage,
        });
      });
  }


  ngOnInit() {
    if (this.enableToggle) {
      this.dataColumn.push({
        field: 'enable_Display',
        header: 'Status',
        isVisible: true,
        isExport: true,
        columnInfo: { mappingField: 'isEnabled' },
      });
    }
    this.displayColumns = this.dataColumn.filter((item) => item.isVisible);
    this.totalPage = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isDisplayColumnReload) {
      this.displayColumns = this.dataColumn.filter((item) => item.isVisible);
    }
    if (changes.totalRecords && changes.totalRecords.currentValue) {
      this.totalPage = Math.ceil(this.totalRecords / this.pageSize);
    }
    if (this.enableRowExpand) {
      this.enableFilter = false;
    }
  }



  ngOnDestroy() {
    this.saveUserSettings();
  }

  saveUserSettings() {
    const userSettings: UserDisplayTableSettings = {
      pageSize: this.pageSize,
    };

    localStorage.removeItem(LocalStorage.UserDisplayConfigurationTableSettings);
    localStorage.setItem(
      LocalStorage.UserDisplayConfigurationTableSettings,
      JSON.stringify(userSettings)
    );
  }

  paginate(event: any) {
    if (!this.enableServerFilterPageSort) {
      this.calculatePagingDisplay(+event.first, +event.rows);
    }
  }




  calculatePagingDisplay(nextRecord: number, rowsPerPage: number) {
    if (this.updatePagingDisplayTimeout) {
      clearTimeout(this.updatePagingDisplayTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      let data = this.dataTable.filteredValue;
      if (data == null) {
        data = this.dataTable.value;
      }
      const length = data ? data.length : 0;

      if (+this.pageSize !== rowsPerPage) {
        this.pageSize = rowsPerPage;
      }

      this.currentPage = Math.ceil(nextRecord / +this.pageSize) + 1;
      this.totalPage = Math.ceil(+length / +this.pageSize);
      this.currentRecords = length;
      clearTimeout(this.updatePagingDisplayTimeout);
    }, 350);
  }

  toggleEnable(record: any, event: any) {
    this.toggleEvent.emit(record);
    event.preventDefault();
  }

  editRec(record: any) {
    this.editEvent.emit(record);
  }

  deleteRec(record: any) {
    this.deleteEvent.emit(record);
  }

  selectRec(record: any) {
    this.selectEvent.emit(record);
  }

  showAuditTrail(record: any) {
    this.auditTrailEvent.emit(record);
  }

  anyDisabled(rec: any[]) {
    if (rec) {
      return _.some(rec, ['isEnabled', false]) && this.showInactiveStatus;
    }
  }

  filterValue(event, column, condition, type, mapField) {
    if (this.enableServerFilterPageSort) {
      this.serverFilter(event, column, condition, type, mapField);
    } else {
      this.clientFilter(event, column, condition);
    }
  }

  serverFilter(event, column, condition, type, mapField) {
    let value = event.target === null ? event.value : event.target.value;

    value =
      type === ColumnType.Boolean && value ? Boolean(JSON.parse(value)) : value;

    if (value === true || value === false) {
      value = value === true;
    }

    this.filterDebouncer.next({
      type: type,
      fieldName: column,
      valueToFilter: value,
      filterCondition: condition,
      mapField: mapField,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
    });
  }

  clientFilter(event, column, type) {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      if (column) {
        if (type === 'in') {
          this.dataTable.filter(event.value, column, type);
        } else {
          this.dataTable.filter(event.target.value, column, type);
        }
      } else {
        this.dataTable.filterGlobal(event.target.value, type);
      }
      this.calculatePagingDisplay(0, this.pageSize);
    }, 250);
  }

  lazyLoad(event) {
    this.pageSize = event.rows;
    this.currentPageNum = Math.ceil(event.first / event.rows) + 1;
    this.currentPage = event.first / event.rows;
    this.pageSortEvent.emit({
      currentPage: this.currentPage,
      pageSize: event.rows,
      sortInfo:
        event.multiSortMeta && event.multiSortMeta.length > 0
          ? event.multiSortMeta
          : [],
    });
  }

  detailSelected(record: any) {
    this.detailClickedEvent.emit(record);
  }

  getSortFieldName(columnData) {
    if (this.enableServerFilterPageSort) {
      const columnType =
        columnData.columnInfo && columnData.columnInfo.type
          ? columnData.columnInfo.type
          : '';
      const mappingField =
        columnData.columnInfo && columnData.columnInfo.mappingField
          ? columnData.columnInfo.mappingField
          : '';
      return columnData.field + ';' + columnType + ';' + mappingField;
    }
    return columnData.field;
  }

  getRecDisplayName(rec: any, mapField: string) {
    return this.csvExportService.getRecDisplayName(rec, mapField);
  }

  getRecDisplayNameMulti(rec: any[], mapField: string) {
    return this.csvExportService.getRecDisplayNameMulti(rec, mapField);
  }

  exportCSV() {
    if (this.exportEvent.observers.length > 0) {
      this.exportEvent.emit({
        dataColumn: this.dataColumn.filter((item) => item.isExport),
        fileName: this.fileName,
      });
    } else {
      const timezone = JSON.parse(localStorage.getItem('timezone'));
      this.dataTable.exportFilename = `${this.fileName}_${moment
        .tz(new Date(), timezone)
        .format('MM-DD-YYYY_HH-mm-ss')}`;
      this.dataTable.exportCSV();
    }
  }

  defaultSort() {
    this.multiSortMeta = [];

    let sortColumn = this.dataColumn.filter((item) => item.sortOrder != null);
    if (sortColumn.length === 0) {
      sortColumn = this.dataColumn;
    }

    const sortField = this.getSortFieldName(sortColumn[0]);
    const sortOrder =
      sortColumn[0].sortOrder === SortOrderDirection.Desc ? -1 : 1;
    this.multiSortMeta.push({ field: sortField, order: sortOrder });
  }

  onTextBoxChange(event, row, id) {
    const record = { textChangedEvent: event, row: row, id: id };
    this.textChangedEvent.emit(record);
  }

  onChildTextBoxChange(event, row, id) {
    const record = { textChangedEvent: event, row: row, id: id };
    this.childTextChangedEvent.emit(record);
  }


  onDropDownChange(event, row) {
    const record = { dropDownChangedEvent: event, row: row };
    this.dropDownChangedEvent.emit(record);
  }

  onRadioButtonChange(event, row) {
    const record = { radioButtonChangedEvent: event, row: row };
    this.radioButtonChangedEvent.emit(record);
  }

  onCheckBoxChange(event, row) {
    const record = { checkBoxChangedEvent: event, row: row };
    this.checkBoxChangedEvent.emit(record);
  }

  isToggleDisabled() {
    if (this.isToggleEnabled || this.enableEdit) {
      return true;
    } else {
      return false;
    }
  }

  enableRowOption(row: IBaseModel, optionType: RowOptionsType): boolean {
    switch (optionType) {
      case RowOptionsType.Edit:
        return row.enableRowEdit === undefined ? this.enableEdit : this.enableEdit && row.enableRowEdit;
      case RowOptionsType.View:
        return row.enableRowView === undefined ? (!this.enableEdit && this.enableView) : ((!this.enableEdit && this.enableView) || (!row.enableRowEdit && row.enableRowView));
      case RowOptionsType.AuditTrail:
        return this.enableAuditTrail;
      case RowOptionsType.Detail:
        // return this.detailEnable;
        return row.enableRowDetail === undefined ? this.enableDetail : this.enableDetail && row.enableRowDetail;
      case RowOptionsType.Delete:
        return row.enableRowDelete === undefined ? this.enableDelete : this.enableDelete && row.enableRowDelete;
      case RowOptionsType.AssignToUser:
        // return this.canAssignToUser;
        return row.enableRowAssignToUser === undefined ? this.canAssignToUser : this.canAssignToUser && row.enableRowAssignToUser;
      case RowOptionsType.AddDefectTypes:
        return row.enableRowAddDefectTypes === undefined ? this.canAddDefectTypes : this.canAddDefectTypes && row.enableRowAddDefectTypes;
        case RowOptionsType.AddChartType:
          return row.enableRowAddChartType === undefined ? this.canAddChartType : this.canAddChartType && row.enableRowAddChartType;
      case RowOptionsType.Redefine:
        return this.canRedefine;
      default:
        return true;
    }
  }
  checkAllCheckBox(event) {
    if (this.dataSource !== undefined && this.dataSource != null) {
      this.dataSource.filter(x => x.isEnabled === true).forEach(x => x.isChecked = event.target.checked);
    }
  }

  checkHeaderCheckBox(event, row) {
    const toggleData = this.dataSource.filter(k => k.id === row.id);
    toggleData[0].isChecked = event.target.checked;
    this.checkHeader();
  }

  checkHeader() {
    if (this.dataSource !== undefined && this.dataSource != null) {
      if (this.dataSource.length === this.dataSource.filter(x => x.isChecked === true).length) {
        this.isHeaderChecked = true;
      } else {
        this.isHeaderChecked = false;
      }
    }
  }

  assignToUser(row: any): void {
    this.assignToUserEvent.emit(row);
  }

  addDefectTypes(row: any): void {
    this.addDefectTypesEvent.emit(row);
  }

  addChartType(row: any): void {
    this.addChartTypeEvent.emit(row);
  }

  redefine(row: any): void {
    this.redefineEvent.emit(row);
  }

  expandRow(record: any, isExpand: boolean, rowIndex: number) {
    this.rowIndex = rowIndex;
    if (!isExpand) {
      this.rowExpandEvent.emit(record);
    } else {
      this.childDataSource = null;
    }
    return true;
  }

}
