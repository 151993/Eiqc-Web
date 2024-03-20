/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { InspectionToolsType } from '../inspection-tools-type/inspection-tools-type';
import { ParameterManagement } from '../parameter-management/parameter-management';
export class PartCountParameter extends BaseModel {

    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @FormInput()
    parameterManagementId?: number;

    @FormInput()
    parameterManagement: ParameterManagement;


    @Trim()
    @FormInput()
    @DisplayColumn('ToolsType', { type: ColumnType.DynamicType, mappingField: 'type' })
    toolsType: string;

    @FormInput()
    inspectionToolsTypeId?: number;

    @FormInput()
    inspectionToolsType: InspectionToolsType;

    @Trim()
    @FormInput()
    @DisplayColumn('DetailsDefine', { type: ColumnType.TextBox })
    detailsDefine: string;

    @FormInput()
    sAPPartInspectionPlanId?: number;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    @Trim()
    @FormInput()
    @DisplayColumn('DataType', { type: ColumnType.DynamicTypeRadioButton })
    dataTypes: string;

    @FormInput()
    dataTypeId: number;



    constructor(partCountParameter?: PartCountParameter) {

        super(partCountParameter);
        if (partCountParameter) {
            this.name = partCountParameter.name;
            this.parameterManagementId = partCountParameter.parameterManagementId;
            this.parameterManagement = partCountParameter.parameterManagement;
            this.inspectionToolsTypeId = partCountParameter.inspectionToolsTypeId;
            this.inspectionToolsType = partCountParameter.inspectionToolsType;
            this.detailsDefine = partCountParameter.detailsDefine;
            this.sAPPartInspectionPlanId = partCountParameter.sAPPartInspectionPlanId;
            this.isChecked = partCountParameter.isChecked;
            this.isEnabled = partCountParameter.isEnabled;
            this.selectedDynamicId = partCountParameter.selectedDynamicId;
            this.dataTypes = partCountParameter.dataTypes;
            this.dataTypeId = partCountParameter.dataTypeId;
        } else {
            this.name = Constants.Empty;
            this.parameterManagementId = null;
            this.parameterManagement = null;
            this.inspectionToolsTypeId = null;
            this.inspectionToolsType = null;
            this.detailsDefine = Constants.Empty;
            this.sAPPartInspectionPlanId = null;
            this.isChecked = false;
            this.isEnabled = false;
            this.dataTypes = Constants.Empty;
            this.dataTypeId = Numbers.Default;
        }
    }
}
