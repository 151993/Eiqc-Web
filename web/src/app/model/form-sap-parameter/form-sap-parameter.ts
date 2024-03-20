/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormSAPParameter extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @Trim()
    @FormInput()
    @DisplayColumn('SAPParameterExpected')
    sapParameterExpected: string;
    @FormInput()
    @DisplayColumn('SAPParameterActual')
    sapParameterActual: string;
    constructor(formSAPParameter?: FormSAPParameter) {
        super(formSAPParameter);
        if (formSAPParameter) {
            this.form = formSAPParameter.form;
            this.formId = formSAPParameter.formId;
            this.parameterName = formSAPParameter.parameterName;
            this.sapParameterExpected = formSAPParameter.sapParameterExpected;
            this.sapParameterActual = formSAPParameter.sapParameterActual;
        } else {
            this.form = null;
            this.formId = 0;
            this.parameterName = Constants.Empty;
            this.sapParameterExpected = Constants.Empty;
            this.sapParameterActual = Constants.Empty;
        }
    }
}
