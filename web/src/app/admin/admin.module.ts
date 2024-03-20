import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { CoreModule } from '../shared/core.module';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { EmailTemplateDetailComponent } from './email/email-template-detail/email-template-detail.component';
import { EmailTemplateListComponent } from './email/email-template-list/email-template-list.component';
import { EmailTemplateEditGuideComponent } from './email/email-template-edit-guide/email-template-edit-guide.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentDetailComponent } from './department/department-detail/department-detail.component';
import { WorkCellListComponent } from './workcell/work-cell-list/work-cell-list.component';
import { WorkCellDetailComponent } from './workcell/work-cell-detail/work-cell-detail.component';
import { RegionListComponent } from './region/region-list/region-list.component';
import { RegionDetailComponent } from './region/region-detail/region-detail.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationDetailComponent } from './location/location-detail/location-detail.component';
import { DivisionListComponent } from './division/division-list/division-list.component';
import { DivisionDetailComponent } from './division/division-detail/division-detail.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { SiteDetailComponent } from './site/site-detail/site-detail.component';
import { SiteUserDetailComponent } from './siteuser/site-user-detail/site-user-detail.component';
import { SiteUserListComponent } from './siteuser/site-user-list/site-user-list.component';
import { BuyerDetailComponent } from './buyer/buyer-detail/buyer-detail.component';
import { BuyerListComponent } from './buyer/buyer-list/buyer-list.component';
import { CompletedGRSDetailComponent } from './completed-grs/completed-grs-detail/completed-grs-detail.component';
import { CompletedGRSListComponent } from './completed-grs/completed-grs-list/completed-grs-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CTParameterListComponent } from './ct-parameter/ct-parameter-list/ct-parameter-list.component';
import { UOMDetailComponent } from './uom/uom-detail/uom-detail.component';
import { UOMListComponent } from './uom/uom-list/uom-list.component';
import { SupplierFormVISListComponent } from './supplier-form-vis/supplier-form-vis-list/supplier-form-vis-list.component';
import { SupplierFormVISDetailComponent } from './supplier-form-vis/supplier-form-vis-detail/supplier-form-vis-detail.component';
import { SupplierFormListComponent } from './supplier-form/supplier-form-list/supplier-form-list.component';
import { SupplierFormDetailComponent } from './supplier-form/supplier-form-detail/supplier-form-detail.component';
import { GRSSAPResultDetailComponent } from './grssap-result/grssap-result-detail/grssap-result-detail.component';
import { GRSSAPResultListComponent } from './grssap-result/grssap-result-list/grssap-result-list.component';
import { GoodsReceiveUserDetailComponent } from './goods-receive-user/goods-receive-user-detail/goods-receive-user-detail';
import { GoodsReceiveUserListComponent } from './goods-receive-user/goods-receive-user-list/goods-receive-user-list.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { InspectionToolsTypeDetailComponent } from './inspection-tools-type/inspection-tools-type-detail/inspection-tools-type-detail.component';
import { InspectionToolsTypeListComponent } from './inspection-tools-type/inspection-tools-type-list/inspection-tools-type-list.component';
import { InstrumentTypeDetailComponent } from './instrument-type/instrument-type-detail/instrument-type-detail.component';
import { InstrumentTypeListComponent } from './instrument-type/instrument-type-list/instrument-type-list.component';
import { LotInspectionQtyDetailComponent } from './lot-inspection-qty/lot-inspection-qty-detail/lot-inspection-qty-detail.component';
import { LotInspectionQtyListComponent } from './lot-inspection-qty/lot-inspection-qty-list/lot-inspection-qty-list.component';
import { ParameterCategoryDetailComponent } from './parameter-category/parameter-category-detail/parameter-category-detail.component';
import { ParameterCategoryListComponent } from './parameter-category/parameter-category-list/parameter-category-list.component';
import { ParameterTypeDetailComponent } from './parameter-type/parameter-type-detail/parameter-type-detail.component';
import { ParameterTypeListComponent } from './parameter-type/parameter-type-list/parameter-type-list.component';
import { PartCAFDetailComponent } from './part-caf/part-caf-detail/part-caf-detail.component';
import { PartCAFListComponent } from './part-caf/part-caf-list/part-caf-list.component';
import { PCCodeDetailComponent } from './pc-code/pc-code-detail/pc-code-detail.component';
import { PCCodeListComponent } from './pc-code/pc-code-list/pc-code-list.component';
import { ReceiveGoodsInfoDetailComponent } from './receive-goods-info/receive-goods-info-detail/receive-goods-info-detail.component';
import { ReceiveGoodsInfoManualDetailComponent } from './receive-goods-info-manual/receive-goods-info-manual-detail/receive-goods-info-manual-detail.component';
import { RosettaDetailComponent } from './rosetta/rosetta-detail/rosetta-detail.component';
import { RosettaListComponent } from './rosetta/rosetta-list/rosetta-list.component';
import { ReceiveGoodsInfoListComponent } from './receive-goods-info/receive-goods-info-list/receive-goods-info-list.component';
import { ReceiveGoodsInfoManualListComponent } from './receive-goods-info-manual/receive-goods-info-manual-list/receive-goods-info-manual-list.component';
import { DispositionTypeDetailComponent } from './disposition-type/disposition-type-detail/disposition-type-detail.component';
import { DispositionTypeListComponent } from './disposition-type/disposition-type-list/disposition-type-list.component';
import { SupplierFormBowTwistParameterDetailComponent } from './supplier-form-bow-twist-parameter/supplier-form-bow-twist-parameter-detail/supplier-form-bow-twist-parameter-detail.component';
import { SupplierFormBowTwistParameterListComponent } from './supplier-form-bow-twist-parameter/supplier-form-bow-twist-parameter-list/supplier-form-bow-twist-parameter-list.component';
import { SupplierFormPackagingDetailComponent } from './supplier-form-packaging/supplier-form-packaging-detail/supplier-form-packaging-detail.component';
import { SupplierFormPackagingListComponent } from './supplier-form-packaging/supplier-form-packaging-list/supplier-form-packaging-list.component';
import { SupplierFormPartDateCodeDetailComponent } from './supplier-form-part-date-code/supplier-form-part-date-code-detail/supplier-form-part-date-code-detail.component';
import { SupplierFormPartDateCodeListComponent } from './supplier-form-part-date-code/supplier-form-part-date-code-list/supplier-form-part-date-code-list.component';
import { SupplierFormResultOrientedParameterDetailComponent } from './supplier-form-result-oriented-parameter/supplier-form-result-oriented-parameter-detail/supplier-form-result-oriented-parameter';
import { SupplierFormResultOrientedParameterListComponent } from './supplier-form-result-oriented-parameter/supplier-form-result-oriented-parameter-list/supplier-form-result-oriented-parameter-list.component';
import { SupplierFormSAPParameterDetailComponent } from './supplier-form-sap-parameter/supplier-form-sap-parameter-detail/supplier-form-sap-parameter-detail.component';
import { SupplierFormSpecialParameterDetailComponent } from './supplier-form-special-parameter/supplier-form-special-parameter-detail/supplier-form-special-parameter-detail.component';
import { SupplierFormSAPParameterListComponent } from './supplier-form-sap-parameter/supplier-form-sap-parameter-list/supplier-form-sap-parameter-list.component';
import { SupplierFormSpecialParameterListComponent } from './supplier-form-special-parameter/supplier-form-special-parameter-list/supplier-form-special-parameter-list.component';
import { SupplierFormFunParaDetailComponent } from './supplier-form-fun-para/supplier-form-fun-para-detail/supplier-form-fun-para-detail.component';
import { SupplierFormFunParaListComponent } from './supplier-form-fun-para/supplier-form-fun-para-list/supplier-form-fun-para-list.component';
import { SupplierFormBowTwistActualDetailComponent } from './supplier-form-bow-twist-actual/supplier-form-bow-twist-actual-detail/supplier-form-bow-twist-actual-detail.component';
import { SupplierFormBowTwistActualListComponent } from './supplier-form-bow-twist-actual/supplier-form-bow-twist-actual-list/supplier-form-bow-twist-actual-list.component';
import { SupplierFormFunParaActualDetailComponent } from './supplier-form-fun-para-actual/supplier-form-fun-para-actual-detail/supplier-form-fun-para-actual-detail.component';
import { SupplierFormFunParaActualListComponent } from './supplier-form-fun-para-actual/supplier-form-fun-para-actual-list/supplier-form-fun-para-actual-list.component';
import { SupplierFormLPositionDetailComponent } from './supplier-form-l-position/supplier-form-l-position-detail/supplier-form-l-position-detail.component';
import { SupplierFormLPositionListComponent } from './supplier-form-l-position/supplier-form-l-position-list/supplier-form-l-position-list.component';
import { SupplierFormLPositionActualDetailComponent } from './supplier-form-l-position-actual/supplier-form-l-position-actual-detail/supplier-form-l-position-actual-detail.component';
import { SupplierFormLPositionActualListComponent } from './supplier-form-l-position-actual/supplier-form-l-position-actual-list/supplier-form-l-position-actual-list.component';
import { SupplierFormMeasurementParameterDetailComponent } from './supplier-form-measurement-parameter/supplier-form-measurement-parameter-detail/supplier-form-measurement-parameter-detail.component';
import { SupplierFormMeasurementParameterActualListComponent } from './supplier-form-measurement-parameter-actual/supplier-form-measurement-parameter-actual-detail/supplier-form-measurement-parameter-actual-list/supplier-form-measurement-parameter-actual-list.component';
import { SupplierFormMicroSectionDetailComponent } from './supplier-form-micro-section/supplier-form-micro-section-detail/supplier-form-micro-section-detail.component';
import { SupplierFormMicroSectionActualListComponent } from './supplier-form-micro-section-actual/supplier-form-micro-section-actual-list/supplier-form-micro-section-actual-list.component';
import { SupplierFormMPositionDetailComponent } from './supplier-form-m-position/supplier-form-m-position-detail/supplier-form-m-position-detail.component';
import { SupplierFormMPositionActualDetailComponent } from './supplier-form-m-position-actual/supplier-form-m-position-actual-detail/supplier-form-m-position-actual-detail.component';
import { SupplierFormMPositionActualListComponent } from './supplier-form-m-position-actual/supplier-form-m-position-actual-list/supplier-form-m-position-actual-list.component';
import { SupplierFormCountParameterDetailComponent } from './supplier-form-count-parameter/supplier-form-count-parameter-detail/supplier-form-count-parameter-detail.component';
import { SupplierFormCountParameterListComponent } from './supplier-form-count-parameter/supplier-form-count-parameter-list/supplier-form-count-parameter-list.component';
import { SupplierFormMPositionListComponent } from './supplier-form-m-position/supplier-form-m-position-list/supplier-form-m-position-list.component';
import { SupplierFormMicroSectionActualDetailComponent } from './supplier-form-micro-section-actual/supplier-form-micro-section-actual-detail/supplier-form-micro-section-actual-detail.component';
import { SupplierFormMeasurementParameterListComponent } from './supplier-form-measurement-parameter/supplier-form-measurement-parameter-list/supplier-form-measurement-parameter-list.component';
import { SupplierFormMicroSectionListComponent } from './supplier-form-micro-section/supplier-form-micro-section-list/supplier-form-micro-section-list.component';
import { SupplierFormMeasurementParameterActualDetailComponent } from './supplier-form-measurement-parameter-actual/supplier-form-measurement-parameter-actual-detail/supplier-form-measurement-parameter-actual-detail/supplier-form-measurement-parameter-actual-detail.component';
import { SupplierAttachmentListComponent } from './supplier-attachment/supplier-attachment-list/supplier-attachment-list.component';
import { SupplierAttachmentDetailComponent } from './supplier-attachment/supplier-attachment-detail/supplier-attachment-detail.component';
import { CTParameterDetailComponent } from './ct-parameter/ct-parameter-detail/ct-parameter-detail.component';
import { InspectionListComponent } from './inspection/inspection-list/inspection-list.component';
import { InspectionDetailComponent } from './inspection/inspection-detail/inspection-detail.component';

