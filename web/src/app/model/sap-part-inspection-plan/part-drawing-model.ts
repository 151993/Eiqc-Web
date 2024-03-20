import { Expand, DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { Attachment } from '../attachment/attachment';
import { PartInspectionDrawingAttachment } from '../part-inspection-drawing-attachment/part-inspection-drawing-attachment';

export class PartDrawingModel extends BaseModel {

    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('DrawingNumber')
    drawingNumber: string;

    @FormInput()
    @DisplayColumn('DrawingRevisionNumber', { type: ColumnType.String })
    drawingRevisionNumber: string;

    @FormInput()
    @DisplayColumn('DrawingDescription', { type: ColumnType.String })
    drawingDescription: string;

    @FormInput()
    @Expand()
    drawingAttachments: Attachment[] = [];


    partInspectionDrawingAttachments: PartInspectionDrawingAttachment[];

    isEnabled: boolean;

    isExpanded: boolean;

    enableRowEdit: boolean;

    enableRowDelete: boolean;

    submittedByUserId: number;
    currentDrawingAttachmentIds: number[];
    removedDrawingAttachmentIds: number[];
    originalDrawingAttachmentIds: number[];
    recId: any;

    constructor(partDrawingModel?: PartDrawingModel) {
        super(partDrawingModel);
        if (partDrawingModel) {
            this.id = partDrawingModel.id;
            this.drawingNumber = partDrawingModel.drawingNumber;
            this.drawingRevisionNumber = partDrawingModel.drawingRevisionNumber;
            this.drawingDescription = partDrawingModel.drawingDescription;
            this.drawingAttachments = partDrawingModel.drawingAttachments;
            this.partInspectionDrawingAttachments = partDrawingModel.partInspectionDrawingAttachments;
            this.isEnabled = partDrawingModel.isEnabled;
            this.enableRowEdit = partDrawingModel.enableRowEdit;
            this.enableRowDelete = partDrawingModel.enableRowDelete;
            this.submittedByUserId = partDrawingModel.submittedByUserId;
            this.isExpanded = partDrawingModel.isExpanded;
        } else {
            this.id = Numbers.Default;
            this.drawingNumber = Constants.Empty;
            this.drawingRevisionNumber = Constants.Empty;
            this.drawingDescription = Constants.Empty;
            this.drawingAttachments = [];
            this.partInspectionDrawingAttachments = [];
            this.isEnabled = true;
            this.enableRowEdit = true;
            this.enableRowDelete = true;
            this.isExpanded = false;
        }
    }
}
