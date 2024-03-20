import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { BowTwistFormula } from './bow-twist-formula';
import { WarPage } from '../war-page/war-page';


export class AddBowTwistFormulaModel extends BaseModel {

    name: string;
    equation: string;
    warPageId: number;
    warPage: WarPage;

    constructor(bowTwistFormula?: BowTwistFormula) {
        super(bowTwistFormula);

        if (bowTwistFormula) {
            this.name = bowTwistFormula.name;
            this.equation = bowTwistFormula.equation;
            this.warPage = bowTwistFormula.warPage;
            this.warPageId = bowTwistFormula.warPageId;
        } else {
            this.name = Constants.Empty;
            this.equation = Constants.Empty;
            this.warPage = null;
            this.warPageId = 0;
        }
    }
}

