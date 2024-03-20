/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormFunPara } from './supplier-form-fun-para';

export class AddSupplierFormFunParaModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;
    parameterName: string;
    instrumentID: string;
    iTCode: string;
    uOM: string;
    normalValue?: number;
    upperLimit?: number;
    lowerLimit?: number;
    accuracy?: number;
    sampleSize?: number;

    constructor(supplierFormFunPara?: SupplierFormFunPara) {
        super(supplierFormFunPara);

        if (supplierFormFunPara) {
            this.supplierForm = supplierFormFunPara.supplierForm;
            this.supplierFormId = supplierFormFunPara.supplierFormId;
            this.parameterName = supplierFormFunPara.parameterName;
            this.instrumentID = supplierFormFunPara.instrumentID;
            this.iTCode = supplierFormFunPara.itCode;
            this.uOM = supplierFormFunPara.uom;
            this.normalValue = supplierFormFunPara.normalValue;
            this.upperLimit = supplierFormFunPara.upperLimit;
            this.lowerLimit = supplierFormFunPara.lowerLimit;
            this.accuracy = supplierFormFunPara.accuracy;
            this.sampleSize = supplierFormFunPara.sampleSize;
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
            this.supplierFormId = 0;
        }
    }
}
