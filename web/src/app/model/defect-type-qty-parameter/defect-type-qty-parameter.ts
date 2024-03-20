/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';


export class SupplierVisualInspectionDefectType extends BaseModel {

    id: number;
    supplierVisualInspectionId: number;
    defectTypeId: number;
    defectTypeName: string;
    defectQty: number;

    constructor(supplierVisualInspectionDefectType?: SupplierVisualInspectionDefectType) {
        super(supplierVisualInspectionDefectType);

        if (supplierVisualInspectionDefectType) {
            this.id = supplierVisualInspectionDefectType.id;
            this.supplierVisualInspectionId = supplierVisualInspectionDefectType.supplierVisualInspectionId;
            this.defectTypeId = supplierVisualInspectionDefectType.defectTypeId;
            this.defectTypeName = supplierVisualInspectionDefectType.defectTypeName;
            this.defectQty = supplierVisualInspectionDefectType.defectQty;

        } else {
            this.id = Numbers.Default;
            this.supplierVisualInspectionId =  Numbers.Default;
            this.defectTypeId =  Numbers.Default;
            this.defectTypeName =  Constants.Empty;
            this.defectQty = Numbers.Default;
        }
    }
}
