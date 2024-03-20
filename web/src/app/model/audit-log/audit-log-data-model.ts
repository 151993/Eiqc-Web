import { AuditLogModifiedField } from './audit-log-modified-field';

export interface IAuditLogDataModel {
    modifiedFields: AuditLogModifiedField[];
}

export class AuditLogDataModel implements IAuditLogDataModel {
    modifiedFields: AuditLogModifiedField[];
}
