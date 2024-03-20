import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Page } from 'src/app/model/page/page';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PermissionType } from 'src/app/shared/constant/roles';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  adminConfiguration: Page[] = [];
  adminDisplayConfiguration: Page[] = [];
  transactionConfiguration: Page[] = [];

  inputFilterEvent = new Subject<KeyboardEvent>();
  filterValue = '';
  constructor(private authService: AuthService) {
    this.adminConfiguration.push(

      {
        title: 'Role',
        url: 'Role',
        permissions: [PermissionType.AdminRoleCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'User',
        url: 'User',
        permissions: [PermissionType.AdminUserCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user'
      },
      {
        title: 'NonJabilUser',
        url: 'NonJabilUser',
        permissions: [PermissionType.AdminNonJabilUserCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'WorkCell',
        url: 'WorkCell',
        permissions: [PermissionType.AdminWorkCellCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-book-reader'
      },
      {
        title: 'Site',
        url: 'Site',
        permissions: [PermissionType.AdminSiteCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-sitemap'
      },
      {
        title: 'AuditLog',
        url: 'AuditLog',
        permissions: [PermissionType.AdminAuditLogCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-history'
      },
      {
        title: 'UOM',
        url: 'UOM',
        permissions: [PermissionType.AdminUOMCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-ruler'
      },
      {
        title: 'InstrumentType',
        url: 'InstrumentType',
        permissions: [PermissionType.AdminInstrumentTypeCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-ankh'
      },
      {
        title: 'Instrument',
        url: 'Instrument',
        permissions: [PermissionType.AdminInstrumentCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-band-aid'
      },
      {
        title: 'InspectionToolsType',
        url: 'InspectionToolsType',
        permissions: [PermissionType.AdminInspectionToolsTypeCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-check'
      },
      {
        title: 'InspectionTools',
        url: 'InspectionTools',
        permissions: [PermissionType.AdminInspectionToolsCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-check-circle'
      },
      {
        title: 'PCCodeLink',
        url: 'PCCode',
        permissions: [PermissionType.AdminPCCodeCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Commodity',
        url: 'Commodity',
        permissions: [PermissionType.AdminCommodityCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'MaterialGroup',
        url: 'MaterialGroup',
        permissions: [PermissionType.AdminMaterialGroupCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Part',
        url: 'Part',
        permissions: [PermissionType.AdminPartCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-disease'
      },
      {
        title: 'SamplingPlan',
        url: 'SamplingPlan',
        permissions: [PermissionType.AdminSamplingPlanCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-disease'
      },
      {
        title: 'ParameterManagement',
        url: 'ParameterManagement',
        permissions: [PermissionType.AdminParameterManagementCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'TestReport',
        url: 'TestReport',
        permissions: [PermissionType.AdminTestReportCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'ParameterTypeCode',
        url: 'ParameterTypeCode',
        permissions: [PermissionType.AdminParameterTypeCodeCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'WorkCellUser',
        url: 'WorkCellUser',
        permissions: [PermissionType.AdminWorkCellUserCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartDimension',
        url: 'PartDimension',
        permissions: [PermissionType.AdminPartDimensionCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'BowTwistFormula',
        url: 'BowTwistFormula',
        permissions: [PermissionType.AdminBowTwistFormulaCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'DCCConfiguration',
        url: 'DCCConfiguration',
        permissions: [PermissionType.AdminDCCConfigurationCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Supplier',
        url: 'Supplier',
        permissions: [PermissionType.AdminSupplierCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PurchaseOrder',
        url: 'PurchaseOrder',
        permissions: [PermissionType.AdminPurchaseOrderCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'CertificateType',
        url: 'CertificateType',
        permissions: [PermissionType.AdminCertificateTypeCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'DefectManagement',
        url: 'DefectManagement',
        permissions: [PermissionType.AdminDefectManagementCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'SampleSizeCalculation',
        url: 'SampleSizeCalculation',
        permissions: [PermissionType.AdminSampleSizeCalculationCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Location',
        url: 'Location',
        permissions: [PermissionType.AdminLocationCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-map-marker'
      },
      {
        title: 'Country',
        url: 'Country',
        permissions: [PermissionType.AdminCountryCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-globe-asia'
      },
      {
        title: 'Region',
        url: 'Region',
        permissions: [PermissionType.AdminRegionCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-globe'
      },
      {
        title: 'Division',
        url: 'Division',
        permissions: [PermissionType.AdminDivisionCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-flag'
      },
      /*
      {
        title: 'AdminCertification',
        url: 'AdminCertification',
        permissions: [PermissionType.AdminCertificationCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Department',
        url: 'Department',
        permissions: [PermissionType.AdminDepartmentCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-building'
      },
      {
        title: 'SiteSme',
        url: 'AddSiteSme',
        permissions: [PermissionType.AdminSiteUserCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      */
    );

    this.transactionConfiguration.push(

      {
        title: 'Buyer',
        url: 'Buyer',
        permissions: [PermissionType.AdminBuyerCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-history'
      },
      {
        title: 'CompletedGRS',
        url: 'CompletedGRS',
        permissions: [PermissionType.AdminCompletedGRSCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Customer',
        url: 'Customer',
        permissions: [PermissionType.AdminCustomerCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'CTParameter',
        url: 'CTParameter',
        permissions: [PermissionType.AdminCTParameterCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'SupplierFormVIS',
        url: 'SupplierFormVIS',
        permissions: [PermissionType.AdminSupplierFormVISCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'GoodsReceiveUser',
        url: 'GoodsReceiveUser',
        permissions: [PermissionType.AdminGoodsReceiveUserCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Group',
        url: 'Group',
        permissions: [PermissionType.AdminGroupCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'GRSSAPResult',
        url: 'GRSSAPResult',
        permissions: [PermissionType.AdminGRSSAPResultCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'LotInspectionQty',
        url: 'LotInspectionQty',
        permissions: [PermissionType.AdminLotInspectionQtyCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartCAF',
        url: 'PartCAF',
        permissions: [PermissionType.AdminPartCAFCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'ReceiveGoodsInfo',
        url: 'ReceiveGoodsInfo',
        permissions: [PermissionType.AdminReceiveGoodsInfoCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'ReceiveGoodsInfoManual',
        url: 'ReceiveGoodsInfoManual',
        permissions: [PermissionType.AdminReceiveGoodsInfoManualCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Rosetta',
        url: 'Rosetta',
        permissions: [PermissionType.AdminRosettaCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'supplierAttachment',
        url: 'supplierAttachment',
        permissions: [PermissionType.AdminSupplierAttachmentCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'Inspection',
        url: 'Inspection',
        permissions: [PermissionType.AdminInspectionCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'GRS',
        url: 'GRS',
        permissions: [PermissionType.AdminGRSCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PCCodeInspectionToolsType',
        url: 'PCCodeInspectionToolsType',
        permissions: [PermissionType.AdminPCCodeInspectionToolsTypeCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'GRSSupplierForm',
        url: 'GRSSupplierForm',
        permissions: [PermissionType.AdminGRSSupplierFormCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartInspectionBowTwistParameter',
        url: 'PartInspectionBowTwistParameter',
        permissions: [PermissionType.AdminPartBowTwistParameterCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartCountParameter',
        url: 'PartCountParameter',
        permissions: [PermissionType.AdminPartCountParameterCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartDateCode',
        url: 'partDateCode',
        permissions: [PermissionType.AdminPartDateCodeCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartFunParameter',
        url: 'PartFunParameter',
        permissions: [PermissionType.AdminPartFunParameterCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },

      {
        title: 'PartLPositionTolerance',
        url: 'PartLPositionTolerance',
        permissions: [PermissionType.AdminPartLPositionToleranceCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartMeasurementParameter',
        url: 'PartMeasurementParameter',
        permissions: [PermissionType.AdminPartMeasurementParameterCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartMicrosection',
        url: 'PartMicrosection',
        permissions: [PermissionType.AdminPartMicrosectionCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartMPositionTolerance',
        url: 'PartMPositionTolerance',
        permissions: [PermissionType.AdminPartMPositionToleranceCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },

      {
        title: 'PartResultOrientedParameter',
        url: 'PartResultOrientedParameter',
        permissions: [PermissionType.AdminPartResultOrientedParameterCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      },
      {
        title: 'PartTestReportParameter',
        url: 'PartTestReportParameter',
        permissions: [PermissionType.AdminPartTestReportParameterCanAccess],
        visible: true,
        hasAccess: false,
        icon: 'fa-user-friends'
      }
    );
    this.sortConfigurations();
  }

  ngOnInit() {
    this.authService.userPermissions$.subscribe(x => {
      this.verifyAccess();
    });
    this.verifyAccess();
  }

  verifyAccess() {
    this.adminConfiguration.forEach(page => {
      page.hasAccess = this.authService.isPermissionExists(page.permissions);
    });

    this.transactionConfiguration.forEach(page => {
      page.hasAccess = this.authService.isPermissionExists(page.permissions);
    });
  }

  getAllMenu() {
    this.adminConfiguration.forEach(page => {
      page.visible = true;
    });

    this.transactionConfiguration.forEach(page => {
      page.visible = true;
    });
  }

  ngOnDestroy() {
    if (this.inputFilterEvent) {
      this.inputFilterEvent.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.inputFilterEvent
      .pipe(
        debounceTime(environment.timer.debounceTimer),
        distinctUntilChanged(),
        map((event: any) => event.target.value)
      )
      .subscribe(val => {
        this.filterMenu(val.toLowerCase());
      });
  }

  clearFilter() {
    this.filterValue = '';
    this.getAllMenu();
  }

  filterMenu(input: string) {
    if (!input) {
      this.getAllMenu();
    } else {
      input = input.toLowerCase();
      input = input.replace(/\s+/g, '');
      this.adminConfiguration.forEach(page => {
        page.visible = page.title.toLowerCase().includes(input);
      });

      this.transactionConfiguration.forEach(page => {
        page.visible = page.title.toLowerCase().includes(input);
      });
    }
  }

  sortConfigurations() {
    this.adminConfiguration = _.orderBy(
      this.adminConfiguration,
      ['title'],
      ['asc']
    );

    this.transactionConfiguration = _.orderBy(
      this.transactionConfiguration,
      ['title'],
      ['asc']
    );
  }
}
