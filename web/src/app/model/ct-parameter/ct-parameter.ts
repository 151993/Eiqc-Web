/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class CTParameter extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    constructor(cTParameter?: CTParameter) {
        super(cTParameter);

        if (cTParameter) {
            this.name = cTParameter.name;
            this.description = cTParameter.description;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
        }
    }
}
