/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormMicroSectionActual extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    @DisplayColumn('No')
    no: number;
    @FormInput()
    @DisplayColumn('ValueActual')
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
