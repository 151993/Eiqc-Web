/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormLPosition extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ITCode')
    itCode: number;

    @Trim()
    @FormInput()
    uom: string;


    @FormInput()
    spec: string;


    @FormInput()
    upperLimit: number;


    @FormInput()
    lowerLimit: number;


    @FormInput()
    accuracy?: number;

    @Trim()
    @FormInput()
    sampleSize?: number;


    @FormInput()
    upperLimit1?: number;


    @FormInput()
    lowerLimit1?: number;

    @Trim()
    @FormInput()
    iTCode1: string;


    @FormInput()
    upperLimit2?: number;


    @FormInput()
    lowerLimit2?: number;

    @Trim()
    @FormInput()
    iTCode2: string;


    @FormInput()
    upperLimit3?: number;


    @FormInput()
    lowerLimit3?: number;

    @Trim()
    @FormInput()
    iTCode3?: number;


    @FormInput()
    positionType: string;

    constructor(supplierFormLPosition?: SupplierFormLPosition) {
        super(supplierFormLPosition);

        if (supplierFormLPosition) {
            this.supplierForm = supplierFormLPosition.supplierForm;
            this.supplierFormId = supplierFormLPosition.supplierFormId;
            this.lineNo = supplierFormLPosition.lineNo;
            this.itCode = supplierFormLPosition.itCode;
            this.uom = supplierFormLPosition.uom;
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
