/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Location } from '../location/location';
import { Division } from '../division/division';
import { ColumnType } from '../table/table';

export class Site extends BaseModel {

  @FormInput()
  @DisplayColumn('SiteCode')
  code: string;

  @Trim()
  @FormInput()
  @DisplayColumn('TM1SiteName')
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
  description: string;

  @FormInput()
  locationId: number;

  @FormInput()
  @Expand()
  @DisplayColumn('Location', { type: ColumnType.Status, mappingField: 'name' })
  location: Location;

  @Expand()
  @FormInput()
  divisions: Division[];

  constructor(site?: Site) {
    super(site);
    if (site) {
      this.name = site.name;
      this.code = site.code;
      this.description = site.description;
      this.locationId = site.locationId;
      this.location = site.location;
      this.divisions = site.divisions;
    } else {
      this.name = Constants.Empty;
      this.code = Constants.Empty;
      this.description = Constants.Empty;
      this.locationId = 0;
      this.location = null;
      this.divisions = null;
    }
  }
}
