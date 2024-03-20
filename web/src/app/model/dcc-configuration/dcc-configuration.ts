/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Site } from '../site/site';
import { ColumnType } from '../table/table';

export class DCCConfiguration extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('SiteNo')
    siteNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('DeptCode')
    deptCode: string;

    @Trim()
    @FormInput()
    @DisplayColumn('DocLevel')
    docLevel: string;

    @FormInput()
    @Expand()
    @DisplayColumn('Site', { type: ColumnType.Status, mappingField: 'name' })
    site: Site;

    @FormInput()
    siteId: number;

   constructor(dCCConfiguration?: DCCConfiguration) {
        super(dCCConfiguration);
        if (dCCConfiguration) {
            this.siteNo = dCCConfiguration.siteNo;
            this.deptCode = dCCConfiguration.deptCode;
            this.docLevel = dCCConfiguration.docLevel;
            this.site = dCCConfiguration.site;
            this.siteId = dCCConfiguration.siteId;
        } else {
            this.siteNo = Constants.Empty;
            this.deptCode = Constants.Empty;
            this.docLevel = Constants.Empty;
            this.site = null;
            this.siteId = 0;
        }
    }
}
