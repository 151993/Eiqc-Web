/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { DefectType } from '../../defect-type/defect-type';
import { SupplierFunctionAttributeActual } from './supplier-function-attribute-actual';

export class SupplierFunctionAttribute extends BaseModel {
    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @FormInput()
    parameterManagementId: number;

    @DisplayColumn('ParameterName', { type: ColumnType.Status, mappingField: 'name' }, false)
    parameterManagement: ParameterManagement;


    @Trim()
    @FormInput()
    @DisplayColumn('Result')
    resultExpected: string;

    @Trim()
    @FormInput()
    @DisplayColumn('TestRequirement', { type: ColumnType.String })
    testRequirement: string;

    @Trim()
    @FormInput()
    @DisplayColumn('InspectionDetails', { type: ColumnType.TextBox })
    inspectionDetails: string;

    @FormInput()
    resultId: number;

    @FormInput()
    resultPassFailId: number;

    @Expand()
    @FormInput()
    defectTypes: DefectType[];

    @DisplayColumn('DefectType')
    defectType: string;

    @FormInput()
    result: string;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    addedDefectTypeIds: number[];

    supplierMeasurementSubmissionId: number;

    // resultActualId: number;

    isExpanded: boolean;

    supplierFunctionAttributeActuals: SupplierFunctionAttributeActual[] = [];

    resultValue: string;


    constructor(supplierFunctionAttribute?: SupplierFunctionAttribute) {
        super(supplierFunctionAttribute);
        if (supplierFunctionAttribute) {
            this.name = supplierFunctionAttribute.name;
            this.resultExpected = supplierFunctionAttribute.resultExpected;
            this.testRequirement = supplierFunctionAttribute.testRequirement;
            this.parameterManagementId = supplierFunctionAttribute.parameterManagementId;
            this.parameterManagement = supplierFunctionAttribute.parameterManagement;
            this.resultId = supplierFunctionAttribute.resultId;
            this.isChecked = supplierFunctionAttribute.isChecked;
            this.isEnabled = supplierFunctionAttribute.isEnabled;
            this.inspectionDetails = supplierFunctionAttribute.inspectionDetails;
            this.resultPassFailId = supplierFunctionAttribute.resultPassFailId;
            this.defectType = supplierFunctionAttribute.defectType;
            this.defectTypes = supplierFunctionAttribute.defectTypes;
            this.addedDefectTypeIds = supplierFunctionAttribute.addedDefectTypeIds;
            this.supplierMeasurementSubmissionId = supplierFunctionAttribute.supplierMeasurementSubmissionId;
            this.isExpanded = supplierFunctionAttribute.isExpanded;
            this.supplierFunctionAttributeActuals =  supplierFunctionAttribute.supplierFunctionAttributeActuals;
           this.resultValue = supplierFunctionAttribute.resultValue;



        } else {
            this.name = Constants.Empty;
            this.resultExpected = Constants.Empty;
            this.testRequirement = Constants.Empty;
            this.parameterManagementId = Numbers.Default;
            this.parameterManagement = null;
            this.resultId = 1;
            this.isChecked = false;
            this.isEnabled = false;
            this.inspectionDetails = Constants.Empty;
            this.defectType = Constants.Empty;
            this.defectTypes = [];
            this.resultPassFailId = Numbers.Default;
            this.addedDefectTypeIds = [];
            this.supplierMeasurementSubmissionId = Numbers.Default;
            this.isExpanded = false;
            this.supplierFunctionAttributeActuals = [];
            this.resultValue = Constants.Empty;
        }
    }
}
