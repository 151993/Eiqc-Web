
import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { WarPage } from '../war-page/war-page';
import { ColumnType } from '../table/table';

export class BowTwistFormula extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')

    name: string;
    @Trim()
    @FormInput()
    @DisplayColumn('FormulaEquation')
    equation: string;

    @FormInput()
    @Expand()
    @DisplayColumn('WarPage', { type: ColumnType.Status, mappingField: 'description' })
    warPage: WarPage;

    @FormInput()
    warPageId: number;


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
