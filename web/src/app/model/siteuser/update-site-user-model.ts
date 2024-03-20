/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Site } from '../site/site';

export class UpdateSiteUserModel extends BaseModel {
    site: Site;
    removedSiteUserIds: [];
    addedSiteUserIds: [];
    changeReason: string;
    constructor() {
        super();
        this.changeReason = Constants.Empty;
        this.addedSiteUserIds = null;
        this.removedSiteUserIds = null;
    }
}
