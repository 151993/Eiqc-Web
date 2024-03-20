/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import {
  DisplayColumn,
  Trim,
} from 'src/app/shared/decorators/property';
import { Constants } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';

export class Attachment extends BaseModel {
  @Trim()
  @DisplayColumn('AttachmentFileName')
  name: string;

  @Trim()
  savePath: string;

  tempSavePath: string;

  canDelete: boolean;
constructor(attachment?: Attachment) {
    super(attachment);

    if (attachment) {
      this.name = attachment.name;
      this.savePath = attachment.savePath;
      this.canDelete = attachment.canDelete;
    } else {
      this.name = Constants.Empty;
      this.savePath = Constants.Empty;
      this.canDelete = true;
    }
  }
}
