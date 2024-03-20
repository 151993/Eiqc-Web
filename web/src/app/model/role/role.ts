
import { DisplayColumn} from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { Permission } from '../permission/permission';
import { RoleEnum } from '../role-enum/role-enum';

export class Role extends BaseModel {

    @DisplayColumn('Name')
    name: string;

    permissionTypeIds: Permission[];

    roleEnum: RoleEnum;

    roleEnumId: number;

    constructor(role?: Role) {
        super(role);

        if (role) {
            this.roleEnum = role.roleEnum;
            this.roleEnumId = role.roleEnumId;
            this.name = role.name;
            this.permissionTypeIds = role.permissionTypeIds;
        } else {
            this.name = Constants.Empty;
            this.permissionTypeIds = [];
            this.roleEnumId = Numbers.Default;
            this.roleEnum = null;
        }
    }
}
