/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { CertificateType } from './certificate-type';

export class UpdateCertificateTypeModel extends BaseModel {
    name: string;
    addedCertificateTypeParameters: string[];
    removedCertificateTypeParameters: string[];

    constructor(certificateType?: CertificateType) {
        super(certificateType);

        if (certificateType) {
            this.name = certificateType.name;
        } else {
            this.name = Constants.Empty;
            this.addedCertificateTypeParameters = null;
            this.removedCertificateTypeParameters = null;
        }
    }
}
