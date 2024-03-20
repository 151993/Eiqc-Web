import { Injectable } from '@angular/core';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { PageSortFilterInfo, FilterInfo } from './page-sort-filter-config';
import buildQuery from 'odata-query';
import { AuditLogEntityTypes, SearchOperator } from '../constant/global';
import * as _ from 'lodash';
import { AuditLog } from 'src/app/model/audit-log/audit-log';

@Injectable({
  providedIn: 'root'
})
export class OdataQueryBuilderService {

  getQueryFromPageSortFilterInfo(
    pageSortFilterInfo: PageSortFilterInfo,
    entityType?: AuditLogEntityTypes
  ): string {
    const filter = [];
    const orderBy = [];
    let expand = [];
    let select = [];
    let count = true;
    let top = 0;
    let skip = 0;
    const andObj = [];
    const orObj = [];

    if (entityType) {
      pageSortFilterInfo.entity = new AuditLog();
      const subObj = {};
      subObj['auditData'] = { metadata: { entity: { name: entityType } } };
      filter.push(subObj);
    }

    for (const info of pageSortFilterInfo.filterInfo) {
      let obj = {};
      if (info.operator === SearchOperator.IsNull || info.operator === SearchOperator.IsNotNull) {
        obj[info.columnName] = this.getFilter(info);
        filter.push(obj);
        continue;
      }
      switch (info.columnType) {
        case ColumnType.MultiStatus:
          {
            const subObj = this.getFiltersMultiSelect(info);
            obj[info.columnName] = { any: subObj };
            // obj[filterObject[i].columnName] = { any: { name: { contains: filterObject[i].value } } };
          }
          break;
        case ColumnType.Status:
          {
            obj = this.getFilterStatus(info);
            // obj[filterObject[i].columnName] = { name: { contains: filterObject[i].value } };
          }
          break;
        case ColumnType.DynamicType: {
          if (info.operator) {
            obj[`${info.columnName}Id`] = this.getFilter(info);
          } else {
            obj[`${info.columnName}Id`] = +info.value;
          }
        }
          break;
        case ColumnType.ColumnValueBasedDynamicType: {
          if (info.operator) {
            obj[`${info.columnName}Id`] = this.getFilter(info);
          } else {
            obj[`${info.columnName}Id`] = +info.value;
          }
        }
          break;
        case ColumnType.Boolean:
          obj[info.columnName] = JSON.parse(info.value);
          break;
        case ColumnType.WithOperator:
          obj[`tolower(${info.columnName})`] = this.getFilter(info);
          break;
        case ColumnType.WithOperatorAndNumber:
          obj[info.columnName] = this.getFilter(info);
          break;
        case ColumnType.String:
          obj[`tolower(${info.columnName})`] = this.getFilter(info);
          break;
        case ColumnType.StringWithoutLowerCase:
          obj[`${info.columnName}`] = this.getFilter(info);
          break;
        case ColumnType.Number:
          if (!(info.operator) && info.operator === SearchOperator.Contains) {
            obj[`cast(${info.columnName}, Edm.String)`] = this.getFilter(info);
          } else {
            obj[`${info.columnName}`] = this.getFilter(info);
          }
          break;
        case ColumnType.Date:
          obj[`cast(${info.columnName}, Edm.String)`] = this.getFilter(info);
          break;
        default:
          obj[`tolower(${info.columnName})`] = {
            contains: info.value.toLowerCase()
          };
          break;
      }

      info.filterCondition === FilterCondition.Or ? orObj.push(obj) : andObj.push(obj);

    }

    for (const info of pageSortFilterInfo.sortingInfo) {
      let obj = '';
      const subExpObj = {};
      const orderByObj = {};
      switch (info.columnType) {
        case ColumnType.MultiStatus:
          {
            orderByObj[`orderBy`] = `${info.mappingField} ${info.sortBy}`;
            subExpObj[`${info.columnName}`] = orderByObj;
            expand.push(subExpObj);

            const expandSelect = this.getExpandSelect(pageSortFilterInfo.entity);
            expand = expand.concat(expandSelect);

            if (pageSortFilterInfo.entity && pageSortFilterInfo.entity.expandableFields().length > 0) {
              pageSortFilterInfo.entity.expandableFields().forEach(element => {
                if (info.columnName !== element) {
                  expand.push(element);
                }
              });
            }
          }
          break;
        case ColumnType.Status:
          obj = `${info.columnName}/${info.mappingField} ${info.sortBy}`;
          break;
        case ColumnType.DynamicType:
          obj = `${info.columnName} ${info.sortBy}`;
          break;
        case ColumnType.ColumnValueBasedDynamicType:
          obj = `${info.columnName} ${info.sortBy}`;
          break;
        default:
          obj = info.mappingField
            ? `${info.mappingField} ${info.sortBy}`
            : `${info.columnName} ${info.sortBy}`;
          break;
      }

      if (obj) {
        orderBy.push(obj);
      }
    }

    if (
      (pageSortFilterInfo.sortingInfo.length > 0 &&
        _.filter(pageSortFilterInfo.sortingInfo, [
          'columnType',
          ColumnType.MultiStatus
        ]).length === 0) ||
      pageSortFilterInfo.sortingInfo.length === 0
    ) {

      const expandSelect = this.getExpandSelect(pageSortFilterInfo.entity);
      expand = expand.concat(expandSelect);

      if (pageSortFilterInfo.entity && pageSortFilterInfo.entity.expandableFields().length > 0) {

        const countFields = pageSortFilterInfo.entity.countFields();
        pageSortFilterInfo.entity.expandableFields().forEach(element => {
          const requireChildCount = countFields.includes(element);
          if (requireChildCount) {
            expand.push(element + '($count=true)');
          } else {
            expand.push(element);
          }
        });
      }

    }

    if (pageSortFilterInfo.entity &&
      pageSortFilterInfo.entity.selectableFields().length > 0) {
      select = pageSortFilterInfo.entity.selectableFields();
    }


    if (Object.keys(pageSortFilterInfo.paginationInfo).length > 0) {
      top = pageSortFilterInfo.paginationInfo.pageSize;
      skip =
        pageSortFilterInfo.paginationInfo.pageSize *
        (pageSortFilterInfo.paginationInfo.currentPage - 1);
    }

    if (pageSortFilterInfo.expandInfo) {
      if (pageSortFilterInfo.expandInfo.select && pageSortFilterInfo.expandInfo.select.length > 0) {
        select = pageSortFilterInfo.expandInfo.select;
      }
      if (pageSortFilterInfo.expandInfo.count) {
        count = pageSortFilterInfo.expandInfo.count;
      }
      if (pageSortFilterInfo.expandInfo.expand && pageSortFilterInfo.expandInfo.expand.length > 0) {
        expand = this.overrideExpandWithGlobalExpand(expand, pageSortFilterInfo.expandInfo.expand);
      }
    }

    const globalCondition = [];
    globalCondition.push({ or: orObj });
    globalCondition.push({ and: andObj });

    if (pageSortFilterInfo.globalFilterCondition === FilterCondition.Or) {
      filter.push({ or: globalCondition });
    } else {
      filter.push({ and: globalCondition });
    }

    const queryInput = { filter, top, skip, count };
    if (orderBy.length > 0) {
      queryInput['orderBy'] = orderBy;
    }
    if (expand.length > 0) {
      queryInput['expand'] = expand;
    }
    if (select.length > 0) {
      queryInput['select'] = select;
    }

    return buildQuery(queryInput);

  }

