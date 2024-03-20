
import { DisplayColumn, FormInput, ExpandSelect, Trim, Expand } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { Instrument } from '../../instrument/instrument';
import { BaseModel } from '../../base/base-model';
import { SupplierMicroSectionActual } from './supplier-micro-section-actual';
import { ChartType } from '../../chart-type/chart-type';
import { SupplierSpcChartCalculation } from '../supplier-spc-chart-calculation/supplier-spc-chart-calculation';


export class SupplierMicroSectionParameterLabelModel {

  @FormInput()
  supplierMeasurementSubmissionId: number;

  @FormInput()
  @ExpandSelect({
    select: ['Id', 'Name', 'IsEnabled']
  })

  @DisplayColumn('ParameterName', { type: ColumnType.String, mappingField: 'name' })
  parameterManagement: ParameterManagement;

  @FormInput()
  parameterManagementId: number;

  @FormInput()
  @ExpandSelect({
    select: ['Id', 'Name', 'IsEnabled']
  })

  @DisplayColumn('Unit', { type: ColumnType.String, mappingField: 'name' })
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

  @DisplayColumn('InstrumentType', { type: ColumnType.String, mappingField: 'code' })
  instrumentType: InstrumentType;

  @FormInput()
  instrumentTypeId: number;

  @FormInput()
  @Expand()
  @DisplayColumn('Instrument', { type: ColumnType.String, mappingField: 'instrumentNo' })
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
  @DisplayColumn('InstrumentNo', { type: ColumnType.String, mappingField: 'instrumentNo' }, true)
  instrumentNo: string;

  @FormInput()
  @DisplayColumn('InstrumentNo')
  instrumentNumber: string;

  @FormInput()
  dataTypeId: number;

  @FormInput()
  @DisplayColumn('DataType')
  dataType: string;

  @FormInput()
  @DisplayColumn('CPK', { type: ColumnType.ColorLabel, mappingField: 'cpk' })
  cpk: number;


  @FormInput()
  @ExpandSelect({
    select: ['Id', 'Name', 'description', 'IsEnabled']
  })
  @DisplayColumn('ChartType', { type: ColumnType.Status, mappingField: 'description' })
  chartType: ChartType;


  supplierMicroSectionActuals: SupplierMicroSectionActual[] = [];

  plotValues: SupplierSpcChartCalculation[];

  isLableWarning: boolean;

  ucl: number;

  lcl: number;

  cpkU: number;

  cpkL: number;

  averageValueFor25SMS: number;

  averageValueFor30SMS: number;

  chartTypeId: number;

  rangeXBarUclR: number;
  rangeXBarLclR: number;
  rangeBarAverageFor30: number;

  constructor(microSectionParameterModel?: SupplierMicroSectionParameterLabelModel) {
    if (microSectionParameterModel) {
      this.supplierMeasurementSubmissionId = microSectionParameterModel.supplierMeasurementSubmissionId;
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
      this.instrument = microSectionParameterModel.instrument;
      this.instrumentId = microSectionParameterModel.instrumentId;
      this.accuracy = microSectionParameterModel.accuracy;
      this.unit = microSectionParameterModel.unit;
      this.instrumentTypeCode = microSectionParameterModel.instrumentTypeCode;
      this.dataType = microSectionParameterModel.dataType;
      this.dataTypeId = microSectionParameterModel.dataTypeId;
      this.supplierMicroSectionActuals = microSectionParameterModel.supplierMicroSectionActuals;
      this.instrumentNumber = microSectionParameterModel.instrumentNumber;
      this.cpk = microSectionParameterModel.cpk;
      this.ucl = microSectionParameterModel.ucl;
      this.lcl = microSectionParameterModel.lcl;
      this.cpkU = microSectionParameterModel.cpkU;
      this.cpkL = microSectionParameterModel.cpkL;
      this.isLableWarning = microSectionParameterModel.isLableWarning;
      this.averageValueFor25SMS = microSectionParameterModel.averageValueFor25SMS;
      this.averageValueFor30SMS = microSectionParameterModel.averageValueFor30SMS;
      this.chartTypeId = microSectionParameterModel.chartTypeId;
      this.rangeXBarUclR = microSectionParameterModel.rangeXBarUclR;
      this.rangeXBarLclR = microSectionParameterModel.rangeXBarLclR;
      this.rangeBarAverageFor30 = microSectionParameterModel.rangeBarAverageFor30;
      this.plotValues = microSectionParameterModel.plotValues;
      this.chartType = microSectionParameterModel.chartType;


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
      this.supplierMicroSectionActuals = [];
      this.instrumentNumber = Constants.Empty;
      this.cpk = Numbers.Default;
      this.ucl = Numbers.Default;
      this.lcl = Numbers.Default;
      this.cpkU = Numbers.Default;
      this.cpkL = Numbers.Default;
      this.isLableWarning = false;
      this.averageValueFor25SMS = Numbers.Default;
      this.averageValueFor30SMS = Numbers.Default;
      this.chartTypeId = Numbers.Default;
      this.rangeXBarUclR = Numbers.Default;
      this.rangeXBarLclR = Numbers.Default;
      this.rangeBarAverageFor30 = Numbers.Default;
      this.plotValues = [];
      this.chartType = null;
    }
  }
}


