/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class PCCode extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('PCCode')
    code: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    constructor(pCCode?: PCCode) {
        super(pCCode);

        if (pCCode) {
            this.code = pCCode.code;
            this.description = pCCode.description;
        } else {
            this.description = Constants.Empty;
            this.code = Constants.Empty;
        }
    }
}
