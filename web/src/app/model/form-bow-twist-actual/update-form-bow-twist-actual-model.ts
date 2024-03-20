/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormBowTwistActual } from './form-bow-twist-actual';
export class UpdateFormBowTwistActualModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    sAPParameterExpected: string;
    sAPParameterActual: string;
    constructor(formBowTwistActual?: FormBowTwistActual) {
        super(formBowTwistActual);
        if (formBowTwistActual) {
            this.form = formBowTwistActual.form;
            this.formId = formBowTwistActual.formId;
            this.parameterName = formBowTwistActual.parameterName;
            this.sAPParameterExpected = formBowTwistActual.sapParameterExpected;
            this.sAPParameterActual = formBowTwistActual.sapParameterActual;
        } else {
            this.form = null;
            this.formId = 0;
            this.parameterName = Constants.Empty;
            this.sAPParameterExpected = Constants.Empty;
            this.sAPParameterActual = Constants.Empty;
        }
      }
}
