/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Numbers } from '../../shared/constant/global';
import { DefectManagement } from './defect-management';


export class AddDefectManagementModel extends BaseModel {
    defectSectionId: number;
    addedDefectTypes: string[];

    constructor(defectManagement?: DefectManagement) {
        super(defectManagement);

        if (defectManagement) {
            this.defectSectionId = defectManagement.defectSectionId;
        } else {
            this.defectSectionId = Numbers.Default;
            this.addedDefectTypes = null;
        }
    }
}

