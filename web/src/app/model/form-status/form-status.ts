/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormStatus extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('StatusID')
    statusID: string;
    @FormInput()
    @DisplayColumn('UserName')
    userName: string;
    constructor(formStatus?: FormStatus) {
        super(formStatus);
        if (formStatus) {
            this.form = formStatus.form;
            this.formId = formStatus.formId;
            this.statusID = formStatus.statusID;
            this.userName = formStatus.userName;
        } else {
            this.form = null;
            this.formId = 0;
            this.statusID = Constants.Empty;
            this.userName = Constants.Empty;
        }
    }
}
