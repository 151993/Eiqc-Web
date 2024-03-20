/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';

export class Part extends BaseModel {


    @FormInput()
    @DisplayColumn('PartNo', { type: ColumnType.String, mappingField: 'JABIL_PART_NO' })
    partNo: string;

    @FormInput()
    @DisplayColumn('PartDescription', { type: ColumnType.String, mappingField: 'MATERIAL_DESC' })
    partDescription: string;

    @FormInput()
    @DisplayColumn('Site', { type: ColumnType.String, mappingField: 'SITE' })
    site: string;

    @FormInput()
    @DisplayColumn('Commodity', { type: ColumnType.String, }, false)
    commodity: string;

    @DisplayColumn('ManufacturePartNumber', { type: ColumnType.String, mappingField: 'MANUF_PART_NO' })
    manufacturerPartNumber: string;

    @FormInput()
    @DisplayColumn('MpnMaterial', { type: ColumnType.String, mappingField: 'MPN_MTRL_HERS' })
    mpnMaterialHers: string;

    @FormInput()
    @DisplayColumn('MediaCode', { type: ColumnType.String, mappingField: 'MEDIACODE' })
    mediaCode: string;

    @FormInput()
    @DisplayColumn('MaskedMPN', { type: ColumnType.String, mappingField: 'MASKED_MPN' })
    maskedMPN: string;

    @FormInput()
    @DisplayColumn('Manufacturer', { type: ColumnType.String, mappingField: 'MANUFACTURER' })
    manufacturer: string;

    @FormInput()
    @DisplayColumn('WorkCell', { type: ColumnType.String, mappingField: 'MATERIAL_GROUP' })
    materialGroup: string;


    @FormInput()
    @DisplayColumn('JabilOwnerContact', { type: ColumnType.String, mappingField: 'JABIL_OWNER_CONTACT' })
    jabilOwnerContact: string;

    @FormInput()
    @DisplayColumn('ValidFrom', { type: ColumnType.String, mappingField: 'PART_VALID_FROM' })
    partValidFrom: string;

    @FormInput()
    @DisplayColumn('ValidTo', { type: ColumnType.String, mappingField: 'PART_VALID_TO' })
    partValidTo: string;

    @FormInput()
    @DisplayColumn('CreatedDate', { type: ColumnType.String, mappingField: 'CREATED_DATE' })
    createdDate: string;

    @FormInput()
    @DisplayColumn('LastModifiedDate', { type: ColumnType.String, mappingField: 'LAST_MODIFIED_DATE' })
    LastModifiedDate: string;

    @FormInput()
    @DisplayColumn('JabilPartNo', { type: ColumnType.StringWithoutLowerCase }, false)
    JABIL_PART_NO: string;

    @FormInput()
    @DisplayColumn('Site', { type: ColumnType.StringWithoutLowerCase }, false)
    SITE: string;

    @FormInput()
    @DisplayColumn('MPN_MTRL_HERS', { type: ColumnType.StringWithoutLowerCase }, false)
    MPN_MTRL_HERS: string;

    @FormInput()
    @DisplayColumn('MANUFACTURER', { type: ColumnType.StringWithoutLowerCase }, false)
    MANUFACTURER: string;

    @FormInput()
    @DisplayColumn('MEDIACODE', { type: ColumnType.StringWithoutLowerCase }, false)
    MEDIACODE: string;

    @FormInput()
    @DisplayColumn('MANUF_PART_NO', { type: ColumnType.StringWithoutLowerCase }, false)
    MANUF_PART_NO: string;

    @FormInput()
    @DisplayColumn('MASKED_MPN', { type: ColumnType.StringWithoutLowerCase }, false)
    MASKED_MPN: string;

    @FormInput()
    @DisplayColumn('MATERIAL_GROUP', { type: ColumnType.StringWithoutLowerCase }, false)
    MATERIAL_GROUP: string;

    @FormInput()
    @DisplayColumn('JABIL_OWNER_CONTACT', { type: ColumnType.StringWithoutLowerCase }, false)
    JABIL_OWNER_CONTACT: string;

    @FormInput()
    @DisplayColumn('MATERIAL_DESC', { type: ColumnType.StringWithoutLowerCase }, false)
    MATERIAL_DESC: string;

    @FormInput()
    @DisplayColumn('PART_VALID_FROM', { type: ColumnType.StringWithoutLowerCase }, false)
    PART_VALID_FROM: string;

    @FormInput()
    @DisplayColumn('PART_VALID_TO', { type: ColumnType.StringWithoutLowerCase }, false)
    PART_VALID_TO: string;

    @FormInput()
    @DisplayColumn('CREATED_DATE', { type: ColumnType.StringWithoutLowerCase }, false)
    CREATED_DATE: string;

    @FormInput()
    @DisplayColumn('LAST_MODIFIED_DATE', { type: ColumnType.StringWithoutLowerCase }, false)
    LAST_MODIFIED_DATE: string;

    constructor(part?: Part) {
        super(part);
        if (part) {
            this.partNo = part.partNo;
            this.JABIL_PART_NO = part.JABIL_PART_NO;
            this.partDescription = part.partDescription;
            this.commodity = part.commodity;
            this.site = part.site;
            this.mpnMaterialHers = part.mpnMaterialHers;
            this.mediaCode = part.mediaCode;
            this.maskedMPN = part.maskedMPN;
            this.manufacturer = part.manufacturer;
            this.manufacturerPartNumber = part.manufacturerPartNumber;
            this.jabilOwnerContact = part.jabilOwnerContact;
            this.partValidFrom = part.partValidFrom;
            this.partValidTo = part.partValidTo;
            this.materialGroup = part.materialGroup;
            this.createdDate = part.createdDate;
            this.LastModifiedDate = part.LastModifiedDate;


        } else {
            this.partNo = Constants.Empty;
            this.JABIL_PART_NO = Constants.Empty;
            this.partDescription = Constants.Empty;
            this.commodity = Constants.Empty;
            this.site = Constants.Empty;
            this.mpnMaterialHers = Constants.Empty;
            this.mediaCode = Constants.Empty;
            this.maskedMPN = Constants.Empty;
            this.manufacturer = Constants.Empty;
            this.manufacturerPartNumber = Constants.Empty;
            this.jabilOwnerContact = Constants.Empty;
            this.partValidFrom = null;
            this.partValidTo = null;
            this.materialGroup = Constants.Empty;
            this.createdDate = null;
            this.LastModifiedDate = null;
        }
    }
}
