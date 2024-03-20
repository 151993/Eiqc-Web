/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormMeasurementParameterActual } from './form-measurement-parameter-actual';
export class UpdateFormMeasurementParameterActualModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    no: number;
    valueActual: number;
constructor(formMeasurementParameterActual?: FormMeasurementParameterActual) {
    super(formMeasurementParameterActual);
    if (formMeasurementParameterActual) {
        this.form = formMeasurementParameterActual.form;
        this.formId = formMeasurementParameterActual.formId;
        this.parameterName = formMeasurementParameterActual.parameterName;
        this.no = formMeasurementParameterActual.no;
        this.valueActual = formMeasurementParameterActual.valueActual;
    } else {
        this.form = null;
        this.formId = 0;
        this.parameterName = Constants.Empty;
        this.no = 0;
        this.valueActual = 0;
    }
  }
}
