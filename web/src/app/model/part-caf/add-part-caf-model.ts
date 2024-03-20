/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { PartCAF } from './part-caf';


export class AddPartCAFModel extends BaseModel {


    partNo: string;


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
