import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Commodity } from '../commodity/commodity';
import { ColumnType } from '../table/table';
import { ParameterTypeCode } from '../parameter-type-code/parameter-type-code';

export class ParameterManagement extends BaseModel {

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    @FormInput()
    parameterTypeCodeId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('PTCName', { type: ColumnType.Status, mappingField: 'name' })
    parameterTypeCode: ParameterTypeCode;

    @Expand()
    @DisplayColumn('Commodity', { type: ColumnType.MultiStatus, mappingField: 'name' })
    commodities: Commodity[];

    parameterManagementTypeId: number;

    constructor(parameterManagement?: ParameterManagement) {
        super(parameterManagement);
        if (parameterManagement) {
            this.name = parameterManagement.name;
            this.description = parameterManagement.description;
            this.commodities = parameterManagement.commodities;
            this.parameterTypeCode = parameterManagement.parameterTypeCode;
            this.parameterManagementTypeId = parameterManagement.parameterManagementTypeId;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.parameterTypeCodeId = 0;
            this.commodities = null;
            this.parameterTypeCode = null;
            this.parameterManagementTypeId = 0;
        }
    }
}
