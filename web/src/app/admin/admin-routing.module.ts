import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PermissionType } from '../shared/constant/roles';
import { AuthGuard } from '../auth/auth.guard';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { EmailTemplateListComponent } from './email/email-template-list/email-template-list.component';
import { EmailTemplateDetailComponent } from './email/email-template-detail/email-template-detail.component';
import { ComponentType, Operator } from '../shared/constant/global';
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
import { AuditLogListComponent } from '../auditLog/audit-log-list/audit-log-list.component';
import { SiteUserDetailComponent } from './siteuser/site-user-detail/site-user-detail.component';

import { SupplierFormListComponent } from './supplier-form/supplier-form-list/supplier-form-list.component';

import { UOMListComponent } from './uom/uom-list/uom-list.component';
import { UOMDetailComponent } from './uom/uom-detail/uom-detail.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { InspectionToolsTypeListComponent } from './inspection-tools-type/inspection-tools-type-list/inspection-tools-type-list.component';
import { ParameterCategoryListComponent } from './parameter-category/parameter-category-list/parameter-category-list.component';
import { ParameterTypeListComponent } from './parameter-type/parameter-type-list/parameter-type-list.component';
import { ParameterTypeDetailComponent } from './parameter-type/parameter-type-detail/parameter-type-detail.component';
import { PartCAFListComponent } from './part-caf/part-caf-list/part-caf-list.component';
import { PartCAFDetailComponent } from './part-caf/part-caf-detail/part-caf-detail.component';
import { ReceiveGoodsInfoListComponent } from './receive-goods-info/receive-goods-info-list/receive-goods-info-list.component';
import { ReceiveGoodsInfoManualListComponent } from './receive-goods-info-manual/receive-goods-info-manual-list/receive-goods-info-manual-list.component';
import { ReceiveGoodsInfoManualDetailComponent } from './receive-goods-info-manual/receive-goods-info-manual-detail/receive-goods-info-manual-detail.component';
import { RosettaListComponent } from './rosetta/rosetta-list/rosetta-list.component';
import { InstrumentTypeListComponent } from './instrument-type/instrument-type-list/instrument-type-list.component';
import { InstrumentTypeDetailComponent } from './instrument-type/instrument-type-detail/instrument-type-detail.component';
import { ReceiveGoodsInfoDetailComponent } from './receive-goods-info/receive-goods-info-detail/receive-goods-info-detail.component';

import { GroupDetailComponent } from './group/group-detail/group-detail.component';

import { InspectionToolsTypeDetailComponent } from './inspection-tools-type/inspection-tools-type-detail/inspection-tools-type-detail.component';
import { LotInspectionQtyListComponent } from './lot-inspection-qty/lot-inspection-qty-list/lot-inspection-qty-list.component';
import { LotInspectionQtyDetailComponent } from './lot-inspection-qty/lot-inspection-qty-detail/lot-inspection-qty-detail.component';
import { ParameterCategoryDetailComponent } from './parameter-category/parameter-category-detail/parameter-category-detail.component';
import { PCCodeListComponent } from './pc-code/pc-code-list/pc-code-list.component';
import { RosettaDetailComponent } from './rosetta/rosetta-detail/rosetta-detail.component';
import { PCCodeDetailComponent } from './pc-code/pc-code-detail/pc-code-detail.component';
import { DispositionTypeListComponent } from './disposition-type/disposition-type-list/disposition-type-list.component';
import { DispositionTypeDetailComponent } from './disposition-type/disposition-type-detail/disposition-type-detail.component';
import { SupplierAttachmentListComponent } from './supplier-attachment/supplier-attachment-list/supplier-attachment-list.component';
import { SupplierAttachmentDetailComponent } from './supplier-attachment/supplier-attachment-detail/supplier-attachment-detail.component';

import { InspectionToolsListComponent } from './inspection-tools/inspection-tools-list/inspection-tools-list.component';

import { InstrumentListComponent } from './instrument/instrument-list/instrument-list.component';

