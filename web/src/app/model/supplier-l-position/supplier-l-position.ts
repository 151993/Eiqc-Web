
import { Expand, DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { SupplierMeasurementSubmission } from '../supplier-measurement-submission/supplier-measurement-submission';

import { PartLPositionTolerance } from '../part-l-position-tolerance/part-l-position-tolerance';

import { ParameterManagement } from '../parameter-management/parameter-management';

import { PartDimension } from '../part-dimension/part-dimension';

import { Instrument } from '../instrument/instrument';

import { InstrumentType } from '../instrument-type/instrument-type';
import { ColumnType } from '../table/table';
import { DimensionDefault } from '../dimension-default/dimension-default';
import { SupplierLPositionActual } from '../supplier-l-position-actual/supplier-l-position-actual';



export class SupplierLPosition extends BaseModel {

    @FormInput()
    supplierLPositionId: number;

    @FormInput()
    @Expand()
    supplierMeasurementSubmission: SupplierMeasurementSubmission;

    @FormInput()
    supplierMeasurementSubmissionId: number;

    @FormInput()
    @Expand()
    partLPositionTolerance: PartLPositionTolerance;

    @FormInput()

    partLPositionToleranceId: number;

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


    @FormInput()
    instrumentType: InstrumentType;

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

    isTextBoxDisabled: boolean;

    isDropDownDisabled: boolean;

    mainRowId: number;

    supplierLPositionActuals: SupplierLPositionActual[];

    constructor(supplierLPosition?: SupplierLPosition) {
        super(supplierLPosition);

        if (supplierLPosition) {
            this.supplierLPositionId = supplierLPosition.supplierLPositionId;
            this.supplierMeasurementSubmission = supplierLPosition.supplierMeasurementSubmission;
            this.supplierMeasurementSubmissionId = supplierLPosition.supplierMeasurementSubmissionId;
            this.partLPositionTolerance = supplierLPosition.partLPositionTolerance;
            this.partLPositionToleranceId = supplierLPosition.partLPositionToleranceId;
            this.parameterManagement = supplierLPosition.parameterManagement;
            this.parameterManagementId = supplierLPosition.parameterManagementId;
            this.partDimension = supplierLPosition.partDimension;
            this.partDimensionId = supplierLPosition.partDimensionId;
            this.dimensionDefault = supplierLPosition.dimensionDefault;
            this.dimensionDefaultId = supplierLPosition.dimensionDefaultId;
            this.associatedDimensionDefault = supplierLPosition.associatedDimensionDefault;
            this.associatedDimensionNumberId = supplierLPosition.associatedDimensionNumberId;
            this.unit = supplierLPosition.unit;
            this.uomId = supplierLPosition.uomId;
            this.instrument = supplierLPosition.instrument;
            this.instrumentId = supplierLPosition.instrumentId;
            this.instrumentType = supplierLPosition.instrumentType;
            this.instrumentTypeId = supplierLPosition.instrumentTypeId;
            this.statusTypeId = supplierLPosition.statusTypeId;
            this.spec = supplierLPosition.spec;
            this.dataType = supplierLPosition.dataType;
            this.specLimitAtMMC = supplierLPosition.specLimitAtMMC;
            this.specLimitAtLMC = supplierLPosition.specLimitAtLMC;
            this.isEnabled = supplierLPosition.isEnabled;
            this.enableRowEdit = supplierLPosition.enableRowEdit;
            this.instrumentNo = supplierLPosition.instrumentNo;
            this.instrumentTypeCode = supplierLPosition.instrumentTypeCode;
            this.supplierLPositionActuals = supplierLPosition.supplierLPositionActuals;
            this.isTextBoxDisabled = supplierLPosition.isTextBoxDisabled;
            this.isDropDownDisabled = supplierLPosition.isDropDownDisabled;
            this.mainRowId = supplierLPosition.mainRowId;
        } else {
            this.supplierLPositionId = Numbers.Default;
            this.supplierMeasurementSubmission = null;
            this.supplierMeasurementSubmissionId = Numbers.Default;
            this.partLPositionTolerance = null;
            this.partLPositionToleranceId = null;
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
            this.supplierLPositionActuals = null;
            this.isTextBoxDisabled = false;
            this.isDropDownDisabled = false;
            this.mainRowId = Numbers.Default;
        }
    }
}
