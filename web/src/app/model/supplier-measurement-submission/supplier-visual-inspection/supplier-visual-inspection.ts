/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
import { ColumnType } from '../../table/table';
import { DefectType } from '../../defect-type/defect-type';

import { InspectionToolsType } from '../../inspection-tools-type/inspection-tools-type';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { InspectionTools } from '../../inspection-tools/inspection-tools';
import { SupplierVisualInspectionDefectType } from '../../defect-type-qty-parameter/defect-type-qty-parameter';

export class SupplierVisualInspectionModel extends BaseModel {

    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @FormInput()
    supplierMeasurementSubmissionId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    name: string;

    @FormInput()
    parameterManagementId?: number;

    @FormInput()
    partCountParameterId?: number;


    @FormInput()
    parameterManagement: ParameterManagement;


    @Trim()
    @FormInput()
    @DisplayColumn('LotInspectionQty', { type: ColumnType.Number })
    samplingSize: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ToolsType', { type: ColumnType.String })
    toolsType: string;

    @FormInput()
    inspectionToolsTypeId?: number;

    @FormInput()
    inspectionToolsType: InspectionToolsType;

    @Trim()
    @FormInput()
    @DisplayColumn('DataType', { type: ColumnType.String })
    dataTypes: string;


    @FormInput()
    dataTypeId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('InspectionTools', { type: ColumnType.DynamicType, mappingField: 'name' })
    inspectionTools: string;

    @FormInput()
    inspectionToolsId?: number;

    @FormInput()
    inspectionToolsName: InspectionTools;


    @Trim()
    @FormInput()
    @DisplayColumn('DetailsDefine', { type: ColumnType.String })
    detailsDefine: string;

    @Trim()
    @FormInput()
    @DisplayColumn('InspectionDetails', { type: ColumnType.TextBox })
    inspectionDetails: string;


    @FormInput()
    sAPPartInspectionPlanId?: number;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    @Expand()
    @FormInput()
    defectTypes: DefectType[];

    @DisplayColumn('TotalFailedQTY')
    totalDefectQty: number;

    addedDefectTypeIds: number[];


    @FormInput()
    resultPassFailId: number;


    supplierVisualInspectionDefectTypes: SupplierVisualInspectionDefectType[] = [];



    constructor(supplierVisualInspectionModel?: SupplierVisualInspectionModel) {

        super(supplierVisualInspectionModel);
        if (supplierVisualInspectionModel) {
            this.name = supplierVisualInspectionModel.name;
            this.supplierMeasurementSubmissionId = supplierVisualInspectionModel.supplierMeasurementSubmissionId;
            this.parameterManagementId = supplierVisualInspectionModel.parameterManagementId;
            this.partCountParameterId = supplierVisualInspectionModel.partCountParameterId;
            this.parameterManagement = supplierVisualInspectionModel.parameterManagement;
            this.samplingSize = supplierVisualInspectionModel.samplingSize;
            this.inspectionToolsTypeId = supplierVisualInspectionModel.inspectionToolsTypeId;
            this.inspectionToolsType = supplierVisualInspectionModel.inspectionToolsType;
            this.dataTypes = supplierVisualInspectionModel.dataTypes;
            this.dataTypeId = supplierVisualInspectionModel.dataTypeId;
            this.inspectionToolsId = supplierVisualInspectionModel.inspectionToolsId;
            this.inspectionToolsName = supplierVisualInspectionModel.inspectionToolsName;
            this.detailsDefine = supplierVisualInspectionModel.detailsDefine;
            this.inspectionDetails = supplierVisualInspectionModel.inspectionDetails;

            this.sAPPartInspectionPlanId = supplierVisualInspectionModel.sAPPartInspectionPlanId;
            this.isChecked = supplierVisualInspectionModel.isChecked;
            this.isEnabled = supplierVisualInspectionModel.isEnabled;
            this.addedDefectTypeIds = supplierVisualInspectionModel.addedDefectTypeIds;
            this.totalDefectQty = supplierVisualInspectionModel.totalDefectQty;
            this.resultPassFailId = supplierVisualInspectionModel.resultPassFailId;
            this.supplierVisualInspectionDefectTypes = supplierVisualInspectionModel.supplierVisualInspectionDefectTypes;
        } else {
            this.name = Constants.Empty;
            this.supplierMeasurementSubmissionId = Numbers.Default;
            this.parameterManagementId = null;
            this.partCountParameterId = null;
            this.parameterManagement = null;
            this.samplingSize = null;
            this.inspectionToolsTypeId = null;
            this.inspectionToolsType = null;
            this.dataTypes = Constants.Empty;
            this.dataTypeId = Numbers.Default;
            this.inspectionToolsId = null;
            this.inspectionToolsName = null;
            this.detailsDefine = Constants.Empty;
            this.inspectionDetails = Constants.Empty;

            this.sAPPartInspectionPlanId = null;
            this.isChecked = false;
            this.isEnabled = false;
            this.addedDefectTypeIds = [];
            this.totalDefectQty = null;
            this.resultPassFailId = Numbers.Default;
            this.supplierVisualInspectionDefectTypes = [];
        }
    }
}
