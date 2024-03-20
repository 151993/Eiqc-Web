import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
export class SupplierFunctionAttributeActual extends BaseModel {

    actualTextName: string;
    actualTextValue: string;
    supplierFunctionAttributeId: number;

    constructor(supplierFunctionAttributeActual?: SupplierFunctionAttributeActual) {
        super(supplierFunctionAttributeActual);
        if (supplierFunctionAttributeActual) {
            this.actualTextName = supplierFunctionAttributeActual.actualTextName;
            this.actualTextValue = supplierFunctionAttributeActual.actualTextValue;
            this.supplierFunctionAttributeId = supplierFunctionAttributeActual.supplierFunctionAttributeId;
        } else {
            this.actualTextName = Constants.Empty;
            this.actualTextValue = Constants.Empty;
            this.supplierFunctionAttributeId = Numbers.Default;
        }
    }
}
