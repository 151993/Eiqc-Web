/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';


export class DispositionType extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;


    constructor(dispositionType?: DispositionType) {
        super(dispositionType);

        if (dispositionType) {
            this.description = dispositionType.description;

        } else {
            this.description = null;
        }
    }
}
