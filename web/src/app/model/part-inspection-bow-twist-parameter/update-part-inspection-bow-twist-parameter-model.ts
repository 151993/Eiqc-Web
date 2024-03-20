/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { PartInspectionBowTwistParameter } from './part-inspection-bow-twist-parameter';
export class UpdatePartInspectionBowTwistParameterModel extends BaseModel {

    spec: number;
    length: number;
    width: number;
    unit: string;
    upperLimit: number;
    warPageId: number;
    bowTwistFormulaId: number;
    sAPPartInspectionPlanId: number;
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
        this.bowTwistFormulaId = partInspectionBowTwistParameter.bowTwistFormulaId;
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
        this.warPageTypeId = Numbers.Default;
    }
  }
}
