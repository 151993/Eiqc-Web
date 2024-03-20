/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Site } from '../site/site';
import { DCCConfiguration } from './dcc-configuration';
export class UpdateDCCConfigurationModel extends BaseModel {
    siteNo: string;
    deptCode: string;
    docLevel: string;
    site: Site;
    siteId: number;

constructor(dCCConfiguration?: DCCConfiguration) {
    super(dCCConfiguration);
    if (dCCConfiguration) {
        this.siteNo = dCCConfiguration.siteNo;
        this.deptCode = dCCConfiguration.deptCode;
        this.docLevel = dCCConfiguration.docLevel;
        this.site = dCCConfiguration.site;
        this.siteId = dCCConfiguration.siteId;
    } else {
        this.siteNo = Constants.Empty;
        this.deptCode = Constants.Empty;
        this.docLevel = Constants.Empty;
        this.site = null;
        this.siteId = 0;
    }
  }
}
