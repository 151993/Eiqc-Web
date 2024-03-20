/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormStatus } from './form-status';
export class UpdateFormStatusModel extends BaseModel {
    form: Form;
    formId: number;
    statusID: string;
    userName: string;
constructor(formStatus?: FormStatus) {
    super(formStatus);
    if (formStatus) {
        this.form = formStatus.form;
        this.formId = formStatus.formId;
        this.statusID = formStatus.statusID;
        this.userName = formStatus.userName;
    } else {
        this.form = null;
        this.formId = 0;
        this.statusID = Constants.Empty;
        this.userName = Constants.Empty;
    }
  }
}
