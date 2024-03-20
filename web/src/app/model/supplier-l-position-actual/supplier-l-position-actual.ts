
import { Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';

export class SupplierLPositionActual extends BaseModel {

    @FormInput()
    supplierLPositionActualId: number;

    @FormInput()
    supplierLPositionId: number;

    @Trim()
    @FormInput()
    actualText: string;

    @Trim()
    @FormInput()
    actualValue: string;


    constructor(supplierLPositionActual?: SupplierLPositionActual) {
        super(supplierLPositionActual);

        if (supplierLPositionActual) {
            this.supplierLPositionActualId = supplierLPositionActual.supplierLPositionActualId;
            this.supplierLPositionId = supplierLPositionActual.supplierLPositionId;
            this.actualText = supplierLPositionActual.actualText;
            this.actualValue = supplierLPositionActual.actualValue;

        } else {
            this.supplierLPositionActualId = Numbers.Default;
            this.supplierLPositionId = Numbers.Default;
            this.actualText = Constants.Empty;
            this.actualValue = Constants.Empty;
        }
    }
}
