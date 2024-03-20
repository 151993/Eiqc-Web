/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormSAPParameter } from './form-sap-parameter';
export class UpdateFormSAPParameterModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    sAPParameterExpected: string;
    sAPParameterActual: string;
constructor(formSAPParameter?: FormSAPParameter) {
    super(formSAPParameter);
    if (formSAPParameter) {
        this.form = formSAPParameter.form;
        this.formId = formSAPParameter.formId;
        this.parameterName = formSAPParameter.parameterName;
        this.sAPParameterExpected = formSAPParameter.sapParameterExpected;
        this.sAPParameterActual = formSAPParameter.sapParameterActual;
    } else {
        this.form = null;
        this.formId = 0;
        this.parameterName = Constants.Empty;
        this.sAPParameterExpected = Constants.Empty;
        this.sAPParameterActual = Constants.Empty;
    }
  }
}
