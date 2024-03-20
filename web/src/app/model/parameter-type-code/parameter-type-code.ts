
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ParameterManagementType } from '../parameter-management-type/parameter-management-type';
import { ColumnType } from '../table/table';
import { PCCode } from '../pc-code/pc-code';

export class ParameterTypeCode extends BaseModel {

    @FormInput()
    @DisplayColumn('TypeId', null, false, false)
    parameterManagementTypeId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('Type', { type: ColumnType.Status, mappingField: 'description' }, false)
    parameterManagementType: ParameterManagementType;


    @DisplayColumn('Type', { type: ColumnType.String, mappingField: 'pmtDescription' })
    pmtDescription: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    @Expand()
    @DisplayColumn('PCCode', { type: ColumnType.MultiStatus, mappingField: 'code' })
    @FormInput()
    pcCodes: PCCode[];


    constructor(parameterTypeCode?: ParameterTypeCode) {
        super(parameterTypeCode);

        if (parameterTypeCode) {
            this.parameterManagementType = parameterTypeCode.parameterManagementType;
            this.pcCodes = parameterTypeCode.pcCodes;
            this.description = parameterTypeCode.description;
            this.name = parameterTypeCode.name;
            this.pmtDescription = parameterTypeCode.pmtDescription;
        } else {
            this.parameterManagementType = null;
            this.pcCodes = null;
            this.description = Constants.Empty;
            this.name = Constants.Empty;
            this.pmtDescription = Constants.Empty;
        }
    }
}
