

export interface IAuditLogModifiedField {
    fieldName: string;
    oldValue: string;
    newValue: string;
}

export class AuditLogModifiedField implements IAuditLogModifiedField {
    fieldName: string;
    oldValue: string;
    newValue: string;
}
