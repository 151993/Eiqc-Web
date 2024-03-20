


import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';

export class AddRoleModel extends BaseModel {
    name: string;
    changeReason: string;
    permissions: Number[];
    roleEnumId: number;

    constructor() {
        super();
        this.roleEnumId = Numbers.Default;
        this.name = Constants.Empty;
        this.changeReason = Constants.Empty;
        this.permissions = [];
    }
}
