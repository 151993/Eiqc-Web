/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { PCCode } from '../pc-code/pc-code';
export class ParameterCategory extends BaseModel {
    @FormInput()
    @DisplayColumn('Sequence')
    sequence: number;
    @FormInput()
    @DisplayColumn('MultiSampling')
    multiSampling: number;
    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;
    @FormInput()
    @Expand()
    pcCode: PCCode;
    @FormInput()
    pCCodeId: number;
    constructor(parameterCategory?: ParameterCategory) {
        super(parameterCategory);
        if (parameterCategory) {
            this.sequence = parameterCategory.sequence;
            this.multiSampling = parameterCategory.multiSampling;
            this.description = parameterCategory.description;
            this.pcCode = parameterCategory.pcCode;
            this.pCCodeId = parameterCategory.pCCodeId;
       } else {
            this.sequence = 0;
            this.multiSampling = 0;
            this.description = Constants.Empty;
            this.pcCode = null;
            this.pCCodeId = 0;
        }
    }
}
