/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Instrument } from './instrument';
import { InstrumentType } from '../instrument-type/instrument-type';
export class AddInstrumentModel extends BaseModel {
    instrumentNo: string;
    description: string;
    validDate: Date;
    instrumentTypeId: number;
    instrumentType: InstrumentType;
    constructor(instrument?: Instrument) {
        super(instrument);
        if (instrument) {
            this.instrumentType = instrument.instrumentType;
            this.instrumentTypeId = instrument.instrumentTypeId;
            this.instrumentNo = instrument.instrumentNo;
            this.description = instrument.description;
            this.validDate = instrument.validDate;
        } else {
            this.instrumentType = null;
            this.instrumentTypeId = 0;
            this.instrumentNo = Constants.Empty;
            this.description = Constants.Empty;
            this.validDate = null;
        }
    }
}
