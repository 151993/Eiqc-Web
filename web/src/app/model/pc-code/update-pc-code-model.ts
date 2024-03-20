/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { PCCode } from './pc-code';

export class UpdatePCCodeModel extends BaseModel {
    code: string;
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
