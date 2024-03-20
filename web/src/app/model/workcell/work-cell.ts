import { Constants } from 'src/app/shared/constant/global';
import { DisplayColumn, ExpandSelect, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Site } from '../site/site';
import { ColumnType } from '../table/table';

export class WorkCell extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('Name')
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
  description: string;

  @ExpandSelect({ select: ['Id', 'Name', 'Code', 'IsEnabled'] })
  @FormInput()
  @DisplayColumn('TM1SiteName', { type: ColumnType.MultiStatus, mappingField: 'name' })
  sites: Site[];

  constructor(workCell?: WorkCell) {
    super(workCell);
    if (workCell) {
      this.name = workCell.name;
      this.description = workCell.description;
      this.sites = workCell.sites;

    } else {
      this.name = Constants.Empty;
      this.description = Constants.Empty;
      this.sites = null;
    }
  }

}
