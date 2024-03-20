/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';

export class DefectType extends BaseModel {

    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('defectTypeName')
    defectTypeName: string;

    constructor(defectType?: DefectType) {
        super(defectType);

        if (defectType) {
            this.id = defectType.id;
            this.defectTypeName = defectType.defectTypeName;
        } else {
            this.id = Numbers.Default;
            this.defectTypeName = Constants.Empty;

        }
    }
}
