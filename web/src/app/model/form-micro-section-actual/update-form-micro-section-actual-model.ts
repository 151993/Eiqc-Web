/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormMicroSectionActual } from './form-micro-section-actual';
export class UpdateFormMicroSectionActualModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    no: number;
    valueActual: number;
constructor(formMicroSectionActual?: FormMicroSectionActual) {
    super(formMicroSectionActual);
    if (formMicroSectionActual) {
        this.form = formMicroSectionActual.form;
        this.formId = formMicroSectionActual.formId;
        this.parameterName = formMicroSectionActual.parameterName;
        this.no = formMicroSectionActual.no;
        this.valueActual = formMicroSectionActual.valueActual;
    } else {
        this.form = null;
        this.formId = 0;
        this.parameterName = Constants.Empty;
        this.no = 0;
        this.valueActual = 0;
    }
  }
}
