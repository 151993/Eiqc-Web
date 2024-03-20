/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormBowTwistParameter } from './form-bow-twist-parameter';
export class UpdateFormBowTwistParameterModel extends BaseModel {
    form: Form;
    formId: number;
    warpType: number;
    spec: string;
    length: string;
    width: string;
    unit: string;
    upperLimit: string;
constructor(formBowTwistParameter?: FormBowTwistParameter) {
    super(formBowTwistParameter);
    if (formBowTwistParameter) {
        this.form = formBowTwistParameter.form;
        this.formId = formBowTwistParameter.formId;
        this.warpType = formBowTwistParameter.warpType;
        this.spec = formBowTwistParameter.spec;
        this.length = formBowTwistParameter.length;
        this.width = formBowTwistParameter.width;
        this.unit = formBowTwistParameter.unit;
        this.upperLimit = formBowTwistParameter.upperLimit;
    } else {
        this.form = null;
        this.formId = 0;
        this.warpType = 0;
        this.spec = Constants.Empty;
        this.length = Constants.Empty;
        this.width = Constants.Empty;
        this.unit = Constants.Empty;
        this.upperLimit = Constants.Empty;
    }
  }
}
