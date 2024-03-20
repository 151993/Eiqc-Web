/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';


export class DefectTypeQtyParameter extends BaseModel {

    id: number;

    supplierVisualInspectionId: number;
    defectTypeId: number;
    defectTypeName: string;
    defectQty: number;
    

    constructor(defectTypeQtyParameter?: DefectTypeQtyParameter) {
        super(defectTypeQtyParameter);

        if (defectTypeQtyParameter) {
            this.id = defectTypeQtyParameter.id;
            this.supplierVisualInspectionId = defectTypeQtyParameter.supplierVisualInspectionId
            this.defectTypeId = defectTypeQtyParameter.defectTypeId;
            this.defectTypeName = defectTypeQtyParameter.defectTypeName;
            this.defectQty = defectTypeQtyParameter.defectQty;

        } else {
            this.id = Numbers.Default;
            this.supplierVisualInspectionId =  Numbers.Default;
            this.defectTypeId =  Numbers.Default;
            this.defectTypeName =  Constants.Empty;
            this.defectQty = Numbers.Default;
        }
    }
}