export class SupplierMicroSectionParameterLabelModelColumns extends BaseModel {

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
  @DisplayColumn('NominalValue')
  normalValue: number;

  @FormInput()
  @DisplayColumn('UpperLimit')
  upperTolerance: number;

  @FormInput()
  @DisplayColumn('LowerLimit')
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
  // @DisplayColumn('Instrument', { type: ColumnType.Status, mappingField: 'instrumentNo' })
  instrument: Instrument;

  @FormInput()
  instrumentId: number;

  @FormInput()
  @DisplayColumn('Accuracy')

  accuracy: number;

  // @DisplayColumn('ParameterName')
  parameterName: string;
  // @DisplayColumn('Unit')
  unit: string;
  // @DisplayColumn('instrumentTypeCode')
  instrumentTypeCode: string;

  @Trim()
  @FormInput()
  @DisplayColumn('InstrumentNo', { type: ColumnType.String, mappingField: 'instrumentNo' }, true, true, null)
  instrumentNo: string;

  @FormInput()
  @DisplayColumn('InstrumentNo', {}, false)
  instrumentNumber: string;

  @FormInput()
  dataTypeId: number;

  @FormInput()
  @DisplayColumn('DataType')
  dataType: string;

  supplierMicroSectionActuals: SupplierMicroSectionActual[] = [];

  isDisabled: boolean;

  @FormInput()
  @DisplayColumn('Cpk', { type: ColumnType.ColorLabel, mappingField: 'cpk' }, true, false, null, null, 'CPK value calculated based on 30 measurement points')
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


  constructor(microSectionParameterModel?: SupplierMicroSectionParameterLabelModelColumns) {
    super(microSectionParameterModel);
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
      this.instrument = microSectionParameterModel.instrument;
      this.instrumentId = microSectionParameterModel.instrumentId;
      this.accuracy = microSectionParameterModel.accuracy;
      this.unit = microSectionParameterModel.unit;
      this.instrumentTypeCode = microSectionParameterModel.instrumentTypeCode;
      this.dataType = microSectionParameterModel.dataType;
      this.dataTypeId = microSectionParameterModel.dataTypeId;
      this.supplierMicroSectionActuals = microSectionParameterModel.supplierMicroSectionActuals;
      this.isDisabled = microSectionParameterModel.isDisabled;
      this.instrumentNumber = microSectionParameterModel.instrumentNo;
      this.cpk = microSectionParameterModel.cpk;
      this.isLableWarning = microSectionParameterModel.isLableWarning;
      this.ucl = microSectionParameterModel.ucl;
      this.lcl = microSectionParameterModel.lcl;
      this.cpkU = microSectionParameterModel.cpkU;
      this.cpkL = microSectionParameterModel.cpkL;
      this.averageValueFor25SMS = microSectionParameterModel.averageValueFor25SMS;
      this.averageValueFor30SMS = microSectionParameterModel.averageValueFor30SMS;
      this.chartTypeId = microSectionParameterModel.chartTypeId;
      this.plotValues = microSectionParameterModel.plotValues;
      this.chartType = microSectionParameterModel.chartType;

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
      this.instrument = null;
      this.instrumentId = 0;
      this.accuracy = 0;
      this.unit = Constants.Empty;
      this.instrumentTypeCode = Constants.Empty;
      this.dataType = null;
      this.dataTypeId = 0;
      this.supplierMicroSectionActuals = [];
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
