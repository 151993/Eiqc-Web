
import { DisplayColumn, FormInput, ExpandSelect, Trim, Expand } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { Instrument } from '../../instrument/instrument';
import { SupplierDimensionMeasurementActual } from '../supplier-dimension-measurement-actual/supplier-dimension-measurement-actual-model';
import { SupplierSpcChartCalculation } from '../supplier-spc-chart-calculation/supplier-spc-chart-calculation';
import { ChartType } from '../../chart-type/chart-type';

export class SupplierDimensionMeasurementModel {

    @FormInput()
    supplierMeasurementSubmissionId: number;

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
    normalValue: number;

    @FormInput()
    @DisplayColumn('UpperTolerance')
    upperTolerance: number;

    @FormInput()
    @DisplayColumn('LowerTolerance')
    lowerTolerance: number;

    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'IsEnabled']
    })

    @DisplayColumn('InstrumentType', { type: ColumnType.Status, mappingField: 'code' })
    instrumentType: InstrumentType;

    @FormInput()
    instrumentTypeId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('Instrument', { type: ColumnType.Status, mappingField: 'instrumentNo' })
    instrument: Instrument;

    @FormInput()
    instrumentId?: number;

    @FormInput()
    @DisplayColumn('Accuracy')

    accuracy: number;
    @DisplayColumn('ParameterName')

    parameterName: string;
    @DisplayColumn('Unit')

    unit: string;
    @DisplayColumn('instrumentTypeCode')
    instrumentTypeCode: string;

    @Trim()
    @FormInput()
    @DisplayColumn('InstrumentNo', { type: ColumnType.ColumnValueBasedDynamicType, mappingField: 'instrumentNo' })
    instrumentNo: string;

    @FormInput()
    dataTypeId: number;

    @FormInput()
    @DisplayColumn('DataType')
    dataType: string;

    supplierDimensionMeasurementActuals: SupplierDimensionMeasurementActual[] = [];

    @DisplayColumn('Cpk', { type: ColumnType.ColorLabel, mappingField: 'cpk' }, true, false, null, null, 'CPK value calculated based on 30 measurement points')
    @FormInput()
    cpk: number;

    @FormInput()
    @ExpandSelect({
        select: ['Id', 'Name', 'description', 'IsEnabled']
    })
    @DisplayColumn('ChartType', { type: ColumnType.Status, mappingField: 'description' })
    chartType: ChartType;


    isLableWarning: boolean;

    ucl: number;

    lcl: number;

    cpkU: number;

    cpkL: number;

    averageValueFor25SMS: number;

    averageValueFor30SMS: number;

    chartTypeId: number;

    plotValues: SupplierSpcChartCalculation[];

    constructor(supplierDimensionMeasurementModel?: SupplierDimensionMeasurementModel) {
        if (supplierDimensionMeasurementModel) {
            this.supplierMeasurementSubmissionId = supplierDimensionMeasurementModel.supplierMeasurementSubmissionId;
            this.parameterManagement = supplierDimensionMeasurementModel.parameterManagement;
            this.parameterName = supplierDimensionMeasurementModel.parameterManagement.name;
            this.parameterManagementId = supplierDimensionMeasurementModel.parameterManagementId;
            this.uom = supplierDimensionMeasurementModel.uom;
            this.uomId = supplierDimensionMeasurementModel.uomId;
            this.normalValue = supplierDimensionMeasurementModel.normalValue;
            this.upperTolerance = supplierDimensionMeasurementModel.upperTolerance;
            this.lowerTolerance = supplierDimensionMeasurementModel.lowerTolerance;
            this.instrumentType = supplierDimensionMeasurementModel.instrumentType;
            this.instrumentTypeId = supplierDimensionMeasurementModel.instrumentTypeId;
            this.instrument = supplierDimensionMeasurementModel.instrument;
            this.instrumentId = supplierDimensionMeasurementModel.instrumentId;
            this.accuracy = supplierDimensionMeasurementModel.accuracy;
            this.unit = supplierDimensionMeasurementModel.unit;
            this.instrumentTypeCode = supplierDimensionMeasurementModel.instrumentTypeCode;
            this.dataType = supplierDimensionMeasurementModel.dataType;
            this.dataTypeId = supplierDimensionMeasurementModel.dataTypeId;
            this.supplierDimensionMeasurementActuals = supplierDimensionMeasurementModel.supplierDimensionMeasurementActuals;
            this.cpk = supplierDimensionMeasurementModel.cpk;
            this.ucl = supplierDimensionMeasurementModel.ucl;
            this.lcl = supplierDimensionMeasurementModel.lcl;
            this.cpkU = supplierDimensionMeasurementModel.cpkU;
            this.cpkL = supplierDimensionMeasurementModel.cpkL;
            this.isLableWarning = supplierDimensionMeasurementModel.isLableWarning;
            this.averageValueFor25SMS = supplierDimensionMeasurementModel.averageValueFor25SMS;
            this.averageValueFor30SMS = supplierDimensionMeasurementModel.averageValueFor30SMS;
            this.chartTypeId = supplierDimensionMeasurementModel.chartTypeId;
            this.plotValues = supplierDimensionMeasurementModel.plotValues;
            this.chartType = supplierDimensionMeasurementModel.chartType;
        } else {
            this.supplierMeasurementSubmissionId = null;
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
            this.instrument = null;
            this.instrumentId = null;
            this.accuracy = Numbers.Default;
            this.unit = Constants.Empty;
            this.instrumentTypeCode = Constants.Empty;
            this.dataType = null;
            this.dataTypeId = Numbers.Default;
            this.supplierDimensionMeasurementActuals = [];
            this.cpk = Numbers.Default;
            this.ucl = Numbers.Default;
            this.lcl = Numbers.Default;
            this.cpkU = Numbers.Default;
            this.cpkL = Numbers.Default;
            this.isLableWarning = false;
            this.averageValueFor25SMS = Numbers.Default;
            this.averageValueFor30SMS = Numbers.Default;
            this.chartTypeId = Numbers.Default;
            this.plotValues = [];
            this.chartType = null;
        }
    }
}

