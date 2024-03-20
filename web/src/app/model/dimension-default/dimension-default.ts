
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';

export class DimensionDefault extends BaseModel {

    @FormInput()
    dimensionDefaultId: number;

    @FormInput()
    statusTypeId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('DimensionName')
    dimensionName: string;

    constructor(dimensionDefault?: DimensionDefault) {
        super(dimensionDefault);

        if (dimensionDefault) {
            this.dimensionDefaultId = dimensionDefault.dimensionDefaultId;
            this.statusTypeId = dimensionDefault.statusTypeId;
            this.dimensionName = dimensionDefault.dimensionName;
        } else {
            this.dimensionDefaultId = Numbers.Default;
            this.statusTypeId = Numbers.Default;
            this.dimensionName = Constants.Empty;
        }
    }
}
