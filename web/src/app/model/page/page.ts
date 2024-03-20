import { PermissionType } from 'src/app/shared/constant/roles';

export interface Page {
  url: string;
  title: string;
  permissions?: PermissionType[];
  visible: boolean;
  hasAccess: boolean;
  icon: string;
}
