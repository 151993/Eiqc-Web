/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { DisplayColumn, Expand, FormInput, Trim } from 'src/app/shared/decorators/property';
import { User } from '../user/user';
import { Constants } from 'src/app/shared/constant/global';
import { Site } from '../site/site';

export class SiteUser extends BaseModel {

    @FormInput()
    @Expand()
    user: User;

    @Expand()
    site: Site;

    id: number;

    @Trim()
    @DisplayColumn('Site')
    siteName: string;

    @Trim()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @DisplayColumn('Email')
    email: string;

    @Trim()
    @DisplayColumn('Department')
    department: string;

    @Trim()
    @DisplayColumn('Supervisor')
    supervisor: string;


    supervisorEmail: string;
    siteId: number;
    userId: number;

    constructor(siteUser?: SiteUser) {
        super(siteUser);

        if (siteUser) {
            this.name = siteUser.name;
            this.email = siteUser.email;
            this.supervisor = siteUser.supervisor;
            this.supervisorEmail = siteUser.supervisorEmail;
            this.user = siteUser.user;
            this.id = siteUser.id;
            this.siteId = siteUser.siteId;
            this.userId = siteUser.userId;
            this.site = siteUser.site;
            this.siteName = siteUser.site.name;

        } else {
            this.name = Constants.Empty;
            this.email = Constants.Empty;
            this.supervisor = Constants.Empty;
            this.supervisorEmail = Constants.Empty;
            this.siteName = Constants.Empty;
            this.user = null;
            this.site = null;
        }
    }
}
