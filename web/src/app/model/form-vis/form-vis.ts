/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Form } from '../form/form';
export class FormVIS extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('AcceptanceQTY')
    acceptanceQTY: number;
    @FormInput()
    @DisplayColumn('TotalFailedQTY')
    totalFailedQTY: number;
    constructor(formVIS?: FormVIS) {
        super(formVIS);
        if (formVIS) {
            this.form = formVIS.form;
            this.formId = formVIS.formId;
            this.acceptanceQTY = formVIS.acceptanceQTY;
            this.totalFailedQTY = formVIS.totalFailedQTY;
        } else {
            this.form = null;
            this.formId = 0;
            this.acceptanceQTY = 0;
            this.totalFailedQTY = 0;
        }
    }
}
