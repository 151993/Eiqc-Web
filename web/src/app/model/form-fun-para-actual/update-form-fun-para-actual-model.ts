/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormFunParaActual } from './form-fun-para-actual';
export class UpdateFormFunParaActualModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    no: number;
    valueActual: number;
constructor(formFunParaActual?: FormFunParaActual) {
    super(formFunParaActual);
    if (formFunParaActual) {
        this.form = formFunParaActual.form;
        this.formId = formFunParaActual.formId;
        this.parameterName = formFunParaActual.parameterName;
        this.no = formFunParaActual.no;
        this.valueActual = formFunParaActual.valueActual;
    } else {
        this.form = null;
        this.formId = 0;
        this.parameterName = Constants.Empty;
        this.no = 0;
        this.valueActual = 0;
    }
  }
}
