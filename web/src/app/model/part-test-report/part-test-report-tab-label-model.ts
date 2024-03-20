import { DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';
import { Attachment } from '../attachment/attachment';
import { TestReportAttachment } from '../test-report-attachment/test-report-attachment';
import { TestReport } from '../test-report/test-report';

export class PartTestReportTabLabel extends BaseModel {

    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @FormInput()
    @DisplayColumn('Name', { type: ColumnType.String })
    name: string;

    @FormInput()
    @DisplayColumn('Result', { type: ColumnType.String }, false)
    resultExpected: string;

    @FormInput()
    @DisplayColumn('TestRequirement', { type: ColumnType.String })
    testRequirement: string;

    partTestReportAttachments: TestReportAttachment[];

    testReportAttachments: Attachment[] = [];

    originalTestReportAttachmentIds: number[];

    currentTestReportAttachmentIds: number[];

    removedTestReportAttachmentIds: number[];

    sAPPartInspectionPlanId: number;

    @FormInput()
    resultId: number;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    @FormInput()
    testReportId: number;

    @FormInput()
    testReport: TestReport;

    @FormInput()
    isExpanded: boolean;

    partTestReportParameterId: number;

    recId: any;

    constructor(partTestReportTab?: PartTestReportTabLabel) {
        super(partTestReportTab);
        if (partTestReportTab) {
            this.name = partTestReportTab.name;
            this.resultExpected = partTestReportTab.resultExpected;
            this.testRequirement = partTestReportTab.testRequirement;
            this.testReportId = partTestReportTab.testReportId;
            this.testReport = partTestReportTab.testReport;
            this.partTestReportAttachments = partTestReportTab.partTestReportAttachments;
            this.resultId = partTestReportTab.resultId;
            this.isChecked = partTestReportTab.isChecked;
            this.isEnabled = partTestReportTab.isEnabled;
            this.isExpanded = partTestReportTab.isExpanded;
            this.sAPPartInspectionPlanId = partTestReportTab.sAPPartInspectionPlanId;
        } else {
            this.name = Constants.Empty;
            this.resultExpected = Constants.Empty;
            this.testRequirement = Constants.Empty;
            this.partTestReportAttachments = null;
            this.resultId = Numbers.One;
            this.isChecked = false;
            this.isEnabled = false;
            this.testReportId = Numbers.Default;
            this.testReport = null;
            this.isExpanded = false;
            this.originalTestReportAttachmentIds = [];
            this.currentTestReportAttachmentIds = [];
            this.removedTestReportAttachmentIds = [];
            this.sAPPartInspectionPlanId = Numbers.Default;
        }
    }
}
