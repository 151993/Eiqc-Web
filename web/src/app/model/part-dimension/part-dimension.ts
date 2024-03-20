/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class PartDimension extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    constructor(partDimension?: PartDimension) {
        super(partDimension);
        if (partDimension) {
            this.name = partDimension.name;
            this.description = partDimension.description;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
        }
    }
}
