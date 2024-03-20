import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
export class SupplierMicroSectionActual extends BaseModel {

    actualTextName: string;
    actualTextValue: string;
    supplierMicrosectionId: number;

    constructor(supplierMicroSectionActual?: SupplierMicroSectionActual) {
        super(supplierMicroSectionActual);
        if (supplierMicroSectionActual) {
            this.actualTextName = supplierMicroSectionActual.actualTextName;
            this.actualTextValue = supplierMicroSectionActual.actualTextValue;
            this.supplierMicrosectionId = supplierMicroSectionActual.supplierMicrosectionId;
        } else {
            this.actualTextName = Constants.Empty;
            this.actualTextValue = Constants.Empty;
            this.supplierMicrosectionId = Numbers.Default;
        }
    }
}
