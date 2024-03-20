/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormBowTwistParameter extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('WarpType')
    warpType: number;
    @Trim()
    @FormInput()
    @DisplayColumn('Spec')
    spec: string;
    @Trim()
    @FormInput()
    @DisplayColumn('Length')
    length: string;
    @Trim()
    @FormInput()
    @DisplayColumn('Width')
    width: string;
    @Trim()
    @FormInput()
    @DisplayColumn('Unit')
    unit: string;
    @Trim()
    @FormInput()
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
