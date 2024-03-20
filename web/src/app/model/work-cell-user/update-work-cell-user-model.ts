/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Constants } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';
import { Site } from '../site/site';
import { User } from '../user/user';
import { WorkCell } from '../workcell/work-cell';
import { WorkCellUser } from './work-cell-user';

export class UpdateWorkCellUserModel extends BaseModel {
    isDccApproval: boolean;
    workCell: WorkCell;
    workCellId: number;
    site: Site;
    siteId: number;
    addedJabilUserIds: User[];
    removedJabilUserIds: User[];
    addedDccUserIds: User[];
    removedDccUserIds: User[];
    description: string;

    constructor(workCellUser?: WorkCellUser) {
        super(workCellUser);
        if (workCellUser) {
            this.isDccApproval = workCellUser.isDccApproval;
            this.workCell = workCellUser.workCell;
            this.description = workCellUser.description;
            this.workCellId = workCellUser.workCellId;
            this.site = workCellUser.site;
            this.siteId = workCellUser.siteId;
            this.addedJabilUserIds = workCellUser.jabilUsers;
            this.addedDccUserIds = workCellUser.dccUsers;
        } else {
            this.isDccApproval = false;
            this.workCell = null;
            this.workCellId = 0;
            this.site = null;
            this.siteId = 0;
            this.addedJabilUserIds = null;
            this.removedDccUserIds = null;
            this.removedJabilUserIds = null;
            this.addedDccUserIds = null;
            this.description = Constants.Empty;
        }
    }
}
