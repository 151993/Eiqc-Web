/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { FormSpecialParameter } from './form-special-parameter';
export class AddFormSpecialParameterModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    resultDesc: string;
    result: boolean;
constructor(formSpecialParameter?: FormSpecialParameter) {
    super(formSpecialParameter);
    if (formSpecialParameter) {
        this.form = formSpecialParameter.form;
        this.formId = formSpecialParameter.formId;
        this.parameterName = formSpecialParameter.parameterName;
        this.resultDesc = formSpecialParameter.resultDesc;
        this.result = formSpecialParameter.result;
    } else {
        this.form = null;
        this.formId = 0;
        this.parameterName = Constants.Empty;
        this.resultDesc = Constants.Empty;
        this.result = false;
    }
  }
}
