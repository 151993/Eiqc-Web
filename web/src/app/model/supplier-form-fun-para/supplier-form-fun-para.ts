/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormFunPara extends BaseModel {

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
    @DisplayColumn('ITCode')
    itCode: string;

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
    sampleSize?: number;

    constructor(supplierFormFunPara?: SupplierFormFunPara) {
        super(supplierFormFunPara);

        if (supplierFormFunPara) {
            this.supplierForm = supplierFormFunPara.supplierForm;
            this.supplierFormId = supplierFormFunPara.supplierFormId;
            this.parameterName = supplierFormFunPara.parameterName;
            this.instrumentID = supplierFormFunPara.instrumentID;
            this.itCode = supplierFormFunPara.itCode;
            this.uom = supplierFormFunPara.uom;
            this.normalValue = supplierFormFunPara.normalValue;
            this.upperLimit = supplierFormFunPara.upperLimit;
            this.lowerLimit = supplierFormFunPara.lowerLimit;
            this.accuracy = supplierFormFunPara.accuracy;
            this.sampleSize = supplierFormFunPara.sampleSize;
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
            this.supplierFormId = 0;
        }
    }
}