import { InspectionToolsListComponent } from './inspection-tools/inspection-tools-list/inspection-tools-list.component';
import { InspectionToolsDetailComponent } from './inspection-tools/inspection-tools-detail/inspection-tools-detail.component';


import { InstrumentListComponent } from './instrument/instrument-list/instrument-list.component';
import { InstrumentDetailComponent } from './instrument/instrument-detail/instrument-detail.component';


import { GRSListComponent } from './grs/grs-list/grs-list.component';
import { GRSDetailComponent } from './grs/grs-detail/grs-detail.component';



import { PCCodeInspectionToolsTypeListComponent } from './pc-code-inspection-tools-type/pc-code-inspection-tools-type-list/pc-code-inspection-tools-type-list.component';
import { PCCodeInspectionToolsTypeDetailComponent } from './pc-code-inspection-tools-type/pc-code-inspection-tools-type-detail/pc-code-inspection-tools-type-detail.component';

import { GRSSupplierFormListComponent } from './grs-supplier-form/grs-supplier-form-list/grs-supplier-form-list.component';
import { GRSSupplierFormDetailComponent } from './grs-supplier-form/grs-supplier-form-detail/grs-supplier-form-detail.component';


import { PartListComponent } from './part/part-list/part-list.component';
import { PartDetailComponent } from './part/part-detail/part-detail.component';