import { GRSListComponent } from './grs/grs-list/grs-list.component';



import { PCCodeInspectionToolsTypeListComponent } from './pc-code-inspection-tools-type/pc-code-inspection-tools-type-list/pc-code-inspection-tools-type-list.component';
import { PCCodeInspectionToolsTypeDetailComponent } from './pc-code-inspection-tools-type/pc-code-inspection-tools-type-detail/pc-code-inspection-tools-type-detail.component';


import { CommodityDetailComponent } from './commodity/commodity-detail/commodity-detail.component';
import { CommodityListComponent } from './commodity/commodity-list/commodity-list.component';


import { PartListComponent } from './part/part-list/part-list.component';
import { PartDetailComponent } from './part/part-detail/part-detail.component';


import { PartInspectionBowTwistParameterListComponent } from './part-bow-twist-parameter/part-bow-twist-parameter-list/part-bow-twist-parameter-list.component';
import { PartInspectionBowTwistParameterDetailComponent } from './part-bow-twist-parameter/part-bow-twist-parameter-detail/part-bow-twist-parameter-detail.component';


import { InspectionToolsDetailComponent } from './inspection-tools/inspection-tools-detail/inspection-tools-detail.component';
import { InstrumentDetailComponent } from './instrument/instrument-detail/instrument-detail.component';
import { GRSDetailComponent } from './grs/grs-detail/grs-detail.component';

import { PartMeasurementParameterListComponent } from './part-measurement-parameter/part-measurement-parameter-list/part-measurement-parameter-list.component';
import { PartMeasurementParameterDetailComponent } from './part-measurement-parameter/part-measurement-parameter-detail/part-measurement-parameter-detail.component';

import { PartFunParameterListComponent } from './part-fun-parameter/part-fun-parameter-list/part-fun-parameter-list.component';
import { PartFunParameterDetailComponent } from './part-fun-parameter/part-fun-parameter-detail/part-fun-parameter-detail.component';

import { PartTestReportParameterListComponent } from './part-test-report-parameter/part-test-report-parameter-list/part-test-report-parameter-list.component';
import { PartTestReportParameterDetailComponent } from './part-test-report-parameter/part-test-report-parameter-detail/part-test-report-parameter-detail.component';

import { PartLPositionToleranceListComponent } from './part-l-position-tolerance/part-l-position-tolerance-list/part-l-position-tolerance-list.component';
import { PartLPositionToleranceDetailComponent } from './part-l-position-tolerance/part-l-position-tolerance-detail/part-l-position-tolerance-detail.component';


import { PartMicrosectionListComponent } from './part-microsection/part-microsection-list/part-microsection-list.component';
import { PartMicrosectionDetailComponent } from './part-microsection/part-microsection-detail/part-microsection-detail.component';


import { PartResultOrientedParameterListComponent } from './part-result-oriented-parameter/part-result-oriented-parameter-list/part-result-oriented-parameter-list.component';
import { PartResultOrientedParameterDetailComponent } from './part-result-oriented-parameter/part-result-oriented-parameter-detail/part-result-oriented-parameter-detail.component';
import { PartMPositionToleranceListComponent } from './part-m-position-tolerance/part-m-position-tolerance-list/part-m-position-tolerance-list.component';
import { PartMPositionToleranceDetailComponent } from './part-m-position-tolerance/part-m-position-tolerance-detail/part-m-position-tolerance-detail.component';
import { FormListComponent } from './form/form-list/form-list.component';
import { FormDetailComponent } from './form/form-detail/form-detail.component';


