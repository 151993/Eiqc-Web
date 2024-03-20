
import { DisplayColumn, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { Constants } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { ChartType } from '../../chart-type/chart-type';


export class MeasurementParameterModel {
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


    constructor(measurementParameterModel?: MeasurementParameterModel) {
        if (measurementParameterModel) {
            this.parameterManagement = measurementParameterModel.parameterManagement;
            this.parameterName = measurementParameterModel.parameterManagement.name;
            this.parameterManagementId = measurementParameterModel.parameterManagementId;
            this.uom = measurementParameterModel.uom;
            this.uomId = measurementParameterModel.uomId;
            this.normalValue = measurementParameterModel.normalValue;
            this.upperTolerance = measurementParameterModel.upperTolerance;
            this.lowerTolerance = measurementParameterModel.lowerTolerance;
            this.instrumentType = measurementParameterModel.instrumentType;
            this.instrumentTypeId = measurementParameterModel.instrumentTypeId;
            this.accuracy = measurementParameterModel.accuracy;
            this.unit = measurementParameterModel.unit;
            this.instrumentTypeCode = measurementParameterModel.instrumentTypeCode;
            this.dataType = measurementParameterModel.dataType;
            this.dataTypeId = measurementParameterModel.dataTypeId;
            this.chartTypeId = measurementParameterModel.chartTypeId;
            this.chartType = measurementParameterModel.chartType;
            this.calculationPoint = measurementParameterModel.calculationPoint;
            this.chartTypeName = measurementParameterModel.chartTypeName;

        } else {
            this.parameterManagement = null;
            this.parameterName = Constants.Empty;
            this.parameterManagementId = 0;
            this.uom = null;
            this.uomId = 0;
            this.normalValue = 0;
            this.upperTolerance = 0;
            this.lowerTolerance = 0;
            this.instrumentType = null;
            this.instrumentTypeId = 0;
            this.accuracy = 0;
            this.unit = Constants.Empty;
            this.instrumentTypeCode = Constants.Empty;
            this.dataType = null;
            this.dataTypeId = 0;
            this.chartTypeId = 0;
            this.chartType = null;
            this.calculationPoint = 0;
            this.chartTypeName = Constants.Empty;
        }
    }
}
