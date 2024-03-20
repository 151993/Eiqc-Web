/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { CertificateType } from './certificate-type';


export class AddCertificateTypeModel extends BaseModel {
    name: string;
    addedCertificateTypeParameters: string[];

    constructor(certificateType?: CertificateType) {
        super(certificateType);

        if (certificateType) {
            this.name = certificateType.name;
        } else {
            this.name = Constants.Empty;
            this.addedCertificateTypeParameters = null;
        }
    }
}

