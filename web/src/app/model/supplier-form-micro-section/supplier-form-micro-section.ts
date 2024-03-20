/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormMicroSection extends BaseModel {

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
    @DisplayColumn('itCode')
    itCode?: string;

    @Trim()
    @FormInput()
    uom: string;


    @FormInput()
    normalValue?: number;


    @FormInput()
    upperLimit?: number;


    @FormInput()
    lowerLimit?: number;


    @FormInput()
    accuracy?: number;

    @Trim()
    @FormInput()
    sampleSize?: string;

    constructor(supplierFormMicroSection?: SupplierFormMicroSection) {
        super(supplierFormMicroSection);

        if (supplierFormMicroSection) {
            this.supplierForm = supplierFormMicroSection.supplierForm;
            this.supplierFormId = supplierFormMicroSection.supplierFormId;
            this.parameterName = supplierFormMicroSection.parameterName;
            this.instrumentID = supplierFormMicroSection.instrumentID;
            this.itCode = supplierFormMicroSection.itCode;
            this.uom = supplierFormMicroSection.uom;
            this.normalValue = supplierFormMicroSection.normalValue;
            this.upperLimit = supplierFormMicroSection.upperLimit;
            this.lowerLimit = supplierFormMicroSection.lowerLimit;
            this.accuracy = supplierFormMicroSection.accuracy;
            this.sampleSize = supplierFormMicroSection.sampleSize;
        } else {
            this.supplierForm = null;
            this.instrumentID = null;
            this.itCode = null;
            this.uom = null;
            this.normalValue = null;
            this.upperLimit = null;
            this.lowerLimit = null;
            this.accuracy = null;
            this.sampleSize = null;
        }
    }
}
