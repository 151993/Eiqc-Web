
import { DisplayColumn, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { PartDimension } from '../../part-dimension/part-dimension';

export class MPositionToleranceModel {
    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })

    id: number;

    @DisplayColumn('ParameterName', { type: ColumnType.Status, mappingField: 'name' })
    parameterManagement: ParameterManagement;

    @FormInput()
    parameterManagementId: number;

    @DisplayColumn('DimensionNumber', { type: ColumnType.Status, mappingField: 'name' })
    partDimension: PartDimension;

    @FormInput()
    partDimensionId: number;

    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })

    @DisplayColumn('Unit', { type: ColumnType.Status, mappingField: 'name' })
    uom: UOM;

    @FormInput()
    uomId: number;

    @FormInput()
    @DisplayColumn('SpecLimitAtMMC')
    specLimitAtMMC: number;

    @FormInput()
    @DisplayColumn('SpecLimitAtLMC')
    specLimitAtLMC: number;

    @FormInput()
    @DisplayColumn('Spec')
    spec: number;

    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })

    @DisplayColumn('InstrumentType', { type: ColumnType.Status, mappingField: 'code' })
    instrumentType: InstrumentType;

    @FormInput()
    instrumentTypeId: number;

    @DisplayColumn('ParameterName')
    parameterName: string;

    @DisplayColumn('DimensionNumber')
    dimensionNumber: string;

    @DisplayColumn('Unit')
    unit: string;

    @DisplayColumn('instrumentTypeCode')
    instrumentTypeCode: string;

    @FormInput()
    dataTypeId: number;

    @FormInput()
    @DisplayColumn('DataType')
    dataType: string;


    constructor(mPositionToleranceModel?: MPositionToleranceModel) {
        if (mPositionToleranceModel) {
            this.parameterManagement = mPositionToleranceModel.parameterManagement;
            this.parameterName = mPositionToleranceModel.parameterManagement.name;
            this.parameterManagementId = mPositionToleranceModel.parameterManagementId;
            this.partDimension = mPositionToleranceModel.partDimension;
            this.dimensionNumber = mPositionToleranceModel.partDimension.name;
            this.partDimensionId = mPositionToleranceModel.partDimensionId;
            this.uom = mPositionToleranceModel.uom;
            this.uomId = mPositionToleranceModel.uomId;
            this.specLimitAtMMC = mPositionToleranceModel.specLimitAtMMC;
            this.specLimitAtLMC = mPositionToleranceModel.specLimitAtLMC;
            this.spec = mPositionToleranceModel.spec;
            this.instrumentType = mPositionToleranceModel.instrumentType;
            this.instrumentTypeId = mPositionToleranceModel.instrumentTypeId;
            this.unit = mPositionToleranceModel.unit;
            this.instrumentTypeCode = mPositionToleranceModel.instrumentTypeCode;
            this.dataType = mPositionToleranceModel.dataType;
            this.dataTypeId = mPositionToleranceModel.dataTypeId;
            this.id = mPositionToleranceModel.id;

        } else {
            this.parameterManagement = null;
            this.parameterName = Constants.Empty;
            this.parameterManagementId = 0;
            this.partDimension = null;
            this.dimensionNumber = Constants.Empty;
            this.partDimensionId = 0;
            this.uom = null;
            this.uomId = 0;
            this.specLimitAtMMC = 0;
            this.specLimitAtLMC = 0;
            this.spec = 0;
            this.instrumentType = null;
            this.instrumentTypeId = 0;
            this.unit = Constants.Empty;
            this.instrumentTypeCode = Constants.Empty;
            this.dataType = null;
            this.dataTypeId = 0;
            this.id = Numbers.Default;
        }
    }
}
