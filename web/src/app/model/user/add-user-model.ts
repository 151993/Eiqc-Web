import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { User } from '../user/user';
import { Site } from '../site/site';

export class AddUserModel extends BaseModel {
  userName: string;
  name: string;
  email: string;
  allowNotification: boolean;
  employeeId: string;
  addedRoleIds: number;
  managerName: string;
  departmentName: string;
  siteId: number;
  site: Site;
  userTypeId: number;
  constructor(user?: User) {
    super(user);
    if (user) {
      this.id = user.id;
      this.userName = user.userName;
      this.name = user.name;
      this.email = user.email;
      this.employeeId = user.employeeId;
      this.isEnabled = user.isEnabled;
      this.allowNotification = user.allowNotification;
      this.managerName = user.manager.name;
      this.departmentName = user.department.name;
      this.siteId = user.siteId;
      this.site = user.site;
    } else {
      this.userName = Constants.Empty;
      this.name = Constants.Empty;
      this.email = Constants.Empty;
      this.employeeId = Constants.Empty;
      this.addedRoleIds = Numbers.Default;
      this.allowNotification = true;
      this.managerName = Constants.Empty;
      this.departmentName = Constants.Empty;
      this.siteId = Numbers.Default;
      this.site = null;
    }
  }
}
