/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { InstrumentType } from '../instrument-type/instrument-type';
import { Instrument } from './instrument';
export class UpdateInstrumentModel extends BaseModel {
    instrumentNo: string;
    description: string;
    validDate: Date;
    instrumentType: InstrumentType;
    instrumentTypeId: number;
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
