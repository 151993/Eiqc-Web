/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Location } from '../location/location';
import { Division } from '../division/division';
import { Site } from './site';

export class AddSiteModel extends BaseModel {
  name: string;
  code: string;
  description: string;
  locationId: number;
  location: Location;
  addedDivisionIds: Division[];
  constructor(site?: Site) {
      super(site);
      if (site) {
        this.name = site.name;
        this.code = site.code;
        this.description = site.description;
        this.locationId = site.locationId;
        this.location = site.location;
        this.addedDivisionIds = site.divisions;
      } else {
        this.name = Constants.Empty;
        this.code = Constants.Empty;
        this.description = Constants.Empty;
        this.locationId = 0;
        this.location = null;
        this.addedDivisionIds = null;

      }
   }
}
