import 'reflect-metadata';
import { TableColumn, ColumnInfo } from 'src/app/model/table/table';
import { SortOrderDirection } from '../constant/global';
import { ExpandSelectCountInfo } from '../odata-query-builder/page-sort-filter-config';

export function Expand(expandColumnName?: string[], selectColumnName?: string[]): PropertyDecorator {
  return (target, key) => {
    addToReflect(target, expandColumnName && expandColumnName.length > 0 ? `${String(key)}/${expandColumnName}` : key, 'expand');
  };
}

export function ExpandSelect(expandSelectCount: ExpandSelectCountInfo): PropertyDecorator {
  return (target, key) => {
    const expandSelect = {
      expand: key as string,
      subExpand: expandSelectCount
    };
    addToReflect(target, expandSelect, 'expandSelect');
  };
}

export function Select(): PropertyDecorator {
  return (target, key) => {
    addToReflect(target, key, 'select');
  };
}

export function Count(): PropertyDecorator {
  return (target, key) => {
    addToReflect(target, key, 'count');
  };
}

export function Trim(): PropertyDecorator {
  return (target, key) => {
    addToReflect(target, key, 'trim');
  };
}

export function DisplayColumn(header: string, columnInfo?: ColumnInfo, isVisible: boolean = true,
  isExport: boolean = true, sortOrder?: SortOrderDirection, valueMember?: string, mouseOverField?: string): PropertyDecorator {
  return (target, key) => {

    const tableColumn = new TableColumn();

    tableColumn.field = key as string;
    tableColumn.header = header;
    tableColumn.columnInfo = columnInfo;
    tableColumn.isVisible = isVisible;
    tableColumn.isExport = isExport;
    tableColumn.sortOrder = sortOrder;
    tableColumn.valueMember = valueMember;
    tableColumn.mouseOverField = mouseOverField;
    addToReflect(target.constructor.prototype
      ? target.constructor.prototype
      : target, tableColumn, 'displayColumn');
  };
}

export function FormInput(): PropertyDecorator {
  return (target, key) => {
    addToReflect(target, key, 'formInput');
  };
}

function addToReflect(target, key, name) {
  const items = Reflect.getMetadata(name, target) || [];
  if (!items.includes(key)) {
    items.push(key);
  }
  Reflect.defineMetadata(name, items, target);
}