import { PartInspectionBowTwistParameterListComponent } from './part-bow-twist-parameter/part-bow-twist-parameter-list/part-bow-twist-parameter-list.component';
import { PartInspectionBowTwistParameterDetailComponent } from './part-bow-twist-parameter/part-bow-twist-parameter-detail/part-bow-twist-parameter-detail.component';
import { PartMeasurementParameterListComponent } from './part-measurement-parameter/part-measurement-parameter-list/part-measurement-parameter-list.component';
import { PartMeasurementParameterDetailComponent } from './part-measurement-parameter/part-measurement-parameter-detail/part-measurement-parameter-detail.component';
import { PartLPositionToleranceListComponent } from './part-l-position-tolerance/part-l-position-tolerance-list/part-l-position-tolerance-list.component';
import { PartLPositionToleranceDetailComponent } from './part-l-position-tolerance/part-l-position-tolerance-detail/part-l-position-tolerance-detail.component';
import { PartFunParameterListComponent } from './part-fun-parameter/part-fun-parameter-list/part-fun-parameter-list.component';
import { PartFunParameterDetailComponent } from './part-fun-parameter/part-fun-parameter-detail/part-fun-parameter-detail.component';

import { PartMicrosectionListComponent } from './part-microsection/part-microsection-list/part-microsection-list.component';
import { PartMicrosectionDetailComponent } from './part-microsection/part-microsection-detail/part-microsection-detail.component';
import { PartMPositionToleranceListComponent } from './part-m-position-tolerance/part-m-position-tolerance-list/part-m-position-tolerance-list.component';
import { PartMPositionToleranceDetailComponent } from './part-m-position-tolerance/part-m-position-tolerance-detail/part-m-position-tolerance-detail.component';

