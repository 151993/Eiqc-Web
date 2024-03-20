
import { Constants } from 'src/app/shared/constant/global';

export class Permission {
    id: number;
    name: string;

    constructor(permission?: Permission) {
        if (permission) {
            this.id = permission.id;
            this.name = permission.name;
        } else {
            this.id = 0;
            this.name = Constants.Empty;
        }
    }
}
