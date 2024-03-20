import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { Attachment } from '../attachment/attachment';

export class PartDrawingLabelModel extends BaseModel {

    id: number;

    @FormInput()
    @DisplayColumn('DrawingNumber', { type: ColumnType.String })
    drawingNumber: string;

    @FormInput()
    @DisplayColumn('DrawingRevisionNumber', { type: ColumnType.String })
    drawingRevisionNumber: string;

    @FormInput()
    @DisplayColumn('DrawingDescription', { type: ColumnType.String })
    drawingDescription: string;

    @FormInput()
    @Expand()
    drawingFiles: Attachment[] = [];

    isEnabled: boolean;
    enableRowEdit: boolean;
    constructor(partDrawingLabelModel?: PartDrawingLabelModel) {
        super(partDrawingLabelModel);
        if (partDrawingLabelModel) {
            this.drawingNumber = partDrawingLabelModel.drawingNumber;
            this.drawingRevisionNumber = partDrawingLabelModel.drawingRevisionNumber;
            this.drawingDescription = partDrawingLabelModel.drawingDescription;
            this.drawingFiles = partDrawingLabelModel.drawingFiles;
            this.isEnabled = partDrawingLabelModel.isEnabled;
            this.enableRowEdit = partDrawingLabelModel.enableRowEdit;
        } else {
            this.drawingNumber = Constants.Empty;
            this.drawingRevisionNumber = Constants.Empty;
            this.drawingDescription = Constants.Empty;
            this.drawingFiles = [];
            this.isEnabled = true;
            this.enableRowEdit = true;
        }
    }
}
