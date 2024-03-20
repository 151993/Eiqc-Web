/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { InstrumentType } from './instrument-type';
export class AddInstrumentTypeModel extends BaseModel {
    code: string;
    description: string;
    constructor(instrumentType?: InstrumentType) {
        super(instrumentType);
        if (instrumentType) {
            this.code = instrumentType.code;
            this.description = instrumentType.description;
        } else {
            this.code = Constants.Empty;
            this.description = Constants.Empty;
        }
    }
}
