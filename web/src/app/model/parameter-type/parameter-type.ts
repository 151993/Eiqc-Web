/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class ParameterType extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Code')
    code: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    @Trim()
    @FormInput()
    @DisplayColumn('ComparationMethodDescription')
    comparationMethodDescription: string;

    constructor(parameterType?: ParameterType) {
        super(parameterType);

        if (parameterType) {
            this.code = parameterType.code;
            this.description = parameterType.description;
            this.comparationMethodDescription = parameterType.comparationMethodDescription;
        } else {
            this.code = Constants.Empty;
            this.description = Constants.Empty;
            this.comparationMethodDescription = Constants.Empty;
        }
    }
}
