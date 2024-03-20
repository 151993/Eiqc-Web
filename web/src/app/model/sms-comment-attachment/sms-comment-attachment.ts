
import { Expand } from 'src/app/shared/decorators/property';
import { Attachment } from '../attachment/attachment';
import { BaseModel } from '../base/base-model';

export class SMSCommentAttachment extends BaseModel {
    supplierMeasurementSubmissionId: number;
    attachmentId: number;
    isEnabled: boolean;

    @Expand()
    attachment: Attachment;

    constructor(sMSCommentAttachment?: SMSCommentAttachment) {
        super(sMSCommentAttachment);

        if (sMSCommentAttachment) {
            this.supplierMeasurementSubmissionId = sMSCommentAttachment.supplierMeasurementSubmissionId;
            this.attachmentId = sMSCommentAttachment.attachmentId;
            this.attachment = sMSCommentAttachment.attachment;
            this.isEnabled = sMSCommentAttachment.isEnabled;
       } else {
            this.supplierMeasurementSubmissionId = 0;
            this.attachmentId = 0;
            this.attachment = null;
            this.isEnabled = true;
        }
    }
}
