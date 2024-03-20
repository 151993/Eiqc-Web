/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn,  FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormBowTwistActual extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;


    @FormInput()
    supplierFormId: number;


    @FormInput()
    @DisplayColumn('WarpType')
    warpType: number;


    @FormInput()
    @DisplayColumn('No')
    no: number;


    @FormInput()
    @DisplayColumn('ValueActual')
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
