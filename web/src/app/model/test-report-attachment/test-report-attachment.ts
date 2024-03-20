import { Expand } from 'src/app/shared/decorators/property';
import { Attachment } from '../attachment/attachment';
import { BaseModel } from '../base/base-model';

export class TestReportAttachment extends BaseModel {
    partTestReportParameterId: number;
    attachmentId: number;
    isEnabled: boolean;

    @Expand()
    attachment: Attachment;

    constructor(testReportAttachment?: TestReportAttachment) {
        super(testReportAttachment);

        if (testReportAttachment) {
            this.partTestReportParameterId = testReportAttachment.partTestReportParameterId;
            this.attachmentId = testReportAttachment.attachmentId;
            this.attachment = testReportAttachment.attachment;
            this.isEnabled = testReportAttachment.isEnabled;
       } else {
            this.partTestReportParameterId = 0;
            this.attachmentId = 0;
            this.attachment = null;
            this.isEnabled = true;
        }
    }
}
