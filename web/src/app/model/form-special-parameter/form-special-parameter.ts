/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormSpecialParameter extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    @DisplayColumn('ResultDesc')
    resultDesc: string;
    @FormInput()
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
