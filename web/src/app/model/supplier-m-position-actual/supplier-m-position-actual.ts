
import { Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';

export class SupplierMPositionActual extends BaseModel {

    @FormInput()
    supplierMPositionActualId: number;

    @FormInput()
    supplierMPositionId: number;

    @Trim()
    @FormInput()
    actualText: string;

    @Trim()
    @FormInput()
    actualValue: string;


    constructor(supplierMPositionActual?: SupplierMPositionActual) {
        super(supplierMPositionActual);

        if (supplierMPositionActual) {
            this.supplierMPositionActualId = supplierMPositionActual.supplierMPositionActualId;
            this.supplierMPositionId = supplierMPositionActual.supplierMPositionId;
            this.actualText = supplierMPositionActual.actualText;
            this.actualValue = supplierMPositionActual.actualValue;

        } else {
            this.supplierMPositionActualId = Numbers.Default;
            this.supplierMPositionId = Numbers.Default;
            this.actualText = Constants.Empty;
            this.actualValue = Constants.Empty;
        }
    }
}
