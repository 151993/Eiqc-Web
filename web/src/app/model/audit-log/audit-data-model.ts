import { AuditMetadataModel } from './audit-metadata-model';
import { AuditLogDataModel } from './audit-log-data-model';

export interface IAuditDataModel {
    metadata: AuditMetadataModel;
    logData: AuditLogDataModel;
}

export class AuditDataModel implements IAuditDataModel {
    metadata: AuditMetadataModel;
    logData: AuditLogDataModel;
}
