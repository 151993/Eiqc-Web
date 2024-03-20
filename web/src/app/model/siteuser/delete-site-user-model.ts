import { Site } from '../site/site';

export interface IDeleteSiteUserModel {
    id: number;
    changeReason: string;
    site: Site;
}

export class DeleteSiteUserModel implements IDeleteSiteUserModel {
    id: number;
    changeReason: string;
    site: Site;
}
