/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { PCCode } from '../pc-code/pc-code';
import { ParameterCategory } from './parameter-category';
export class AddParameterCategoryModel extends BaseModel {
    sequence: number;
    multiSampling: number;
    description: string;
    pCCode: PCCode;
    pCCodeId: number;
constructor(parameterCategory?: ParameterCategory) {
    super(parameterCategory);
    if (parameterCategory) {
        this.sequence = parameterCategory.sequence;
        this.multiSampling = parameterCategory.multiSampling;
        this.description = parameterCategory.description;
        this.pCCode = parameterCategory.pcCode;
        this.pCCodeId = parameterCategory.pCCodeId;
    } else {
        this.sequence = 0;
        this.multiSampling = 0;
        this.description = Constants.Empty;
        this.pCCode = null;
        this.pCCodeId = 0;
    }
  }
}
