import { Expand, DisplayColumn } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { Attachment } from '../attachment/attachment';

export class PartSpecLabelModel extends BaseModel {

    id: number;
    @DisplayColumn('SpecNumber', { type: ColumnType.String })
    specNumber: string;

    @DisplayColumn('SpecRevisionNumber', { type: ColumnType.String })
    specRevisionNumber: string;

    @DisplayColumn('SpecificationDescription', { type: ColumnType.String })
    specDescription: string;

    @Expand()
    uploadSpecFiles: Attachment[] = [];

    isEnabled: boolean;
    enableRowEdit: boolean;
    enableRowDelete: boolean;
    submittedByUserId: number;
    isExpanded: boolean;
    removedSpecAttachmentIds: any[];
    currentSpecAttachmentIds: any;
    originalSpecAttachmentIds: any;
    recId: any;

    constructor(partSpecLabelModel?: PartSpecLabelModel) {
        super(partSpecLabelModel);
        if (partSpecLabelModel) {
            this.specNumber = partSpecLabelModel.specNumber;
            this.specRevisionNumber = partSpecLabelModel.specRevisionNumber;
            this.specDescription = partSpecLabelModel.specDescription;
            this.uploadSpecFiles = partSpecLabelModel.uploadSpecFiles;
            this.isEnabled = partSpecLabelModel.isEnabled;
            this.enableRowEdit = partSpecLabelModel.enableRowEdit;
        } else {
            this.specNumber = Constants.Empty;
            this.specRevisionNumber = Constants.Empty;
            this.specDescription = Constants.Empty;
            this.uploadSpecFiles = [];
            this.isEnabled = true;
            this.enableRowEdit = true;
        }
    }
}
