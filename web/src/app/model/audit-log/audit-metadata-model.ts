import { AuditMetadataEntityModel } from './audit-metadata-entity-model';

export interface IAuditMetadataModel {
    entity: AuditMetadataEntityModel;
}

export class AuditMetadataModel implements IAuditMetadataModel {
    entity: AuditMetadataEntityModel;
}
