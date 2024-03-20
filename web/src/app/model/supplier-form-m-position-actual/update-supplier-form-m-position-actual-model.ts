/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormMPositionActual } from './supplier-form-m-position-actual';

export class UpdateSupplierFormMPositionActualModel extends BaseModel {

    supplierForm: SupplierForm;
    supplierFormId: number;
    lineNo: string;
    no: number;
    valueActual?: number;
    positionCalcul?: number;
    positionActual?: number;
    result?: string;
    instrumentID?: string;
    base1Actual?: number;
    base2Actual?: number;
    base3Actual?: number;
    instrumentID1: string;
    instrumentID2: string;
    instrumentID3: string;
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
