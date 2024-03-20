/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormFunParaActual extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    @DisplayColumn('No')
    no: number;
    @FormInput()
    @DisplayColumn('ValueActual')
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
