import { Expand } from 'src/app/shared/decorators/property';
import { Attachment } from '../attachment/attachment';
import { BaseModel } from '../base/base-model';

export class PartInspectionDrawingAttachment extends BaseModel {
    sAPPartInspectionPlanId: number;
    attachmentId: number;
    isEnabled: boolean;

    @Expand()
    attachment: Attachment;

    constructor(sAPPartInspectionPlan?: PartInspectionDrawingAttachment) {
        super(sAPPartInspectionPlan);

        if (sAPPartInspectionPlan) {
            this.sAPPartInspectionPlanId = sAPPartInspectionPlan.sAPPartInspectionPlanId;
            this.attachmentId = sAPPartInspectionPlan.attachmentId;
            this.attachment = sAPPartInspectionPlan.attachment;
            this.isEnabled = sAPPartInspectionPlan.isEnabled;
       } else {
            this.sAPPartInspectionPlanId = 0;
            this.attachmentId = 0;
            this.attachment = null;
            this.isEnabled = true;
        }
    }
}
