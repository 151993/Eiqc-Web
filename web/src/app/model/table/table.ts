import { SortOrderDirection } from 'src/app/shared/constant/global';

export class TableColumn {
  field: string;
  header: string;
  columnInfo?: ColumnInfo;
  isVisible?: Boolean;
  isExport?: Boolean;
  sortOrder?: SortOrderDirection;
  valueMember?: string;
  mouseOverField?: string;
}


export enum ColumnType {
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
  Url = 'url',
  Status = 'status',
  MultiStatus = 'multiStatus',
  Date = 'Date',
  DynamicType = 'DynamicType',
  WithOperator = 'withOperator',
  WithOperatorAndNumber = 'WithOperatorAndNumber',
  RadioButton = 'RadioButton',
  TextBox = 'TextBox',
  DropDown = 'DropDown',
  CheckBox = 'CheckBox',
  DynamicTypeRadioButton = 'DynamicTypeRadioButton',
  StringWithoutLowerCase = 'StringWithoutLowerCase',
  ColumnValueBasedDynamicType = 'ColumnValueBasedDynamicType',
  MultipleDropDownTableDynamicType = 'MultipleDropDownTableDynamicType',
  BlockCopyPasteTextBox = 'BlockCopyPasteTextBox',
  ColorLabel = 'ColorLabel'
}


export enum FilterCondition {
  And = 1,
  Or = 2
}

export interface SelectItem {
  label: string;
  value: boolean;
}

export class ColumnInfo {
  type?: ColumnType;
  mappingField?: string;
}

export enum RowOptionsType {
  Edit = 1,
  View = 2,
  AuditTrail = 3,
  Detail = 4,
  Delete = 5,
  AssignToUser = 6,
  Redefine = 7,
  AddDefectTypes = 8,
  AddChartType = 9
}
