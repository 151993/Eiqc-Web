import { AuditDataModel } from './audit-data-model';
import { User } from '../user/user';
import { AuditLogAuditLogType, SortOrderDirection } from '../../../app/shared/constant/global';
import { FormInput, Trim, DisplayColumn, Expand, ExpandSelect } from 'src/app/shared/decorators/property';
import { ColumnType } from '../table/table';
import { BaseModel } from '../base/base-model';

export class AuditLog extends BaseModel {

    @DisplayColumn('Type')
    auditLogType: AuditLogAuditLogType;

    @DisplayColumn('Title')
    title: string;

    @ExpandSelect({ select: ['Name', 'IsEnabled'] })
    @DisplayColumn('CreatedBy', { type: ColumnType.Status, mappingField: 'name' })
    createdByUser: User;

    @Trim()
    @FormInput()
    @DisplayColumn('ChangeReason')
    changeReason: string;

    auditData: AuditDataModel;

    @DisplayColumn('CreatedDate', { type: ColumnType.Date }, true, true, SortOrderDirection.Desc)
    created: Date;

    @Expand()
    lastUpdatedByUser: User;

    constructor() {
        super();
    }
}

export interface Audit {
    id: number;
    createdDate: Date;
    createdBy: User;
    byUser: string;
    type: string;
    title: string;
    changeReason: string;
    changeContent: ChangeContent[];
  }

  export interface ChangeContent {
    field: string;
    oldValue: string;
    newValue: string;
  }
