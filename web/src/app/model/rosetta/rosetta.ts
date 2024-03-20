/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import {  DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class Rosetta extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('EN_US')
    eN_US: string;

    @Trim()
    @FormInput()
    @DisplayColumn('ZH_CN')
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
