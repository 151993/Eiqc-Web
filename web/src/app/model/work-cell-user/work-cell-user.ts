/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Constants } from 'src/app/shared/constant/global';
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Site } from '../site/site';
import { ColumnType } from '../table/table';
import { User } from '../user/user';
import { WorkCell } from '../workcell/work-cell';
export class WorkCellUser extends BaseModel {

    @FormInput()
    @DisplayColumn('Id', null, false)
    workCellId: number;

    @FormInput()
    @Expand()
    @DisplayColumn('Description', { type: ColumnType.Status, mappingField: 'description' })
    @DisplayColumn('WorkCell', { type: ColumnType.Status, mappingField: 'name' })
    workCell: WorkCell;

    @FormInput()
    description: string;

    @FormInput()
    @Expand()
    @DisplayColumn('TM1SiteName', { type: ColumnType.Status, mappingField: 'name' })
    site: Site;

    @FormInput()
    siteId: number;

    @Expand()
    @DisplayColumn('JabilUsers', { type: ColumnType.MultiStatus, mappingField: 'name' })
    @FormInput()
    jabilUsers: User[];


    @Expand()
    @DisplayColumn('DccUsers', { type: ColumnType.MultiStatus, mappingField: 'name' })
    @FormInput()
    dccUsers: User[];

    @FormInput()
    @DisplayColumn('DccApproval', { type: ColumnType.Boolean })
    isDccApproval: boolean;

    constructor(workCellUser?: WorkCellUser) {
        super(workCellUser);
        if (workCellUser) {
            this.isDccApproval = workCellUser.isDccApproval;
            this.workCell = workCellUser.workCell;
            this.description = workCellUser.description;
            this.workCellId = workCellUser.workCellId;
            this.site = workCellUser.site;
            this.siteId = workCellUser.siteId;
            this.jabilUsers = workCellUser.jabilUsers;
            this.dccUsers = workCellUser.dccUsers;
        } else {
            this.isDccApproval = false;
            this.workCell = null;
            this.workCellId = 0;
            this.site = null;
            this.siteId = 0;
            this.jabilUsers = null;
            this.dccUsers = null;
            this.description = Constants.Empty;
        }
    }
}