  getFilter(filterInfo: FilterInfo): any {
    let value = filterInfo.value;
    const isString = typeof filterInfo.value === 'string';
    if (isString) {
      value = filterInfo.columnType !== ColumnType.StringWithoutLowerCase ? filterInfo.value.trim().toLowerCase() : filterInfo.value.trim().toUpperCase();
    }
    if (filterInfo.columnType === ColumnType.WithOperatorAndNumber ||
      filterInfo.columnType === ColumnType.Number) {
      value = value ? +value : value;
    }
    if (filterInfo.columnType === ColumnType.Date && !(filterInfo.operator)) {
      return { contains: value };
    }
    if (filterInfo.columnType === ColumnType.Number && !(filterInfo.operator)) {
      return value;
    }
    switch (filterInfo.operator) {
      case SearchOperator.StartsWith:
        return { startswith: value };
      case SearchOperator.IsEqualTo:
        return value;
      case SearchOperator.Contains:
        return { contains: value };
      case SearchOperator.EndsWith:
        return { endswith: value };
      case SearchOperator.NotEqualTo:
        return { ne: value };
      case SearchOperator.IsLessThan:
        return { lt: value };
      case SearchOperator.IsLessThanOrEqual:
        return { le: value };
      case SearchOperator.IsGreaterThan:
        return { gt: value };
      case SearchOperator.IsGreaterThanOrEqual:
        return { ge: value };
      case SearchOperator.IsNull:
        return { eq: null };
      case SearchOperator.IsNotNull:
        return { ne: null };
      default:
        return { contains: value };
    }
  }

