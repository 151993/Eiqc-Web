import { Constants } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';
import { Region } from '../region/region';
import { Country } from './country';

export class AddCountryModel extends BaseModel {
    name: string;
    description: string;
    regionId: number;
    region: Region;
    constructor(country?: Country) {
        super(country);
        if (country) {
            this.name = country.name;
            this.description = country.description;
            this.regionId = country.regionId;
            this.region = country.region;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.regionId = 0;
            this.region = null;
        }
    }
}
