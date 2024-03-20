import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { ParameterManagement } from './parameter-management';
import { Commodity } from '../commodity/commodity';

export class AddParameterManagementModel extends BaseModel {
    name: string;
    description: string;
    parameterTypeCodeId: number;
    addedCommodityNameIds: Commodity[];

    constructor(parameterManagement?: ParameterManagement) {
        super(parameterManagement);

        if (parameterManagement) {
            this.name = parameterManagement.name;
            this.description = parameterManagement.description;
            this.parameterTypeCodeId = parameterManagement.parameterTypeCodeId;
            this.addedCommodityNameIds = parameterManagement.commodities;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.addedCommodityNameIds = null;
        }
    }
}

