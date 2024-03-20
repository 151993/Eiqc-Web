/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Form } from '../form/form';
import { FormVIS } from './form-vis';
export class AddFormVISModel extends BaseModel {
    form: Form;
    formId: number;
    acceptanceQTY: number;
    totalFailedQTY: number;
constructor(formVIS?: FormVIS) {
    super(formVIS);
    if (formVIS) {
        this.form = formVIS.form;
        this.formId = formVIS.formId;
        this.acceptanceQTY = formVIS.acceptanceQTY;
        this.totalFailedQTY = formVIS.totalFailedQTY;
    } else {
        this.form = null;
        this.formId = 0;
        this.acceptanceQTY = 0;
        this.totalFailedQTY = 0;
    }
  }
}
