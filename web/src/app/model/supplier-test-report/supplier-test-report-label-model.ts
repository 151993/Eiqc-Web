
import { BaseModel } from '../base/base-model';

import { Constants, Numbers } from 'src/app/shared/constant/global';
import { Attachment } from '../attachment/attachment';
import { ColumnType } from '../table/table';
import { DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { SupplierTestReportAttachment } from '../supplier-test-report-attachment/supplier-test-report-attachment';
import { DefectType } from '../defect-type/defect-type';

export class SupplierTestReportLabelModel extends BaseModel {


    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @FormInput()
    @DisplayColumn('ActualResult', { type: ColumnType.String })
    resultExpected: string;

    @Trim()
    @FormInput()
    @DisplayColumn('TestRequirement')
    testRequirement: string;

    @Trim()
    @FormInput()
    @DisplayColumn('InspectionDetails', { type: ColumnType.String })
    inspectionDetails: string;

    @Trim()
    @FormInput()
    @DisplayColumn('DefectType', { type: ColumnType.String, mappingField: 'defectTypeName' })
    defectTypeName: string;

    @FormInput()
    isChecked: boolean;

    @FormInput()
    isEnabled: boolean;

    defectType: DefectType;

    sMSId: number;

    partTestReportParameterId: number;

    defectTypeId: number;

    supplierTestReportAttachments: SupplierTestReportAttachment[];

    testReportAttachments: Attachment[] = [];

    sapPartInspectionPlanId: number;

    originalSupplierTestReportAttachmentIds: number[];

    currentSupplierTestReportAttachmentIds: number[];

    removedSupplierTestReportAttachmentIds: number[];

    isPartAttachmentExpanded: boolean;

    isSupplierAttachmentExpanded: boolean;

    recId: number;

    hasSupplierAttachments: boolean;

    @FormInput()
    resultId: number;

    isDisabled: boolean;

    constructor(supplierTestReport?: SupplierTestReportLabelModel) {
        super(supplierTestReport);

        if (supplierTestReport) {
            this.name = supplierTestReport.name;
            this.resultExpected = supplierTestReport.resultExpected;
            this.testRequirement = supplierTestReport.testRequirement;
            this.defectType = supplierTestReport.defectType;
            this.defectTypeName = supplierTestReport.defectTypeName;
            this.sMSId = supplierTestReport.sMSId;
            this.partTestReportParameterId = supplierTestReport.partTestReportParameterId;
            this.defectTypeId = supplierTestReport.defectTypeId;
            this.inspectionDetails = supplierTestReport.inspectionDetails;
            this.supplierTestReportAttachments = supplierTestReport.supplierTestReportAttachments;
            this.isPartAttachmentExpanded = supplierTestReport.isPartAttachmentExpanded;
            this.isSupplierAttachmentExpanded = supplierTestReport.isSupplierAttachmentExpanded;
            this.recId = supplierTestReport.recId;
            this.sapPartInspectionPlanId = supplierTestReport.sapPartInspectionPlanId;
            this.isChecked = supplierTestReport.isChecked;
            this.isEnabled = false;
            this.hasSupplierAttachments = supplierTestReport.hasSupplierAttachments;
            this.resultId =  supplierTestReport.resultId;
            this.isDisabled = supplierTestReport.isDisabled;
        } else {
            this.sMSId = Numbers.Default;
            this.partTestReportParameterId = Numbers.Default;
            this.defectTypeId = null;
            this.inspectionDetails = Constants.Empty;
            this.supplierTestReportAttachments = null;
            this.isPartAttachmentExpanded = false;
            this.isSupplierAttachmentExpanded = false;
            this.recId = Numbers.Default;
            this.defectType = null;
            this.defectTypeName = Constants.Empty;
            this.sapPartInspectionPlanId = Numbers.Default;
            this.isChecked = false;
            this.isEnabled = false;
            this.hasSupplierAttachments = false;
            this.resultId =  Numbers.One;
            this.isDisabled = false;

        }
    }
}
