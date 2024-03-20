import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Location } from './location';
import { Country } from '../country/country';

export class UpdateLocationModel extends BaseModel {
  name: string;
  description: string;
  countryId: number;
  country: Country;
  constructor(location?: Location) {
    super(location);
    if (location) {
      this.name = location.name;
      this.description = location.description;
      this.countryId = location.countryId;
      this.country = location.country;

    } else {
      this.name = Constants.Empty;
      this.description = Constants.Empty;
      this.countryId = 0;
      this.country = null;
    }
  }
}
