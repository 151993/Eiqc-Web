
import { DisplayColumn, FormInput, ExpandSelect, Trim, Expand } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { Instrument } from '../../instrument/instrument';
import { SupplierFunctionVariableActual } from '../supplier-function-variable-actual/supplier-function-variable-actual-model';
import { SupplierSpcChartCalculation } from '../supplier-spc-chart-calculation/supplier-spc-chart-calculation';
import { ChartType } from '../../chart-type/chart-type';

export class SupplierFunctionVariableLabelModel {

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
    @DisplayColumn('Instrument', { type: ColumnType.Status, mappingField: 'instrumentNo' }, false, true, null)
    instrument: Instrument;


    @FormInput()
    @DisplayColumn('InstrumentNo')
    instrumentNumber: string;


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

    supplierFunctionVariableActuals: SupplierFunctionVariableActual[] = [];

    isDisabled: boolean;

    @FormInput()
    @DisplayColumn('Cpk', { type: ColumnType.ColorLabel, mappingField: 'cpk' })
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

    constructor(supplierFunctionVariableModel?: SupplierFunctionVariableLabelModel) {
        if (supplierFunctionVariableModel) {
            this.supplierMeasurementSubmissionId = supplierFunctionVariableModel.supplierMeasurementSubmissionId;
            this.parameterManagement = supplierFunctionVariableModel.parameterManagement;
            this.parameterName = supplierFunctionVariableModel.parameterManagement.name;
            this.parameterManagementId = supplierFunctionVariableModel.parameterManagementId;
            this.uom = supplierFunctionVariableModel.uom;
            this.uomId = supplierFunctionVariableModel.uomId;
            this.normalValue = supplierFunctionVariableModel.normalValue;
            this.upperTolerance = supplierFunctionVariableModel.upperTolerance;
            this.lowerTolerance = supplierFunctionVariableModel.lowerTolerance;
            this.instrumentType = supplierFunctionVariableModel.instrumentType;
            this.instrumentTypeId = supplierFunctionVariableModel.instrumentTypeId;
            this.instrument = supplierFunctionVariableModel.instrument;
            this.instrumentId = supplierFunctionVariableModel.instrumentId;
            this.accuracy = supplierFunctionVariableModel.accuracy;
            this.unit = supplierFunctionVariableModel.unit;
            this.instrumentTypeCode = supplierFunctionVariableModel.instrumentTypeCode;
            this.dataType = supplierFunctionVariableModel.dataType;
            this.dataTypeId = supplierFunctionVariableModel.dataTypeId;
            this.supplierFunctionVariableActuals = supplierFunctionVariableModel.supplierFunctionVariableActuals;
            this.isDisabled = supplierFunctionVariableModel.isDisabled;
            this.instrumentNumber = supplierFunctionVariableModel.instrumentNo;
            this.cpk = supplierFunctionVariableModel.cpk;
            this.isLableWarning = supplierFunctionVariableModel.isLableWarning;
            this.ucl = supplierFunctionVariableModel.ucl;
            this.lcl = supplierFunctionVariableModel.lcl;
            this.cpkU = supplierFunctionVariableModel.cpkU;
            this.cpkL = supplierFunctionVariableModel.cpkL;
            this.averageValueFor25SMS = supplierFunctionVariableModel.averageValueFor25SMS;
            this.averageValueFor30SMS = supplierFunctionVariableModel.averageValueFor30SMS;
            this.chartTypeId = supplierFunctionVariableModel.chartTypeId;
            this.plotValues = supplierFunctionVariableModel.plotValues;
            this.chartType = supplierFunctionVariableModel.chartType;


        } else {
            this.supplierMeasurementSubmissionId = null;
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
            this.instrument = null;
            this.instrumentId = null;
            this.accuracy = 0;
            this.unit = Constants.Empty;
            this.instrumentTypeCode = Constants.Empty;
            this.dataType = null;
            this.dataTypeId = 0;
            this.supplierFunctionVariableActuals = [];
            this.isDisabled = false;
            this.instrumentNumber = Constants.Empty;
            this.cpk = Numbers.Default;
            this.isLableWarning = false;
            this.ucl = Numbers.Default;
            this.lcl = Numbers.Default;
            this.cpkU = Numbers.Default;
            this.cpkL = Numbers.Default;
            this.averageValueFor25SMS = Numbers.Default;
            this.averageValueFor30SMS = Numbers.Default;
            this.chartTypeId = Numbers.Default;
            this.plotValues = [];
            this.chartType = null;
        }
    }
}

