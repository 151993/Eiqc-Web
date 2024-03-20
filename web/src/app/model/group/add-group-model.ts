/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Group } from './group';

export class AddGroupModel extends BaseModel {
    wareHouse: string;
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
