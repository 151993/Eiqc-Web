/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormBowTwistParameter } from './supplier-form-bow-twist-parameter';

export class AddSupplierFormBowTwistParameterModel extends BaseModel {

    supplierFormId: number ;
    warpType?: number;
    spec: string;
    length: string ;
    width: string ;
    unit: string ;
    upperLimit: string ;
    supplierForm: SupplierForm;
    constructor(supplierFormBowTwistParameter?: SupplierFormBowTwistParameter) {
        super(supplierFormBowTwistParameter);

        if (supplierFormBowTwistParameter) {
            this.supplierFormId = supplierFormBowTwistParameter.supplierFormId;
            this.warpType = supplierFormBowTwistParameter.warpType;
            this.spec = supplierFormBowTwistParameter.spec;
            this.length = supplierFormBowTwistParameter.length;
            this.width = supplierFormBowTwistParameter.width;
            this.unit = supplierFormBowTwistParameter.unit;
            this.upperLimit = supplierFormBowTwistParameter.upperLimit;
            this.supplierForm = supplierFormBowTwistParameter.supplierForm;

        } else {
            this.warpType = null;
            this.spec = null;
            this.length = null;
            this.width = null;
            this.unit = null;
            this.upperLimit = null;
            this.supplierForm = null;

        }
    }
}
