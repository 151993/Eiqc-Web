/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class PartFunParameter extends BaseModel {
    @FormInput()
    @Expand()
    part: Part;
    @Trim()
    @FormInput()
    partNo: string;
    @Trim()
    @FormInput()
    @DisplayColumn('Requirement')
    requirement: string;
    @Trim()
    @FormInput()
    @DisplayColumn('SupplierDC')
    supplierDC: string;
    @Trim()
    @FormInput()
    mfgDate: string;
    @Trim()
    @FormInput()
    @DisplayColumn('Result')
    result: string;
    constructor(partFunParameter?: PartFunParameter) {
        super(partFunParameter);
        if (partFunParameter) {
            this.partNo = partFunParameter.partNo;
            this.requirement = partFunParameter.requirement;
            this.supplierDC = partFunParameter.supplierDC;
            this.mfgDate = partFunParameter.mfgDate;
            this.result = partFunParameter.result;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.requirement = Constants.Empty;
            this.supplierDC = Constants.Empty;
            this.mfgDate = Constants.Empty;
            this.result = Constants.Empty;
        }
    }
}
