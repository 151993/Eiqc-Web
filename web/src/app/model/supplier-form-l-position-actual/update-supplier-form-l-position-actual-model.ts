/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormLPositionActual } from './supplier-form-l-position-actual';


export class UpdateSupplierFormLPositionActualModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;
    lineNo: number;
    no: number;
    valueActual?: number;
    positionCalcul?: number;
    positionActual?: number;
    result?: boolean;
    instrumentID: string;
    base1Actual: number;
    base2Actual?: number;
    base3Actual: string;
    instrumentID1: string;
    instrumentID2: string;
    instrumentID3: string;
    positionType: string;

    constructor(supplierFormLPositionActual?: SupplierFormLPositionActual) {
        super(supplierFormLPositionActual);

        if (supplierFormLPositionActual) {
            this.supplierForm = supplierFormLPositionActual.supplierForm;
            this.supplierFormId = supplierFormLPositionActual.supplierFormId;
            this.lineNo = supplierFormLPositionActual.lineNo;
            this.no = supplierFormLPositionActual.no;
            this.valueActual = supplierFormLPositionActual.valueActual;
            this.positionCalcul = supplierFormLPositionActual.positionCalcul;
            this.positionActual = supplierFormLPositionActual.positionActual;
            this.result = supplierFormLPositionActual.result;
            this.instrumentID = supplierFormLPositionActual.instrumentID;
            this.instrumentID2 = supplierFormLPositionActual.instrumentID2;
            this.base1Actual = supplierFormLPositionActual.base1Actual;
            this.base2Actual = supplierFormLPositionActual.base2Actual;
            this.base3Actual = supplierFormLPositionActual.base3Actual;
            this.instrumentID = supplierFormLPositionActual.instrumentID1;
            this.instrumentID = supplierFormLPositionActual.instrumentID2;
            this.instrumentID = supplierFormLPositionActual.instrumentID3;
            this.positionType = supplierFormLPositionActual.positionType;
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
