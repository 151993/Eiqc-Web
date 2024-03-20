
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { ParameterTypeCode } from './parameter-type-code';
import { PCCode } from '../pc-code/pc-code';

export class AddParameterTypeCodeModel extends BaseModel {

    parameterManagementTypeId: number;
    addedPcCodeIds: PCCode[];
    description: string;
    name: string;

    constructor(parameterTypeCode?: ParameterTypeCode) {
        super(parameterTypeCode);

        if (parameterTypeCode) {
            this.parameterManagementTypeId = parameterTypeCode.parameterManagementTypeId;
            this.addedPcCodeIds = parameterTypeCode.pcCodes;
            this.description = parameterTypeCode.description;
            this.name = parameterTypeCode.name;
        } else {
            this.parameterManagementTypeId = 0;
            this.addedPcCodeIds = null;
            this.description = Constants.Empty;
            this.name = Constants.Empty;
        }
    }
}

