
import { DisplayColumn, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { ChartType } from '../../chart-type/chart-type';


export class MicroSectionParameterModel {
    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })

    @DisplayColumn('ParameterName', { type: ColumnType.Status, mappingField: 'name' })
    parameterManagement: ParameterManagement;

    @FormInput()
    parameterManagementId: number;

    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })
    @DisplayColumn('Unit', { type: ColumnType.Status, mappingField: 'name' })
    uom: UOM;

    @FormInput()
    uomId: number;

    @FormInput()
    @DisplayColumn('NormalValue')
    normalValue: any;

    @FormInput()
    @DisplayColumn('UpperTolerance')
    upperTolerance: any;

    @FormInput()
    @DisplayColumn('LowerTolerance')
    lowerTolerance: any;

    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })
    @DisplayColumn('InstrumentType', { type: ColumnType.Status, mappingField: 'code' })
    instrumentType: InstrumentType;

    @FormInput()
    instrumentTypeId: number;

    @FormInput()
    @DisplayColumn('Accuracy')
    accuracy: number;

    @DisplayColumn('ParameterName')
    parameterName: string;

    @DisplayColumn('Unit')
    unit: string;

    @DisplayColumn('instrumentTypeCode')
    instrumentTypeCode: string;

    @FormInput()
    dataTypeId: number;

    @FormInput()
    @DisplayColumn('DataType')
    dataType: string;

    chartTypeId: number;

    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'description', 'IsEnabled']
    })
    @DisplayColumn('ChartType', { type: ColumnType.Status, mappingField: 'description' })
    chartType: ChartType;


    @DisplayColumn('ChartType')
    chartTypeName: string;

    @FormInput()
    @DisplayColumn('CalculationPoint')
    calculationPoint: number;



    constructor(microSectionParameterModel?: MicroSectionParameterModel) {
        if (microSectionParameterModel) {
            this.parameterManagement = microSectionParameterModel.parameterManagement;
            this.parameterName = microSectionParameterModel.parameterManagement.name;
            this.parameterManagementId = microSectionParameterModel.parameterManagementId;
            this.uom = microSectionParameterModel.uom;
            this.uomId = microSectionParameterModel.uomId;
            this.normalValue = microSectionParameterModel.normalValue;
            this.upperTolerance = microSectionParameterModel.upperTolerance;
            this.lowerTolerance = microSectionParameterModel.lowerTolerance;
            this.instrumentType = microSectionParameterModel.instrumentType;
            this.instrumentTypeId = microSectionParameterModel.instrumentTypeId;
            this.accuracy = microSectionParameterModel.accuracy;
            this.unit = microSectionParameterModel.unit;
            this.instrumentTypeCode = microSectionParameterModel.instrumentTypeCode;
            this.dataType = microSectionParameterModel.dataType;
            this.dataTypeId = microSectionParameterModel.dataTypeId;
            this.chartTypeId = microSectionParameterModel.chartTypeId;
            this.chartType = microSectionParameterModel.chartType;
            this.calculationPoint = microSectionParameterModel.calculationPoint;
            this.chartTypeName = microSectionParameterModel.chartTypeName;

        } else {
            this.parameterManagement = null;
            this.parameterName = Constants.Empty;
            this.parameterManagementId = Numbers.Default;
            this.uom = null;
            this.uomId = Numbers.Default;
            this.normalValue = Numbers.Default;
            this.upperTolerance = Numbers.Default;
            this.lowerTolerance = Numbers.Default;
            this.instrumentType = null;
            this.instrumentTypeId = Numbers.Default;
            this.accuracy = Numbers.Default;
            this.unit = Constants.Empty;
            this.instrumentTypeCode = Constants.Empty;
            this.dataType = null;
            this.dataTypeId = Numbers.Default;
            this.chartTypeId = Numbers.Default;
            this.chartType = null;
            this.calculationPoint = Numbers.Default;
            this.chartTypeName = Constants.Empty;

        }
    }
}
