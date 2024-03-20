/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { PartDimension } from './part-dimension';

export class AddPartDimensionModel extends BaseModel {
    name: string;
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
