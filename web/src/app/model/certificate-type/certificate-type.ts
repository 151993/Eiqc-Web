/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { CertificateTypeParameter } from '../certificate-type-parameter/certificate-type-parameter';

export class CertificateType extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Expand()
    @FormInput()
    certificateTypeParameters: CertificateTypeParameter[];

    constructor(certificateType?: CertificateType) {
        super(certificateType);

        if (certificateType) {
            this.name = certificateType.name;
            this.certificateTypeParameters = certificateType.certificateTypeParameters;
        } else {
            this.name = Constants.Empty;
            this.certificateTypeParameters = null;
        }
    }
}
