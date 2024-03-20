
import { DisplayColumn, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { Constants } from 'src/app/shared/constant/global';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';
import { UOM } from '../../uom/uom';
import { InstrumentType } from '../../instrument-type/instrument-type';
import { ChartType } from '../../chart-type/chart-type';

export class FunParameterModel {
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








    constructor(funParameterModel?: FunParameterModel) {
        if (funParameterModel) {
            this.parameterManagement = funParameterModel.parameterManagement;
            this.parameterName = funParameterModel.parameterManagement.name;
            this.parameterManagementId = funParameterModel.parameterManagementId;
            this.uom = funParameterModel.uom;
            this.uomId = funParameterModel.uomId;
            this.normalValue = funParameterModel.normalValue;
            this.upperTolerance = funParameterModel.upperTolerance;
            this.lowerTolerance = funParameterModel.lowerTolerance;
            this.instrumentType = funParameterModel.instrumentType;
            this.instrumentTypeId = funParameterModel.instrumentTypeId;
            this.accuracy = funParameterModel.accuracy;
            this.unit = funParameterModel.unit;
            this.instrumentTypeCode = funParameterModel.instrumentTypeCode;
            this.dataType = funParameterModel.dataType;
            this.dataTypeId = funParameterModel.dataTypeId;
            this.chartTypeId = funParameterModel.chartTypeId;
            this.chartType = funParameterModel.chartType;
            this.calculationPoint = funParameterModel.calculationPoint;
            this.chartTypeName = funParameterModel.chartTypeName;

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
