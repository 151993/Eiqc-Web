import { Constants } from 'src/app/shared/constant/global';
import { DisplayColumn, ExpandSelect, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Region } from '../region/region';
import { ColumnType } from '../table/table';

export class Country extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('Name')
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
  description: string;

  @FormInput()
  regionId: number;

  @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
  @DisplayColumn('Region', { type: ColumnType.Status, mappingField: 'name' }, false)
  @FormInput()
  region: Region;


  @DisplayColumn('Region', { type: ColumnType.String, mappingField: 'name' })
  regionName: string;

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