import { PartResultOrientedParameterListComponent } from './part-result-oriented-parameter/part-result-oriented-parameter-list/part-result-oriented-parameter-list.component';
import { PartResultOrientedParameterDetailComponent } from './part-result-oriented-parameter/part-result-oriented-parameter-detail/part-result-oriented-parameter-detail.component';


import { PartTestReportParameterListComponent } from './part-test-report-parameter/part-test-report-parameter-list/part-test-report-parameter-list.component';
import { PartTestReportParameterDetailComponent } from './part-test-report-parameter/part-test-report-parameter-detail/part-test-report-parameter-detail.component';


import { FormBowTwistActualListComponent } from './form-bow-twist-actual/form-bow-twist-actual-list/form-bow-twist-actual-list.component';
import { FormBowTwistActualDetailComponent } from './form-bow-twist-actual/form-bow-twist-actual-detail/form-bow-twist-actual-detail.component';
import { FormListComponent } from './form/form-list/form-list.component';
import { FormDetailComponent } from './form/form-detail/form-detail.component';

import { FormMeasurementParameterActualListComponent } from './form-measurement-parameter-actual/form-measurement-parameter-actual-list/form-measurement-parameter-actual-list.component';
import { FormMeasurementParameterActualDetailComponent } from './form-measurement-parameter-actual/form-measurement-parameter-actual-detail/form-measurement-parameter-actual-detail.component';
import { CommodityDetailComponent } from './commodity/commodity-detail/commodity-detail.component';
import { CommodityListComponent } from './commodity/commodity-list/commodity-list.component';

import { FormMeasurementParameterListComponent } from './form-measurement-parameter/form-measurement-parameter-list/form-measurement-parameter-list.component';
import { FormMeasurementParameterDetailComponent } from './form-measurement-parameter/form-measurement-parameter-detail/form-measurement-parameter-detail.component';

import { FormLPositionActualListComponent } from './form-l-position-actual/form-l-position-actual-list/form-l-position-actual-list.component';
import { FormLPositionActualDetailComponent } from './form-l-position-actual/form-l-position-actual-detail/form-l-position-actual-detail.component';


import { FormLPositionListComponent } from './form-l-position/form-l-position-list/form-l-position-list.component';
import { FormLPositionDetailComponent } from './form-l-position/form-l-position-detail/form-l-position-detail.component';


import { FormFunParaListComponent } from './form-fun-para/form-fun-para-list/form-fun-para-list.component';
import { FormFunParaDetailComponent } from './form-fun-para/form-fun-para-detail/form-fun-para-detail.component';

import { FormFunParaActualListComponent } from './form-fun-para-actual/form-fun-para-actual-list/form-fun-para-actual-list.component';
import { FormFunParaActualDetailComponent } from './form-fun-para-actual/form-fun-para-actual-detail/form-fun-para-actual-detail.component';