import { AdminCertificationListComponent } from './admin-certification/admin-certification-list/admin-certification-list.component';
import { AdminCertificationDetailComponent } from './admin-certification/admin-certification-detail/admin-certification-detail.component';
import { MaterialGroupListComponent } from './material-group/material-group-list/material-group-list.component';
import { ParameterManagementListComponent } from './parameter-management/parameter-management-list/parameter-management-list.component';
import { ParameterManagementDetailComponent } from './parameter-management/parameter-management-detail/parameter-management-detail.component';
import { ParameterTypeCodeDetailComponent } from './parameter-type-code/parameter-type-code-detail/parameter-type-code-detail.component';
import { ParameterTypeCodeListComponent } from './parameter-type-code/parameter-type-code-list/parameter-type-code-list.component';
import { TestReportListComponent } from './test-report/test-report-list/test-report-list.component';
import { TestReportDetailComponent } from './test-report/test-report-detail/test-report-detail.component';
import { PartDimensionListComponent } from './part-dimension/part-dimension-list/part-dimension-list.component';
import { PartDimensionDetailComponent } from './part-dimension/part-dimension-detail/part-dimension-detail.component';
import { BowTwistFormulaListComponent } from './bow-twist-formula/bow-twist-formula-list/bow-twist-formula-list.component';
import { BowTwistFormulaDetailComponent } from './bow-twist-formula/bow-twist-formula-detail/bow-twist-formula-detail.component';

import { DCCConfigurationListComponent } from './dcc-configuration/dcc-configuration-list/dcc-configuration-list.component';
import { DCCConfigurationDetailComponent } from './dcc-configuration/dcc-configuration-detail/dcc-configuration-detail.component';
import { CommodityCategoryListComponent } from './commodity-category/commodity-category-list/commodity-category-list.component';
import { CommodityCategoryDetailComponent } from './commodity-category/commodity-category-detail/commodity-category-detail.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { WorkCellUserDetailComponent } from './work-cell-user/work-cell-user-detail/work-cell-user-detail.component';
import { WorkCellUserListComponent } from './work-cell-user/work-cell-user-list/work-cell-user-list.component';

