/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { DisplayColumn, FormInput, Expand } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Numbers } from 'src/app/shared/constant/global';
import { DefectType } from '../defect-type/defect-type';
import { DefectSection } from '../defect-section/defect-section';
import { ColumnType } from '../table/table';

export class DefectManagement extends BaseModel {


    @FormInput()
    @DisplayColumn('id', null, false)
    defectSectionId: number;


    @FormInput()
    @Expand()
    @DisplayColumn('DefectSection', { type: ColumnType.Status, mappingField: 'description' })
    defectSection: DefectSection[];


    @Expand()
    @FormInput()
    @DisplayColumn('DefectType', { type: ColumnType.MultiStatus, mappingField: 'defectTypeName' })
    defectTypes: DefectType[];

    constructor(defectManagement?: DefectManagement) {
        super(defectManagement);

        if (defectManagement) {
            this.defectSection = defectManagement.defectSection;
            this.defectSectionId = defectManagement.defectSectionId;
            this.defectTypes = defectManagement.defectTypes;
        } else {
            this.defectSectionId = Numbers.Default;
            this.defectTypes = null;
            this.defectSection = [];
        }
    }
}
