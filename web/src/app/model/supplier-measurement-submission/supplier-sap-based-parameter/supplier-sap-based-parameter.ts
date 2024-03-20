/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
import { ColumnType } from '../../table/table';
import { DefectType } from '../../defect-type/defect-type';
import { CertificateTypeParameter } from '../../certificate-type-parameter/certificate-type-parameter';

export class SupplierSapBasedParameter extends BaseModel {
    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @FormInput()
    certificateTypeParameterId: number;

    @DisplayColumn('ParameterName', { type: ColumnType.Status, mappingField: 'name' }, false)
    certificateTypeParameter: CertificateTypeParameter;

    @Trim()
    @FormInput()
    @DisplayColumn('SapRequest')
    sapRequest: string;


    @Trim()
    @FormInput()
    @DisplayColumn('PhysicalInspection', { type: ColumnType.BlockCopyPasteTextBox })
    physicalInspection: string;

    @FormInput()
    matchId: number;


    @FormInput()
    @DisplayColumn('MatchResult')
    matchResult: string;

    @Expand()
    @FormInput()
    defectTypes: DefectType[];

    @DisplayColumn('DefectType')
    defectType: string;

    addedDefectTypeIds: number[];

    supplierMeasurementSubmissionId: number;


    constructor(supplierSapBasedParameter?: SupplierSapBasedParameter) {
        super(supplierSapBasedParameter);
        if (supplierSapBasedParameter) {
            this.name = supplierSapBasedParameter.name;
            this.certificateTypeParameterId = supplierSapBasedParameter.certificateTypeParameterId;
            this.certificateTypeParameter = supplierSapBasedParameter.certificateTypeParameter;
            this.sapRequest = supplierSapBasedParameter.sapRequest;
            this.physicalInspection = supplierSapBasedParameter.physicalInspection;
            this.matchId = supplierSapBasedParameter.matchId;
            this.matchResult = supplierSapBasedParameter.matchResult;
            this.defectTypes = supplierSapBasedParameter.defectTypes;
            this.defectType = supplierSapBasedParameter.defectType;
            this.addedDefectTypeIds = supplierSapBasedParameter.addedDefectTypeIds;
            this.supplierMeasurementSubmissionId = supplierSapBasedParameter.supplierMeasurementSubmissionId;


        } else {
            this.name = Constants.Empty;
            this.certificateTypeParameterId = Numbers.Default;
            this.certificateTypeParameter = null;
            this.sapRequest = Constants.Empty;
            this.physicalInspection = Constants.Empty;
            this.matchId = 0;
            this.matchResult = Constants.Empty;
            this.defectTypes = [];
            this.defectType = Constants.Empty;
            this.addedDefectTypeIds = [];
            this.supplierMeasurementSubmissionId = Numbers.Default;
        }
    }
}
