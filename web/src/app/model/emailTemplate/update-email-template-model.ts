/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class UpdateEmailTemplateModel extends BaseModel {

  constructor() {
    super();
    this.name = Constants.Empty;
    this.subject = Constants.Empty;
    this.body = Constants.Empty;
    this.changeReason = Constants.Empty;
  }

  name: string;
  subject: string;
  body: string;
  changeReason: string;
}
