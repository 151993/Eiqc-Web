/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class Group extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('WareHouse')
    wareHouse: string;

    @Trim()
    @FormInput()
    @DisplayColumn('UserName')
    userName: string;

    constructor(group?: Group) {
        super(group);

        if (group) {
            this.wareHouse = group.wareHouse;
            this.userName = group.userName;
        } else {
            this.wareHouse = Constants.Empty;
            this.userName = Constants.Empty;
        }
    }
}
