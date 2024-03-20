/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class PartCAF extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('PartNo')
    partNo: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Hyperlink')
    hyperlink: string;

    constructor(partCAF?: PartCAF) {
        super(partCAF);
        if (partCAF) {
            this.partNo = partCAF.partNo;
            this.hyperlink = partCAF.hyperlink;
       } else {
            this.partNo = Constants.Empty;
            this.hyperlink = Constants.Empty;
       }
    }
}
