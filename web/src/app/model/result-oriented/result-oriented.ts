/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { ParameterManagement } from '../parameter-management/parameter-management';

export class ResultOrientedTab extends BaseModel {
    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @FormInput()
    parameterManagementId: number;

    @DisplayColumn('ParameterName', { type: ColumnType.Status, mappingField: 'name' }, false)
    parameterManagement: ParameterManagement;

    @Trim()
    @FormInput()
    @DisplayColumn('Result', { type: ColumnType.DynamicTypeRadioButton })
    resultExpected: string;

    @Trim()
    @FormInput()
    @DisplayColumn('TestRequirement', { type: ColumnType.TextBox })
    testRequirement: string;

    @FormInput()
    resultId: number;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    constructor(testReportTab?: ResultOrientedTab) {
        super(testReportTab);
        if (testReportTab) {
            this.name = testReportTab.name;
            this.resultExpected = testReportTab.resultExpected;
            this.testRequirement = testReportTab.testRequirement;
            this.parameterManagementId = testReportTab.parameterManagementId;
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
