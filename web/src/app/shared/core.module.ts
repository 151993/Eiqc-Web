import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebHttpClient, WebHttpClientCreator } from '../services/WebHttpClient';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from './controls/loading/loading.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DisplayFormatAndStatusPipe } from './pipe/displayFormatAndStatus';
import { JAutoCompleteComponent } from './controls/autoComplete/j-auto-complete/j-auto-complete.component';
import { JAutoCompleteRoleComponent } from './controls/autoComplete/role/j-auto-complete-site/j-auto-complete-role.component';
import { JAutoCompleteUserComponent } from './controls/autoComplete/user/j-auto-complete-user/j-auto-complete-user.component';
import { TreeTableComponent } from './controls/tree-table/tree-table.component';
import { ConfigurationPtableComponent } from './controls/table/configuration-ptable/configuration-ptable.component';
import { FileUploadComponent } from './controls/file-upload/file-upload.component';
import { DragAndDropDirective } from './directive/dragAndDrop/drag-and-drop.directive';
import { JCalendarComponent } from './controls/calendar/j-calendar/j-calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { JAutoCompleteDepartmentComponent } from './controls/autoComplete/department/j-auto-complete-department/j-auto-complete-department.component';
import { JAutoCompleteWorkCellComponent } from './controls/autoComplete/workcell/j-auto-complete-work-cell/j-auto-complete-work-cell.component';
import { JAutoCompleteLocationComponent } from './controls/autoComplete/location/j-auto-complete-location/j-auto-complete-location.component';
import { JAutoCompleteDivisionComponent } from './controls/autoComplete/division/j-auto-complete-division/j-auto-complete-division.component';
import { JAutoCompleteCountryComponent } from './controls/autoComplete/country/j-auto-complete-country/j-auto-complete-country.component';
import { JAutoCompleteRegionComponent } from './controls/autoComplete/region/j-auto-complete-region/j-auto-complete-region.component';
import { JAutoCompleteSiteComponent } from './controls/autoComplete/site/j-auto-complete-site/j-auto-complete-site.component';
import { JBinocularsUserComponent } from './controls/binocular/user/j-binoculars-user/j-binoculars-user.component';
import { BinocularsModalComponent } from './controls/binocular/binoculars-modal/binoculars-modal.component';
import { JAutoCompleteFormComponent } from './controls/autoComplete/form/j-auto-complete-form.component';
import { JAutoCompleteSupplierFormComponent } from './controls/autoComplete/supplierform/j-auto-complete-supplier-form.component';
import { JAutoCompleteCustomerComponent } from './controls/autoComplete/customer/j-auto-complete-customer.component';
import { JAutoCompleteInspectionToolsTypeComponent } from './controls/autoComplete/inspectiontooltype/j-auto-complete-inspection-tools-type.component';
import { JAutoCompletePCCodeComponent } from './controls/autoComplete/pccode/j-auto-complete-pc-code.component';
import { JAutoCompleteFormTypeComponent } from './controls/autoComplete/formtype/j-auto-complete-form-type.component';
import { JAutoCompleteGRSComponent } from './controls/autoComplete/grs/j-auto-complete-grs.component';
import { JAutoCompleteInspectionToolsComponent } from './controls/autoComplete/inspectiontool/j-auto-complete-inspection-tools.component';
import { JAutoCompleteInstrumentComponent } from './controls/autoComplete/instrument/j-auto-complete-instrument.component';
import { JAutoCompletePartComponent } from './controls/autoComplete/part/j-auto-complete-part/j-auto-complete-part.component';
import { JBinocularsPartComponent } from './controls/binocular/part/j-binoculars-part/j-binoculars-part.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { JAutoCompleteAppearanceInspectionComponent } from './controls/autoComplete/appearance-inspection-item/j-auto-complete-appearanceinspection/j-auto-complete-appearance-inspection.component';
import { JAutoCompleteCommodityCategoryComponent } from './controls/autoComplete/commodity-category/j-auto-complete-commoditycategory/j-auto-complete-commodity-category.component';
import { JAutoCompleteCommodityNameComponent } from './controls/autoComplete/commodity-name/j-auto-complete-commodity-name/j-auto-complete-commodity-name.component';
import { JAutoCompleteFunctionTestItemComponent } from './controls/autoComplete/function-test-item/j-auto-complete-functiontestitem/j-auto-complete-function-test-item.component';
import { JAutoCompleteParameterManagementTypeComponent } from './controls/autoComplete/parameter-management-type/j-auto-complete-parameter-management-type/j-auto-complete-parameter-management-type.component';
import { JAutoCompleteCommodityComponent } from './controls/autoComplete/commodity/j-auto-complete-commodity/j-auto-complete-commodity.component';
import { JAutoCompleteInstrumentTypeComponent } from './controls/autoComplete/instrument-type/j-auto-complete-instrument-type.component';
import { JAutoCompleteAdminCertificationComponent } from './controls/autoComplete/admin-certification/j-auto-complete-admin-certification/j-auto-complete-admin-certification.component';
import { JAutoCompleteDataTypeComponent } from './controls/autoComplete/data-type/j-auto-complete-data-type/j-auto-complete-data-type.component';
import { JAutoCompleteProductLifeCycleStageComponent } from './controls/autoComplete/product-life-cycle-stage/j-auto-complete-product-life-cycle-stage/j-auto-complete-product-life-cycle-stage.component';
import { JAutoCompleteMaterialGroupComponent } from './controls/autoComplete/material-group/j-auto-complete-material-group/j-auto-complete-material-group.component';
import { JAutoCompleteUOMComponent } from './controls/autoComplete/uom/j-auto-complete-uom.component';
import { JAutoCompleteParameterManagementComponent } from './controls/autoComplete/parameter-management/j-auto-complete-parameter-management.component';
import { MaxFractionDirective } from './directive/maxFraction/max-fraction.directive';
import { JAutoCompletePartDimensionComponent } from './controls/autoComplete/part-dimension/j-auto-complete-part-dimension.component';
import { JAutoCompleteParameterTypeCodeComponent } from './controls/autoComplete/parameter-type-code/j-auto-complete-parameter-type-code.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { JAutoCompleteBowTwistFormulaComponent } from './controls/autoComplete/bow-twist-formula/j-auto-complete-bow-twist-formula/j-auto-complete-bow-twist-formula.component';
import { TooltipModule } from 'primeng/tooltip';
import { JAutoCompleteWarPageComponent } from './controls/autoComplete/war-page/j-auto-complete-war-page.component';
import { JAutoCompleteManuFacturePartNumberComponent } from './controls/autoComplete/manufacture-part-number/j-auto-complete-manufacture-part-number/j-auto-complete-manufacture-part-number.component';
import { JAutoCompleteCommodityCategoryNameComponent } from './controls/autoComplete/commodity-category-name/j-auto-complete-commodity-category-name.component';
import { FieldsetModule, } from 'primeng/fieldset';
import { JAutoCompleteWorkCellSiteComponent } from './controls/autoComplete/work-cell-site/j-auto-complete-work-cell-site.component';
import { JAutoCompleteSupplierComponent } from './controls/autoComplete/supplier/j-auto-complete-supplier/j-auto-complete-supplier.component';
import { JAutoCompleteSupplierUserComponent } from './controls/autoComplete/supplier-user/j-auto-complete-supplier-user/j-auto-complete-supplier-user.component';
import { JAutoCompletePartInspectionPartComponent } from './controls/autoComplete/part-inspection/j-auto-complete-part-inspection/j-auto-complete-part-inspection-part.component';
import { JAutoCompletePurchaseOrderComponent } from './controls/autoComplete/purchase-order/j-auto-complete-purchase-order/j-auto-complete-purchase-order.component';
import { JAutoCompleteDefectSectionComponent } from './controls/autoComplete/defect-section/j-auto-complete-defect-section.component';
import { JAutoCompleteDefectTypeComponent } from './controls/autoComplete/defect-type/j-auto-complete-defect-type.component';
import { JAutoCompleteSAPPartComponent } from './controls/autoComplete/sap-part/j-auto-complete-sap-part.component';

