/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';

import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormLPosition } from './supplier-form-l-position';

export class AddSupplierFormLPositionModel extends BaseModel {

    supplierForm: SupplierForm;
    supplierFormId: number;
    lineNo: number;

    iTCode: number;

    uOM: string;

    spec: string;

    upperLimit: number;


    lowerLimit: number;

    accuracy?: number;

    sampleSize?: number;


    upperLimit1?: number;


    lowerLimit1?: number;

    iTCode1: string;


    upperLimit2?: number;


    lowerLimit2?: number;
    iTCode2: string;


    upperLimit3?: number;


    lowerLimit3?: number;
    iTCode3?: number;
    positionType: string;

    constructor(supplierFormLPosition?: SupplierFormLPosition) {
        super(supplierFormLPosition);

        if (supplierFormLPosition) {
            this.supplierForm = supplierFormLPosition.supplierForm;
            this.supplierFormId = supplierFormLPosition.supplierFormId;
            this.lineNo = supplierFormLPosition.lineNo;
            this.iTCode = supplierFormLPosition.itCode;
            this.uOM = supplierFormLPosition.uom;
            this.spec = supplierFormLPosition.spec;
            this.upperLimit = supplierFormLPosition.upperLimit;
            this.lowerLimit = supplierFormLPosition.lowerLimit;
            this.accuracy = supplierFormLPosition.accuracy;
            this.sampleSize = supplierFormLPosition.sampleSize;
            this.upperLimit1 = supplierFormLPosition.upperLimit1;
            this.lowerLimit1 = supplierFormLPosition.lowerLimit1;
            this.iTCode1 = supplierFormLPosition.iTCode1;
            this.upperLimit2 = supplierFormLPosition.upperLimit2;
            this.lowerLimit2 = supplierFormLPosition.lowerLimit2;
            this.iTCode2 = supplierFormLPosition.iTCode2;
            this.upperLimit3 = supplierFormLPosition.upperLimit3;
            this.lowerLimit3 = supplierFormLPosition.lowerLimit3;
            this.iTCode3 = supplierFormLPosition.iTCode3;
            this.positionType = supplierFormLPosition.positionType;
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
