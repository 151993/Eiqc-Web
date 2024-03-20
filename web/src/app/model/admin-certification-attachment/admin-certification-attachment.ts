import { Expand } from 'src/app/shared/decorators/property';
import { Attachment } from '../attachment/attachment';
import { BaseModel } from '../base/base-model';

export class AdminCertificationAttachment extends BaseModel {
    adminCertificationId: number;
    attachmentId: number;
    isEnabled: boolean;

    @Expand()
    attachment: Attachment;

    constructor(adminCertification?: AdminCertificationAttachment) {
        super(adminCertification);

        if (adminCertification) {
            this.adminCertificationId = adminCertification.adminCertificationId;
            this.attachmentId = adminCertification.attachmentId;
            this.attachment = adminCertification.attachment;
            this.isEnabled = adminCertification.isEnabled;
       } else {
            this.adminCertificationId = 0;
            this.attachmentId = 0;
            this.attachment = null;
            this.isEnabled = true;
        }
    }
}
