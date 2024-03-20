/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { ParameterType } from './parameter-type';


export class AddParameterTypeModel extends BaseModel {


    code: string;


    description: string;


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
