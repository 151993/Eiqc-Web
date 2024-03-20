import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
export class SupplierFunctionVariableActual extends BaseModel {

    actualTextName: string;
    actualTextValue: string;
    supplierFunctionVariableId: number;

    constructor(supplierFunctionVariableActual?: SupplierFunctionVariableActual) {
        super(supplierFunctionVariableActual);
        if (supplierFunctionVariableActual) {
            this.actualTextName = supplierFunctionVariableActual.actualTextName;
            this.actualTextValue = supplierFunctionVariableActual.actualTextValue;
            this.supplierFunctionVariableId = supplierFunctionVariableActual.supplierFunctionVariableId;
        } else {
            this.actualTextName = Constants.Empty;
            this.actualTextValue = Constants.Empty;
            this.supplierFunctionVariableId = Numbers.Default;
        }
    }
}
