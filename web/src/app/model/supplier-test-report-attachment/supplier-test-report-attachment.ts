import { Constants, Numbers } from 'src/app/shared/constant/global';
import { Expand } from 'src/app/shared/decorators/property';
import { Attachment } from '../attachment/attachment';
import { BaseModel } from '../base/base-model';

export class SupplierTestReportAttachment extends BaseModel {
    supplierTestReportId: number;
    attachmentId: number;
    isEnabled: boolean;

    @Expand()
    attachment: Attachment;
    canDelete: boolean;
    savePath: string;
    tempSavePath: any;

    constructor(supplierTestReportAttachment?: SupplierTestReportAttachment) {
        super(supplierTestReportAttachment);

        if (supplierTestReportAttachment) {
            this.supplierTestReportId = supplierTestReportAttachment.supplierTestReportId;
            this.attachmentId = supplierTestReportAttachment.attachmentId;
            this.attachment = supplierTestReportAttachment.attachment;
            this.isEnabled = supplierTestReportAttachment.isEnabled;
            this.savePath = supplierTestReportAttachment.savePath;
            this.tempSavePath = supplierTestReportAttachment.tempSavePath;
       } else {
            this.supplierTestReportId = Numbers.Default;
            this.attachmentId = Numbers.Default;
            this.attachment = null;
            this.isEnabled = true;
            this.savePath = Constants.Empty;
            this.tempSavePath = Constants.Empty;
        }
    }
}
