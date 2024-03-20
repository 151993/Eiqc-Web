
import { DisplayColumn, FormInput, ExpandSelect, Trim, Expand } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { Instrument } from '../../instrument/instrument';
import { BaseModel } from '../../base/base-model';
import { SupplierMicroSectionActual } from './supplier-micro-section-actual';
import { SupplierSpcChartCalculation } from '../supplier-spc-chart-calculation/supplier-spc-chart-calculation';
import { ChartType } from '../../chart-type/chart-type';


export class SupplierMicroSectionParameterModel {

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

  @DisplayColumn('Cpk', { type: ColumnType.ColorLabel, mappingField: 'cpk' })
  @FormInput()
  cpk: number;

  supplierMicroSectionActuals: SupplierMicroSectionActual[] = [];

  isLableWarning: boolean;

  ucl: number;

  lcl: number;

  cpkU: number;

  cpkL: number;

  average25: number;

  average30: number;

  chartTypeId: number;

  constructor(microSectionParameterModel?: SupplierMicroSectionParameterModel) {
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
      this.cpk = microSectionParameterModel.cpk;
      this.ucl = microSectionParameterModel.ucl;
      this.lcl = microSectionParameterModel.lcl;
      this.cpkU = microSectionParameterModel.cpkU;
      this.cpkL = microSectionParameterModel.cpkL;
      this.isLableWarning = microSectionParameterModel.isLableWarning;
      this.average25 = microSectionParameterModel.average25;
      this.average30 = microSectionParameterModel.average30;
      this.chartTypeId = microSectionParameterModel.chartTypeId;
    } else {
      this.supplierMeasurementSubmissionId = null;
      this.parameterManagement = null;
      this.parameterName = Constants.Empty;
      this.parameterManagementId = 0;
      this.uom = null;
      this.uomId = 0;
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
      this.supplierMicroSectionActuals = [];
      this.cpk = Numbers.Default;
      this.ucl = Numbers.Default;
      this.lcl = Numbers.Default;
      this.cpkU = Numbers.Default;
      this.cpkL = Numbers.Default;
      this.isLableWarning = false;
      this.average25 = Numbers.Default;
      this.average30 = Numbers.Default;
      this.chartTypeId = Numbers.Default;
    }
  }
}


export class SupplierMicroSectionParameterModelColumns extends BaseModel {

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
  @DisplayColumn('InstrumentNo', { type: ColumnType.ColumnValueBasedDynamicType, mappingField: 'instrumentNo' })
  instrumentNo: string;

  @FormInput()
  dataTypeId: number;

  @FormInput()
  @DisplayColumn('DataType')
  dataType: string;

  @FormInput()
  @DisplayColumn('Cpk', { type: ColumnType.ColorLabel, mappingField: 'cpk' }, true, false, null, null, 'CPK value calculated based on 30 measurement points')
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

  constructor(microSectionParameterModel?: SupplierMicroSectionParameterModelColumns) {
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
      this.instrumentId = Numbers.Default;
      this.accuracy = Numbers.Default;
      this.unit = Constants.Empty;
      this.instrumentTypeCode = Constants.Empty;
      this.dataType = null;
      this.dataTypeId = Numbers.Default;
      this.supplierMicroSectionActuals = [];
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
