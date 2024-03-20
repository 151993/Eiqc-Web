


import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';

export class UpdateRoleModel extends BaseModel {

    constructor() {
        super();

        this.name = Constants.Empty;
        this.changeReason = Constants.Empty;
        this.roleEnumId = Numbers.Default;
        this.addedPermissions = [];
        this.removedPermissions = [];
    }

    name: string;
    changeReason: string;
    addedPermissions: number[];
    removedPermissions: number[];
    roleEnumId: number;
}