import { NonJabilUserListComponent } from './non-jabil-user/non-jabil-user-list/non-jabil-user-list.component';
import { NonJabilUserDetailComponent } from './non-jabil-user/non-jabil-user-detail/non-jabil-user-detail.component';
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';
import { PurchaseOrderListComponent } from './purchase-order/purchase-order-list/purchase-order-list.component';
import { CertificateTypeListComponent } from './certificate-type/certificate-type-list/certificate-type-list.component';
import { CertificateTypeDetailComponent } from './certificate-type/certificate-type-detail/certificate-type-detail.component';
import { DefectManagementListComponent } from './defect-management/defect-management-list/defect-management-list.component';
import { DefectManagementDetailComponent } from './defect-management/defect-management-detail/defect-management-detail.component';
import { SampleSizeCalculationListComponent } from './sample-size-calculation/sample-size-calculation-list/sample-size-calculation-list.component';
import { SamplingPlanListComponent } from './sampling-plan/sampling-plan/sampling-plan-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { permissions: [PermissionType.AdminCanAccess] },
  },
  {
    path: 'Role',
    component: RoleListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminRoleCanAccess] },
  },
  {
    path: 'AddRole',
    component: RoleDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminRoleCanCreate] },
  },
  {
    path: 'EditRole/:id',
    component: RoleDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [
        PermissionType.AdminRoleCanAccess,
        PermissionType.AdminRoleCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'User',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminUserCanAccess] },
  },
  {
    path: 'AddUser',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminUserCanCreate] },
  },
  {
    path: 'EditUser/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [
        PermissionType.AdminUserCanAccess,
        PermissionType.AdminUserCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'EmailTemplate',
    component: EmailTemplateListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [PermissionType.AdminEmailTemplateCanAccess],
    },
  },
  {
    path: 'EditEmailTemplate/:id',
    component: EmailTemplateDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [
        PermissionType.AdminEmailTemplateCanAccess,
        PermissionType.AdminEmailTemplateCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'Department',
    component: DepartmentListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDepartmentCanAccess] },
  },
  {
    path: 'AddDepartment',
    component: DepartmentDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDepartmentCanCreate] },
  },
  {
    path: 'EditDepartment/:id',
    component: DepartmentDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [
        PermissionType.AdminDepartmentCanAccess,
        PermissionType.AdminDepartmentCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'WorkCell',
    component: WorkCellListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminWorkCellCanAccess] },
  },
  {
    path: 'AddWorkCell',
    component: WorkCellDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminWorkCellCanCreate] },
  },
  {
    path: 'EditWorkCell/:id',
    component: WorkCellDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminWorkCellCanAccess,
        PermissionType.AdminWorkCellCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'Location',
    component: LocationListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminLocationCanAccess] },
  },
  {
    path: 'AddLocation',
    component: LocationDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminLocationCanCreate] },
  },
  {
    path: 'EditLocation/:id',
    component: LocationDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminLocationCanAccess,
        PermissionType.AdminLocationCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'Division',
    component: DivisionListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDivisionCanAccess] },
  },
  {
    path: 'AddDivision',
    component: DivisionDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDivisionCanCreate] },
  },
  {
    path: 'EditDivision/:id',
    component: DivisionDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminDivisionCanAccess,
        PermissionType.AdminDivisionCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'Country',
    component: CountryListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCountryCanAccess] },
  },
  {
    path: 'AddCountry',
    component: CountryDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCountryCanCreate] },
  },
  {
    path: 'EditCountry/:id',
    component: CountryDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminCountryCanAccess,
        PermissionType.AdminCountryCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'Region',
    component: RegionListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminRegionCanAccess] },
  },
  {
    path: 'AddRegion',
    component: RegionDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminRegionCanCreate] },
  },
  {
    path: 'EditRegion/:id',
    component: RegionDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [
        PermissionType.AdminRegionCanAccess,
        PermissionType.AdminRegionCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'Site',
    component: SiteListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSiteCanAccess] },
  },
  {
    path: 'AddSite',
    component: SiteDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSiteCanCreate] },
  },
  {
    path: 'EditSite/:id',
    component: SiteDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminSiteCanAccess,
        PermissionType.AdminSiteCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'AuditLog',
    component: AuditLogListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminAuditLogCanAccess], action: ComponentType.List },
  },
  {
    path: 'AddSiteSme',
    component: SiteUserDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSiteUserCanCreate] },
  },
  {
    path: 'EditSiteSme/:id',
    component: SiteUserDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [],
      permissions: [
        PermissionType.AdminSiteUserCanAccess,
        PermissionType.AdminSiteUserCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'UOM',
    component: UOMListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminUOMCanAccess] }
  },
  {
    path: 'AddUOM',
    component: UOMDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminUOMCanCreate] }
  },
  {
    path: 'EditUOM/:id',
    component: UOMDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminUOMCanUpdate] }
  },
  {
    path: 'Group',
    component: GroupListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminGroupCanAccess] }
  },
  {
    path: 'AddGroup',
    component: GroupDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminGroupCanCreate] }
  },
  {
    path: 'EditGroup/:id',
    component: GroupDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminGroupCanUpdate] }
  },
  {
    path: 'InspectionToolsType',
    component: InspectionToolsTypeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminInspectionToolsTypeCanAccess] }
  },
  {
    path: 'AddInspectionToolsType',
    component: InspectionToolsTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInspectionToolsTypeCanCreate] }
  },
  {
    path: 'EditInspectionToolsType/:id',
    component: InspectionToolsTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInspectionToolsTypeCanUpdate] }
  },
  {
    path: 'LotInspectionQty',
    component: LotInspectionQtyListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminLotInspectionQtyCanAccess] }
  },
  {
    path: 'AddLotInspectionQty',
    component: LotInspectionQtyDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminLotInspectionQtyCanCreate] }
  },
  {
    path: 'EditLotInspectionQty/:id',
    component: LotInspectionQtyDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminLotInspectionQtyCanUpdate] }
  },
  {
    path: 'ParameterCategory',
    component: ParameterCategoryListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminParameterCategoryCanAccess] }
  },
  {
    path: 'AddParameterCategory',
    component: ParameterCategoryDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminParameterCategoryCanCreate] }
  },
  {
    path: 'EditParameterCategory/:id',
    component: ParameterCategoryDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminParameterCategoryCanUpdate] }
  },
  {
    path: 'ParameterType',
    component: ParameterTypeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminParameterTypeCanAccess] }
  },
  {
    path: 'AddParameterType',
    component: ParameterTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminParameterTypeCanCreate] }
  },
  {
    path: 'EditParameterType/:id',
    component: ParameterTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminParameterTypeCanUpdate] }
  },
  {
    path: 'PartCAF',
    component: PartCAFListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartCAFCanAccess] }
  },
  {
    path: 'AddPartCAF',
    component: PartCAFDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartCAFCanCreate] }
  },
  {
    path: 'EditPartCAF/:id',
    component: PartCAFDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartCAFCanUpdate] }
  },
  {
    path: 'PCCode',
    component: PCCodeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPCCodeCanAccess] }
  },
  {
    path: 'AddPCCode',
    component: PCCodeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPCCodeCanCreate] }
  },
  {
    path: 'EditPCCode/:id',
    component: PCCodeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPCCodeCanUpdate] }
  },
  {
    path: 'ReceiveGoodsInfo',
    component: ReceiveGoodsInfoListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminReceiveGoodsInfoCanAccess] }
  },
  {
    path: 'AddReceiveGoodsInfo',
    component: ReceiveGoodsInfoDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminReceiveGoodsInfoCanCreate] }
  },
  {
    path: 'EditReceiveGoodsInfo/:id',
    component: ReceiveGoodsInfoDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminReceiveGoodsInfoCanUpdate] }
  },
  {
    path: 'ReceiveGoodsInfoManual',
    component: ReceiveGoodsInfoManualListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminReceiveGoodsInfoManualCanAccess] }
  },
  {
    path: 'AddReceiveGoodsInfoManual',
    component: ReceiveGoodsInfoManualDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminReceiveGoodsInfoManualCanCreate] }
  },
  {
    path: 'EditReceiveGoodsInfoManual/:id',
    component: ReceiveGoodsInfoManualDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminReceiveGoodsInfoManualCanUpdate] }
  },
  {
    path: 'Rosetta',
    component: RosettaListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminRosettaCanAccess] }
  },
  {
    path: 'AddRosetta',
    component: RosettaDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminRosettaCanCreate] }
  },
  {
    path: 'EditRosetta/:id',
    component: RosettaDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminRosettaCanUpdate] }
  },
  {
    path: 'InstrumentType',
    component: InstrumentTypeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminInstrumentTypeCanAccess] }
  },
  {
    path: 'AddInstrumentType',
    component: InstrumentTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInstrumentTypeCanCreate] }
  },
  {
    path: 'EditInstrumentType/:id',
    component: InstrumentTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInstrumentTypeCanUpdate] }
  },
  {
    path: 'DispositionType',
    component: DispositionTypeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDispositionTypeCanAccess] }
  },
  {
    path: 'AddDispositionType',
    component: DispositionTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminDispositionTypeCanCreate] }
  },
  {
    path: 'EditDispositionType/:id',
    component: DispositionTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminDispositionTypeCanUpdate] }
  },
  {
    path: 'SupplierForm',
    component: SupplierFormListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSupplierFormCanAccess] }
  },
  {
    path: 'SupplierAttachment',
    component: SupplierAttachmentListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSupplierAttachmentCanAccess] }
  },
  {
    path: 'AddSupplierAttachment',
    component: SupplierAttachmentDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminSupplierAttachmentCanCreate] }
  },
  {
    path: 'EditSupplierAttachment/:id',
    component: SupplierAttachmentDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminSupplierAttachmentCanUpdate] }
  },
  {
    path: 'InspectionTools',
    component: InspectionToolsListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminInspectionToolsCanAccess] }
  },
  {
    path: 'AddInspectionTools',
    component: InspectionToolsDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInspectionToolsCanCreate] }
  },
  {
    path: 'EditInspectionTools/:id',
    component: InspectionToolsDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInspectionToolsCanUpdate] }
  },
  {
    path: 'Instrument',
    component: InstrumentListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminInstrumentCanAccess] }
  },
  {
    path: 'AddInstrument',
    component: InstrumentDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInstrumentCanCreate] }
  },
  {
    path: 'EditInstrument/:id',
    component: InstrumentDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminInstrumentCanUpdate] }
  },
  {
    path: 'GRS',
    component: GRSListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminGRSCanAccess] }
  },
  {
    path: 'AddGRS',
    component: GRSDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminGRSCanCreate] }
  },
  {
    path: 'EditGRS/:id',
    component: GRSDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminGRSCanUpdate] }
  },
  {
    path: 'PCCodeInspectionToolsType',
    component: PCCodeInspectionToolsTypeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPCCodeInspectionToolsTypeCanAccess] }
  },
  {
    path: 'AddPCCodeInspectionToolsType',
    component: PCCodeInspectionToolsTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPCCodeInspectionToolsTypeCanCreate] }
  },
  {
    path: 'EditPCCodeInspectionToolsType/:id',
    component: PCCodeInspectionToolsTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPCCodeInspectionToolsTypeCanUpdate] }
  },
  {
    path: 'Part',
    component: PartListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartCanAccess] }
  },
  {
    path: 'AddPart',
    component: PartDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartCanCreate] }
  },
  {
    path: 'EditPart/:id',
    component: PartDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartCanUpdate] }
  },
  {
    path: 'SamplingPlan',
    component: SamplingPlanListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartCanAccess] }
  },
  {
    path: 'PartInspectionBowTwistParameter',
    component: PartInspectionBowTwistParameterListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartBowTwistParameterCanAccess] }
  },
  {
    path: 'AddPartInspectionBowTwistParameter',
    component: PartInspectionBowTwistParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartBowTwistParameterCanCreate] }
  },
  {
    path: 'EditPartInspectionBowTwistParameter/:id',
    component: PartInspectionBowTwistParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartBowTwistParameterCanUpdate] }
  },
  {
    path: 'PartFunParameter',
    component: PartFunParameterListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartFunParameterCanAccess] }
  },
  {
    path: 'AddPartFunParameter',
    component: PartFunParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartFunParameterCanCreate] }
  },
  {
    path: 'EditPartFunParameter/:id',
    component: PartFunParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartFunParameterCanUpdate] }
  },
  {
    path: 'PartLPositionTolerance',
    component: PartLPositionToleranceListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartLPositionToleranceCanAccess] }
  },
  {
    path: 'AddPartLPositionTolerance',
    component: PartLPositionToleranceDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartLPositionToleranceCanCreate] }
  },
  {
    path: 'EditPartLPositionTolerance/:id',
    component: PartLPositionToleranceDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartLPositionToleranceCanUpdate] }
  },
  {
    path: 'PartMeasurementParameter',
    component: PartMeasurementParameterListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartMeasurementParameterCanAccess] }
  },
  {
    path: 'AddPartMeasurementParameter',
    component: PartMeasurementParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMeasurementParameterCanCreate] }
  },
  {
    path: 'EditPartMeasurementParameter/:id',
    component: PartMeasurementParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMeasurementParameterCanUpdate] }
  },
  {
    path: 'PartMeasurementParameter',
    component: PartMeasurementParameterListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartMeasurementParameterCanAccess] }
  },
  {
    path: 'AddPartMeasurementParameter',
    component: PartMeasurementParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMeasurementParameterCanCreate] }
  },
  {
    path: 'EditPartMeasurementParameter/:id',
    component: PartMeasurementParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMeasurementParameterCanUpdate] }
  },
  {
    path: 'PartMicrosection',
    component: PartMicrosectionListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartMicrosectionCanAccess] }
  },
  {
    path: 'AddPartMicrosection',
    component: PartMicrosectionDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMicrosectionCanCreate] }
  },
  {
    path: 'EditPartMicrosection/:id',
    component: PartMicrosectionDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMicrosectionCanUpdate] }
  },
  {
    path: 'PartMPositionTolerance',
    component: PartMPositionToleranceListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartMPositionToleranceCanAccess] }
  },
  {
    path: 'AddPartMPositionTolerance',
    component: PartMPositionToleranceDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMPositionToleranceCanCreate] }
  },
  {
    path: 'EditPartMPositionTolerance/:id',
    component: PartMPositionToleranceDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartMPositionToleranceCanUpdate] }
  },
  {
    path: 'PartResultOrientedParameter',
    component: PartResultOrientedParameterListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartResultOrientedParameterCanAccess] }
  },
  {
    path: 'AddPartResultOrientedParameter',
    component: PartResultOrientedParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartResultOrientedParameterCanCreate] }
  },
  {
    path: 'EditPartResultOrientedParameter/:id',
    component: PartResultOrientedParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartResultOrientedParameterCanUpdate] }
  },
  {
    path: 'PartTestReportParameter',
    component: PartTestReportParameterListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartTestReportParameterCanAccess] }
  },
  {
    path: 'AddPartTestReportParameter',
    component: PartTestReportParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartTestReportParameterCanCreate] }
  },
  {
    path: 'EditPartTestReportParameter/:id',
    component: PartTestReportParameterDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartTestReportParameterCanUpdate] }
  },
  {
    path: 'Form',
    component: FormListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminFormCanAccess] }
  },
  {
    path: 'AddForm',
    component: FormDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminFormCanCreate] }
  },
  {
    path: 'EditForm/:id',
    component: FormDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminFormCanUpdate] }
  },
  {
    path: 'Commodity',
    component: CommodityListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCommodityCanAccess] },
  },
  {
    path: 'AddCommodity',
    component: CommodityDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCommodityCanCreate] },
  },
  {
    path: 'EditCommodity/:id',
    component: CommodityDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminCommodityCanAccess,
        PermissionType.AdminCommodityCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'EditCommodity/:id/:partNo/:siteNo',
    component: CommodityDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminCommodityCanAccess,
        PermissionType.AdminCommodityCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'AdminCertification',
    component: AdminCertificationListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCertificationCanAccess] },
  },
  {
    path: 'AddAdminCertification',
    component: AdminCertificationDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCertificationCanCreate] },
  },
  {
    path: 'EditAdminCertification/:id',
    component: AdminCertificationDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminCertificationCanAccess,
        PermissionType.AdminCertificationCanUpdate,
      ],
      condition: Operator.Or,
    },

  },
  {
    path: 'MaterialGroup',
    component: MaterialGroupListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminMaterialGroupCanAccess] },
  },
  {
    path: 'ParameterManagement',
    component: ParameterManagementListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminParameterManagementCanAccess] }
  },
  {
    path: 'AddParameterManagement',
    component: ParameterManagementDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminParameterManagementCanCreate] }
  },
  {
    path: 'EditParameterManagement/:id',
    component: ParameterManagementDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminParameterManagementCanUpdate] }
  },
  {
    path: 'TestReport',
    component: TestReportListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminTestReportCanAccess] }
  },
  {
    path: 'AddTestReport',
    component: TestReportDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminTestReportCanCreate] }
  },
  {
    path: 'EditTestReport/:id',
    component: TestReportDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminTestReportCanUpdate] }
  },
  {
    path: 'ParameterTypeCode',
    component: ParameterTypeCodeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminParameterTypeCodeCanAccess] },
  },
  {
    path: 'AddParameterTypeCode',
    component: ParameterTypeCodeDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminParameterTypeCodeCanCreate] },
  },
  {
    path: 'EditParameterTypeCode/:id',
    component: ParameterTypeCodeDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [
        PermissionType.AdminParameterTypeCodeCanAccess,
        PermissionType.AdminParameterTypeCodeCanUpdate,
      ],
      condition: Operator.Or,
    },
  },
  {
    path: 'WorkCellUser',
    component: WorkCellUserListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminWorkCellUserCanAccess] }
  },
  {
    path: 'AddWorkCellUser',
    component: WorkCellUserDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminWorkCellUserCanCreate] }
  },
  {
    path: 'EditWorkCellUser/:id',
    component: WorkCellUserDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminWorkCellUserCanUpdate] }
  },
  {
    path: 'PartDimension',
    component: PartDimensionListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPartDimensionCanAccess] }
  },
  {
    path: 'AddPartDimension',
    component: PartDimensionDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartDimensionCanCreate] }
  },
  {
    path: 'EditPartDimension/:id',
    component: PartDimensionDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminPartDimensionCanUpdate] }
  },
  {
    path: 'BowTwistFormula',
    component: BowTwistFormulaListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminBowTwistFormulaCanAccess] }
  },
  {
    path: 'AddBowTwistFormula',
    component: BowTwistFormulaDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminBowTwistFormulaCanCreate] }
  },
  {
    path: 'EditBowTwistFormula/:id',
    component: BowTwistFormulaDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminBowTwistFormulaCanUpdate] }
  },
  {
    path: 'DCCConfiguration',
    component: DCCConfigurationListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDCCConfigurationCanAccess] }
  },
  {
    path: 'AddDCCConfiguration',
    component: DCCConfigurationDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminDCCConfigurationCanCreate] }
  },
  {
    path: 'EditDCCConfiguration/:id',
    component: DCCConfigurationDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminDCCConfigurationCanUpdate] }
  },
  {
    path: 'CommodityCategory',
    component: CommodityCategoryListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCommodityCategoryCanAccess] }
  },
  {
    path: 'AddCommodityCategory',
    component: CommodityCategoryDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminCommodityCategoryCanCreate] }
  },
  {
    path: 'EditCommodityCategory/:id',
    component: CommodityCategoryDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminCommodityCategoryCanUpdate] }
  },
  {
    path: 'Supplier',
    component: SupplierListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSupplierCanAccess] }
  },
  {
    path: 'AddSupplier',
    component: SupplierDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminSupplierCanCreate] }
  },
  {
    path: 'EditSupplier/:id',
    component: SupplierDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminSupplierCanUpdate] }
  },
  {
    path: 'NonJabilUser',
    component: NonJabilUserListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminNonJabilUserCanAccess] }
  },
  {
    path: 'AddNonJabilUser',
    component: NonJabilUserDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminNonJabilUserCanCreate] }
  },
  {
    path: 'EditNonJabilUser/:id',
    component: NonJabilUserDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminNonJabilUserCanUpdate] }
  },
  {
    path: 'PurchaseOrder',
    component: PurchaseOrderListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminPurchaseOrderCanAccess] }
  },
  {
    path: 'CertificateType',
    component: CertificateTypeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminCertificateTypeCanAccess] }
  },
  {
    path: 'AddCertificateType',
    component: CertificateTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminCertificateTypeCanCreate] }
  },
  {
    path: 'EditCertificateType/:id',
    component: CertificateTypeDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminCertificateTypeCanUpdate] }
  },
  {
    path: 'DefectManagement',
    component: DefectManagementListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminDefectManagementCanAccess] }
  },
  {
    path: 'AddDefectManagement',
    component: DefectManagementDetailComponent,
    data: { roles: [], permissions: [PermissionType.AdminDefectManagementCanCreate] }
  },
  {
    path: 'EditDefectManagement/:id',
    component: DefectManagementDetailComponent,
    data: {
      permissions: [
        PermissionType.AdminDefectManagementCanAccess,
        PermissionType.AdminDefectManagementCanUpdate,
      ],
      condition: Operator.Or,
    }
  },
  {
    path: 'SampleSizeCalculation',
    component: SampleSizeCalculationListComponent,
    canActivate: [AuthGuard],
    data: { roles: [], permissions: [PermissionType.AdminSampleSizeCalculationCanAccess] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
