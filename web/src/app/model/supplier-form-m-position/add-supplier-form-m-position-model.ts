/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormMPosition } from './supplier-form-m-position';

export class AddSupplierFormMPositionModel extends BaseModel {
    supplierForm: SupplierForm;

    supplierFormId: number;
    lineNo: string;
    iTCode: string;
    uOM: string;
    spec?: number;
    upperLimit: number;
    lowerLimit: number;
    accuracy?: number;
    sampleSize?: string;
    upperLimit1?: string;
    lowerLimit1?: number;
    iTCode1?: string;
    upperLimit2?: number;
    lowerLimit2?: number;
    iTCode2?: number;
    upperLimit3?: number;
    lowerLimit3?: number;
    iTCode3?: string;
    positionType?: number;
    constructor(supplierFormMPosition?: SupplierFormMPosition) {
        super(supplierFormMPosition);

        if (supplierFormMPosition) {
            this.supplierForm = supplierFormMPosition.supplierForm;
            this.supplierFormId = supplierFormMPosition.supplierFormId;
            this.lineNo = supplierFormMPosition.lineNo;
            this.iTCode = supplierFormMPosition.itCode;
            this.uOM = supplierFormMPosition.uom;
            this.spec = supplierFormMPosition.spec;
            this.upperLimit = supplierFormMPosition.upperLimit;
            this.lowerLimit = supplierFormMPosition.lowerLimit;
            this.accuracy = supplierFormMPosition.accuracy;
            this.sampleSize = supplierFormMPosition.sampleSize;
            this.upperLimit1 = supplierFormMPosition.upperLimit1;
            this.lowerLimit1 = supplierFormMPosition.lowerLimit1;
            this.iTCode1 = supplierFormMPosition.itCode1;
            this.upperLimit2 = supplierFormMPosition.upperLimit2;
            this.lowerLimit2 = supplierFormMPosition.lowerLimit2;
            this.iTCode2 = supplierFormMPosition.itCode2;
            this.upperLimit3 = supplierFormMPosition.upperLimit3;
            this.lowerLimit3 = supplierFormMPosition.lowerLimit3;
            this.iTCode3 = supplierFormMPosition.itCode3;
            this.positionType = supplierFormMPosition.positionType;

        } else {
            this.supplierForm = null;
            this.spec = null;
            this.accuracy = null;
            this.sampleSize = null;
            this.upperLimit1 = null;
            this.lowerLimit1 = null;
            this.iTCode1 = null;
            this.upperLimit2 = null;
            this.lowerLimit2 = null;
            this.iTCode2 = null;
            this.upperLimit3 = null;
            this.lowerLimit3 = null;
            this.iTCode3 = null;
            this.positionType = null;

        }
    }
}
