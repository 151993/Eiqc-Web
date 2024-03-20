/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Supplier } from './supplier';

export class AddSupplierModel extends BaseModel {


    sapSupplierModel_ID: string;

    siteCode: string;

    email: string;

    phoneNo: string;

    faxNo: string;

    vendorCode: string;

    vendorName: string;

    address: string;

    streetNo: string;

    city: string;

    postalCode: string;

    country: string;

    supplierStatus: string;

    searchTerm: string;

    changedOn: string;
    siteName: string;
    vendorName2: string;
    vendorName3: string;
    vendorName4: string;
    icSite: string;
    vendorAcctGrp: string;
    purchaseOrg: string;
    salesOrgPoc: string;
    companyCode: string;
    valuationArea: string;
    icVendorOfPlant: string;
    createdDate: string;
    region: string;
    landCode: string;

    constructor(supplier?: Supplier) {
        super(supplier);

        if (supplier) {
            this.sapSupplierModel_ID = supplier.sapSupplierModel_ID;
            this.siteCode = supplier.siteCode;
            this.email = supplier.email;
            this.phoneNo = supplier.phoneNo;
            this.faxNo = supplier.faxNo;
            this.vendorCode = supplier.vendorCode;
            this.vendorName = supplier.vendorName;
            this.address = supplier.address;
            this.streetNo = supplier.streetNo;
            this.city = supplier.city;
            this.postalCode = supplier.postalCode;
            this.country = supplier.country;
            this.supplierStatus = supplier.supplierStatus;
            this.searchTerm = supplier.searchTerm;
            this.changedOn = supplier.changedOn;
            this.siteName = supplier.siteName;
            this.vendorName2 = supplier.vendorName2;
            this.vendorName3 = supplier.vendorName3;
            this.vendorName4 = supplier.vendorName4;
            this.icSite = supplier.icSite;
            this.vendorAcctGrp = supplier.vendorAcctGrp;
            this.purchaseOrg = supplier.purchaseOrg;
            this.salesOrgPoc = supplier.salesOrgPoc;
            this.companyCode = supplier.companyCode;
            this.valuationArea = supplier.valuationArea;
            this.icVendorOfPlant = supplier.icVendorOfPlant;
            this.createdDate = supplier.createdDate;
            this.region = supplier.region;
            this.landCode = supplier.landCode;
        } else {
            this.sapSupplierModel_ID = Constants.Empty;
            this.siteCode = Constants.Empty;
            this.email = Constants.Empty;
            this.phoneNo = Constants.Empty;
            this.faxNo = Constants.Empty;
            this.vendorCode = Constants.Empty;
            this.vendorName = Constants.Empty;
            this.address = Constants.Empty;
            this.streetNo = Constants.Empty;
            this.city = Constants.Empty;
            this.postalCode = Constants.Empty;
            this.country = Constants.Empty;
            this.supplierStatus = Constants.Empty;
            this.searchTerm = Constants.Empty;
            this.changedOn = Constants.Empty;
            this.siteName = Constants.Empty;
            this.vendorName2 = Constants.Empty;
            this.vendorName3 = Constants.Empty;
            this.vendorName4 = Constants.Empty;
            this.icSite = Constants.Empty;
            this.vendorAcctGrp = Constants.Empty;
            this.purchaseOrg = Constants.Empty;
            this.salesOrgPoc = Constants.Empty;
            this.companyCode = Constants.Empty;
            this.valuationArea = Constants.Empty;
            this.icVendorOfPlant = Constants.Empty;
            this.createdDate = Constants.Empty;
            this.region = Constants.Empty;
            this.landCode = Constants.Empty;
        }
    }
}

