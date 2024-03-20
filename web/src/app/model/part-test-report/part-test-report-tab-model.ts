import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { Attachment } from '../attachment/attachment';
import { TestReportAttachment } from '../test-report-attachment/test-report-attachment';
import { TestReport } from '../test-report/test-report';

export class PartTestReportTab extends BaseModel {

    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;


    @Trim()
    @FormInput()
    @DisplayColumn('TestRequirement', { type: ColumnType.TextBox })
    testRequirement: string;


    partTestReportAttachments: TestReportAttachment[];

    testReportAttachments: Attachment[] = [];

    originalTestReportAttachmentIds: number[];

    currentTestReportAttachmentIds: number[];

    removedTestReportAttachmentIds: number[];

    sAPPartInspectionPlanId: number;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    @FormInput()
    testReportId: number;

    @FormInput()
    testReport: TestReport;

    isExpanded: boolean;

    partTestReportParameterId: number;

    recId: any;

    resultId: number;

    constructor(partTestReportTab?: PartTestReportTab) {
        super(partTestReportTab);
        if (partTestReportTab) {
            this.name = partTestReportTab.name;
            this.testRequirement = partTestReportTab.testRequirement;
            this.testReportId = partTestReportTab.testReportId;
            this.testReport = partTestReportTab.testReport;
            this.partTestReportAttachments = partTestReportTab.partTestReportAttachments;
            this.isChecked = partTestReportTab.isChecked;
            this.isEnabled = partTestReportTab.isEnabled;
            this.isExpanded = partTestReportTab.isExpanded;
            this.sAPPartInspectionPlanId = partTestReportTab.sAPPartInspectionPlanId;
            this.resultId = partTestReportTab.resultId;
        } else {
            this.name = Constants.Empty;
            this.testRequirement = Constants.Empty;
            this.partTestReportAttachments = null;
            this.isChecked = false;
            this.isEnabled = false;
            this.testReportId = Numbers.Default;
            this.testReport = null;
            this.isExpanded = false;
            this.originalTestReportAttachmentIds = [];
            this.currentTestReportAttachmentIds = [];
            this.removedTestReportAttachmentIds = [];
            this.sAPPartInspectionPlanId = Numbers.Default;
            this.resultId = Numbers.One;
        }
    }
}
