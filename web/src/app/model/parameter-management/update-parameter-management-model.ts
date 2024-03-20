import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ParameterManagement } from './parameter-management';
import { Commodity } from '../commodity/commodity';
import { ParameterTypeCode } from '../parameter-type-code/parameter-type-code';

export class UpdateParameterManagementModel extends BaseModel {
    name: string;
    description: string;
    parameterTypeCodeId: number;
    addedCommodityNameIds: Commodity[];
    removedCommodityNameIds: Commodity[];
    parameterTypeCode: ParameterTypeCode;

    constructor(parameterManagement?: ParameterManagement) {
        super(parameterManagement);

        if (parameterManagement) {
            this.name = parameterManagement.name;
            this.description = parameterManagement.description;
            this.parameterTypeCode = parameterManagement.parameterTypeCode;
            this.parameterTypeCodeId = parameterManagement.parameterTypeCodeId;
            this.addedCommodityNameIds = parameterManagement.commodities;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.parameterTypeCodeId = 0;
            this.parameterTypeCode = null;
            this.addedCommodityNameIds = null;
            this.removedCommodityNameIds = null;
        }
    }
}
