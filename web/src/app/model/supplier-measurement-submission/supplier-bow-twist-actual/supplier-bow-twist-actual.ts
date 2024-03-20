import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
export class SupplierBowTwistActual extends BaseModel {

    actualTextName: string;
    actualTextValue: string;
    supplierBowTwistId: number;

    constructor(supplierBowTwistActual?: SupplierBowTwistActual) {
        super(supplierBowTwistActual);
        if (supplierBowTwistActual) {
            this.actualTextName = supplierBowTwistActual.actualTextName;
            this.actualTextValue = supplierBowTwistActual.actualTextValue;
            this.supplierBowTwistId = supplierBowTwistActual.supplierBowTwistId;
        } else {
            this.actualTextName = Constants.Empty;
            this.actualTextValue = Constants.Empty;
            this.supplierBowTwistId = Numbers.Default;
        }
    }
}
