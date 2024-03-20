/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
export class FormType extends BaseModel {
    @FormInput()
    formTypeId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('Type')
    type: string;
    constructor(formType?: FormType) {
        super(formType);
        if (formType) {
            this.formTypeId = formType.formTypeId;
            this.type = formType.type;
       } else {
            this.formTypeId = 0;
            this.type = Constants.Empty;
        }
    }
}
