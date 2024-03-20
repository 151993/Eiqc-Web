/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormPackaging extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('ResultDesc')
    resultDesc: string;
    @FormInput()
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
