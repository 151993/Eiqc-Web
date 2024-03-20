import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
export class SupplierDimensionMeasurementActual extends BaseModel {

    actualTextName: string;
    actualTextValue: string;
    supplierDimensionMeasurementId: number;

    constructor(supplierDimensionMeasurementActual?: SupplierDimensionMeasurementActual) {
        super(supplierDimensionMeasurementActual);
        if (supplierDimensionMeasurementActual) {
            this.actualTextName = supplierDimensionMeasurementActual.actualTextName;
            this.actualTextValue = supplierDimensionMeasurementActual.actualTextValue;
            this.supplierDimensionMeasurementId = supplierDimensionMeasurementActual.supplierDimensionMeasurementId;
        } else {
            this.actualTextName = Constants.Empty;
            this.actualTextValue = Constants.Empty;
            this.supplierDimensionMeasurementId = Numbers.Default;
        }
    }
}
