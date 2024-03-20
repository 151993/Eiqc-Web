/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { UOM } from './uom';

export class UpdateUOMModel extends BaseModel {


    name: string;
    description: string;


    constructor(uOM?: UOM) {
        super(uOM);

        if (uOM) {
            this.name = uOM.name;
            this.description = uOM.description;
        } else {
            this.description = Constants.Empty;
            this.name = Constants.Empty;

        }
    }
}
