/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { InstrumentType } from '../instrument-type/instrument-type';
import { ColumnType } from '../table/table';

export class Instrument extends BaseModel {

    @FormInput()
    @DisplayColumn('InstrumentNo')
    instrumentNo: string;

    @FormInput()
    @DisplayColumn('Description')
    description: string;

    @FormInput()
    @DisplayColumn('ValidDate', { type: ColumnType.Date })
    validDate: Date;

    @FormInput()
    instrumentTypeId: number;

    @FormInput()
    @ExpandSelect({ select: ['Id', 'Code', 'IsEnabled'] })
    @DisplayColumn('InstrumentType', { type: ColumnType.Status, mappingField: 'code' })
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
