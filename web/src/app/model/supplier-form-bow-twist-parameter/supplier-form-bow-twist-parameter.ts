/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';


export class SupplierFormBowTwistParameter extends BaseModel {


    @FormInput()
    supplierFormId: number ;


    @FormInput()
    @DisplayColumn('WarpType')
    warpType?: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Spec')
    spec: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Length')
    length: string ;

    @Trim()
    @FormInput()
    @DisplayColumn('Width')
    width: string ;

    @Trim()
    @FormInput()
    @DisplayColumn('Unit')
    unit: string ;

    @Trim()
    @FormInput()
    @DisplayColumn('UpperLimit')
    upperLimit: string ;

    @FormInput()
    @Expand()
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
