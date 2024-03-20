import { ControlValueAccessor } from '@angular/forms';
import { Output, EventEmitter, OnInit, Input } from '@angular/core';
import { BaseDataService } from '../../base/base-data.service';
import { JAutoCompleteConfig } from './j-auto-complete/j-auto-complete-config';
import { environment } from 'src/environments/environment';
import { Constants, SearchOperator } from '../../constant/global';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { FilterInfo, PageSortFilterInfo } from '../../odata-query-builder/page-sort-filter-config';

export class BaseAutoComplete implements OnInit, ControlValueAccessor {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUnselect = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClear = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCompleteMethod = new EventEmitter();
  @Output() dropdownClick = new EventEmitter();

  //#region Configuration
  properties = {
    name: 'name'
  };
  data: any[] = [];
  @Input() isDisabled = false;
  @Input() multiple = false;
  @Input() dropdown = true;
  @Input() minLength = '1';
  @Input() forceSelection = true;
  @Input() field = this.properties.name;
  @Input() mappingField = this.properties.name;
  @Input() suggestions = this.data;

  @Input() config: JAutoCompleteConfig;
  public autoCompleteConfig: JAutoCompleteConfig = {
    field: this.field,
    minLength: this.minLength,
    suggestions: this.suggestions,
    dropdown: this.dropdown,
    multiple: this.multiple,
    forceSelection: this.forceSelection,
    mappingField: this.mappingField
  };
  //#endregion Configuration

  private _value: any[];
  get value() {
    return this._value;
  }
  set value(val: any[]) {
    this._value = val;
  }

  constructor(protected apiService: BaseDataService) {}

  ngOnInit() {
    this.initConfig();

    this.autoCompleteConfig = this.config
      ? this.config
      : this.autoCompleteConfig;
    this.getData();
  }

  initConfig() {
    this.autoCompleteConfig = {
      field: this.field,
      minLength: this.minLength,
      suggestions: this.suggestions,
      dropdown: this.dropdown,
      multiple: this.multiple,
      forceSelection: this.forceSelection,
      mappingField: this.mappingField
    };
  }

  writeValue(v: any[]) {
    this.value = v;
  }

  propagateChange = (_: any) => {};
  onChanged = () => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onChanged = fn;
  }

  getData(isSite = false) {
    if (this.dropdownClick.observers.length === 0) {
      this.apiService.getAllData().subscribe(response => {
        if (isSite) {
        this.autoCompleteConfig.suggestions = response.value.map((value) => { value['name'] = value['name'] + ' - ' + value['code']; return value; });
      } else {
        this.autoCompleteConfig.suggestions = response.value;
      }
      });
    } else {
      this.dropdownClick.emit();
    }
  }

  search(event, isSite = false) {
    if (this.onCompleteMethod.observers.length === 0) {
      if (event.query.trim() !== Constants.Empty) {
        this.apiService
          .searchByField(this.autoCompleteConfig.mappingField, event.query)
          .subscribe(data => {
            if (isSite) {
            this.autoCompleteConfig.suggestions = data.value.map((value) => { value['name'] = value['name'] + ' - ' + value['code']; return value; }).splice(
              0,
              environment.limit.maxResult
            );
          } else {
            this.autoCompleteConfig.suggestions = data.value.splice(
              0,
              environment.limit.maxResult
            );
          }
          });
      }
    } else {
      this.onCompleteMethod.emit(event);
    }
  }

  select(event) {
      this.value = event.value;
      this.onSelect.emit(event.item);
      this.propagateChange(this.value);
      this.onChanged();
  }

  unselect(event) {
    this.value = event.value;
    this.onUnselect.emit(event.item);
    this.propagateChange(this.value);
    this.onChanged();
  }

  clear() {
    this.value = null;
    this.onClear.emit();
    this.propagateChange(this.value);
    this.onChanged();
  }

  protected getFilterByColumnName(value: any, columnName, mappingField, operator: SearchOperator, columnType: ColumnType, pageSortFilterInfo: PageSortFilterInfo, filterCondition?: FilterCondition) {
    const filterInfo = new FilterInfo();
    filterInfo.columnName = columnName;
    filterInfo.columnType = columnType;
    filterInfo.mappingField = mappingField;
    filterInfo.value = value;
    filterInfo.operator = operator;
    filterInfo.filterCondition = filterCondition;
    pageSortFilterInfo.filterInfo.push(filterInfo);
  }

  protected getFilterByMultipleColumnNames(value: any, columnNames: string[], mappingFields: string[],
    operators: SearchOperator[], columnTypes: ColumnType[], pageSortFilterInfo: PageSortFilterInfo,
    filterCondition?: FilterCondition) {
    columnNames.forEach((element, index) => {
    const filterInfo = new FilterInfo();
    filterInfo.columnName = element;
    filterInfo.columnType = columnTypes[index];
    filterInfo.mappingField = mappingFields[index];
    filterInfo.value = value;
    filterInfo.operator = operators[index];
    filterInfo.filterCondition = filterCondition;
    pageSortFilterInfo.filterInfo.push(filterInfo);
    });
  }
}