import { FormCountParameterListComponent } from './form-count-parameter/form-count-parameter-list/form-count-parameter-list.component';
import { FormCountParameterDetailComponent } from './form-count-parameter/form-count-parameter-detail/form-count-parameter-detail.component';


import { FormBowTwistParameterListComponent } from './form-bow-twist-parameter/form-bow-twist-parameter-list/form-bow-twist-parameter-list.component';
import { FormBowTwistParameterDetailComponent } from './form-bow-twist-parameter/form-bow-twist-parameter-detail/form-bow-twist-parameter-detail.component';
import { FormMicroSectionListComponent } from './form-micro-section/form-micro-section-list/form-micro-section-list.component';
import { FormMicroSectionDetailComponent } from './form-micro-section/form-micro-section-detail/form-micro-section-detail.component';


import { FormMicroSectionActualListComponent } from './form-micro-section-actual/form-micro-section-actual-list/form-micro-section-actual-list.component';
import { FormMicroSectionActualDetailComponent } from './form-micro-section-actual/form-micro-section-actual-detail/form-micro-section-actual-detail.component';

import { FormMPositionListComponent } from './form-m-position/form-m-position-list/form-m-position-list.component';
import { FormMPositionDetailComponent } from './form-m-position/form-m-position-detail/form-m-position-detail.component';

import { FormMPositionActualListComponent } from './form-m-position-actual/form-m-position-actual-list/form-m-position-actual-list.component';
import { FormMPositionActualDetailComponent } from './form-m-position-actual/form-m-position-actual-detail/form-m-position-actual-detail.component';

import { FormPackagingListComponent } from './form-packaging/form-packaging-list/form-packaging-list.component';
import { FormPackagingDetailComponent } from './form-packaging/form-packaging-detail/form-packaging-detail.component';

import { FormPartDateCodeListComponent } from './form-part-date-code/form-part-date-code-list/form-part-date-code-list.component';
import { FormPartDateCodeDetailComponent } from './form-part-date-code/form-part-date-code-detail/form-part-date-code-detail.component';


import { FormPartSAPFailedQtyListComponent } from './form-part-sap-failed-qty/form-part-sap-failed-qty-list/form-part-sap-failed-qty-list.component';
import { FormPartSAPFailedQtyDetailComponent } from './form-part-sap-failed-qty/form-part-sap-failed-qty-detail/form-part-sap-failed-qty-detail.component';

import { FormResultOrientedParameterListComponent } from './form-result-oriented-parameter/form-result-oriented-parameter-list/form-result-oriented-parameter-list.component';
import { FormResultOrientedParameterDetailComponent } from './form-result-oriented-parameter/form-result-oriented-parameter-detail/form-result-oriented-parameter-detail.component';


import { FormTypeListComponent } from './form-type/form-type-list/form-type-list.component';
import { FormTypeDetailComponent } from './form-type/form-type-detail/form-type-detail.component';


import { FormSAPParameterListComponent } from './form-sap-parameter/form-sap-parameter-list/form-sap-parameter-list.component';
import { FormSAPParameterDetailComponent } from './form-sap-parameter/form-sap-parameter-detail/form-sap-parameter-detail.component';


import { FormSpecialParameterListComponent } from './form-special-parameter/form-special-parameter-list/form-special-parameter-list.component';
import { FormSpecialParameterDetailComponent } from './form-special-parameter/form-special-parameter-detail/form-special-parameter-detail.component';

import { FormStatusListComponent } from './form-status/form-status-list/form-status-list.component';
import { FormStatusDetailComponent } from './form-status/form-status-detail/form-status-detail.component';

import { FormTestReportListComponent } from './form-test-report/form-test-report-list/form-test-report-list.component';
import { FormTestReportDetailComponent } from './form-test-report/form-test-report-detail/form-test-report-detail.component';

