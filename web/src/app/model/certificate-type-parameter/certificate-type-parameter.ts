/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Trim } from 'src/app/shared/decorators/property';
import { Constants, Numbers } from 'src/app/shared/constant/global';

export class CertificateTypeParameter extends BaseModel {

    id: number;

    @Trim()
    parameterName: string;

    constructor(certificateTypeParameter?: CertificateTypeParameter) {
        super(certificateTypeParameter);

        if (certificateTypeParameter) {
            this.id = certificateTypeParameter.id;
            this.parameterName = certificateTypeParameter.parameterName;

        } else {
            this.id = Numbers.Default;
            this.parameterName = Constants.Empty;

        }
    }
}
