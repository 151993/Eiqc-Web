
import { DisplayColumn, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { PartDimension } from '../../part-dimension/part-dimension';


export class LPositionToleranceModel {
    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })

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

    id: number;

    constructor(lPositionToleranceModel?: LPositionToleranceModel) {
        if (lPositionToleranceModel) {
            this.id = lPositionToleranceModel.id;
            this.parameterManagement = lPositionToleranceModel.parameterManagement;
            this.parameterName = lPositionToleranceModel.parameterManagement.name;
            this.parameterManagementId = lPositionToleranceModel.parameterManagementId;
            this.partDimension = lPositionToleranceModel.partDimension;
            this.dimensionNumber = lPositionToleranceModel.partDimension.name;
            this.partDimensionId = lPositionToleranceModel.partDimensionId;
            this.uom = lPositionToleranceModel.uom;
            this.uomId = lPositionToleranceModel.uomId;
            this.specLimitAtMMC = lPositionToleranceModel.specLimitAtMMC;
            this.specLimitAtLMC = lPositionToleranceModel.specLimitAtLMC;
            this.spec = lPositionToleranceModel.spec;
            this.instrumentType = lPositionToleranceModel.instrumentType;
            this.instrumentTypeId = lPositionToleranceModel.instrumentTypeId;
            this.unit = lPositionToleranceModel.unit;
            this.instrumentTypeCode = lPositionToleranceModel.instrumentTypeCode;
            this.dataType = lPositionToleranceModel.dataType;
            this.dataTypeId = lPositionToleranceModel.dataTypeId;

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