import { JAutoCompleteWorkCellUserComponent } from './controls/autoComplete/work-cell-user/j-auto-complete-work-cell-jabil-user/j-auto-complete-work-cell-User.component';
import { JAutoCompletePartInspectionManufacturePartNumberComponent } from './controls/autoComplete/part-inspection-manufacture-part-number/j-auto-complete-part-inspection-manufacture-part-number/j-auto-complete-part-inspection-manufacture-part-number.component';
import { JAutoCompleteRoleEnumComponent } from './controls/autoComplete/role-enum/j-auto-complete-role-enum.component';
import { JAutoCompleteChartTypeComponent } from './controls/autoComplete/chart-type/j-auto-complete-chart-type/j-auto-complete-chart-type.component';
import { BlockCopyPasteDirective } from './directive/blockCopyPaste/block-copy-paste.directive';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    TableModule,
    TreeTableModule,
    TreeModule,
    DialogModule,
    ListboxModule,
    FieldsetModule,
    MultiSelectModule,
    AutoCompleteModule,
    DropdownModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgbTypeaheadModule,
    NgxSpinnerModule,
    PaginatorModule,
    PanelModule,
    InputTextareaModule,
    EditorModule,
    CalendarModule,
    InputNumberModule,
    TooltipModule
  ],
  declarations: [
    ConfigurationPtableComponent,
    DisplayFormatAndStatusPipe,
    JAutoCompleteComponent,
    JAutoCompleteRoleComponent,
    JAutoCompleteUserComponent,
    TreeTableComponent,
    FileUploadComponent,
    DragAndDropDirective,
    MaxFractionDirective,
    BlockCopyPasteDirective,
    JCalendarComponent,
    JAutoCompleteDepartmentComponent,
    JAutoCompleteWorkCellComponent,
    JAutoCompleteLocationComponent,
    JAutoCompleteDivisionComponent,
    JAutoCompleteCountryComponent,
    JAutoCompleteRegionComponent,
    JAutoCompleteSiteComponent,
    JBinocularsUserComponent,
    BinocularsModalComponent,
    JAutoCompleteSupplierFormComponent,
    JAutoCompleteFormComponent,
    JBinocularsPartComponent,
    JAutoCompletePartComponent,
    JAutoCompleteCustomerComponent,
    JAutoCompleteInspectionToolsTypeComponent,
    JAutoCompletePCCodeComponent,
    JAutoCompleteFormTypeComponent,
    JAutoCompleteGRSComponent,
    JAutoCompleteInspectionToolsComponent,
    JAutoCompleteInstrumentTypeComponent,
    JAutoCompleteInstrumentComponent,
    JAutoCompletePCCodeComponent,
    JAutoCompleteAppearanceInspectionComponent,
    JAutoCompleteCommodityCategoryComponent,
    JAutoCompleteCommodityNameComponent,
    JAutoCompleteFunctionTestItemComponent,
    JAutoCompleteParameterManagementTypeComponent,
    JAutoCompleteCommodityComponent,
    JAutoCompleteAdminCertificationComponent,
    JAutoCompleteDataTypeComponent,
    JAutoCompleteProductLifeCycleStageComponent,
    JAutoCompleteMaterialGroupComponent,
    JAutoCompleteUOMComponent,
    JAutoCompleteParameterManagementComponent,
    JAutoCompletePartDimensionComponent,
    JAutoCompleteBowTwistFormulaComponent,
    JAutoCompleteParameterTypeCodeComponent,
    JAutoCompleteWarPageComponent,
    JAutoCompleteManuFacturePartNumberComponent,
    JAutoCompleteCommodityCategoryNameComponent,
    JAutoCompleteWorkCellSiteComponent,
    JAutoCompleteSupplierComponent,
    JAutoCompleteSupplierUserComponent,
    JAutoCompletePartInspectionPartComponent,
    JAutoCompletePurchaseOrderComponent,
    JAutoCompleteDefectSectionComponent,
    JAutoCompleteDefectTypeComponent,
    JAutoCompleteSAPPartComponent,
    JAutoCompleteWorkCellUserComponent,
    JAutoCompletePartInspectionManufacturePartNumberComponent,
    JAutoCompleteRoleEnumComponent,
    JAutoCompleteChartTypeComponent
  ],
  exports: [
    TranslateModule,
    TreeTableModule,
    TreeModule,
    CheckboxModule,
    FieldsetModule,
    DialogModule,
    ListboxModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgbTypeaheadModule,
    NgxSpinnerModule,
    RadioButtonModule,
    AutoCompleteModule,
    PaginatorModule,
    MultiSelectModule,
    AutoCompleteModule,
    PanelModule,
    InputTextareaModule,
    DisplayFormatAndStatusPipe,
    ConfigurationPtableComponent,
    JAutoCompleteComponent,
    JAutoCompleteRoleComponent,
    JAutoCompleteUserComponent,
    JAutoCompleteDepartmentComponent,
    TreeTableComponent,
    FileUploadComponent,
    DragAndDropDirective,
    MaxFractionDirective,
    BlockCopyPasteDirective,
    EditorModule,
    JCalendarComponent,
    CalendarModule,
    JAutoCompleteWorkCellComponent,
    JAutoCompleteLocationComponent,
    JAutoCompleteDivisionComponent,
    JAutoCompleteCountryComponent,
    JAutoCompleteRegionComponent,
    JAutoCompleteSiteComponent,
    JBinocularsUserComponent,
    BinocularsModalComponent,
    JAutoCompleteSupplierFormComponent,
    JAutoCompleteFormComponent,
    JBinocularsPartComponent,
    JAutoCompletePartComponent,
    JAutoCompleteCustomerComponent,
    JAutoCompleteInspectionToolsTypeComponent,
    JAutoCompletePCCodeComponent,
    JAutoCompleteFormTypeComponent,
    JAutoCompleteGRSComponent,
    JAutoCompleteInspectionToolsComponent,
    JAutoCompleteInstrumentTypeComponent,
    JAutoCompleteInstrumentComponent,
    JAutoCompletePCCodeComponent,
    JAutoCompleteAppearanceInspectionComponent,
    JAutoCompleteCommodityCategoryComponent,
    JAutoCompleteCommodityNameComponent,
    JAutoCompleteFunctionTestItemComponent,
    InputNumberModule,
    JAutoCompleteParameterManagementTypeComponent,
    JAutoCompleteCommodityComponent,
    JAutoCompleteAdminCertificationComponent,
    JAutoCompleteDataTypeComponent,
    JAutoCompleteProductLifeCycleStageComponent,
    JAutoCompleteMaterialGroupComponent,
    JAutoCompleteUOMComponent,
    JAutoCompleteParameterManagementComponent,
    JAutoCompletePartDimensionComponent,
    JAutoCompleteBowTwistFormulaComponent,
    TooltipModule,
    JAutoCompleteParameterTypeCodeComponent,
    JAutoCompleteWarPageComponent,
    JAutoCompleteManuFacturePartNumberComponent,
    JAutoCompleteCommodityCategoryNameComponent,
    JAutoCompleteWorkCellSiteComponent,
    JAutoCompleteSupplierComponent,
    JAutoCompleteSupplierUserComponent,
    JAutoCompletePartInspectionPartComponent,
    JAutoCompletePurchaseOrderComponent,
    JAutoCompleteDefectSectionComponent,
    JAutoCompleteDefectTypeComponent,
    JAutoCompleteSAPPartComponent,
    JAutoCompleteWorkCellUserComponent,
    JAutoCompletePartInspectionManufacturePartNumberComponent,
    JAutoCompleteRoleEnumComponent,
    JAutoCompleteChartTypeComponent
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CookieService,
        httpInterceptorProviders,
        {
          provide: WebHttpClient,
          useFactory: WebHttpClientCreator,
          deps: [HttpClient, AuthService, LoadingService],
        },
      ],
    };
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    '/assets/i18n/',
    '.json?random=' + new Date().getTime()
  );
}
