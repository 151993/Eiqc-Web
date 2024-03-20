/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { FormPackaging } from './form-packaging';
export class AddFormPackagingModel extends BaseModel {
    form: Form;
    formId: number;
    resultDesc: string;
    result: boolean;
constructor(formPackaging?: FormPackaging) {
    super(formPackaging);
    if (formPackaging) {
        this.form = formPackaging.form;
        this.formId = formPackaging.formId;
        this.resultDesc = formPackaging.resultDesc;
        this.result = formPackaging.result;
    } else {
        this.form = null;
        this.formId = 0;
        this.resultDesc = Constants.Empty;
        this.result = false;
    }
  }
}
