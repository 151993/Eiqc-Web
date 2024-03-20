import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { User } from '../user/user';
import { Manager } from '../manager/manager';
import { Department } from '../department/department';
import { Site } from '../site/site';

export class UpdateUserModel extends BaseModel {
  userName: string;
  name: string;
  email: string;
  allowNotification: boolean;
  employeeId: string;
  addedRoleIds: number;
  removedRoleIds: number;
  manager: Manager;
  department: Department;
  managerId: number;
  departmentId: number;
  siteId: number;
  site: Site;
  userTypeId: number;
  constructor(user?: User) {
    super(user);
    if (user) {
      this.userName = user.userName;
      this.name = user.name;
      this.email = user.email;
      this.allowNotification = user.allowNotification;
      this.employeeId = user.employeeId;
      this.manager = user.manager;
      this.department = user.department;
      this.managerId = user.managerId;
      this.departmentId = user.departmentId;
      this.siteId = user.siteId;
      this.site = user.site;
      this.userTypeId = user.userTypeId;
    } else {
      this.userName = Constants.Empty;
      this.name = Constants.Empty;
      this.email = Constants.Empty;
      this.employeeId = Constants.Empty;
      this.addedRoleIds = null;
      this.removedRoleIds = null;
      this.allowNotification = true;
      this.manager = null;
      this.department = null;
      this.managerId = Numbers.Default;
      this.departmentId = Numbers.Default;
      this.siteId = Numbers.Default;
      this.site = null;
      this.userTypeId = Numbers.Default;
    }
  }
}
