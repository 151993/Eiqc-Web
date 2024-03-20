/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Constants } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';
import { Attachment } from './attachment';

export class UpdateAttachmentModel extends BaseModel {
  fileName: string;
  savePath: string;

  constructor(attachment?: Attachment) {
    super(attachment);

    if (attachment) {
      this.fileName = attachment.name;
      this.savePath = attachment.savePath;
    } else {
      this.fileName = Constants.Empty;
      this.savePath = Constants.Empty;
    }
  }
}
