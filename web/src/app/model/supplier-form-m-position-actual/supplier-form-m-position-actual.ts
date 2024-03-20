/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormMPositionActual extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('LineNo')
    lineNo: string;


    @FormInput()
    @DisplayColumn('No')
    no: number;


    @FormInput()
    valueActual?: number;


    @FormInput()
    positionCalcul?: number;


    @FormInput()
    positionActual?: number;

    @Trim()
    @FormInput()
    result?: string;

    @Trim()
    @FormInput()
    instrumentID?: string;


    @FormInput()
    base1Actual?: number;


    @FormInput()
    base2Actual?: number;


    @FormInput()
    base3Actual?: number;

    @Trim()
    @FormInput()
    instrumentID1: string;

    @Trim()
    @FormInput()
    instrumentID2: string;

    @Trim()
    @FormInput()
    instrumentID3: string;


    @FormInput()
    positionType: number;

    constructor(supplierFormMPositionActual?: SupplierFormMPositionActual) {
        super(supplierFormMPositionActual);

        if (supplierFormMPositionActual) {
            this.supplierForm = supplierFormMPositionActual.supplierForm;
            this.supplierFormId = supplierFormMPositionActual.supplierFormId;
            this.lineNo = supplierFormMPositionActual.lineNo;
            this.no = supplierFormMPositionActual.no;
            this.valueActual = supplierFormMPositionActual.valueActual;
            this.positionCalcul = supplierFormMPositionActual.positionCalcul;
            this.positionActual = supplierFormMPositionActual.positionActual;
            this.result = supplierFormMPositionActual.result;
            this.instrumentID = supplierFormMPositionActual.instrumentID;
            this.instrumentID2 = supplierFormMPositionActual.instrumentID2;
            this.base1Actual = supplierFormMPositionActual.base1Actual;
            this.base2Actual = supplierFormMPositionActual.base2Actual;
            this.base3Actual = supplierFormMPositionActual.base3Actual;
            this.instrumentID1 = supplierFormMPositionActual.instrumentID1;
            this.instrumentID2 = supplierFormMPositionActual.instrumentID2;
            this.instrumentID3 = supplierFormMPositionActual.instrumentID3;
            this.positionType = supplierFormMPositionActual.positionType;
        } else {
            this.supplierForm = null;
            this.valueActual = null;
            this.positionCalcul = null;
            this.positionActual = null;
            this.result = null;
            this.instrumentID = null;
            this.instrumentID2 = null;
            this.base1Actual = null;
            this.base2Actual = null;
            this.base3Actual = null;
            this.instrumentID1 = null;
            this.instrumentID2 = null;
            this.instrumentID3 = null;
            this.positionType = null;
        }
    }
}
