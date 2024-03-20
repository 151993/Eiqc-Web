import {
  DisplayColumn,
  Trim,
  FormInput,
  ExpandSelect,
} from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Country } from '../country/country';
import { ColumnType } from '../table/table';
export class Location extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('Name')
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
  description: string;

  @FormInput()
  countryId: number;

  @FormInput()
  @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
  @DisplayColumn('Country', { type: ColumnType.Status, mappingField: 'name' })
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
