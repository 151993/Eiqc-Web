import { Constants } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';
import { Site } from '../site/site';
import { WorkCell } from './work-cell';

export class AddWorkCellModel extends BaseModel {
  name: string;
  description: string;
  addedSiteIds: Site[];
  constructor(workCell?: WorkCell) {
    super(workCell);
    if (workCell) {
      this.name = workCell.name;
      this.description = workCell.description;
      this.addedSiteIds = workCell.sites;
    } else {
      this.name = Constants.Empty;
      this.description = Constants.Empty;
      this.addedSiteIds = [];
    }
  }
}

