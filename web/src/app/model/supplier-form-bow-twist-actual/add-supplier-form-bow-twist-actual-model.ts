/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormBowTwistActual } from './supplier-form-bow-twist-actual';

export class AddSupplierFormBowTwistActualModel extends BaseModel {
    supplierForm: SupplierForm;
    supplierFormId: number;
    warpType: number;
    no: number;
    valueActual?: number;

    constructor(supplierFormBowTwistActual?: SupplierFormBowTwistActual) {
        super(supplierFormBowTwistActual);

        if (supplierFormBowTwistActual) {
            this.supplierForm = supplierFormBowTwistActual.supplierForm;
            this.supplierFormId = supplierFormBowTwistActual.supplierFormId;
            this.warpType = supplierFormBowTwistActual.warpType;
            this.no = supplierFormBowTwistActual.no;
            this.valueActual = supplierFormBowTwistActual.valueActual;
        } else {
            this.supplierForm = null;
            this.valueActual = null;
            this.supplierFormId = 0;
            this.warpType = 0;
            this.no = 0;

        }
    }
}
