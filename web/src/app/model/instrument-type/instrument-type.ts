/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class InstrumentType extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Code')
    code: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
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
