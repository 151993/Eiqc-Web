/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { AdminCertification } from './admin-certification';
import { Attachment } from '../attachment/attachment';

export class AddAdminCertificationModel extends BaseModel {

    adminCertificateId: number;
    number: string;
    name: string;
    description: string;
    assessmentBodyId: string;
    assessmentBodyName: string;
    certificateStartDate: Date;
    certificateEndDate: Date;
    attachments: Attachment[] = [];

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

        } else {
            this.adminCertificateId = 0;
            this.number = Constants.Empty;
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.assessmentBodyId = Constants.Empty;
            this.assessmentBodyName = Constants.Empty;
            this.certificateStartDate = null;
            this.certificateEndDate = null;
            this.attachments = [];
        }
    }
}

