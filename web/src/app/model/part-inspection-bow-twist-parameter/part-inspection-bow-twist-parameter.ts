import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { WarPage } from '../war-page/war-page';
import { BowTwistFormula } from '../bow-twist-formula/bow-twist-formula';
export class PartInspectionBowTwistParameter extends BaseModel {


    @FormInput()
    @DisplayColumn('Spec')
    spec: number;

    @FormInput()
    @DisplayColumn('Length')
    length: number;

    @FormInput()
    @DisplayColumn('Width')
    width: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Unit')
    unit: string;

    @FormInput()
    @DisplayColumn('UpperLimit')
    upperLimit: number;

   // dataTypeId: number;
    warPageId: number;
    bowTwistFormulaId: number;
    sAPPartInspectionPlanId: number;
    dataType: string;
    warPage: WarPage;
    bowTwistFormula: BowTwistFormula;
    warPageTypeId: number;

    constructor(partInspectionBowTwistParameter?: PartInspectionBowTwistParameter) {
        super(partInspectionBowTwistParameter);
        if (partInspectionBowTwistParameter) {
            this.spec = partInspectionBowTwistParameter.spec;
            this.length = partInspectionBowTwistParameter.length;
            this.width = partInspectionBowTwistParameter.width;
            this.unit = partInspectionBowTwistParameter.unit;
            this.upperLimit = partInspectionBowTwistParameter.upperLimit;
            this.warPageId = partInspectionBowTwistParameter.warPageId;
            this.warPage = partInspectionBowTwistParameter.warPage;
            this.bowTwistFormulaId = partInspectionBowTwistParameter.bowTwistFormulaId;
            this.bowTwistFormula = partInspectionBowTwistParameter.bowTwistFormula;
            this.sAPPartInspectionPlanId = partInspectionBowTwistParameter.sAPPartInspectionPlanId;
            this.warPageTypeId = partInspectionBowTwistParameter.warPageTypeId;
        } else {
            this.spec = Numbers.Default;
            this.length = Numbers.Default;
            this.width = Numbers.Default;
            this.unit = Constants.Empty;
            this.upperLimit = Numbers.Default;
            this.warPageId = Numbers.Default;
            this.bowTwistFormulaId = Numbers.Default;
            this.sAPPartInspectionPlanId = Numbers.Default;
            this.bowTwistFormula = null;
            this.warPage = null;
            this.dataType = Constants.Empty;
            this.warPageTypeId = Numbers.Default;
        }
    }
}
