import { Expand, DisplayColumn } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { Attachment } from '../attachment/attachment';
import { PartInspectionSpecAttachment } from '../part-inspection-spec-attachment/part-inspection-spec-attachment';

export class PartSpecModel extends BaseModel {

    id: number;
    @DisplayColumn('SpecNumber', { type: ColumnType.String })
    specNumber: string;

    @DisplayColumn('SpecRevisionNumber', { type: ColumnType.String })
    specRevisionNumber: string;

    @DisplayColumn('SpecificationDescription', { type: ColumnType.String })
    specDescription: string;

    @Expand()
    specAttachments: Attachment[] = [];

    partInspectionSpecAttachments: PartInspectionSpecAttachment[];

    isEnabled: boolean;
    enableRowEdit: boolean;
    enableRowDelete: boolean;
    submittedByUserId: number;
    isExpanded: boolean;
    removedSpecAttachmentIds: any[];
    currentSpecAttachmentIds: any;
    originalSpecAttachmentIds: any;
    recId: any;

    constructor(partSpecModel?: PartSpecModel) {
        super(partSpecModel);
        if (partSpecModel) {
            this.id = partSpecModel.id;
            this.specNumber = partSpecModel.specNumber;
            this.specRevisionNumber = partSpecModel.specRevisionNumber;
            this.specDescription = partSpecModel.specDescription;
            this.specAttachments = partSpecModel.specAttachments;
            this.partInspectionSpecAttachments = partSpecModel.partInspectionSpecAttachments;
            this.isEnabled = partSpecModel.isEnabled;
            this.isExpanded = partSpecModel.isExpanded;
            this.enableRowEdit = partSpecModel.enableRowEdit;
            this.enableRowDelete = partSpecModel.enableRowDelete;
            this.submittedByUserId = partSpecModel.submittedByUserId;
        } else {
            this.id = Numbers.Default;
            this.specNumber = Constants.Empty;
            this.specRevisionNumber = Constants.Empty;
            this.specDescription = Constants.Empty;
            this.specAttachments = [];
            this.partInspectionSpecAttachments = [];
            this.isEnabled = true;
            this.enableRowEdit = true;
            this.enableRowDelete = true;
            this.submittedByUserId = null;
            this.isExpanded = false;
        }
    }
}
