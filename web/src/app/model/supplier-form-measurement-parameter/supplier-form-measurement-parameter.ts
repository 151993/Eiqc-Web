/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormMeasurementParameter extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;

    @Trim()
    @FormInput()
    instrumentID: string;

    @Trim()
    @FormInput()
    instrumentTypeID?: string;

    @Trim()
    @FormInput()
    uom: string;


    @FormInput()
    normalValue?: number;


    @FormInput()
    upperLimit: number;


    @FormInput()
    lowerLimit: number;


    @FormInput()
    accuracy?: number;

    @Trim()
    @FormInput()
    sampleSize?: string;

    constructor(supplierFormMeasurementParameter?: SupplierFormMeasurementParameter) {
        super(supplierFormMeasurementParameter);

        if (supplierFormMeasurementParameter) {
            this.supplierForm = supplierFormMeasurementParameter.supplierForm;
            this.supplierFormId = supplierFormMeasurementParameter.supplierFormId;
            this.parameterName = supplierFormMeasurementParameter.parameterName;
            this.instrumentID = supplierFormMeasurementParameter.instrumentID;
            this.instrumentTypeID = supplierFormMeasurementParameter.instrumentTypeID;
            this.uom = supplierFormMeasurementParameter.uom;
            this.normalValue = supplierFormMeasurementParameter.normalValue;
            this.upperLimit = supplierFormMeasurementParameter.upperLimit;
            this.lowerLimit = supplierFormMeasurementParameter.lowerLimit;
            this.accuracy = supplierFormMeasurementParameter.accuracy;
            this.sampleSize = supplierFormMeasurementParameter.sampleSize;
        } else {
            this.supplierForm = null;
            this.instrumentID = null;
            this.instrumentTypeID = null;
            this.normalValue = null;
            this.accuracy = null;
            this.sampleSize = null;
        }
    }
}
