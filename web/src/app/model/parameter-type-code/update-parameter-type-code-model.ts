
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ParameterManagementType } from '../parameter-management-type/parameter-management-type';
import { ParameterTypeCode } from './parameter-type-code';
import { PCCode } from '../pc-code/pc-code';


export class UpdateParameterTypeCodeModel extends BaseModel {

    parameterManagementType: ParameterManagementType;
    parameterManagementTypeId: number;
    addedPcCodeIds: PCCode[];
    removedPcCodeIds: PCCode[];
    parameterCodeName: string;
    description: string;
    name: string;

    constructor(parameterTypeCode?: ParameterTypeCode) {
        super(parameterTypeCode);

        if (parameterTypeCode) {
            this.parameterManagementType = parameterTypeCode.parameterManagementType;
            this.parameterManagementTypeId = parameterTypeCode.parameterManagementTypeId;
            this.addedPcCodeIds = parameterTypeCode.pcCodes;
            this.description = parameterTypeCode.description;
            this.name = parameterTypeCode.name;

        } else {
            this.parameterManagementType = null;
            this.parameterManagementTypeId = 0;
            this.addedPcCodeIds = null;
            this.removedPcCodeIds = null;
            this.description = Constants.Empty;
            this.name = Constants.Empty;
        }
    }
}