  getFiltersMultiSelect(filterInfo: FilterInfo) {
    const subObj = {};
    const isString = typeof filterInfo.value === 'string';

    switch (filterInfo.operator) {
      case SearchOperator.IsEqualTo: {
        if (isString) {
          subObj[`tolower(${filterInfo.mappingField})`] = {
            eq: filterInfo.value.toLowerCase()
          };
        } else {
          subObj[`${filterInfo.mappingField}`] = {
            eq: filterInfo.value
          };
        }
      }
        break;
      case SearchOperator.NotEqualTo: {
        if (isString) {
          subObj[`tolower(${filterInfo.mappingField})`] = {
            ne: filterInfo.value.toLowerCase()
          };
        } else {
          subObj[`${filterInfo.mappingField}`] = {
            ne: filterInfo.value
          };
        }
      }
        break;
      default: {
        subObj[`tolower(${filterInfo.mappingField})`] = {
          contains: filterInfo.value.toLowerCase()
        };
      }
        break;
    }
    return subObj;
  }

  getFilterStatus(filterInfo: FilterInfo) {
    const obj = {};
    const subObj = {};
    const isString = typeof filterInfo.value === 'string';

    switch (filterInfo.operator) {
      case SearchOperator.IsEqualTo: {
        if (isString) {
          subObj[`${filterInfo.mappingField})`] = {
            eq: filterInfo.value.toLowerCase()
          };

          obj[`tolower(${filterInfo.columnName}`] = subObj;
        } else {
          subObj[`${filterInfo.mappingField}`] = {
            eq: filterInfo.value
          };

          obj[`${filterInfo.columnName}`] = subObj;
        }
      }
        break;
      case SearchOperator.NotEqualTo: {
        if (isString) {
          subObj[`${filterInfo.mappingField})`] = {
            ne: filterInfo.value.toLowerCase()
          };

          obj[`tolower(${filterInfo.columnName}`] = subObj;
        } else {
          subObj[`${filterInfo.mappingField}`] = {
            ne: filterInfo.value
          };

          obj[`${filterInfo.columnName}`] = subObj;
        }
      }
        break;
      default: {
        subObj[`${filterInfo.mappingField})`] = {
          contains: filterInfo.value.toLowerCase()
        };

        obj[`tolower(${filterInfo.columnName}`] = subObj;
      }
        break;
    }

    return obj;
  }

  getExpandSelect(entity) {
    const expand = [];
    if (entity && entity.expandSelectableFields().length > 0) {

      const expandSelectFields = entity.expandSelectableFields();
      if (expandSelectFields.length > 0) {
        _.forEach(expandSelectFields, function (item) {
          const expObj = {};
          expObj[`${item.expand}`] = item.subExpand;
          expand.push(expObj);
        });
      }
    }
    return expand;
  }

  overrideExpandWithGlobalExpand(expand, globalExpand) {
    const expandClone = Object.assign([], expand);
    _.forEach(expand, function (item, index) {
      let expandKey = '';

      if (typeof (item) === 'string') {
        expandKey = item;
      } else {
        expandKey = Object.keys(item)[0];
      }

      const indexesToSplice = [];

      _.forEach(globalExpand, function (globalItem, indx) {
        const globalExpandKey = Object.keys(globalItem)[0];
        if (expandKey === globalExpandKey) {
          expandClone.splice(index, 1);
          expandClone.push(globalItem);
          indexesToSplice.push(indx);
        }
      });

      indexesToSplice.forEach(indexToSplice => {
        globalExpand.splice(indexToSplice, 1);
      });
    });

    _.forEach(globalExpand, function (globalItem) {
      expandClone.push(globalItem);
    });

    return expandClone;
  }

}
