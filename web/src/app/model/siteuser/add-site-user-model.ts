/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Constants } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';
import { Site } from '../site/site';

export class AddSiteUserModel extends BaseModel {
    site: Site;
    changeReason: string;
    addedSiteUserIds: [];
    removedSiteUserIds: [];

    constructor() {
        super();
        this.changeReason = Constants.Empty;
        this.addedSiteUserIds = null;
        this.removedSiteUserIds = null;
        this.site = null;
    }
}
