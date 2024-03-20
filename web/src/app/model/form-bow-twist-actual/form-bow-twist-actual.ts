/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormBowTwistActual extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @Trim()
    @FormInput()
    @DisplayColumn('SAPParameterExpected')
    sapParameterExpected: string;
    @Trim()
    @FormInput()
    @DisplayColumn('SAPParameterActual')
    sapParameterActual: string;
    constructor(formBowTwistActual?: FormBowTwistActual) {
        super(formBowTwistActual);
        if (formBowTwistActual) {
            this.form = formBowTwistActual.form;
            this.formId = formBowTwistActual.formId;
            this.parameterName = formBowTwistActual.parameterName;
            this.sapParameterExpected = formBowTwistActual.sapParameterExpected;
            this.sapParameterActual = formBowTwistActual.sapParameterActual;
        } else {
            this.form = null;
            this.formId = 0;
            this.parameterName = Constants.Empty;
            this.sapParameterExpected = Constants.Empty;
            this.sapParameterActual = Constants.Empty;
        }
    }
}
