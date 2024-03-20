
import { Expand, DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { SupplierMeasurementSubmission } from '../supplier-measurement-submission/supplier-measurement-submission';

import { PartMPositionTolerance } from '../part-m-position-tolerance/part-m-position-tolerance';

import { ParameterManagement } from '../parameter-management/parameter-management';

import { PartDimension } from '../part-dimension/part-dimension';

import { Instrument } from '../instrument/instrument';

import { InstrumentType } from '../instrument-type/instrument-type';
import { ColumnType } from '../table/table';
import { DimensionDefault } from '../dimension-default/dimension-default';
import { SupplierMPositionActual } from '../supplier-m-position-actual/supplier-m-position-actual';


export class SupplierMPosition extends BaseModel {

    @FormInput()
    supplierMPositionId: number;

    @FormInput()
    @Expand()
    // @DisplayColumn('SupplierMeasurementSubmission', { type: ColumnType.Status, mappingField: 'name' })
    supplierMeasurementSubmission: SupplierMeasurementSubmission;

    @FormInput()
    // @DisplayColumn('SupplierMeasurementSubmissionId')
    supplierMeasurementSubmissionId: number;

    @FormInput()
    @Expand()
   // @DisplayColumn('PartMPositionTolerance', { type: ColumnType.Status, mappingField: 'name' })
    partMPositionTolerance: PartMPositionTolerance;

    @FormInput()
    // @DisplayColumn('PartMPositionToleranceId')
    partMPositionToleranceId: number;

    @FormInput()
    parameterManagementId: number;

    @FormInput()
    @Expand()
    partDimension: PartDimension;

    @FormInput()
    partDimensionId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('ParameterName', { type: ColumnType.Status, mappingField: 'name' })
    parameterManagement: ParameterManagement;


    @DisplayColumn('DimensionNumber')
    dimensionNumber: string;

    @FormInput()
    @DisplayColumn('SpecLimitAtMMC')
    specLimitAtMMC: number;

    @FormInput()
    @DisplayColumn('SpecLimitAtLMC')
    specLimitAtLMC: number;

    @DisplayColumn('Spec')
    spec: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Unit', { type: ColumnType.MultipleDropDownTableDynamicType, mappingField: 'name' }, true, false, null, 'uomId')
    unit: string;


    @Trim()
    @FormInput()
    @DisplayColumn('InstrumentType', { type: ColumnType.MultipleDropDownTableDynamicType, mappingField: 'code' }, true, false, null, 'instrumentTypeId')
    instrumentTypeCode: string;

    @FormInput()
    instrument: Instrument;

    @DisplayColumn('InstrumentNo', { type: ColumnType.ColumnValueBasedDynamicType, mappingField: 'instrumentNo' })
    instrumentNo: string;

    @DisplayColumn('DataType')
    dataType: string;

    @FormInput()
    uomId: number;

    @FormInput()
    instrumentId: number;

    @FormInput()
    @Expand()
    dimensionDefault: DimensionDefault;

    @FormInput()
    instrumentTypeId: number;

    @FormInput()
    statusTypeId: number;

    @FormInput()
    dimensionDefaultId: number;

    @FormInput()
    @Expand()
    associatedDimensionDefault: DimensionDefault;

    @FormInput()
    associatedDimensionNumberId: number;

    isEnabled: boolean;

    enableRowEdit: boolean;

    supplierMPositionActuals: SupplierMPositionActual[];

    instrumentType: InstrumentType;

    isTextBoxDisabled: boolean;

    isDropDownDisabled: boolean;

    mainRowId: number;

    constructor(supplierMPosition?: SupplierMPosition) {
        super(supplierMPosition);

        if (supplierMPosition) {
            this.supplierMPositionId = supplierMPosition.supplierMPositionId;
            this.supplierMeasurementSubmission = supplierMPosition.supplierMeasurementSubmission;
            this.supplierMeasurementSubmissionId = supplierMPosition.supplierMeasurementSubmissionId;
            this.partMPositionTolerance = supplierMPosition.partMPositionTolerance;
            this.partMPositionToleranceId = supplierMPosition.partMPositionToleranceId;
            this.parameterManagement = supplierMPosition.parameterManagement;
            this.parameterManagementId = supplierMPosition.parameterManagementId;
            this.partDimension = supplierMPosition.partDimension;
            this.partDimensionId = supplierMPosition.partDimensionId;
            this.dimensionDefault = supplierMPosition.dimensionDefault;
            this.dimensionDefaultId = supplierMPosition.dimensionDefaultId;
            this.associatedDimensionDefault = supplierMPosition.associatedDimensionDefault;
            this.associatedDimensionNumberId = supplierMPosition.associatedDimensionNumberId;
            this.unit = supplierMPosition.unit;
            this.uomId = supplierMPosition.uomId;
            this.instrument = supplierMPosition.instrument;
            this.instrumentId = supplierMPosition.instrumentId;
            this.instrumentType = supplierMPosition.instrumentType;
            this.instrumentTypeId = supplierMPosition.instrumentTypeId;
            this.statusTypeId = supplierMPosition.statusTypeId;
            this.spec = supplierMPosition.spec;
            this.dataType = supplierMPosition.dataType;
            this.specLimitAtMMC = supplierMPosition.specLimitAtMMC;
            this.specLimitAtLMC = supplierMPosition.specLimitAtLMC;
            this.isEnabled = supplierMPosition.isEnabled;
            this.enableRowEdit = supplierMPosition.enableRowEdit;
            this.instrumentNo = supplierMPosition.instrumentNo;
            this.instrumentTypeCode = supplierMPosition.instrumentTypeCode;
            this.supplierMPositionActuals = supplierMPosition.supplierMPositionActuals;
            this.isTextBoxDisabled  = supplierMPosition.isTextBoxDisabled;
            this.isDropDownDisabled  = supplierMPosition.isDropDownDisabled;
            this.mainRowId = supplierMPosition.mainRowId;

        } else {
            this.supplierMPositionId = Numbers.Default;
            this.supplierMeasurementSubmission = null;
            this.supplierMeasurementSubmissionId = Numbers.Default;
            this.partMPositionTolerance = null;
            this.partMPositionToleranceId = null;
            this.parameterManagement = null;
            this.parameterManagementId = null;
            this.partDimension = null;
            this.partDimensionId = null;
            this.dimensionDefault = null;
            this.dimensionDefaultId = null;
            this.associatedDimensionDefault = null;
            this.associatedDimensionNumberId = null;
            this.unit = Constants.Empty;
            this.uomId = null;
            this.instrument = null;
            this.instrumentId = null;
            this.instrumentType = null;
            this.instrumentTypeId = null;
            this.statusTypeId = Numbers.Default;
            this.spec = Constants.Empty;
            this.dataType = Constants.Empty;
            this.specLimitAtMMC = Numbers.Default;
            this.specLimitAtLMC = Numbers.Default;
            this.isEnabled = false;
            this.enableRowEdit = false;
            this.instrumentNo = Constants.Empty;
            this.instrumentTypeCode = Constants.Empty;
            this.supplierMPositionActuals = null;
            this.isTextBoxDisabled  = false;
            this.isDropDownDisabled  = false;
            this.mainRowId = Numbers.Default;
        }
    }
}
