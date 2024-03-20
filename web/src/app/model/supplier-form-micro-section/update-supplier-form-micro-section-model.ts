/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormMicroSection } from './supplier-form-micro-section';

export class UpdateSupplierFormMicroSectionModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number ;
    parameterName: string;
    instrumentID: string;
    iTCode?: string;
    uOM?: string;
    normalValue?: number;
    upperLimit?: number;
    lowerLimit?: number;
    accuracy?: number;
    sampleSize?: string;

    constructor(supplierFormMicroSection?: SupplierFormMicroSection) {
        super(supplierFormMicroSection);

        if (supplierFormMicroSection) {
            this.supplierForm = supplierFormMicroSection.supplierForm;
            this.supplierFormId = supplierFormMicroSection.supplierFormId;
            this.parameterName = supplierFormMicroSection.parameterName;
            this.instrumentID = supplierFormMicroSection.instrumentID;
            this.iTCode = supplierFormMicroSection.itCode;
            this.uOM = supplierFormMicroSection.uom;
            this.normalValue = supplierFormMicroSection.normalValue;
            this.upperLimit = supplierFormMicroSection.upperLimit;
            this.lowerLimit = supplierFormMicroSection.lowerLimit;
            this.accuracy = supplierFormMicroSection.accuracy;
            this.sampleSize = supplierFormMicroSection.sampleSize;
        } else {
            this.supplierForm = null;
            this.instrumentID = null;
            this.iTCode = null;
            this.uOM = null;
            this.normalValue = null;
            this.upperLimit = null;
            this.lowerLimit = null;
            this.accuracy = null;
            this.sampleSize = null;
        }
    }
}
