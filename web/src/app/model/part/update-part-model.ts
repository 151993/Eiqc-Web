/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../../model/part/part';

export class UpdatePartModel extends BaseModel {
    partNo: string;
    partDescription: string;
    site: string;
    commodity: string;
    partManufacturePartNumbers: string;
    mpnMaterial: string;
    mediaCode: string;
    maskedMPN: string;
    manufacturer: string;
    vendor: string;
    constructor(part?: Part) {
        super(part);
        if (part) {
            this.partNo = part.partNo;
            this.commodity = part.commodity;
            this.site = part.site;
            this.mpnMaterial = part.mpnMaterialHers;
            this.mediaCode = part.mediaCode;
            this.maskedMPN = part.maskedMPN;
            this.manufacturer = part.manufacturer;
            this.partManufacturePartNumbers = part.manufacturerPartNumber;
        } else {
            this.partNo = Constants.Empty;
            this.commodity = Constants.Empty;
            this.site = Constants.Empty;
            this.mpnMaterial = Constants.Empty;
            this.mediaCode = Constants.Empty;
            this.maskedMPN = Constants.Empty;
            this.manufacturer = Constants.Empty;
            this.partManufacturePartNumbers = Constants.Empty;
        }
    }
}
