import { IReflection } from '../reflection/reflection';
import * as _ from 'lodash';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { Constants, SearchOperator } from '../constant/global';

export class PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export class SortingInfo {
  columnType?: ColumnType;
  mappingField?: string;
  sortBy: string;
  columnName: string;
}

export class FilterInfo {
  columnType: ColumnType;
  columnName: string;
  mappingField?: string;
  value: any;
  operator?: SearchOperator;
  filterCondition?: FilterCondition;
}

export class ExpandSelectCountInfo {
  select?: string[];
  expand?: Record<string, ExpandSelectCountInfo>[];
  count?: boolean;
}

export class PageSortFilterInfo {
  paginationInfo: PaginationInfo;
  sortingInfo: SortingInfo[];
  filterInfo: FilterInfo[];
  entity?: IReflection;
  expandInfo?: ExpandSelectCountInfo;
  globalFilterCondition: FilterCondition;

  constructor(_entity?: IReflection) {
    this.paginationInfo = new PaginationInfo();
    this.sortingInfo = [];
    this.filterInfo = [];
    this.entity = _entity;
    this.expandInfo = new ExpandSelectCountInfo();
  }

  public createFilter(
    value: any,
    columnName: string,
    columnType: ColumnType = ColumnType.String,
    mappingField: string = Constants.Empty,
    operator: SearchOperator = SearchOperator.IsEqualTo,
    filterCondition: FilterCondition = FilterCondition.And,
    _globalFilterCondition: FilterCondition = FilterCondition.Or
  ) {
    value = columnType === ColumnType.Boolean && value ? Boolean(JSON.parse(value)) : value;

    const filterInfo = new FilterInfo();
    filterInfo.columnName = columnName;
    filterInfo.columnType = columnType;
    filterInfo.mappingField = mappingField;
    filterInfo.value = value;
    filterInfo.operator = operator;
    filterInfo.filterCondition = filterCondition;

    this.updateCorrespondingFilters(filterInfo, event);
    this.globalFilterCondition = _globalFilterCondition;
  }


  private updateCorrespondingFilters(correspondingFilterInfo: FilterInfo, event: any) {
    if (this.filterInfo.length > 0) {
      _.remove(this.filterInfo, function (obj: FilterInfo) {
        return (obj.columnName === correspondingFilterInfo.columnName &&
          obj.mappingField === correspondingFilterInfo.mappingField &&
          obj.value === correspondingFilterInfo.value);
      });
    }

    if (correspondingFilterInfo.value !== '') {
      this.filterInfo.push(correspondingFilterInfo);
    }
  }

}
