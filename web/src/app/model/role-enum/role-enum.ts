
import { Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';


export class RoleEnum extends BaseModel {

    @FormInput()
    roleEnumId: number;

    @Trim()
    @FormInput()
    name: string;

    @Trim()
    @FormInput()
    description: string;

    @FormInput()
    isEnabled: boolean;

    constructor(roleEnum?: RoleEnum) {
        super(roleEnum);

        if (roleEnum) {
            this.roleEnumId = roleEnum.roleEnumId;
            this.name = roleEnum.name;
            this.description = roleEnum.description;
            this.isEnabled = roleEnum.isEnabled;

        } else {
            this.roleEnumId = 0;
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.isEnabled = false;

        }
    }
}
