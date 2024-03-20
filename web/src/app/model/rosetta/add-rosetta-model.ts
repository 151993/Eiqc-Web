/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Rosetta } from './rosetta';


export class AddRosettaModel extends BaseModel {

    eN_US: string;
    zH_CN: string;

   constructor(rosetta?: Rosetta) {
        super(rosetta);
        if (rosetta) {
            this.eN_US = rosetta.eN_US;
            this.zH_CN = rosetta.zH_CN;
        } else {
            this.eN_US = Constants.Empty;
            this.zH_CN = Constants.Empty;
        }
    }
}
