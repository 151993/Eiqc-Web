/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormMeasurementParameter } from './supplier-form-measurement-parameter';

export class AddSupplierFormMeasurementParameterModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;
    parameterName: string;
    instrumentID: string;
    instrumentTypeID: string;
    uOM: string;
    normalValue?: number;
    upperLimit: number;
    lowerLimit: number;
    accuracy?: number;
    sampleSize?: string;

    constructor(supplierFormMeasurementParameter?: SupplierFormMeasurementParameter) {
        super(supplierFormMeasurementParameter);

        if (supplierFormMeasurementParameter) {
            this.supplierForm = supplierFormMeasurementParameter.supplierForm;
            this.supplierFormId = supplierFormMeasurementParameter.supplierFormId;
            this.parameterName = supplierFormMeasurementParameter.parameterName;
            this.instrumentID = supplierFormMeasurementParameter.instrumentID;
            this.instrumentTypeID = supplierFormMeasurementParameter.instrumentTypeID;
            this.uOM = supplierFormMeasurementParameter.uom;
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
