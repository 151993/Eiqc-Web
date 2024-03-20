/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { AdminCertificationAttachment } from '../admin-certification-attachment/admin-certification-attachment';
import { ColumnType } from '../table/table';

export class AdminCertification extends BaseModel {


    @FormInput()
    adminCertificateId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('CertificateNumber')
    number: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    @Trim()
    @FormInput()
    @DisplayColumn('AssessmentBodyId')
    assessmentBodyId: string;

    @Trim()
    @FormInput()
    @DisplayColumn('AssessmentBodyName')
    assessmentBodyName: string;

    @FormInput()
    @DisplayColumn('CertificateStartDate', { type: ColumnType.Date })
    certificateStartDate: Date;

    @FormInput()
    @DisplayColumn('CertificateEndDate', { type: ColumnType.Date })
    certificateEndDate: Date;

    @Expand(['attachment'])
    adminCertificationAttachments: AdminCertificationAttachment[];


    constructor(adminCertification?: AdminCertification) {
        super(adminCertification);

        if (adminCertification) {

            this.adminCertificateId = adminCertification.adminCertificateId;
            this.number = adminCertification.number;
            this.name = adminCertification.name;
            this.description = adminCertification.description;
            this.assessmentBodyId = adminCertification.assessmentBodyId;
            this.assessmentBodyName = adminCertification.assessmentBodyName;
            this.certificateStartDate = adminCertification.certificateStartDate;
            this.certificateEndDate = adminCertification.certificateEndDate;
            this.adminCertificationAttachments = adminCertification.adminCertificationAttachments;

        } else {
            this.adminCertificateId = 0;
            this.number = Constants.Empty;
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.assessmentBodyId = Constants.Empty;
            this.assessmentBodyName = Constants.Empty;
            this.certificateStartDate = null;
            this.certificateEndDate = null;
            this.adminCertificationAttachments = [];
        }
    }
}
