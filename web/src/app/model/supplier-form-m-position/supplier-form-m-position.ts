/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';


export class SupplierFormMPosition extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;

    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('itCode')
    itCode: string;

    @Trim()
    @FormInput()
    uom: string;


    @FormInput()
    spec?: number;


    @FormInput()
    upperLimit: number;


    @FormInput()
    lowerLimit: number;


    @FormInput()
    accuracy?: number;

    @Trim()
    @FormInput()
    sampleSize?: string;


    @FormInput()
    upperLimit1?: string;


    @FormInput()
    lowerLimit1?: number;

    @Trim()
    @FormInput()
    itCode1?: string;


    @FormInput()
    upperLimit2?: number;


    @FormInput()
    lowerLimit2?: number;

    @FormInput()
    itCode2?: number;


    @FormInput()
    upperLimit3?: number;


    @FormInput()
    lowerLimit3?: number;

    @Trim()
    @FormInput()
    itCode3?: string;


    @FormInput()
    positionType?: number;


    constructor(supplierFormMPosition?: SupplierFormMPosition) {
        super(supplierFormMPosition);

        if (supplierFormMPosition) {
            this.supplierForm = supplierFormMPosition.supplierForm;
            this.supplierFormId = supplierFormMPosition.supplierFormId;
            this.lineNo = supplierFormMPosition.lineNo;
            this.itCode = supplierFormMPosition.itCode;
            this.uom = supplierFormMPosition.uom;
            this.spec = supplierFormMPosition.spec;
            this.upperLimit = supplierFormMPosition.upperLimit;
            this.lowerLimit = supplierFormMPosition.lowerLimit;
            this.accuracy = supplierFormMPosition.accuracy;
            this.sampleSize = supplierFormMPosition.sampleSize;
            this.upperLimit1 = supplierFormMPosition.upperLimit1;
            this.lowerLimit1 = supplierFormMPosition.lowerLimit1;
            this.itCode1 = supplierFormMPosition.itCode1;
            this.upperLimit2 = supplierFormMPosition.upperLimit2;
            this.lowerLimit2 = supplierFormMPosition.lowerLimit2;
            this.itCode2 = supplierFormMPosition.itCode2;
            this.upperLimit3 = supplierFormMPosition.upperLimit3;
            this.lowerLimit3 = supplierFormMPosition.lowerLimit3;
            this.itCode3 = supplierFormMPosition.itCode3;
            this.positionType = supplierFormMPosition.positionType;

        } else {
            this.supplierForm = null;
            this.spec = null;
            this.accuracy = null;
            this.sampleSize = null;
            this.upperLimit1 = null;
            this.lowerLimit1 = null;
            this.itCode1 = null;
            this.upperLimit2 = null;
            this.lowerLimit2 = null;
            this.itCode2 = null;
            this.upperLimit3 = null;
            this.lowerLimit3 = null;
            this.itCode3 = null;
            this.positionType = null;

        }
    }
}