import { FormVISListComponent } from './form-vis/form-vis-list/form-vis-list.component';
import { FormVISDetailComponent } from './form-vis/form-vis-detail/form-vis-detail.component';
import { TimeZonePipe } from '../shared/pipe/timezone';
import { AdminCertificationDetailComponent } from './admin-certification/admin-certification-detail/admin-certification-detail.component';
import { AdminCertificationViewComponent } from './admin-certification/admin-certification-view/admin-certification-view.component';
import { AdminCertificationListComponent } from './admin-certification/admin-certification-list/admin-certification-list.component';
import { MaterialGroupListComponent } from './material-group/material-group-list/material-group-list.component';
import { ParameterManagementListComponent } from './parameter-management/parameter-management-list/parameter-management-list.component';
import { ParameterManagementDetailComponent } from './parameter-management/parameter-management-detail/parameter-management-detail.component';
import { TestReportListComponent } from './test-report/test-report-list/test-report-list.component';
import { TestReportDetailComponent } from './test-report/test-report-detail/test-report-detail.component';
import { ParameterTypeCodeListComponent } from './parameter-type-code/parameter-type-code-list/parameter-type-code-list.component';
import { ParameterTypeCodeDetailComponent } from './parameter-type-code/parameter-type-code-detail/parameter-type-code-detail.component';
import { SapPartInspectionPlanViewComponent } from './sap-part-inspection-plan/sap-part-inspection-plan-view/sap-part-inspection-plan-view.component';
import { PartDimensionDetailComponent } from './part-dimension/part-dimension-detail/part-dimension-detail.component';
import { PartDimensionListComponent } from './part-dimension/part-dimension-list/part-dimension-list.component';
import { BowTwistFormulaListComponent } from './bow-twist-formula/bow-twist-formula-list/bow-twist-formula-list.component';
import { BowTwistFormulaDetailComponent } from './bow-twist-formula/bow-twist-formula-detail/bow-twist-formula-detail.component';
import { DCCConfigurationListComponent } from './dcc-configuration/dcc-configuration-list/dcc-configuration-list.component';
import { DCCConfigurationDetailComponent } from './dcc-configuration/dcc-configuration-detail/dcc-configuration-detail.component';
import { CommodityCategoryListComponent } from './commodity-category/commodity-category-list/commodity-category-list.component';
import { CommodityCategoryDetailComponent } from './commodity-category/commodity-category-detail/commodity-category-detail.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { WorkCellUserListComponent } from './work-cell-user/work-cell-user-list/work-cell-user-list.component';
import { WorkCellUserDetailComponent } from './work-cell-user/work-cell-user-detail/work-cell-user-detail.component';
import { NonJabilUserListComponent } from './non-jabil-user/non-jabil-user-list/non-jabil-user-list.component';
import { NonJabilUserDetailComponent } from './non-jabil-user/non-jabil-user-detail/non-jabil-user-detail.component';
import { PartDrawingAttachmentViewComponent } from './sap-part-inspection-plan/part-drawing-attachment-view/part-drawing-attachment-view.component';
import { PartSpecAttachmentViewComponent } from './sap-part-inspection-plan/part-spec-attachment-view/part-spec-attachment-view.component';
import { PartSpecViewComponent } from './sap-part-inspection-plan/part-spec-view/part-spec-view.component';
import { PartDrawingViewComponent } from './sap-part-inspection-plan/part-drawing-view/part-drawing-view.component';
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';
import { PurchaseOrderListComponent } from './purchase-order/purchase-order-list/purchase-order-list.component';
import { CertificateTypeDetailComponent } from './certificate-type/certificate-type-detail/certificate-type-detail.component';
import { CertificateTypeListComponent } from './certificate-type/certificate-type-list/certificate-type-list.component';
import { DefectManagementListComponent } from './defect-management/defect-management-list/defect-management-list.component';
import { DefectManagementDetailComponent } from './defect-management/defect-management-detail/defect-management-detail.component';
import { DefectTypeComponent } from './defect-type/defect-type.component';
import { PartTestReportAttachmentViewComponent } from './sap-part-inspection-plan/part-test-report-attachment-view/part-test-report-attachment-view.component';
import { SupplierTestReportAttachmentViewComponent } from '../supplier-measurement/supplier-test-report-attachment-view/supplier-test-report-attachment-view.component';
import { SampleSizeCalculationListComponent } from './sample-size-calculation/sample-size-calculation-list/sample-size-calculation-list.component';
import { SamplingPlanListComponent } from './sampling-plan/sampling-plan/sampling-plan-list.component';
import { DefectTypeVisualInspectionComponent } from './defect-type-visual-inspection/defect-type-visual-inspection.component';
import { SpcChartMicroSectionComponent } from './spc-chart-micro-section/spc-chart-micro-section.component';
import { QssUiChartsModule } from 'qss-ui-charts';
import { SpcChartFunctionVariableComponent } from './spc-chart-function-variable/spc-chart-function-variable.component';
import { SpcChartDimensionMeasurementComponent } from './spc-chart-dimension-measurement/spc-chart-dimension-measurement.component';
@NgModule({
  imports: [CommonModule, AdminRoutingModule, CoreModule, QssUiChartsModule],
  declarations: [
    AdminComponent,
    RoleListComponent,
    RoleDetailComponent,
    UserListComponent,
    UserDetailComponent,
    EmailTemplateDetailComponent,
    EmailTemplateListComponent,
    EmailTemplateEditGuideComponent,
    DepartmentListComponent,
    DepartmentDetailComponent,
    WorkCellListComponent,
    WorkCellDetailComponent,
    RegionListComponent,
    RegionDetailComponent,
    LocationListComponent,
    LocationDetailComponent,
    DivisionListComponent,
    DivisionDetailComponent,
    CountryListComponent,
    CountryDetailComponent,
    SiteListComponent,
    SiteDetailComponent,
    SiteUserDetailComponent,
    SiteUserListComponent,
    BuyerDetailComponent,
    BuyerListComponent,
    CompletedGRSDetailComponent,
    CompletedGRSListComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CTParameterDetailComponent,
    CTParameterListComponent,
    UOMDetailComponent,
    UOMListComponent,
    GRSSAPResultDetailComponent,
    GRSSAPResultListComponent,
    GoodsReceiveUserDetailComponent,
    GoodsReceiveUserListComponent,
    GroupDetailComponent,
    GroupListComponent,
    InspectionToolsTypeDetailComponent,
    InspectionToolsTypeListComponent,
    InstrumentTypeDetailComponent,
    InstrumentTypeListComponent,
    LotInspectionQtyDetailComponent,
    LotInspectionQtyListComponent,
    ParameterCategoryDetailComponent,
    ParameterCategoryListComponent,
    ParameterTypeDetailComponent,
    ParameterTypeListComponent,
    PartCAFDetailComponent,
    PartCAFListComponent,
    PCCodeDetailComponent,
    PCCodeListComponent,
    ReceiveGoodsInfoDetailComponent,
    ReceiveGoodsInfoListComponent,
    ReceiveGoodsInfoManualListComponent,
    ReceiveGoodsInfoManualDetailComponent,
    RosettaDetailComponent,
    RosettaListComponent,
    DispositionTypeDetailComponent,
    DispositionTypeListComponent,
    SupplierFormVISListComponent,
    SupplierFormVISDetailComponent,
    SupplierFormListComponent,
    SupplierFormDetailComponent,
    SupplierFormBowTwistParameterDetailComponent,
    SupplierFormBowTwistParameterListComponent,
    SupplierFormCountParameterDetailComponent,
    SupplierFormCountParameterListComponent,
    SupplierFormPackagingDetailComponent,
    SupplierFormPackagingListComponent,
    SupplierFormPartDateCodeDetailComponent,
    SupplierFormPartDateCodeListComponent,
    SupplierFormResultOrientedParameterDetailComponent,
    SupplierFormResultOrientedParameterListComponent,
    SupplierFormSAPParameterDetailComponent,
    SupplierFormSAPParameterListComponent,
    SupplierFormSpecialParameterDetailComponent,
    SupplierFormSpecialParameterListComponent,
    SupplierFormFunParaDetailComponent,
    SupplierFormFunParaListComponent,
    SupplierFormBowTwistActualDetailComponent,
    SupplierFormBowTwistActualListComponent,
    SupplierFormFunParaActualDetailComponent,
    SupplierFormFunParaActualListComponent,
    SupplierFormLPositionDetailComponent,
    SupplierFormLPositionListComponent,
    SupplierFormLPositionActualDetailComponent,
    SupplierFormLPositionActualListComponent,
    SupplierFormMeasurementParameterDetailComponent,
    SupplierFormMeasurementParameterActualListComponent,
    SupplierFormMicroSectionDetailComponent,
    SupplierFormMicroSectionActualListComponent,
    SupplierFormMPositionDetailComponent,
    SupplierFormMPositionActualDetailComponent,
    SupplierFormMPositionActualListComponent,
    SupplierFormMPositionListComponent,
    SupplierFormMicroSectionActualDetailComponent,
    SupplierFormMicroSectionActualListComponent,
    SupplierFormMeasurementParameterListComponent,
    SupplierFormMicroSectionListComponent,
    SupplierFormMeasurementParameterActualDetailComponent,
    SupplierAttachmentListComponent,
    SupplierAttachmentDetailComponent,
    InspectionListComponent,
    InspectionDetailComponent,
    InspectionToolsListComponent,
    InspectionToolsDetailComponent,
    InstrumentListComponent,
    InstrumentDetailComponent,
    GRSListComponent,
    GRSDetailComponent,
    PCCodeInspectionToolsTypeListComponent,
    PCCodeInspectionToolsTypeDetailComponent,
    GRSSupplierFormListComponent,
    GRSSupplierFormDetailComponent,
    PartListComponent,
    SamplingPlanListComponent,
    PartDetailComponent,
    PartInspectionBowTwistParameterListComponent,
    PartInspectionBowTwistParameterDetailComponent,
    PartFunParameterListComponent,
    PartFunParameterDetailComponent,
    PartLPositionToleranceListComponent,
    PartLPositionToleranceDetailComponent,
    PartMeasurementParameterListComponent,
    PartMeasurementParameterDetailComponent,
    PartMicrosectionListComponent,
    PartMicrosectionDetailComponent,
    PartMPositionToleranceListComponent,
    PartMPositionToleranceDetailComponent,
    PartResultOrientedParameterListComponent,
    PartResultOrientedParameterDetailComponent,
    PartTestReportParameterListComponent,
    PartTestReportParameterDetailComponent,
    FormListComponent,
    FormDetailComponent,
    FormBowTwistActualListComponent,
    FormBowTwistActualDetailComponent,
    FormMeasurementParameterActualListComponent,
    FormMeasurementParameterActualDetailComponent,
    FormMeasurementParameterListComponent,
    FormMeasurementParameterDetailComponent,
    FormLPositionActualListComponent,
    FormLPositionActualDetailComponent,
    FormLPositionListComponent,
    FormLPositionDetailComponent,
    FormFunParaActualListComponent,
    FormFunParaActualDetailComponent,
    FormFunParaListComponent,
    FormFunParaDetailComponent,
    FormCountParameterListComponent,
    FormCountParameterDetailComponent,
    FormBowTwistParameterListComponent,
    FormBowTwistParameterDetailComponent,
    FormMicroSectionListComponent,
    FormMicroSectionDetailComponent,
    FormMicroSectionActualListComponent,
    FormMicroSectionActualDetailComponent,
    FormMPositionListComponent,
    FormMPositionDetailComponent,
    FormMPositionActualListComponent,
    FormMPositionActualDetailComponent,
    FormPackagingListComponent,
    FormPackagingDetailComponent,
    FormPartDateCodeListComponent,
    FormPartDateCodeDetailComponent,
    FormPartSAPFailedQtyListComponent,
    FormPartSAPFailedQtyDetailComponent,
    FormResultOrientedParameterListComponent,
    FormResultOrientedParameterDetailComponent,
    FormSAPParameterListComponent,
    FormSAPParameterDetailComponent,
    FormSpecialParameterListComponent,
    FormSpecialParameterDetailComponent,
    FormStatusListComponent,
    FormStatusDetailComponent,
    FormTestReportListComponent,
    FormTestReportDetailComponent,
    FormVISListComponent,
    FormVISDetailComponent,
    FormTypeListComponent,
    FormTypeDetailComponent,
    CommodityDetailComponent,
    CommodityListComponent,
    AdminCertificationDetailComponent,
    AdminCertificationViewComponent,
    AdminCertificationListComponent,
    MaterialGroupListComponent,
    ParameterManagementListComponent,
    ParameterManagementDetailComponent,
    TestReportListComponent,
    TestReportDetailComponent,
    ParameterTypeCodeListComponent,
    ParameterTypeCodeDetailComponent,
    WorkCellUserListComponent,
    WorkCellUserDetailComponent,
    SapPartInspectionPlanViewComponent,
    PartTestReportAttachmentViewComponent,
    PartDimensionListComponent,
    PartDimensionDetailComponent,
    BowTwistFormulaListComponent,
    BowTwistFormulaDetailComponent,
    DCCConfigurationListComponent,
    DCCConfigurationDetailComponent,
    PartDrawingAttachmentViewComponent,
    PartSpecAttachmentViewComponent,
    CommodityCategoryListComponent,
    CommodityCategoryDetailComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    NonJabilUserListComponent,
    NonJabilUserDetailComponent,
    PartSpecViewComponent,
    PartDrawingViewComponent,
    PurchaseOrderListComponent,
    CertificateTypeListComponent,
    CertificateTypeDetailComponent,
    DefectManagementListComponent,
    DefectManagementDetailComponent,
    DefectTypeComponent,
    DefectTypeVisualInspectionComponent,
    SupplierTestReportAttachmentViewComponent,
    SampleSizeCalculationListComponent,
    SpcChartMicroSectionComponent,
    SpcChartFunctionVariableComponent,
    SpcChartDimensionMeasurementComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TimeZonePipe]
})
export class AdminModule { }
