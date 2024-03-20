/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class EmailTemplate extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('Name')
  name: string;

  @FormInput()
  @DisplayColumn('Subject')
  subject: string;

  @FormInput()
  body: string;

  constructor(emailTemplate?: EmailTemplate) {
    super(emailTemplate);
    if (emailTemplate) {
      this.name = emailTemplate.name;
      this.subject = emailTemplate.subject;
      this.body = emailTemplate.body;
      this.isEnabled = true;
    } else {
      this.name = Constants.Empty;
      this.subject = Constants.Empty;
      this.body = Constants.Empty;
    }
  }
}
