/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { Constants } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';
import { ColumnType } from '../../table/table';
import { ParameterManagement } from '../../parameter-management/parameter-management';

export class PartResultOrientedParameterLabelModel extends BaseModel {
    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @FormInput()
    parameterManagementId: number;

    @FormInput()
    parameterManagement: ParameterManagement;

    @FormInput()
    @DisplayColumn('Result')
    resultExpected: string;

    @Trim()
    @FormInput()
    @DisplayColumn('TestRequirement', { type: ColumnType.String })
    testRequirement: string;

    @FormInput()
    resultId: number;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    constructor(testReportTab?: PartResultOrientedParameterLabelModel) {
        super(testReportTab);
        if (testReportTab) {
            this.name = testReportTab.name;
            this.resultExpected = testReportTab.resultExpected;
            this.testRequirement = testReportTab.testRequirement;
            this.parameterManagement = testReportTab.parameterManagement;
            this.resultId = testReportTab.resultId;
            this.isChecked = testReportTab.isChecked;
            this.isEnabled = testReportTab.isEnabled;

        } else {
            this.name = Constants.Empty;
            this.resultExpected = Constants.Empty;
            this.testRequirement = Constants.Empty;
            this.parameterManagementId = 0;
            this.parameterManagement = null;
            this.resultId = 1;
            this.isChecked = false;
            this.isEnabled = false;
        }
    }
}
