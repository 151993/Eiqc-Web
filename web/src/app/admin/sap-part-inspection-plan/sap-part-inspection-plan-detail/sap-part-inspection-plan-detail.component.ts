import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { environment } from 'src/environments/environment';
import { UpdateSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/update-sap-part-inspection-plan-model';
import { AddSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/add-sap-part-inspection-plan-model';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { Automapper } from 'src/app/shared/automapper/automapper';
import {
  Constants, ControlStates, PrimeNGDateSelectionMode, PartPlanStateType, TabType, ValidationErrorCodes, tabType, resultExpected, ToastMessage,
  specType, SpecType, unit, Unit, tabConfiguration, dataTypes, Numbers, DataType, yesNoOptions, YesNoOptions, UserType, Symbol, SearchOperator
} from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { Commodity } from 'src/app/model/commodity/commodity';
import { WorkCell } from 'src/app/model/workcell/work-cell';
import { AdminCertification } from 'src/app/model/admin-certification/admin-certification';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SAPPartModel } from 'src/app/model/sap-models/sap-part-model';
import { ProductLifeCycleStage } from 'src/app/model/product-life-cycle-stage/product-life-cycle-stage';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { Attachment } from 'src/app/model/attachment/attachment';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { SAPSamplingPlanModel } from 'src/app/model/sap-models/sap-sampling-plan-model';
import { CommodityEnum } from 'src/app/model/sap-part-inspection-plan/commodity.enum';
import * as _ from 'lodash';
import { ParameterManagementService } from 'src/app/services/parameter-management/parameter-management.service';
import { InspectionToolsTypeService } from 'src/app/services/inspection-tools-type/inspection-tools-type.service';
import { ResultOrientedTab } from 'src/app/model/result-oriented/result-oriented';
import { MeasurementParameterComponent } from '../measurement-parameter/measurement-parameter.component';
import { FunParameterComponent } from '../fun-parameter/fun-parameter.component';
import { MicroSectionParameterModel } from 'src/app/model/sap-part-inspection-plan/micro-section-parameter/micro-section-parameter-model';
import { MicroSectionParameterComponent } from '../micro-section-parameter/micro-section-parameter.component';
import { MeasurementParameterModel } from 'src/app/model/sap-part-inspection-plan/measurement-parameter/measurement-parameter-model';
import { FunParameterModel } from 'src/app/model/sap-part-inspection-plan/fun-parameter/fun-parameter-model';
import { MPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/m-position-tolerance/m-position-tolerance-model';
import { LPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/l-position-tolerance/l-position-tolerance-model';
import { MPositionToleranceComponent } from '../m-position-tolerance/m-position-tolerance.component';
import { LPositionToleranceComponent } from '../l-position-tolerance/l-position-tolerance.component';
import { BowTwistFormulaService } from 'src/app/services/bow-twist-formula/bow-twist-formula.service';
import { BowTwistFormula } from 'src/app/model/bow-twist-formula/bow-twist-formula';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { PartInspectionCertificationAttachment } from 'src/app/model/part-inspection-certification-attachment/part-inspection-certification-attachment';
import { ExpandSelectCountInfo, FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { PartDrawingModel } from 'src/app/model/sap-part-inspection-plan/part-drawing-model';
import { PartSpecModel } from 'src/app/model/sap-part-inspection-plan/part-spec-model';
import { PartService } from 'src/app/services/part/part.service';
import { PartInspectionBowTwistParameter } from 'src/app/model/part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter';
import { TestReportService } from 'src/app/services/test-report/test-report.service';
import { PartTestReportParameterService } from 'src/app/services/part-test-report-parameter/part-test-report-parameter.service';
import { TestReportAttachment } from 'src/app/model/test-report-attachment/test-report-attachment';
import { PartCountParameter } from 'src/app/model/part-count-parameter/part-count-parameter';
import { PartDateCode } from 'src/app/model/part-date-code/part-date-code';
import { PartDrawingViewComponent } from '../part-drawing-view/part-drawing-view.component';
import { PartSpecViewComponent } from '../part-spec-view/part-spec-view.component';
import { PartDrawingService } from 'src/app/services/part-drawing/part-drawing.service';
import { PartSpecificationService } from 'src/app/services/part-specification/part-specification.service';
import { Supplier } from 'src/app/model/supplier/supplier';
import { User } from 'src/app/model/user/user';
import { Location } from '@angular/common';
import { SAPPartInspectionPlanComments } from 'src/app/model/sap-part-inspection-plan-comments/sap-part-inspection-plan-comments';
import { PartTestReportTab } from 'src/app/model/part-test-report/part-test-report-tab-model';
import { PartTestReportAttachmentViewComponent } from '../part-test-report-attachment-view/part-test-report-attachment-view.component';
import { SamplingPlanService } from 'src/app/services/sampling-plan/sampling-plan.service';
import { ColumnType } from 'src/app/model/table/table';
import { PartDimensionEnum } from 'src/app/model/sap-part-inspection-plan/part-dimension.enum';
import { Clipboard } from '@angular/cdk/clipboard';

const inchUpperLimit = 0.09;
const mmUpperLimit = 2.3;
const maxFileSize = 5;
const maxFileLimit = 5;
const bowTwistFixedRows = 3;

@Component({
  selector: 'app-sap-part-inspection-plan-detail',
  templateUrl: './sap-part-inspection-plan-detail.component.html',
  styleUrls: ['./sap-part-inspection-plan-detail.component.css']
})
export class SAPPartInspectionPlanDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {

  formInput: FormGroup;
  //#region Attachment
  drawingFiles: FileUpload[] = [];
  files: FileUpload[] = [];
  uploadSpecFiles: FileUpload[] = [];
  uploadCertificationFiles: FileUpload[] = [];
  drawingAttachments: Attachment[] = [];
  uploadSpecAttachments: Attachment[] = [];
  uploadCertificationAttachments: Attachment[] = [];
  tempFolder = '';
  savePath = 'sap-part-inspection-plan';
  private readonly geometryTolerance = 'geometry tolerance';
  //#endregion Attachment

  selectionModeSingle = PrimeNGDateSelectionMode.Single;
  maxNumber: number;
  minNumber: number;
  size: number;
  minFractionDigits: number;
  maxFractionDigits: number;

  supplierContactEmail: string;
  supplierId: number;
  isCAFNoMandatory = false;

  sapPartInspectionPlan: SAPPartInspectionPlan;
  autoCompletePartValue: string;
  samplingPlans: SAPSamplingPlanModel[];
  samplingPlanColumns = [
    { field: 'mstrChar', header: 'MasterInspectionCharacteristic', isVisible: true },
    { field: 'smplProc', header: 'SamplingProcedure', isVisible: true },
    { field: 'site', header: 'site', isVisible: false },
    { field: 'certificateType', header: 'certificateType', isVisible: false }
  ];

  //#region Test Report Tab
  testReportTabDetails: PartTestReportTab[];
  testReportData: any;
  testReportTabDetail = new PartTestReportTab();
  resultExpectedTestReport: Record<string, any[]> = {};
  resultExpectedResultParameter: Record<string, any[]> = {};
  //#endregion Test Report Tab

  dataTypeResult: Record<string, any[]> = {};

  //#region Drawing Section
  drawingDetails: PartDrawingModel[];
  drawingDetail = new PartDrawingModel();
  displayDrawingColumns: any;
  //#endregion Drawing Section

  //#region Specification Section
  specificationDetails: PartSpecModel[];
  specificationDetail = new PartSpecModel();
  displaySpecificationColumns: any;
  //#endregion Specification Section

  //#region Result Oriented Tab
  resultOrientedTabDetails: ResultOrientedTab[] = [];
  resultOrientedtData: any;
  resultOrientedTabDetail = new ResultOrientedTab();
  //#endregion Result Oriented Tab

  isMPositionToleranceExpanded: boolean;
  isLPositionToleranceExpanded: boolean;
  isMeasurementExpanded: boolean;
  isMicroSectionExpanded: boolean;
  isFUNParameterExpanded: boolean;
  isResultOrientedExpanded: boolean;
  isCountParameterExpanded: boolean;
  isBowTwistExpanded: boolean;
  isTestReportExpanded: boolean;
  isTestReportAttachmentUntouched: boolean;
  isDateCodeExpanded: boolean;

  measurementParameters: MeasurementParameterModel[] = [];
  measurementParameter = new MeasurementParameterModel();
  funMicroMeasurementParameterColumns: any;
  microSectionParameterColumns: any;


  funParameters: FunParameterModel[] = [];
  funParameter = new FunParameterModel();
  isPcbPwbCommodity = true;
  microSectionParameters: MicroSectionParameterModel[] = [];
  microSectionParameter = new MicroSectionParameterModel();
  mPositionTolerances: MPositionToleranceModel[] = [];
  mPositionTolerance = new MPositionToleranceModel();
  mPositionToleranceColumns: any;
  lPositionTolerances: LPositionToleranceModel[] = [];
  lPositionTolerance = new LPositionToleranceModel();
  lPositionToleranceColumns: any;

  dynamicTypeCollection: Record<string, any[]> = {};

  public sapPartAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'partNo',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'JABIL_PART_NO',
    format: '${value.partNo}',
  };



  public dataTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'description',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'description',
    format: '${value.description}',
  };

  public specTypeAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'name',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'name',
    format: '${value.name}',
  };

  public supplierAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'vendorName',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'vendorName',
    format: '${value.vendorName} (${value.vendorCode}) (${value.purchaseOrg}-${value.companyCode})'
  };

  public manuFacturePartNumberAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'manufacturerPartNumber',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'manufacturerPartNumber',
    format: '${value.manufacturerPartNumber}',
  };

  public productLifeCycleStageAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'description',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'description',
    format: '${value.description}',
  };

  properties = {
    id: 'id',
    partNo: 'partNo',
    partDescription: 'partDescription',
    iP: 'iP',
    siteIP: 'siteIP',
    cafNo: 'cafNo',
    isSafePart: 'isSafePart',
    workCell: 'workCell',
    divisionModelNumber: 'divisionModelNumber',
    genWI: 'genWI',
    refDoc: 'refDoc',
    commodity: 'commodity',
    manufacturePartNumber: 'manufacturePartNumber',
    manufacturer: 'manufacturer',
    adminCertifications: 'adminCertifications',
    supplier: 'supplier',
    supplierContact: 'supplierContact',
    jabilOwnerContact: 'jabilOwnerContact',
    productLifeCycleStage: 'productLifeCycleStage',
    manufactureDate: 'manufactureDate',
    shelfLifeMonths: 'shelfLifeMonths',
    manufactureDCWeeks: 'manufactureDCWeeks',
    manufactureDCYears: 'manufactureDCYears',
    surfaceFinishingDate: 'surfaceFinishingDate',
    dateCodeDetails: 'dateCodeDetails',
    expireDate: 'expireDate',
    dateCode: 'dateCode',
    spec: 'spec',
    length: 'length',
    width: 'width',
    unit: 'unit',
    upperLimit: 'upperLimit',
    warPageTypeId: 'warPageTypeId',
    bowTwistFormula: 'bowTwistFormula',
    specType: 'specType',
    dataType: 'dataType',
    uploadCertificationFiles: 'uploadCertificationFiles',
    mpnMatched: 'mpnMatched',
    mpnMaterialHERS: 'mpnMaterialHERS',
    mpnReason: 'mpnReason',
    isEnabled: 'isEnabled',
    testReportInspectionDetails: 'testReportInspectionDetails',
    functionAttributeInspectionDetails: 'functionAttributeInspectionDetails',
    detailsDefine: 'detailsDefine',
    comments: 'comments',
    dateCodeLimit: 'dateCodeLimit'
  };

  gettingPart = false;
  public triggerSearchPart$ = new Subject<string>();

  partCollection: SAPPartModel[] = [];
  selectedData: SAPPartModel;
  isSurfaceFinishingDateEnabled: boolean;
  isCommodityPCBOrPWB: boolean;
  stateTypeId: number;
  submittedById: number;
  submittedByDate: Date;
  assignedToUserId: number;
  originalAdminCertificateIds: number[];
  originalPartManufactureIds: number[];
  //#region Test Report Tab
  displayTestReportColumns: any;
  //#endregion Test Report Tab


  countParameterData: any;
  countParameters: PartCountParameter[] = [];
  countParameterColumns: any;
  countParameter = new PartCountParameter();

  //#region Result Oriented Tab
  displayResultOrientedColumns: any;
  //#endregion Result Oriented Tab

  //#region Bow Twist Tab
  bowTwistTitles: any[] = [];
  specType: Map<number, string>;
  specTypeId: number;
  specTypeFieldValue: string;
  unitTypeId: number;
  unit: Map<number, string>;
  bowTwistFormulaName: string;
  bowTwistFormulaExpression: string;
  bowTwistFormulaValue: number;
  bowTwistFormFields = null;
  bowTwistModel = new PartInspectionBowTwistParameter();
  partBowTwistParameters: PartInspectionBowTwistParameter[] = [];
  //#endregion Bow Twist Tab
  tabConfig: any[];
  dataTypeList: any[];
  partId: number;
  YesNoOptions: any;
  isMPNReasonVisible: boolean;
  maxFileUploadLimit: number;
  maxFileSize: number;
  mpnMaterial: string;
  bowTwistRecords: any;
  dataTypeId: number;
  yesNoId: number;
  yesNoList: any[];
  partTestReportAttachments: TestReportAttachment[];
  testReportId: any;
  testReportParameterId: any;
  isFunctionAttributeInspectionDetailEmpty: boolean;
  drawingRecord: PartDrawingModel;
  specRecord: PartSpecModel;
  originalDrawingIds: any;
  originalSpecIds: any;
  currentUser: any;
  partInspectionDrawingId: any;
  partInspectionSpecificationId: any;
  isSupplierDisabledField: boolean;
  isSQEDisabledField: boolean;
  isEdit: boolean;
  partCommentDetails: SAPPartInspectionPlanComments[];
  isRedefine: any;
  maxDate: Date;
  partNo: any;
  mediaCode: string;
  maskedMPN: string;
  referenceSAPPartInspectionPlanId: number;
  copyMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: SAPPartInspectionPlanService,
    authService: AuthService,
    protected activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    private _parameterManagementService: ParameterManagementService,
    private _toolsTypeService: InspectionToolsTypeService,
    private testReportService: TestReportService,
    private bowTwistFormulaService: BowTwistFormulaService,
    private attachmentService: AttachmentService,
    private partService: PartService,
    private partTestReportParameterService: PartTestReportParameterService,
    private location: Location,
    private partInspectionDrawingService: PartDrawingService,
    private partInspectionSpecificationService: PartSpecificationService,
    private samplingPlanService: SamplingPlanService,
    private clipboard: Clipboard
  ) {

    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.sapPartInspectionPlan = new SAPPartInspectionPlan();
    this.entity = this.sapPartInspectionPlan;
    this.initForm();
    this.cancelRoute = '/PartInspection/SAPPartInspectionPlan';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminSAPPartInspectionPlanCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSAPPartInspectionPlanCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSAPPartInspectionPlanCanCreate;

    this.maxNumber = 99999;
    this.minNumber = 0;
    this.size = 200;

    this.maxFractionDigits = 5;
    this.minFractionDigits = 5;

    this.countParameterColumns = (new PartCountParameter()).displayColumns();

    this.displayTestReportColumns = (new PartTestReportTab()).displayColumns();
    this.displayResultOrientedColumns = (new ResultOrientedTab()).displayColumns();
    this.displayDrawingColumns = (new PartDrawingModel()).displayColumns();
    this.displaySpecificationColumns = (new PartSpecModel()).displayColumns();

    this.specType = specType;
    this.unit = unit;
    this.specTypeId = SpecType.Select;
    this.dataTypeId = DataType.NONCTQ;
    this.yesNoId = YesNoOptions.Yes;
    this.isMPNReasonVisible = false;
    this.initializeDrawingSpecTable();
    this.currentUser = this.authService.retrieveUser();
    if (this.currentUser.userTypeId === UserType.Supplier) {
      this.isSupplierDisabledField = true;
    } else {
      this.isSupplierDisabledField = false;
    }
    if (this.currentUser.userTypeId === UserType.User) {
      this.isSQEDisabledField = true;
    } else {
      this.isSQEDisabledField = false;
    }
  }


  initializeDrawingSpecTable() {
    this.drawingDetails = [];
    this.specificationDetails = [];
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      partNo: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      partDescription: new FormControl({ value: '', disabled: true }, [
        Validators.maxLength(256)
      ]),
      iP: new FormControl({ value: Constants.Empty, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      siteIP: new FormControl({ value: Constants.Empty, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      cafNo: new FormControl(Constants.Empty, [
        Validators.maxLength(100)
      ]),
      isSafePart: new FormControl(false, [Validators.required]),
      workCell: new FormControl(null),
      divisionModelNumber: new FormControl(Constants.Empty),
      genWI: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      refDoc: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      commodity: new FormControl(null, [Validators.required]),
      manufacturePartNumber: new FormControl(Constants.Empty, [Validators.required]),
      manufacturer: new FormControl({ value: '', disabled: true }, [
        Validators.maxLength(50)
      ]),
      adminCertifications: new FormControl([]),
      productLifeCycleStage: new FormControl(Constants.Empty),
      supplier: new FormControl(null, [Validators.required]),
      supplierContact: new FormControl(null),
      jabilOwnerContact: new FormControl({ value: '', disabled: true }, [
        Validators.maxLength(50)
      ]),
      uploadCertificationFiles: new FormControl([]),
      manufactureDate: new FormControl(Constants.Empty, Validators.maxLength(50)),
      shelfLifeMonths: new FormControl(Constants.Empty),
      manufactureDCWeeks: new FormControl(Constants.Empty),
      manufactureDCYears: new FormControl(Constants.Empty),
      surfaceFinishingDate: new FormControl({ value: '', disabled: true }, [
        Validators.maxLength(50)
      ]),
      dateCodeDetails: new FormControl(Constants.Empty, [
        Validators.maxLength(50)
      ]),
      expireDate: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      bowTwist: this.formBuilder.array([]),
      specType: new FormControl(Constants.Empty),
      dataType: new FormControl(Constants.Empty),
      mpnMatched: new FormControl(true),
      mpnMaterialHERS: new FormControl({ value: Constants.Empty, disabled: true }),
      mpnReason: new FormControl(Constants.Empty),
      isEnabled: new FormControl(true, Validators.required),
      changeReason: new FormControl(Constants.Empty),
      testReportInspectionDetails: new FormControl(Constants.Empty),
      functionAttributeInspectionDetails: new FormControl(Constants.Empty),
      comments: new FormControl(Constants.Empty),
      dateCodeLimit: new FormControl(Constants.Empty)
    });
  }

  ngOnInit() {
    this.yesNoList = yesNoOptions;
    super.ngOnInit();
    this.initializeTabExpandedSetting();
    this.getDefaultMPNMatched();
    this.getCommonColumnsTabs();
    this.maxFileUploadLimit = maxFileLimit;
    this.maxFileSize = maxFileSize;
    this.getData();
    this.tempFolder = this.getFileUploadId();
    this.tempFolder =
      this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
    this.isTestReportAttachmentUntouched = true;
    this.triggerSearchPart$
      .pipe(
        switchMap((input: string) =>
          this.apiService.searchSAPPartByPartNumber(input)
        )
      )
      .subscribe(
        (data) => {
          this.partCollection = data.value.splice(0, environment.limit.maxResult);
          this.gettingPart = false;
        }, () => {
          this.gettingPart = false;
        }
      );

    this.activatedRoute.params
      .subscribe(params => {
        if (params && params['isRedefine']) {
          this.isRedefine = JSON.parse(params['isRedefine']);
        } else {
          this.isRedefine = false;
        }
      });


    this.isEdit = this.recId != null ? true : false;

    const commodity = this.formInput.controls[this.properties.commodity].value as Commodity;
    if (commodity && !this.isCountParameterExpanded) {
      this.expandCommodityCountParameter(commodity.id);
    }


    if (commodity && !this.isTestReportExpanded) {
      this.expandCommodityTestReport(commodity.id);
    }

    if (commodity && !this.isResultOrientedExpanded) {
      this.expandCommodityResultParameter(commodity.id);
    }

    if (commodity && !this.isMeasurementExpanded) {
      this.expandCommodityDimensionalMeasurements(commodity.id);
    }


    if (commodity && !this.isFUNParameterExpanded) {
      this.expandCommodityFunctionVariables(commodity.id);
    }


    if (commodity && !this.isMicroSectionExpanded) {
      this.expandCommodityMicroSectionParameters(commodity.id);
    }

    if (commodity && !this.isMPositionToleranceExpanded) {
      this.expandCommodityMPositionTolerances(commodity.id);
    }

    if (commodity && !this.isLPositionToleranceExpanded) {
      this.expandCommodityLPositionTolerances(commodity.id);
    }

    if (commodity && !this.isBowTwistExpanded) {
      this.expandCommodityBowTwist(commodity.id);
    }


    if (this.isSQEDisabledField) {
      this.formInput.controls[this.properties.refDoc].disable();
    } else {
      this.formInput.controls[this.properties.refDoc].enable();
    }

    if (this.isSupplierDisabledField) {
      this.formInput.controls[this.properties.divisionModelNumber].disable();
      this.formInput.controls[this.properties.jabilOwnerContact].disable();
      this.formInput.controls[this.properties.genWI].disable();
    } else {
      this.formInput.controls[this.properties.divisionModelNumber].enable();
      this.formInput.controls[this.properties.jabilOwnerContact].enable();
      this.formInput.controls[this.properties.genWI].enable();
    }
  }

  getCommonColumnsTabs() {
    this.funMicroMeasurementParameterColumns = this.apiService.funMicroMeasurementParameterColumns;
    this.microSectionParameterColumns = this.apiService.microSectionParameterColumns;
    this.mPositionToleranceColumns = this.apiService.mPositionToleranceColumns;
    this.lPositionToleranceColumns = this.apiService.lPositionToleranceColumns;
  }

  initializeTabExpandedSetting() {
    this.isMPositionToleranceExpanded = false;
    this.isLPositionToleranceExpanded = false;
    this.isMeasurementExpanded = false;
    this.isMicroSectionExpanded = false;
    this.isFUNParameterExpanded = false;
    this.isResultOrientedExpanded = false;
    this.isCountParameterExpanded = false;
    this.isBowTwistExpanded = false;
    this.isTestReportExpanded = false;
    this.isDateCodeExpanded = false;
  }

  triggerSearchPart(event) {
    const input = event.query.trim();
    if (input !== '') {
      this.gettingPart = true;
      this.triggerSearchPart$.next(input);
    }
  }

  resultRadioButtonChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const resultData = this.resultOrientedTabDetails.filter(x => x.id === event.row.id)[0];
      resultData.resultExpected = event.radioButtonChangedEvent;
      resultData.resultId = event.radioButtonChangedEvent === resultExpected[0].name ? resultExpected[0].id : resultExpected[1].id;
      this.formInput.markAsDirty();
      this.saveAsDraftButtonValidation();
    }
  }

  testRequirementTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      this.formInput.markAsDirty();
      this.saveAsDraftButtonValidation();
    }
  }

  detailsDefineTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      this.formInput.markAsDirty();
      this.saveAsDraftButtonValidation();
    }
  }


  testReportTextChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      this.formInput.markAsDirty();
      this.saveAsDraftButtonValidation();
    }
  }



  countParameterDropDownChangeEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const toolsTypeId = event.dropDownChangedEvent.target.value;
      const toolsTypeData = this.countParameters.filter(x => x.id === event.row.id)[0];
      toolsTypeData.toolsType = '';
      toolsTypeData.inspectionToolsTypeId = +toolsTypeId;
      this.formInput.markAsDirty();
      this.saveAsDraftButtonValidation();
    }
  }

  testReportCheckBoxChangedEvent() {
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  visualInspectionCheckBoxChangedEvent() {
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  functionAttributeCheckBoxChangedEvent() {
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }


  isFunctionAttributeInspectionDetailsEmpty() {
    this.isFunctionAttributeInspectionDetailEmpty = false;
    const functionAttributeInspectionDetails = this.formInput.controls[this.properties.functionAttributeInspectionDetails];
    if (this.resultOrientedTabDetails != null && this.resultOrientedTabDetails !== undefined) {
      this.resultOrientedTabDetails.forEach(element => {
        // if (element.resultExpected === resultExpected[1].name
        //   && (element.inspectionDetails === Constants.Empty || element.inspectionDetails === undefined)) {
        //   functionAttributeInspectionDetails.setValidators(Validators.required);
        //   functionAttributeInspectionDetails.updateValueAndValidity();
        //   this.isFunctionAttributeInspectionDetailEmpty = true;
        // }
      });
    }

    if (this.isFunctionAttributeInspectionDetailEmpty) {
      functionAttributeInspectionDetails.setValidators(Validators.required);
      functionAttributeInspectionDetails.updateValueAndValidity();
    } else {
      functionAttributeInspectionDetails.setErrors(null);
      functionAttributeInspectionDetails.clearValidators();
      functionAttributeInspectionDetails.updateValueAndValidity();
    }
    return this.isFunctionAttributeInspectionDetailEmpty;
  }

  selectPart(value) {
    const mpnMatched = this.formInput.controls[this.properties.mpnMatched].value;
    this.partNo = value.partNo;
    this.mediaCode = value.mediaCode;
    this.maskedMPN = value.maskedMPN;
    this.getSamplingPlanByPartNo(value.partNo);
    this.formInput.patchValue({
      partNo: value.partNo,
      manufacturePartNumber: value.manufacturePartNumber,
      isSafePart: false,
      isEnabled: value.isEnabled,
      iP: Constants.Empty,
      ismpnMatched: (mpnMatched === null || mpnMatched === true) ? yesNoOptions[1].name : yesNoOptions[0].name
    });
    this.formInput.markAsDirty();
    this.copyMessage = '';
  }

  selectMPN(value) {
    this.formInput.patchValue({
      partDescription: value.partDescription,
      mpnMaterialHERS: value.mpnMaterialHers,
      manufacturer: value.manufacturer,
      jabilOwnerContact: value.jabilOwnerContact,
    });
    this.formInput.markAsDirty();
  }

  clearMPN() {
    this.formInput.patchValue({
      partDescription: Constants.Empty,
      mpnMaterialHERS: Constants.Empty,
      manufacturer: Constants.Empty,
      jabilOwnerContact: Constants.Empty,
    });
    this.formInput.markAsDirty();
  }

  setMPNMatched(): any {
    const mpnMatched = this.formInput.controls[this.properties.mpnMatched].value;
    return ((mpnMatched === null || mpnMatched === true) ? yesNoOptions[0].name : yesNoOptions[1].name);
  }

  clearPart() {
    this.formInput.reset();
    this.samplingPlans = [];
    this.testReportTabDetails = [];
    this.resultOrientedTabDetails = [];
    this.copyMessage = '';
    const mpnMatched = this.formInput.controls[this.properties.mpnMatched].value;
    this.partNo = Constants.Empty;
    this.formInput.patchValue({
      partNo: Constants.Empty,
      mpnMatched: (mpnMatched === null || mpnMatched === true) ? yesNoOptions[0].name : yesNoOptions[1].name
    });
    this.initializeTabExpandedSetting();
  }

  getData() {
    // If create mode then return
    if (this.recId === null) {
      // In order to work properly need to add a delay
      setTimeout(() => {
      }, environment.timer.autoReturn);
      return;
    }

    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.apiService.expandPartInspectionSpecifications(),
            this.apiService.expandPartInspectionDrawings(),
            this.apiService.expandPartInspectionCertificationAttachments(),
            this.apiService.expandProductLifeCycleStage(),
            this.apiService.expandAdminCertifications(),
            this.apiService.expandSAPPartInspectionPlanAdminCertifications(),
            this.apiService.expandPartWorkCell(),
            this.apiService.expandCommodity(),
            this.apiService.expandPartInspectionSamplingPlans(),
            this.apiService.expandSupplier(),
            this.apiService.expandSupplierContact(),
            this.apiService.expandComments(),
            this.apiService.expandDateCode()
          ]
      };

    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (data && data.value.length > 0) {
        this.sapPartInspectionPlan = new SAPPartInspectionPlan(data.value[0]);
        this.formDetails = this.entity;
        this.entity = this.sapPartInspectionPlan;
        this.isCAFNoMandatory = this.sapPartInspectionPlan.cafNo.length > 0 ? true : false;
        this.formInput.patchValue({
          partNo: this.sapPartInspectionPlan.partNo,
          partDescription: this.sapPartInspectionPlan.partDescription,
          iP: this.sapPartInspectionPlan.ip,
          siteIP: this.sapPartInspectionPlan.siteIP,
          cafNo: this.sapPartInspectionPlan.cafNo,
          isSafePart: this.sapPartInspectionPlan.isSafePart,
          workCell: this.sapPartInspectionPlan.workCell,
          workCellId: this.sapPartInspectionPlan.workCellId,
          divisionModelNumber: this.sapPartInspectionPlan.divisionModelNumber,
          genWI: this.sapPartInspectionPlan.genWI,
          refDoc: this.sapPartInspectionPlan.refDoc,
          commodity: this.sapPartInspectionPlan.commodity,
          commodityId: this.sapPartInspectionPlan.commodityId,
          manufacturePartNumber: this.sapPartInspectionPlan.manufacturePartNumber,
          manufacturer: this.sapPartInspectionPlan.manufacturer,
          adminCertifications: this.sapPartInspectionPlan.adminCertifications,
          adminCertificationId: this.sapPartInspectionPlan.adminCertificationId,
          productLifeCycleStage: this.sapPartInspectionPlan.productLifeCycleStage,
          productLifeCycleStageId: this.sapPartInspectionPlan.productLifeCycleStageId,
          supplier: this.sapPartInspectionPlan.supplier,
          supplierContact: this.sapPartInspectionPlan.supplierContact,
          jabilOwnerContact: this.sapPartInspectionPlan.jabilOwnerContact,
          isEnabled: this.sapPartInspectionPlan.isEnabled,
          drawingFiles: this.sapPartInspectionPlan.partInspectionDrawingAttachments,
          uploadSpecFiles: this.sapPartInspectionPlan.partInspectionSpecAttachments,
          uploadCertificationFiles: this.sapPartInspectionPlan.partInspectionCertificationAttachments,
          mpnMatched: this.sapPartInspectionPlan.ismpnMatched === true ? yesNoOptions[0].name : yesNoOptions[1].name,
          mpnMaterialHERS: this.sapPartInspectionPlan.mpnMaterialHERS,
          mpnReason: this.sapPartInspectionPlan.mpnReason,
          samplingPlans: this.sapPartInspectionPlan.sapPartInspectionPlanSamplingPlans,
          dataType: this.sapPartInspectionPlan.dataTypeId === dataTypes[0].id ? dataTypes[0].name : dataTypes[1].name,
          specType: this.sapPartInspectionPlan.specTypeId,
          partDateCodeId: this.sapPartInspectionPlan.partDateCodeId,
          ipSerialNumber: this.sapPartInspectionPlan.ipSerialNumber,
          siteIPSerialNumber: this.sapPartInspectionPlan.siteIPSerialNumber,
          dateCodeLimit: this.sapPartInspectionPlan.partDateCode != null ? this.sapPartInspectionPlan.partDateCode.dateCodeLimit : 0
        });

        this.supplierContactEmail = this.sapPartInspectionPlan.supplierContact != null ? this.sapPartInspectionPlan.supplierContact.email : Constants.Empty;
        this.dataTypeId = this.sapPartInspectionPlan.dataTypeId === 0 ? DataType.NONCTQ : this.sapPartInspectionPlan.dataTypeId;
        this.isMPNReasonVisible = !this.sapPartInspectionPlan.ismpnMatched;
        this.yesNoId = this.sapPartInspectionPlan.ismpnMatched ? YesNoOptions.Yes : YesNoOptions.No;
        this.partNo = this.sapPartInspectionPlan.partNo;
        this.stateTypeId = this.sapPartInspectionPlan.stateTypeId;
        this.samplingPlans = this.sapPartInspectionPlan.sapPartInspectionPlanSamplingPlans;
        this.mediaCode = this.sapPartInspectionPlan.mediaCode;
        this.maskedMPN = this.sapPartInspectionPlan.maskedMPN;
        this.referenceSAPPartInspectionPlanId = this.sapPartInspectionPlan.referenceSAPPartInspectionPlanId;

        if (this.sapPartInspectionPlan.partTestReportParameters != null) {
          this.sapPartInspectionPlan.partTestReportParameters.map(record => {
            this.testReportTabDetail = this.apiService.returnTestReportArray(record, this.recId);
            this.testReportTabDetails.push(this.testReportTabDetail);
          });
        }

        this.specTypeId = this.sapPartInspectionPlan.specTypeId;


        this.specificationDetails = [];

        this.specificationDetails = this.apiService.setSpecProperties(this.sapPartInspectionPlan, this.currentUser.id);

        this.drawingDetails = [];

        this.drawingDetails = this.apiService.setDrawingProperties(this.sapPartInspectionPlan, this.currentUser.id);

        this.partCommentDetails = [];
        const timezone = JSON.parse(localStorage.getItem('timezone'));
        this.partCommentDetails = this.apiService.setPartCommentDetails(this.sapPartInspectionPlan, timezone);

        this.getCertificationFiles();

        this.originalFormInput = JSON.stringify(this.formInput.getRawValue());

        this.autoCompletePartValue = this.sapPartInspectionPlan.partNo;

        this.getDefaultCountParameter(this.sapPartInspectionPlan, null);

        this.getDefaultCommodityTestReport(this.sapPartInspectionPlan.commodityId);

        this.getDefaultCommodityResultParameter(this.sapPartInspectionPlan, null);

        this.originalAdminCertificateIds = JSON.parse(
          JSON.stringify(_.map(this.sapPartInspectionPlan.adminCertifications, (x) => x.id))
        );

        this.originalDrawingIds = JSON.parse(
          JSON.stringify(_.map(this.sapPartInspectionPlan.partInspectionDrawings, (x) => x.id))
        );

        this.originalSpecIds = JSON.parse(
          JSON.stringify(_.map(this.sapPartInspectionPlan.partInspectionSpecifications, (x) => x.id))
        );

        if (this.recId && this.sapPartInspectionPlan.commodityId) {

          this.expandCommodityCountParameter(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityTestReport(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityResultParameter(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityDateCode(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityMPositionTolerances(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityLPositionTolerances(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityDimensionalMeasurements(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityFunctionVariables(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityMicroSectionParameters(this.sapPartInspectionPlan.commodityId);

          this.expandCommodityBowTwist(this.sapPartInspectionPlan.commodityId);
        }
      }
    });
    this.formInput.controls[this.properties.comments].enable();
    this.formInput.controls[this.properties.mpnMatched].enable();
  }


  onDateCodeLimitSelect() {
    this.formInput.controls[this.properties.dateCodeLimit].markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  expandSetBowTwist() {
    if (this.recId != null && !this.isBowTwistExpanded) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.expandInfo = this.apiService.setBowTwistPageSortFilterInfo(pageSortFilterInfo);
      this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
        if (data && data.value.length > 0) {
          if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {
            this.sapPartInspectionPlan.partInspectionBowTwistParameters = data.value[0].partInspectionBowTwistParameters;
            this.entity = this.sapPartInspectionPlan;
            this.formInput.patchValue({
              partInspectionBowTwistParameters: data.value[0].partInspectionBowTwistParameters,
            });
            const partInspectionBowTwistParametersSortedArray = _.sortBy(this.sapPartInspectionPlan.partInspectionBowTwistParameters, 'warPageTypeId');
            this.sapPartInspectionPlan.partInspectionBowTwistParameters = partInspectionBowTwistParametersSortedArray;
            if (partInspectionBowTwistParametersSortedArray != null
              && partInspectionBowTwistParametersSortedArray !== undefined) {
              this.bowTwistTitles = this.apiService.initializeBowTwistHeaderInfo(this.specTypeId);
              this.initializeBowTwistControls();
              this.setBowTwistParameterValues(this.sapPartInspectionPlan);
              this.disableSpecificControls();
            } else {
              this.bowTwist.clear();
            }
          }
        }
      });
      this.isBowTwistExpanded = true;
    }
  }

  setBowTwistParameterValues(sAPPartInspectionPlan: SAPPartInspectionPlan) {
    let bowtwistRowIndex = 0;
    const bowtwistFormArray = this.formInput.get('bowTwist') as FormArray;
    if (sAPPartInspectionPlan != null && sAPPartInspectionPlan.partInspectionBowTwistParameters != null) {
      sAPPartInspectionPlan.partInspectionBowTwistParameters.forEach((value) => {
        const currentRow = bowtwistFormArray.at(bowtwistRowIndex);
        currentRow.get(this.properties.spec).patchValue(value.spec);
        currentRow.get(this.properties.length).patchValue(value.length);
        currentRow.get(this.properties.width).patchValue(value.width);
        currentRow.get(this.properties.unit).patchValue(value.unit);
        currentRow.get(this.properties.upperLimit).patchValue(value.upperLimit);
        if (this.bowTwistTitles.length > 0) {
          this.bowTwistTitles[Numbers.Default].rows[bowtwistRowIndex].unitId = Number(value.unit);
        }
        currentRow.get(this.properties.bowTwistFormula).patchValue(value.bowTwistFormula);
        currentRow.get(this.properties.warPageTypeId).patchValue(value.warPageTypeId);
        bowtwistRowIndex++;
      });
    }
  }


  getCertificationFiles() {
    if (this.formInput.controls[this.properties.uploadCertificationFiles].value != null &&
      this.formInput.controls[this.properties.uploadCertificationFiles].value.length > 0) {
      this.uploadCertificationFiles = [];
      const partInspectionCertificationAttachments = this.formInput.controls[this.properties.uploadCertificationFiles].value;
      partInspectionCertificationAttachments.forEach(element => {
        this.uploadCertificationAttachments.push(element.attachment);
        element.attachment.canDelete = true;
        this.uploadCertificationFiles.push(this.attachmentService.getFilesFromUpload(element));
      });
    }
  }




  saveDraftForm() {
    this.GenerateIP();
    this.stateTypeId = PartPlanStateType.Draft;
    this.submittedById = this.currentUser.id;
    this.submittedByDate = new Date();
    super.saveForm();
  }

  saveSubmitForm() {
    const BreakException = {};
    this.GenerateIP();
    const workCell = this.formInput.controls[this.properties.workCell].value;
    const genWI = this.formInput.controls[this.properties.genWI].value;
    const refDoc = this.formInput.controls[this.properties.refDoc].value;
    // const adminCertifications = this.formInput.controls[this.properties.adminCertifications].value;
    const productLifeCycleStage = this.formInput.controls[this.properties.productLifeCycleStage].value;
    const jabilOwnerContact = this.formInput.controls[this.properties.jabilOwnerContact].value;
    const comments = this.formInput.controls[this.properties.comments].value;

    /*const manufactureDate = this.formInput.controls[this.properties.manufactureDate].value;
    const shelfLifeMonths = this.formInput.controls[this.properties.shelfLifeMonths].value;
    const manufactureDCWeeks = this.formInput.controls[this.properties.manufactureDCWeeks].value;
    const manufactureDCYears = this.formInput.controls[this.properties.manufactureDCYears].value;
    const surfaceFinishingDate = this.formInput.controls[this.properties.surfaceFinishingDate].value;
    const dateCodeDetails = this.formInput.controls[this.properties.dateCodeDetails].value;
    const expireDate = this.formInput.controls[this.properties.expireDate].value; */
    const supplier = this.formInput.controls[this.properties.supplier].value;
    const supplierContact = this.formInput.controls[this.properties.supplierContact].value;


    if (this.currentUser.userTypeId === UserType.User) {
      if (!genWI) {
        this.notificationService.showWarning(ToastMessage.GenWIRequired);
        throw BreakException;
      }
      if (!supplier) {
        this.notificationService.showWarning(ToastMessage.SupplierDetailsRequired);
        throw BreakException;
      }
    }

    if (!comments) {
      this.notificationService.showWarning(ToastMessage.CommentsRequired);
      throw BreakException;
    }

    if (!workCell) {
      this.notificationService.showWarning(ToastMessage.WorkCellRequired);
      throw BreakException;
    }
    if (!supplierContact) {
      this.notificationService.showWarning(ToastMessage.SupplierContactRequired);
      throw BreakException;
    }
    // if (!divisionModelNumber) {
    //   this.notificationService.showWarning(ToastMessage.DivisionModelNumberRequired);
    //   throw BreakException;
    // }

    // if (!adminCertifications) {
    //   this.notificationService.showWarning(ToastMessage.AdminCertificationsRequired);
    //   throw BreakException;
    // }
    if (!productLifeCycleStage) {
      this.notificationService.showWarning(ToastMessage.ProductLifeCycleStageRequired);
      throw BreakException;
    }
    if (!jabilOwnerContact) {
      this.notificationService.showWarning(ToastMessage.JabilOwnerContactRequired);
      throw BreakException;
    }

    if (!this.drawingDetails || (this.drawingDetails && !this.drawingDetails.length) || !this.isDrawingFilled()) {
      this.notificationService.showWarning(ToastMessage.DrawingDetailsRequired);
      throw BreakException;
    }

    if (this.currentUser.userTypeId === UserType.Supplier) {
      if (!refDoc) {
        this.notificationService.showWarning(ToastMessage.RefDocRequired);
        throw BreakException;
      }


      this.validateCountParameter(BreakException);

      this.validateTestReport(BreakException);

      this.validateResultParameter(BreakException);

      this.validateDimensionalMeasurements(BreakException);

      this.validateFunctionVariables(BreakException);

      this.validateMicroSectionParameters(BreakException);

      this.validateMPositionTolerances(BreakException);

      this.validateLPositionTolerances(BreakException);

      this.validateBowAndTwist(BreakException);

    }
    this.stateTypeId = this.apiService.getStateByTypeOfUser();
    if (this.currentUser.userTypeId === UserType.User) {
      this.assignedToUserId = this.currentUser.id;
    }
    this.submittedById = this.currentUser.id;
    this.submittedByDate = new Date();
    super.saveForm();
  }

  validateBowAndTwist(BreakException: any) {
    const bowAndTwistTab = this.tabConfig.filter(k => k.id === TabType.BowAndTwist);
    if (bowAndTwistTab && bowAndTwistTab.length > 0 && bowAndTwistTab[0].isVisible === true) {
      this.getbowTwistFormValues();
      if (!this.bowTwistRecords || (this.bowTwistRecords && !this.bowTwistRecords.length) || !this.isBowTwistFilled()) {
        this.notificationService.showWarning(ToastMessage.BowTwistRequired);
        throw BreakException;
      }
    }
  }

  validateLPositionTolerances(BreakException: any) {
    const lPositionToleranceTab = this.tabConfig.filter(k => k.id === TabType.LPositionTolerance);
    if (lPositionToleranceTab && lPositionToleranceTab.length > 0 && lPositionToleranceTab[0].isVisible === true) {
      if (!this.lPositionTolerances || (this.lPositionTolerances && !this.lPositionTolerances.length)) {
        this.notificationService.showWarning(ToastMessage.SpecWithLMCRequired);
        throw BreakException;
      } else if (this.lPositionTolerances.length > 0) {
        let allParametersHasGeometryTolerance = false;

        const result = this.lPositionTolerances.reduce(function (r, a) {
          r[a.parameterManagementId] = r[a.parameterManagementId] || [];
          r[a.parameterManagementId].push(a);
          return r;
        }, Object.create(null));

        Object.values(result).every((val: any) => {
          allParametersHasGeometryTolerance = false;
          val.forEach(x => {
            if (x.dimensionNumber === PartDimensionEnum.GeometryTolerance) {
              allParametersHasGeometryTolerance = true;
            }
          });
          if (!allParametersHasGeometryTolerance) {
            return;
          }
          return true;
        });
        return allParametersHasGeometryTolerance;
      }
    }
  }

  validateMPositionTolerances(BreakException: any) {
    const mPositionToleranceTab = this.tabConfig.filter(k => k.id === TabType.MPositionTolerance);
    if (mPositionToleranceTab && mPositionToleranceTab.length > 0 && mPositionToleranceTab[0].isVisible === true) {
      if (!this.mPositionTolerances || (this.mPositionTolerances && !this.mPositionTolerances.length)) {
        this.notificationService.showWarning(ToastMessage.SpecWithMMCRequired);
        throw BreakException;
      } else if (this.mPositionTolerances.length > 0) {
        let allParametersHasGeometryTolerance = false;
        const result = this.mPositionTolerances.reduce(function (r, a) {
          r[a.parameterManagementId] = r[a.parameterManagementId] || [];
          r[a.parameterManagementId].push(a);
          return r;
        }, Object.create(null));
        Object.values(result).every((val: any) => {
          allParametersHasGeometryTolerance = false;
          val.forEach(x => {
            if (x.dimensionNumber && x.dimensionNumber.trim().toLowerCase() === this.geometryTolerance) {
              allParametersHasGeometryTolerance = true;
            }
          });
          if (!allParametersHasGeometryTolerance) {
            this.notificationService.showWarning(ToastMessage.SpecWithMMCMissingGeometryTolerance);
            return;
          }
          return true;
        });
        return allParametersHasGeometryTolerance;
      }
    }
  }

  validateMicroSectionParameters(BreakException: any) {
    const microSectionTab = this.tabConfig.filter(k => k.id === TabType.MicroSection);
    if (microSectionTab && microSectionTab.length > 0 && microSectionTab[0].isVisible === true) {
      if (!this.microSectionParameters || (this.microSectionParameters && !this.microSectionParameters.length)) {
        this.notificationService.showWarning(ToastMessage.MicroSectionParameterRequired);
        throw BreakException;
      }
    }
  }

  validateFunctionVariables(BreakException: any) {
    const funTab = this.tabConfig.filter(k => k.id === TabType.FUN);
    if (funTab && funTab.length > 0 && funTab[0].isVisible === true) {
      if (!this.funParameters || (this.funParameters && !this.funParameters.length)) {
        this.notificationService.showWarning(ToastMessage.FunctionVariableRequired);
        throw BreakException;
      }
    }
  }

  validateDimensionalMeasurements(BreakException: any) {
    const measurementTab = this.tabConfig.filter(k => k.id === TabType.Measurement);
    if (measurementTab && measurementTab.length > 0 && measurementTab[0].isVisible === true) {
      if (!this.measurementParameters || (this.measurementParameters && !this.measurementParameters.length)) {
        this.notificationService.showWarning(ToastMessage.DimensionalMeasurementsRequired);
        throw BreakException;
      }
    }
  }

  validateResultParameter(BreakException: any) {
    const resultOrientedTab = this.tabConfig.filter(k => k.id === TabType.ResultOriented);
    if (resultOrientedTab && resultOrientedTab.length > 0 && resultOrientedTab[0].isVisible === true) {
      if (!this.resultOrientedTabDetails || (this.resultOrientedTabDetails && !this.resultOrientedTabDetails.length)
        || !this.isFunctionAttributeFilled()) {
        this.notificationService.showWarning(ToastMessage.FunctionAttributeRequired);
        throw BreakException;
      }
    }
  }

  validateTestReport(BreakException: any) {
    if (this.testReportTabDetails && this.testReportTabDetails.length > 0) {
      this.testReportTabDetails.map(row => {
        if ((row.testRequirement === undefined || row.testRequirement === Constants.Empty)) {
          this.notificationService.showWarning(ToastMessage.TestReportRequired);
          throw BreakException;
        }
      });
    }
  }

  validateCountParameter(BreakException: any) {
    if (!this.countParameters || (this.countParameters && !this.countParameters.length) || !this.isCountParameterFilled()) {
      this.notificationService.showWarning(ToastMessage.VisualInspectionRequired);
      throw BreakException;
    }
  }

  isCountParameterFilled(): boolean {
    let isCountParameterFilled = false;
    if (this.countParameters) {
      for (let i = 0; i < this.countParameters.length; i++) {
        if (this.countParameters[i].inspectionToolsTypeId !== Numbers.Default && this.countParameters[i].detailsDefine.trim()) {
          isCountParameterFilled = true;
        } else {
          isCountParameterFilled = false;
          break;
        }
      }
    } else {
      isCountParameterFilled = false;
      return isCountParameterFilled;
    }
    return isCountParameterFilled;
  }


  isBowTwistFilled(): boolean {
    let isBowTwistFilled = false;
    if (this.bowTwistRecords) {

      for (let i = 0; i < this.bowTwistRecords.length; i++) {
        if (this.bowTwistRecords[i].unit && this.bowTwistRecords[i].upperLimit && this.bowTwistRecords[i].bowTwistFormula) {
          isBowTwistFilled = true;
        } else {
          isBowTwistFilled = false;
          break;
        }
      }
    } else {
      isBowTwistFilled = false;
      return isBowTwistFilled;
    }
    return isBowTwistFilled;
  }

  isTestReportFilled(testReportData): boolean {
    let isTestReportFilled = false;
    if (testReportData) {
      for (let i = 0; i < testReportData.length; i++) {
        if (testReportData[i].testRequirement && (testReportData[i].testReportAttachments !== undefined && testReportData[i].testReportAttachments.length > 0) ||
          (testReportData[i].testRequirement && testReportData[i].partTestReportAttachments !== undefined && testReportData[i].partTestReportAttachments.length > 0)) {
          isTestReportFilled = true;
        } else {
          isTestReportFilled = false;
          break;
        }
      }
    } else {
      isTestReportFilled = false;
      return isTestReportFilled;
    }
    return isTestReportFilled;
  }

  /* TODO
  && ((element.drawingAttachments !== undefined && element.drawingAttachments.length > 0) ||
  (element.partInspectionDrawingAttachments !== undefined && element.partInspectionDrawingAttachments.length > 0)) */
  isDrawingFilled(): boolean {
    let isDrawingFilled = false;
    if (this.drawingDetails) {
      this.drawingDetails.forEach(element => {
        if (element.drawingNumber && element.drawingDescription) {
          isDrawingFilled = true;
        } else {
          isDrawingFilled = false;
          return isDrawingFilled;
        }
      });
    } else {
      isDrawingFilled = false;
      return isDrawingFilled;
    }
    return isDrawingFilled;
  }

  isFunctionAttributeFilled(): boolean {
    let isFunctionAttributeFilled = false;
    if (this.resultOrientedTabDetails) {

      for (let i = 0; i < this.resultOrientedTabDetails.length; i++) {
        if (this.resultOrientedTabDetails[i].testRequirement.trim()) {
          isFunctionAttributeFilled = true;
        } else {
          isFunctionAttributeFilled = false;
          break;
        }
      }
    } else {
      isFunctionAttributeFilled = false;
      return isFunctionAttributeFilled;
    }
    return isFunctionAttributeFilled;
  }



  getUpdateModel(): UpdateSAPPartInspectionPlanModel {
    const workCell = this.formInput.controls[this.properties.workCell].value as WorkCell;

    const commodity = this.formInput.controls[this.properties.commodity].value as Commodity;

    const supplier = this.formInput.controls[this.properties.supplier].value as Supplier;

    const supplierContact = this.formInput.controls[this.properties.supplierContact].value as User;

    const productLifeCycleStage = this.formInput.controls[this.properties.productLifeCycleStage].value as ProductLifeCycleStage;

    const updateSAPPartInspectionPlanModel = new UpdateSAPPartInspectionPlanModel();

    Automapper.map(this.entity, updateSAPPartInspectionPlanModel);

    updateSAPPartInspectionPlanModel.workCellId = workCell == null ? null : workCell.id;

    updateSAPPartInspectionPlanModel.commodityId = commodity.id;

    updateSAPPartInspectionPlanModel.supplierId = supplier === null ? null : supplier.id;

    updateSAPPartInspectionPlanModel.supplierContactId = supplierContact === null ? null : supplierContact.id;

    updateSAPPartInspectionPlanModel.productLifeCycleStageId = productLifeCycleStage == null ? null : productLifeCycleStage.id;


    updateSAPPartInspectionPlanModel.isSafePart = this.formInput.controls[this.properties.isSafePart].value == null
      ? false : this.formInput.controls[this.properties.isSafePart].value;

    updateSAPPartInspectionPlanModel.isEnabled = this.formInput.controls[this.properties.isEnabled].value == null
      ? false : this.formInput.controls[this.properties.isEnabled].value;

    updateSAPPartInspectionPlanModel.stateTypeId = this.stateTypeId;

    updateSAPPartInspectionPlanModel.ip = this.formInput.controls[this.properties.iP].value;
    updateSAPPartInspectionPlanModel.siteIP = this.formInput.controls[this.properties.siteIP].value;
    updateSAPPartInspectionPlanModel.cafNo = this.formInput.controls[this.properties.cafNo].value;

    const adminCertificateIds = _.map(
      this.formInput.controls[this.properties.adminCertifications].value,
      this.properties.id
    );

    updateSAPPartInspectionPlanModel.addedAdminCertificateIds = this.getAddedAdminCertificateIds(adminCertificateIds);

    updateSAPPartInspectionPlanModel.removedAdminCertificateIds = this.getRemovedAdminCertificateIds(adminCertificateIds);

    updateSAPPartInspectionPlanModel.sapPartInspectionPlanSamplingPlans = this.samplingPlans;

    updateSAPPartInspectionPlanModel.partMPositionTolerances = this.isMPositionToleranceExpanded ?
      this.removeMPositionExpandModels(this.mPositionTolerances, this.recId) : null;

    updateSAPPartInspectionPlanModel.partLPositionTolerances = this.isLPositionToleranceExpanded ?
      this.removeLPositionExpandModels(this.lPositionTolerances, this.recId) : null;

    updateSAPPartInspectionPlanModel.partMeasurementParameters = this.isMeasurementExpanded ?
      this.removeMeasurementParameterExpandModels(this.measurementParameters, this.recId) : null;

    updateSAPPartInspectionPlanModel.partMicrosectionParameters = this.isMicroSectionExpanded ?
      this.removeMicroSectionParameterExpandModels(this.microSectionParameters, this.recId) : null;

    updateSAPPartInspectionPlanModel.partFunParameters = this.isFUNParameterExpanded ?
      this.removeFunParameterExpandModels(this.funParameters, this.recId) : null;

    updateSAPPartInspectionPlanModel.partCountParameters = this.isCountParameterExpanded ?
      this.removeCountParameterExpandModels(this.countParameters, this.recId) : null;

    this.updatePartResultOrientedParameters(updateSAPPartInspectionPlanModel);

    this.updateTestReportData(updateSAPPartInspectionPlanModel);

    this.updateBowTwistValues(updateSAPPartInspectionPlanModel);

    if (this.currentUser.userTypeId === UserType.User) {
      updateSAPPartInspectionPlanModel.assignToUserId = this.assignedToUserId;
    }

    updateSAPPartInspectionPlanModel.submittedByUserId = this.submittedById;

    updateSAPPartInspectionPlanModel.approveRejectedId = null;

    updateSAPPartInspectionPlanModel.submittedDate = this.submittedByDate;

    this.updateRemovedDrawingAttachmentIds(updateSAPPartInspectionPlanModel);

    this.updateRemovedUploadSpecAttachmentsIds(updateSAPPartInspectionPlanModel);

    this.updateRemovedCertificationAttachmentIds(updateSAPPartInspectionPlanModel);

    const path = this.savePath;

    this.updatePartInspectionCertificationAttachments(updateSAPPartInspectionPlanModel, path);

    updateSAPPartInspectionPlanModel.ismpnMatched = this.formInput.controls[this.properties.mpnMatched].value === yesNoOptions[0].name ? true : false;

    updateSAPPartInspectionPlanModel.mpnMaterialHERS = this.formInput.controls[this.properties.mpnMaterialHERS].value;

    updateSAPPartInspectionPlanModel.mpnReason = this.formInput.controls[this.properties.mpnReason].value;

    updateSAPPartInspectionPlanModel.partInspectionDrawings = this.updatePartInspectionDrawings(this.drawingDetails, this.sapPartInspectionPlan.id);

    updateSAPPartInspectionPlanModel.partInspectionSpecifications = this.updatePartInspectionSpecifications(this.specificationDetails);

    const partComments = this.updatePartComments(updateSAPPartInspectionPlanModel);
    if (partComments.comments) {
      updateSAPPartInspectionPlanModel.partComments.push(partComments);
    }

    this.updateSpecTypeId(updateSAPPartInspectionPlanModel);

    this.updateDataTypeId(updateSAPPartInspectionPlanModel);

    const partDateCode = this.getPartDateCode();

    updateSAPPartInspectionPlanModel.partDateCode = partDateCode;

    updateSAPPartInspectionPlanModel.manufacturePartNumber = this.sapPartInspectionPlan.manufacturePartNumber;
    updateSAPPartInspectionPlanModel.mediaCode = this.mediaCode;
    updateSAPPartInspectionPlanModel.maskedMPN = this.maskedMPN;

    if (this.isRedefine) {
      updateSAPPartInspectionPlanModel.referenceSAPPartInspectionPlanId = this.referenceSAPPartInspectionPlanId ? this.referenceSAPPartInspectionPlanId : this.recId;
      updateSAPPartInspectionPlanModel.isRedefine = this.isRedefine;
    }
    updateSAPPartInspectionPlanModel.isSupplier = this.currentUser.userTypeId === UserType.Supplier;
    return updateSAPPartInspectionPlanModel;
  }

  updateTestReportData(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    if (this.testReportTabDetails !== undefined && this.testReportTabDetails != null && this.testReportTabDetails.length > 0) {
      this.testReportTabDetails.forEach(testReportTab => {
        if (testReportTab.isExpanded === true) {
          this.isTestReportAttachmentUntouched = false;
        }
      });
    }
    if (!this.isTestReportExpanded && this.isTestReportAttachmentUntouched) {
      updateSAPPartInspectionPlanModel.partTestReportParameters = null;
    } else {
      updateSAPPartInspectionPlanModel.partTestReportParameters = this.updateTestReportExpandModels(this.testReportTabDetails, this.recId);
    }
  }

  getAddModel(): AddSAPPartInspectionPlanModel {
    const workCell = this.formInput.controls[this.properties.workCell].value as WorkCell;

    const commodity = this.formInput.controls[this.properties.commodity].value as Commodity;

    const supplier = this.formInput.controls[this.properties.supplier].value as Supplier;

    const supplierContact = this.formInput.controls[this.properties.supplierContact].value as User;

    const adminCertification = this.formInput.controls[this.properties.adminCertifications].value as AdminCertification;

    const productLifeCycleStage = this.formInput.controls[this.properties.productLifeCycleStage].value as ProductLifeCycleStage;

    const addSAPPartInspectionPlanModel = new AddSAPPartInspectionPlanModel();

    Automapper.map(this.entity, addSAPPartInspectionPlanModel);


    const path = this.savePath;

    this.setCertificationAttachment(path, addSAPPartInspectionPlanModel);

    addSAPPartInspectionPlanModel.ismpnMatched = this.formInput.controls[this.properties.mpnMatched].value === yesNoOptions[0].name ? true : false;

    addSAPPartInspectionPlanModel.workCellId = workCell === null ? null : workCell.id;

    addSAPPartInspectionPlanModel.commodityId = commodity.id;

    addSAPPartInspectionPlanModel.supplierId = supplier == null ? null : supplier.id;

    addSAPPartInspectionPlanModel.supplierContactId = supplierContact == null ? null : supplierContact.id;

    addSAPPartInspectionPlanModel.adminCertificationId = adminCertification === null ? null : adminCertification.id;


    addSAPPartInspectionPlanModel.productLifeCycleStageId = productLifeCycleStage === null ? null : productLifeCycleStage.id;

    addSAPPartInspectionPlanModel.isSafePart = this.formInput.controls[this.properties.isSafePart].value == null
      ? false : this.formInput.controls[this.properties.isSafePart].value;

    addSAPPartInspectionPlanModel.isEnabled = this.formInput.controls[this.properties.isEnabled].value == null
      ? false : this.formInput.controls[this.properties.isEnabled].value;

    addSAPPartInspectionPlanModel.stateTypeId = this.stateTypeId;

    addSAPPartInspectionPlanModel.ip = this.formInput.controls[this.properties.iP].value;
    addSAPPartInspectionPlanModel.siteIP = this.formInput.controls[this.properties.siteIP].value;
    addSAPPartInspectionPlanModel.cafNo = this.formInput.controls[this.properties.cafNo].value;
    addSAPPartInspectionPlanModel.mediaCode = this.mediaCode;
    addSAPPartInspectionPlanModel.maskedMPN = this.maskedMPN;

    if (this.currentUser.userTypeId === UserType.User) {
      addSAPPartInspectionPlanModel.assignToUserId = this.assignedToUserId;
    }

    addSAPPartInspectionPlanModel.submittedByUserId = this.submittedById;

    addSAPPartInspectionPlanModel.approveRejectedId = null;

    addSAPPartInspectionPlanModel.submittedDate = this.submittedByDate;

    addSAPPartInspectionPlanModel.approveRejectedDate = new Date();

    addSAPPartInspectionPlanModel.sapPartInspectionPlanSamplingPlans = this.samplingPlans;

    const adminCertificateIds = _.map(
      this.formInput.controls[this.properties.adminCertifications].value,
      this.properties.id
    );

    addSAPPartInspectionPlanModel.partMPositionTolerances = this.removeMPositionExpandModels(this.mPositionTolerances);

    addSAPPartInspectionPlanModel.partLPositionTolerances = this.removeLPositionExpandModels(this.lPositionTolerances);

    addSAPPartInspectionPlanModel.partMeasurementParameters = this.removeMeasurementParameterExpandModels(this.measurementParameters);

    addSAPPartInspectionPlanModel.partMicrosectionParameters = this.removeMicroSectionParameterExpandModels(this.microSectionParameters);

    addSAPPartInspectionPlanModel.partFunParameters = this.removeFunParameterExpandModels(this.funParameters);

    addSAPPartInspectionPlanModel.partResultOrientedParameters = this.removeResultOrientedExpandModels(this.resultOrientedTabDetails);

    addSAPPartInspectionPlanModel.partCountParameters = this.removeCountParameterExpandModels(this.countParameters);

    addSAPPartInspectionPlanModel.partTestReportParameters = this.setTestReportExpandModels(this.testReportTabDetails);

    addSAPPartInspectionPlanModel.mpnMaterialHERS = this.formInput.controls[this.properties.mpnMaterialHERS].value;

    addSAPPartInspectionPlanModel.mpnReason = this.formInput.controls[this.properties.mpnReason].value;

    addSAPPartInspectionPlanModel.addedAdminCertificateIds = this.getAddedAdminCertificateIds(adminCertificateIds);

    addSAPPartInspectionPlanModel.partInspectionDrawings = this.setPartDrawingModel(this.drawingDetails);

    addSAPPartInspectionPlanModel.partInspectionSpecifications = this.setPartSpecModel(this.specificationDetails);

    const manufacturePartNo = this.formInput.controls[this.properties.manufacturePartNumber].value;
    addSAPPartInspectionPlanModel.manufacturePartNumber =
      (manufacturePartNo != null && manufacturePartNo !== undefined) ?
        manufacturePartNo.manufacturerPartNumber : Constants.Empty;

    const partComments = this.setPartComments(addSAPPartInspectionPlanModel);
    if (partComments.comments) {
      addSAPPartInspectionPlanModel.partComments.push(partComments);
    }

    const partDateCode = this.getPartDateCode();
    addSAPPartInspectionPlanModel.partDateCode = partDateCode;

    this.setSpecTypeId(addSAPPartInspectionPlanModel);

    this.setDataType(addSAPPartInspectionPlanModel);

    this.setBowTwistValues(addSAPPartInspectionPlanModel);

    return addSAPPartInspectionPlanModel;
  }



  setPartComments(addSAPPartInspectionPlanModel: AddSAPPartInspectionPlanModel) {
    const partComments = this.specifyPartComments();
    if (addSAPPartInspectionPlanModel.partComments == null) {
      addSAPPartInspectionPlanModel.partComments = [];
    }
    return partComments;
  }

  updatePartComments(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    const partComments = this.specifyPartComments();
    updateSAPPartInspectionPlanModel.partComments = [];
    return partComments;
  }

  specifyPartComments() {
    const partComments = new SAPPartInspectionPlanComments();
    partComments.comments = this.formInput.controls[this.properties.comments].value;
    partComments.submittedByUserId = this.currentUser.id;
    partComments.submittedByUser = null;
    partComments.sAPPartInspectionPlanId = this.sapPartInspectionPlan.id;
    return partComments;
  }

  getPartDateCode() {
    let partDateCode = new PartDateCode();
    if (this.recId == null || (this.recId != null && this.isDateCodeExpanded)) {
      partDateCode.id = (this.sapPartInspectionPlan.partDateCode != null && this.sapPartInspectionPlan.partDateCode.id != null) ? this.sapPartInspectionPlan.partDateCode.id : 0;
      partDateCode.surfaceFinishingDate = this.formInput.controls[this.properties.surfaceFinishingDate].value != null ?
        this.formInput.controls[this.properties.surfaceFinishingDate].value : null;
      partDateCode.manufactureDate = this.formInput.controls[this.properties.manufactureDate].value != null ?
        this.formInput.controls[this.properties.manufactureDate].value : null;
      partDateCode.shelfLifeMonths = this.formInput.controls[this.properties.shelfLifeMonths].value != null ?
        this.formInput.controls[this.properties.shelfLifeMonths].value : 0;
      partDateCode.manufactureDCWeeks = this.formInput.controls[this.properties.manufactureDCWeeks].value != null ?
        this.formInput.controls[this.properties.manufactureDCWeeks].value : 0;
      partDateCode.manufactureDCYears = this.formInput.controls[this.properties.manufactureDCYears].value != null ?
        this.formInput.controls[this.properties.manufactureDCYears].value : 0;
      partDateCode.dateCodeDetails = this.formInput.controls[this.properties.dateCodeDetails].value;
      partDateCode.expireDate = this.formInput.controls[this.properties.expireDate].value != null ?
        this.formInput.controls[this.properties.expireDate].value : null;
      partDateCode.dateCodeLimit = this.formInput.controls[this.properties.dateCodeLimit].value != null ?
        this.formInput.controls[this.properties.dateCodeLimit].value : null;
    } else {
      partDateCode = null;
    }
    return partDateCode;
  }

  setDataType(addSAPPartInspectionPlanModel: AddSAPPartInspectionPlanModel) {
    const dataType = this.formInput.controls[this.properties.dataType].value;
    addSAPPartInspectionPlanModel.dataTypeId = dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;
  }

  setSpecTypeId(addSAPPartInspectionPlanModel: AddSAPPartInspectionPlanModel) {
    addSAPPartInspectionPlanModel.specTypeId = (this.formInput.controls[this.properties.specType].value == null ||
      this.formInput.controls[this.properties.specType].value === Constants.Empty)
      ? 0 : Number(this.formInput.controls[this.properties.specType].value);
  }

  setBowTwistValues(addSAPPartInspectionPlanModel: AddSAPPartInspectionPlanModel) {
    this.getbowTwistFormValues();
    if (this.bowTwistRecords != null && this.bowTwistRecords !== undefined) {
      this.bowTwistRecords.forEach(element => {
        const partInspectionBowTwistParameter = this.setpartInspectionBowTwistParameter(element);
        addSAPPartInspectionPlanModel.partInspectionBowTwistParameters.push(partInspectionBowTwistParameter);
      });
    }
  }

  setCertificationAttachment(path: string, addSAPPartInspectionPlanModel: AddSAPPartInspectionPlanModel) {
    this.uploadCertificationFiles = this.formInput.controls[this.properties.uploadCertificationFiles].value;
    const fArrayUploadCertification: Attachment[] = [];
    if (this.uploadCertificationFiles != null) {
      this.uploadCertificationFiles.forEach(function (value) {
        const file = new Attachment();
        file.name = value.file.name;
        file.savePath = path;
        file.tempSavePath = value.filePath;
        fArrayUploadCertification.push(file);
      });
      addSAPPartInspectionPlanModel.uploadCertificationAttachments = fArrayUploadCertification;
    }
  }


  getbowTwistFormValues() {
    this.bowTwistRecords = this.formInput.controls['bowTwist'];
    this.bowTwistRecords = this.bowTwistRecords.getRawValue();
  }

  setpartInspectionBowTwistParameter(element: any) {
    const partInspectionBowTwistParameter = new PartInspectionBowTwistParameter();
    partInspectionBowTwistParameter.spec = (element.spec === null || element.spec === Constants.Empty) ? Numbers.Default : element.spec;
    partInspectionBowTwistParameter.length = (element.length === null || element.length === Constants.Empty) ? Numbers.Default : element.length;
    partInspectionBowTwistParameter.width = (element.width === null || element.width === Constants.Empty) ? Numbers.Default : element.width;
    partInspectionBowTwistParameter.unit = (element.unit === null || element.unit === Constants.Empty) ? Numbers.Default : element.unit;
    partInspectionBowTwistParameter.upperLimit = (element.upperLimit === null || element.upperLimit === Constants.Empty) ? Numbers.Default : element.upperLimit;
    partInspectionBowTwistParameter.bowTwistFormula = null;
    partInspectionBowTwistParameter.warPage = null;
    partInspectionBowTwistParameter.bowTwistFormulaId = element.bowTwistFormula.id;
    partInspectionBowTwistParameter.warPageId = element.bowTwistFormula.warPageId;
    partInspectionBowTwistParameter.warPageTypeId = element.warPageTypeId;
    return partInspectionBowTwistParameter;
  }

  updateDataTypeId(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    const dataType = this.formInput.controls[this.properties.dataType].value;
    updateSAPPartInspectionPlanModel.dataTypeId = dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;
  }

  updateSpecTypeId(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    updateSAPPartInspectionPlanModel.specTypeId = (this.formInput.controls[this.properties.specType].value == null ||
      this.formInput.controls[this.properties.specType].value === Constants.Empty) ? 0 : Number(this.formInput.controls[this.properties.specType].value);
  }

  updatePartResultOrientedParameters(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    if (this.isResultOrientedExpanded) {
      updateSAPPartInspectionPlanModel.partResultOrientedParameters = this.removeResultOrientedExpandModels(this.resultOrientedTabDetails, this.recId);
    } else {
      updateSAPPartInspectionPlanModel.partResultOrientedParameters = null;
    }
  }

  updateBowTwistValues(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    if (this.isBowTwistExpanded) {
      this.getbowTwistFormValues();
      if (this.bowTwistRecords != null && this.bowTwistRecords !== undefined) {
        const partInspectionBowParameter = this.removePartBowTwistParameterExpandModels(this.bowTwistRecords, this.recId);
        updateSAPPartInspectionPlanModel.partInspectionBowTwistParameters =
          partInspectionBowParameter.filter(k => k !== undefined);
      }
    } else {
      updateSAPPartInspectionPlanModel.partInspectionBowTwistParameters = null;
    }
  }

  updateRemovedDrawingAttachmentIds(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    updateSAPPartInspectionPlanModel.removedDrawingAttachmentIds = [];
    this.drawingAttachments.forEach(a => {
      if (!this.drawingFiles.map(f => Number(f.id)).includes(a.id)) {
        updateSAPPartInspectionPlanModel.removedDrawingAttachmentIds.push(a.id);
      }
    });
  }

  updateRemovedUploadSpecAttachmentsIds(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    updateSAPPartInspectionPlanModel.removedUploadSpecAttachmentsIds = [];
    this.uploadSpecAttachments.forEach(a => {
      if (!this.uploadSpecFiles.map(f => Number(f.id)).includes(a.id)) {
        updateSAPPartInspectionPlanModel.removedUploadSpecAttachmentsIds.push(a.id);
      }
    });
  }


  updateRemovedCertificationAttachmentIds(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel) {
    updateSAPPartInspectionPlanModel.removedCertificationAttachmentIds = [];
    this.uploadCertificationAttachments.forEach(a => {
      if (!this.uploadCertificationFiles.map(f => Number(f.id)).includes(a.id)) {
        updateSAPPartInspectionPlanModel.removedCertificationAttachmentIds.push(a.id);
      }
    });
  }


  updatePartInspectionDrawings(drawingDetails, sapPartInspectionId?: number): PartDrawingModel[] {
    if (drawingDetails != null || drawingDetails !== undefined) {
      drawingDetails.forEach(drawingDetail => {
        if (drawingDetail.partInspectionDrawingAttachments !== undefined && drawingDetail.partInspectionDrawingAttachments !== null) {
          const partDrawingAttachments = drawingDetail.partInspectionDrawingAttachments;
          drawingDetail.partInspectionDrawingAttachments = [];
          partDrawingAttachments.forEach(partDrawingAttachment => {
            if (partDrawingAttachment.attachment.id === Numbers.Default) {
              if (drawingDetail.partInspectionDrawingAttachments === undefined) {
                drawingDetail.partInspectionDrawingAttachments = [];
              }
              drawingDetail.partInspectionDrawingAttachments.push(partDrawingAttachment);
            }
          });
        } else {
          drawingDetail.partInspectionDrawingAttachments = null;
        }
      });
    }
    if (drawingDetails !== undefined && drawingDetails != null) {
      const drawingDetailsObj = drawingDetails.map(element => {
        return {
          id: element.id,
          drawingNumber: element.drawingNumber,
          drawingDescription: element.drawingDescription,
          drawingRevisionNumber: element.drawingRevisionNumber,
          partInspectionDrawingAttachments: element.partInspectionDrawingAttachments,
          drawingAttachments: null,
          sAPPartInspectionPlanId: sapPartInspectionId,
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
          removedDrawingAttachmentIds: element.removedDrawingAttachmentIds,
          submittedByUserId: (element.submittedByUserId != null || element.submittedByUserId !== undefined) ? element.submittedByUserId : this.currentUser.id
        };
      });
      return drawingDetailsObj;
    } else {
      return null;
    }
  }

  updatePartInspectionSpecifications(specificationDetails, sapPartInspectionId?: number) {
    if (specificationDetails != null || specificationDetails !== undefined) {
      specificationDetails.forEach(specificationDetail => {
        if (specificationDetail.partInspectionSpecAttachments !== undefined && specificationDetail.partInspectionSpecAttachments !== null) {
          const partSpecAttachments = specificationDetail.partInspectionSpecAttachments;
          specificationDetail.partInspectionSpecAttachments = [];
          partSpecAttachments.forEach(partSpecAttachment => {
            if (partSpecAttachment.attachment.id === Numbers.Default) {
              if (specificationDetail.partInspectionSpecAttachments === undefined) {
                specificationDetail.partInspectionSpecAttachments = [];
              }
              specificationDetail.partInspectionSpecAttachments.push(partSpecAttachment);
            }
          });
        } else {
          specificationDetail.partInspectionSpecAttachments = null;
        }
      });
    }
    if (specificationDetails !== undefined && specificationDetails != null) {
      const specificationDetailsObj = specificationDetails.map(element => {
        return {
          id: element.id,
          specNumber: element.specNumber,
          specDescription: element.specDescription,
          specRevisionNumber: element.specRevisionNumber,
          partInspectionSpecAttachments: element.partInspectionSpecAttachments,
          specAttachments: null,
          sAPPartInspectionPlanId: sapPartInspectionId,
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
          removedSpecAttachmentIds: element.removedSpecAttachmentIds,
          submittedByUserId: (element.submittedByUserId != null || element.submittedByUserId !== undefined) ? element.submittedByUserId : this.currentUser.id
        };
      });
      return specificationDetailsObj;
    } else {
      return null;
    }
  }

  updatePartInspectionCertificationAttachments(updateSAPPartInspectionPlanModel: UpdateSAPPartInspectionPlanModel, path: string) {
    updateSAPPartInspectionPlanModel.partInspectionCertificationAttachments = [];
    this.uploadCertificationFiles = this.formInput.controls[this.properties.uploadCertificationFiles].value;
    if (this.uploadCertificationFiles != null) {
      this.uploadCertificationFiles.forEach((value) => {
        if (value.id === Constants.Empty) {
          const partInspectionCertificationAttachment = new PartInspectionCertificationAttachment();
          partInspectionCertificationAttachment.sAPPartInspectionPlanId = updateSAPPartInspectionPlanModel.id;
          partInspectionCertificationAttachment.attachment = new Attachment();
          partInspectionCertificationAttachment.attachment.name = value.file.name;
          partInspectionCertificationAttachment.attachment.savePath = path;
          partInspectionCertificationAttachment.attachment.tempSavePath = value.filePath;
          updateSAPPartInspectionPlanModel.partInspectionCertificationAttachments.push(partInspectionCertificationAttachment);
        }
      });
    }
  }

  removePartBowTwistParameterExpandModels(partInspectionBowTwistParameters, sapPartInspectionId?: number): PartInspectionBowTwistParameter[] {
    const specificationType = this.formInput.controls[this.properties.specType].value;
    const partInspectionBowTwistParameterObj = partInspectionBowTwistParameters.map(element => {
      if (element != null && element.bowTwistFormula && element.unit != null && element.unit !== Constants.Empty) {
        return {
          sAPPartInspectionPlanId: sapPartInspectionId,
          spec: (element.spec === null || element.spec === Constants.Empty) ? Numbers.Default : element.spec,
          length: (element.length === null || element.length === Constants.Empty) ? Numbers.Default : element.length,
          width: (element.width === null || element.width === Constants.Empty) ? Numbers.Default : element.width,
          unit: element.unit,
          upperLimit: (element.upperLimit === null || element.upperLimit === Constants.Empty) ? Numbers.Default : element.upperLimit,
          specTypeId: Number(specificationType),
          bowTwistFormula: null,
          warPage: null,
          bowTwistFormulaId: element.bowTwistFormula.id,
          warPageId: element.bowTwistFormula.warPageId,
          warPageTypeId: element.warPageTypeId
        };
      }
    });
    return partInspectionBowTwistParameterObj;
  }


  removeResultOrientedExpandModels(resultOrientedParameters, sapPartInspectionId?: number): ResultOrientedTab[] {
    const resultOrientedParametersObj = resultOrientedParameters.map(element => {
      return {
        parameterManagement: null,
        parameterManagementId: element.parameterManagementId,
        resultId: element.resultExpected === resultExpected[0].name ? resultExpected[0].id : resultExpected[1].id,
        testRequirement: element.testRequirement,
        sAPPartInspectionPlanId: sapPartInspectionId,
        isChecked: element.isChecked,
        isEnabled: element.isEnabled
      };
    });
    return resultOrientedParametersObj;
  }

  removeCountParameterExpandModels(countParameters, sapPartInspectionId?: number): PartCountParameter[] {
    const countParametersObj = countParameters.map(element => {
      return {
        parameterManagementId: element.parameterManagementId ?? null,
        detailsDefine: element.detailsDefine,
        inspectionToolsTypeId: element.inspectionToolsTypeId ?? null,
        sAPPartInspectionPlanId: sapPartInspectionId ?? null,
        isChecked: element.isChecked,
        isEnabled: element.isEnabled,
        dataTypeId: element.dataTypes === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id,
      };
    });
    return countParametersObj;
  }

  setTestReportExpandModels(testReportParameters, sapPartInspectionId?: number): PartTestReportTab[] {
    if (testReportParameters != null || testReportParameters !== undefined) {
      testReportParameters.forEach(testReport => {
        if (testReport.testReportAttachments != null && testReport.testReportAttachments !== undefined) {
          testReport.testReportAttachments.forEach(testReportAttachment => {
            testReportAttachment.id = testReportAttachment.id === Constants.Empty ? 0 : testReportAttachment.id;
          });
        }
      });
    }
    if (testReportParameters !== undefined && testReportParameters != null) {
      const testReportParametersObj = testReportParameters.map(element => {
        return {
          testReport: null,
          testReportId: element.testReportId !== undefined ? element.testReportId : element.id,
          resultId: element.resultExpected === resultExpected[0].name ? resultExpected[0].id : resultExpected[1].id,
          testRequirement: element.testRequirement,
          inspectionDetails: element.inspectionDetails,
          testReportAttachments: element.testReportAttachments,
          partTestReportAttachments: null,
          sAPPartInspectionPlanId: sapPartInspectionId,
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
        };
      });
      return testReportParametersObj;
    } else {
      return null;
    }
  }

  setPartDrawingModel(drawingDetails): PartDrawingModel[] {
    if (drawingDetails != null || drawingDetails !== undefined) {
      drawingDetails.forEach(drawingDetail => {
        drawingDetail.submittedByUserId = this.currentUser.id;
        if (drawingDetail.drawingAttachments != null && drawingDetail.drawingAttachments !== undefined) {
          drawingDetail.drawingAttachments.forEach(drawingAttachment => {
            drawingAttachment.id = drawingAttachment.id === Constants.Empty ? 0 : drawingAttachment.id;
            drawingAttachment.savePath = this.savePath;
            drawingAttachment.tempSavePath = drawingAttachment.filePath;
          });
        }
      });
    }
    if (drawingDetails !== undefined && drawingDetails != null) {
      const drawingDetailsObj = drawingDetails.map(element => {
        return {
          id: element.partDrawingId === undefined ? 0 : element.id,
          drawingNumber: element.drawingNumber,
          drawingDescription: element.drawingDescription,
          drawingRevisionNumber: element.drawingRevisionNumber,
          partInspectionDrawingAttachments: null,
          drawingAttachments: element.drawingAttachments,
          sAPPartInspectionPlanId: this.sapPartInspectionPlan.id,
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
          removedDrawingAttachmentIds: element.removedDrawingAttachmentIds,
          submittedByUserId: this.currentUser.id
        };
      });
      return drawingDetailsObj;
    } else {
      return null;
    }
  }


  setPartSpecModel(specificationDetails): PartSpecModel[] {
    if (specificationDetails != null || specificationDetails !== undefined) {
      specificationDetails.forEach(specificationDetail => {
        specificationDetail.submittedByUserId = this.currentUser.id;
        if (specificationDetail.specAttachments != null && specificationDetail.specAttachments !== undefined) {
          specificationDetail.specAttachments.forEach(specAttachment => {
            specAttachment.id = specAttachment.id === Constants.Empty ? 0 : specAttachment.id;
            specAttachment.savePath = this.savePath;
            specAttachment.tempSavePath = specAttachment.filePath;
          });
        }
      });
    }
    if (specificationDetails !== undefined && specificationDetails != null) {
      const specificationDetailsObj = specificationDetails.map(element => {
        return {
          id: element.partSpecificationId === undefined ? 0 : element.id,
          specNumber: element.specNumber,
          specDescription: element.specDescription,
          specRevisionNumber: element.specRevisionNumber,
          partInspectionSpecAttachments: null,
          specAttachments: element.specAttachments,
          sAPPartInspectionPlanId: this.sapPartInspectionPlan.id,
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
          removedDrawingAttachmentIds: element.removedDrawingAttachmentIds,
          submittedByUserId: this.currentUser.id
        };
      });
      return specificationDetailsObj;
    } else {
      return null;
    }
  }

  updateTestReportExpandModels(testReportParameters, sapPartInspectionId?: number): PartTestReportTab[] {
    if (testReportParameters != null || testReportParameters !== undefined) {
      testReportParameters.forEach(testReport => {
        if (testReport.partTestReportAttachments !== undefined && testReport.partTestReportAttachments !== null) {
          const partTestReportAttachments = testReport.partTestReportAttachments;
          testReport.partTestReportAttachments = [];
          partTestReportAttachments.forEach(testReportAttachment => {
            if (testReportAttachment.attachment.id === Numbers.Default) {
              if (testReport.partTestReportAttachments === undefined) {
                testReport.partTestReportAttachments = [];
              }
              testReport.partTestReportAttachments.push(testReportAttachment);
            }
          });
        } else {
          testReport.partTestReportAttachments = null;
        }
      });
    }
    if (testReportParameters !== undefined && testReportParameters != null) {
      const testReportParametersObj = testReportParameters.map(element => {
        return {
          id: element.testReportId === undefined ? 0 : element.id,
          testReport: null,
          testReportId: element.testReportId !== undefined ? element.testReportId : element.id,
          resultId: element.resultExpected === resultExpected[0].name ? resultExpected[0].id : resultExpected[1].id,
          testRequirement: element.testRequirement,
          inspectionDetails: element.inspectionDetails,
          partTestReportAttachments: element.partTestReportAttachments,
          testReportAttachments: null,
          sAPPartInspectionPlanId: sapPartInspectionId,
          isChecked: element.isChecked,
          isEnabled: element.isEnabled,
          removedTestReportAttachmentIds: element.removedTestReportAttachmentIds
        };
      });
      return testReportParametersObj;
    } else {
      return null;
    }
  }


  isTestReportAttachmentHasValue(paramElement: any) {
    return paramElement != null && paramElement !== undefined && paramElement.partTestReportAttachments != null
      && paramElement.partTestReportAttachments !== undefined;
  }

  removeMPositionExpandModels(mPositionTolerances, sapPartInspectionId?: number): MPositionToleranceModel[] {
    const mPositionToleranceObj = mPositionTolerances.map(element => {
      return {
        uom: null,
        partDimension: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        parameterManagementId: element.parameterManagementId,
        partDimensionId: element.partDimensionId,
        spec: element.spec !== null ? parseFloat(element.spec) : 0,
        specLimitAtMMC: element.specLimitAtMMC,
        specLimitAtLMC: element.specLimitAtLMC,
        sAPPartInspectionPlanId: sapPartInspectionId
      };
    });
    return mPositionToleranceObj;
  }

  removeLPositionExpandModels(lPositionTolerances, sapPartInspectionId?: number): LPositionToleranceModel[] {
    const lPositionToleranceObj = lPositionTolerances.map(element => {
      return {
        uom: null,
        partDimension: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        parameterManagementId: element.parameterManagementId,
        partDimensionId: element.partDimensionId,
        spec: element.spec !== null ? parseFloat(element.spec) : 0,
        specLimitAtMMC: element.specLimitAtMMC,
        specLimitAtLMC: element.specLimitAtLMC,
        sAPPartInspectionPlanId: sapPartInspectionId
      };
    });
    return lPositionToleranceObj;
  }

  removeMeasurementParameterExpandModels(measurementParameters, sapPartInspectionId?: number): MeasurementParameterModel[] {
    const measurementParametersObj = measurementParameters.map(element => {
      return {
        uom: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        parameterManagementId: element.parameterManagementId,
        normalValue: element.normalValue,
        upperTolerance: element.upperTolerance,
        lowerTolerance: element.lowerTolerance,
        accuracy: element.accuracy,
        sAPPartInspectionPlanId: sapPartInspectionId,
        chartType: null,
        chartTypeId: element.dataTypeId === dataTypes[0].id ? element.chartTypeId : null,
        calculationPoint: element.dataTypeId === dataTypes[0].id ? element.calculationPoint : 0
      };
    });
    return measurementParametersObj;
  }

  removeMicroSectionParameterExpandModels(microSectionParameters, sapPartInspectionId?: number): MicroSectionParameterModel[] {
    const microSectionParametersObj = microSectionParameters.map(element => {
      return {
        uom: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        parameterManagementId: element.parameterManagementId,
        normalValue: element.normalValue,
        upperTolerance: element.upperTolerance,
        lowerTolerance: element.lowerTolerance,
        accuracy: element.accuracy,
        sAPPartInspectionPlanId: sapPartInspectionId,
        chartType: null,
        chartTypeId: element.dataTypeId === dataTypes[0].id ? element.chartTypeId : null,
        calculationPoint: element.dataTypeId === dataTypes[0].id ? element.calculationPoint : 0
      };
    });
    return microSectionParametersObj;
  }

  removeFunParameterExpandModels(funParameters, sapPartInspectionId?: number): FunParameterModel[] {
    const funParametersObj = funParameters.map(element => {
      return {
        uom: null,
        instrumentType: null,
        parameterManagement: null,
        dataTypeId: element.dataTypeId,
        uomId: element.uomId,
        instrumentTypeId: element.instrumentTypeId,
        parameterManagementId: element.parameterManagementId,
        normalValue: element.normalValue,
        upperTolerance: element.upperTolerance,
        lowerTolerance: element.lowerTolerance,
        accuracy: element.accuracy,
        sAPPartInspectionPlanId: sapPartInspectionId,
        chartType: null,
        chartTypeId: element.dataTypeId === dataTypes[0].id ? element.chartTypeId : null,
        calculationPoint: element.dataTypeId === dataTypes[0].id ? element.calculationPoint : 0
      };
    });
    return funParametersObj;
  }

  getAddedAdminCertificateIds(AdminCertificateIds: number[]) {
    const added = _.difference(AdminCertificateIds, this.originalAdminCertificateIds);
    return added;
  }

  getRemovedAdminCertificateIds(AdminCertificateIds: number[]) {
    const removed = _.difference(this.originalAdminCertificateIds, AdminCertificateIds);
    return removed;
  }


  getAddedSpecIds(SpecIds: number[]) {
    const added = _.difference(SpecIds, this.originalSpecIds);
    return added;
  }

  getRemovedSpecIds(SpecIds: number[]) {
    const removed = _.difference(this.originalSpecIds, SpecIds);
    return removed;
  }

  getAddedDrawingIds(DrawingIds: number[]) {
    const added = _.difference(DrawingIds, this.originalDrawingIds);
    return added;
  }

  getRemovedDrawingIds(DrawingIds: number[]) {
    const removed = _.difference(this.originalDrawingIds, DrawingIds);
    return removed;
  }


  getAddedPartManufactureIds(PartManufactureIds: number[]) {
    const added = _.difference(PartManufactureIds, this.originalPartManufactureIds);
    return added;
  }

  getRemovedPartManufactureIds(PartManufactureIds: number[]) {
    const removed = _.difference(this.originalPartManufactureIds, PartManufactureIds);
    return removed;
  }

  onCommoditySelect(event) {
    this.formInput.patchValue({
      commodity: event,
      iP: this.GetSiteCode()
    });

    this.setSurfaceFinishingDate();

    this.isCommodityPCBOrPWB = this.isCommodityPCBPWB(event);

    this.setExpirationDate(this.isCommodityPCBOrPWB, event);

    this.expandCommodityCountParameter(event.id);

    this.expandCommodityTestReport(event.id);

    this.expandCommodityResultParameter(event.id);

    this.expandCommodityDateCode(event.id);

    this.expandCommodityMPositionTolerances(event.id);

    this.expandCommodityLPositionTolerances(event.id);

    this.expandCommodityDimensionalMeasurements(event.id);

    this.expandCommodityFunctionVariables(event.id);

    this.expandCommodityMicroSectionParameters(event.id);

    this.expandCommodityBowTwist(event.id);

  }


  getPartCommodity(part: string) {
    const siteCode = this.GetSiteCode();
    this.partService.getCommodityByPart(part, siteCode).subscribe(data => {
      if (data.value.length > 0) {
        this.onCommoditySelect(data.value[0]);
      }
    });
  }

  getSamplingPlanByPartNo(part: string) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.filterInfo = [];
    const filterInfo = new FilterInfo();
    filterInfo.columnName = 'PART_NO';
    filterInfo.columnType = ColumnType.StringWithoutLowerCase;
    filterInfo.mappingField = 'PART_NO';
    filterInfo.value = part;
    filterInfo.operator = SearchOperator.IsEqualTo;
    pageSortFilterInfo.filterInfo.push(filterInfo);

    this.samplingPlanService.getAllData(pageSortFilterInfo).subscribe(data => {
      if (data.value.length > 0) {
        const samplingPlan: any[] = data.value;
        this.samplingPlans = [];
        samplingPlan.forEach(element => {
          let samplingPlanModel = new SAPSamplingPlanModel();
          samplingPlanModel = this.returnSamplingPlanObject(element);
          this.samplingPlans.push(samplingPlanModel);
        });
        this.formInput.patchValue({
          samplingPlans: this.samplingPlans
        });
        this.getPartCommodity(part);
      }
    });
  }

  returnSamplingPlanObject(record): any {
    return {
      mstrChar: record.mstrChar,
      smplProc: record.smplProc,
      site: record.site,
      certificateType: record.certType
    };
  }
  expandCommodityTestReport(commodityId: number) {
    if (this.recId === null) {
      this.getDefaultCommodityTestReport(commodityId);
      this.isTestReportExpanded = true;
    } else if (this.isSavedCommodity(commodityId)) {
      this.isTestReportExpanded = false;
      this.expandTestReportTabDynamic();
    } else {
      this.getDefaultCommodityTestReport(commodityId);
      this.isTestReportExpanded = true;
    }
  }

  expandCommodityResultParameter(commodityId: number) {
    if (this.recId === null) {
      this.getDefaultCommodityResultParameter(null, commodityId);
      this.isResultOrientedExpanded = true;
    } else if (this.isSavedCommodity(commodityId)) {
      this.isResultOrientedExpanded = false;
      this.expandTabDynamic(TabType.ResultOriented);
    } else {
      this.getDefaultCommodityResultParameter(null, commodityId);
      this.isResultOrientedExpanded = true;
    }
  }

  expandCommodityCountParameter(commodityId: number) {
    if (this.recId === null) {
      this.getDefaultCountParameter(null, commodityId);
      this.isCountParameterExpanded = true;
    } else if (this.isSavedCommodity(commodityId)) {
      this.isCountParameterExpanded = false;
      this.expandCountTabDynamic();
    } else {
      this.getDefaultCountParameter(null, commodityId);
      this.isCountParameterExpanded = true;
    }
  }


  expandCommodityDateCode(commodityId: number) {
    if (this.isSavedCommodity(commodityId)) {
      this.isDateCodeExpanded = false;
      this.expandTabDynamic(TabType.DateCode);
    } else if (this.isDifferentCommodity(commodityId)) {
      this.clearDateCodeData();
      this.isDateCodeExpanded = true;
    }
  }

  expandCommodityMPositionTolerances(commodityId: number) {
    if (this.isSavedCommodity(commodityId)) {
      this.isMPositionToleranceExpanded = false;
      this.expandTabDynamic(TabType.MPositionTolerance);
    } else if (this.isDifferentCommodity(commodityId)) {
      this.mPositionTolerances = [];
      this.isMPositionToleranceExpanded = true;
    }
  }

  expandCommodityLPositionTolerances(commodityId: number) {
    if (this.isSavedCommodity(commodityId)) {
      this.isLPositionToleranceExpanded = false;
      this.expandTabDynamic(TabType.LPositionTolerance);
    } else if (this.isDifferentCommodity(commodityId)) {
      this.lPositionTolerances = [];
      this.isLPositionToleranceExpanded = true;
    }
  }


  expandCommodityDimensionalMeasurements(commodityId: number) {
    if (this.isSavedCommodity(commodityId)) {
      this.isMeasurementExpanded = false;
      this.expandTabDynamic(TabType.Measurement);
    } else if (this.isDifferentCommodity(commodityId)) {
      this.measurementParameters = [];
      this.isMeasurementExpanded = true;
    }
  }

  expandCommodityFunctionVariables(commodityId: number) {
    if (this.isSavedCommodity(commodityId)) {
      this.isFUNParameterExpanded = false;
      this.expandTabDynamic(TabType.FUN);
    } else if (this.isDifferentCommodity(commodityId)) {
      this.funParameters = [];
      this.isFUNParameterExpanded = true;
    }
  }

  expandCommodityMicroSectionParameters(commodityId: number) {
    if (this.isSavedCommodity(commodityId)) {
      this.isMicroSectionExpanded = false;
      this.expandTabDynamic(TabType.MicroSection);
    } else if (this.isDifferentCommodity(commodityId)) {
      this.microSectionParameters = [];
      this.isMicroSectionExpanded = true;
    }
  }


  expandCommodityBowTwist(commodityId: number) {
    if (this.recId === null) {
      this.isBowTwistExpanded = true;
    } else if (this.isSavedCommodity(commodityId)) {
      this.isBowTwistExpanded = false;
      this.specTypeId = this.sapPartInspectionPlan.specTypeId;
      this.getBowTwistData();
    } else {
      this.isBowTwistExpanded = true;
      this.bowTwist.clear();
    }
  }

  isDifferentCommodity(commodityId: number) {
    return this.recId !== null && commodityId !== this.sapPartInspectionPlan.commodityId;
  }

  isSavedCommodity(commodityId: number) {
    return this.recId !== null && commodityId === this.sapPartInspectionPlan.commodityId;
  }

  getDefaultCommodityTestReport(commodityId: number) {
    this.testReportTabDetails = [];
    this.testReportService.getDataByCommodityId(commodityId).subscribe(data => {
      this.testReportData = data.value;
      if (this.testReportData !== undefined && this.testReportData.length > 0) {
        this.testReportTabDetails = this.testReportData.filter(x => x.commodityId === commodityId).map(element => {
          return this.returnDataArray(element);
        });
      }
      this.getTestReportRadioButtonTypes();
    });
  }

  getDefaultCommodityResultParameter(sAPPartInspectionPlan, commodityId: number) {
    const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
    this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID, this.apiService.getPcCodes(this.samplingPlans)).subscribe(data => {
      this.resultOrientedtData = data.value;
      this.showHideTab(data.value);
      this.getResultOrientedData(TabType.ResultOriented);
      this.getResultOrientedRadioButtonTypes();
    });
  }


  getResultOrientedData(colId) {
    this.resultOrientedTabDetails = [];
    this.resultOrientedtData.filter(x => x.parameterManagementTypeId === colId).map(element => {
      if (element && element !== null) {
        this.resultOrientedTabDetails.push(this.returnDataArray(element));
      }
    });
  }


  private returnDataArray(element: any): any {
    return {
      id: element.id,
      name: element.name ?? element.parameterManagement.name,
      testRequirement: element.testRequirement ?? '',
      resultExpected: this.getResult(element, this.recId),
      isChecked: element.isChecked,
      isEnabled: element.isEnabled,
      parameterManagementId: this.getParameterManagementId(element),
      resultId: this.recId !== null && element.resultId === resultExpected[0].id ? resultExpected[0].id : resultExpected[1].id,
      sAPPartInspectionPlanId: this.recId ?? 0
    };
  }

  getResult(element, recId: number): any {
    if (recId) {
      if (element.resultId === undefined) {
        return resultExpected[0].name;
      }
      return element.resultId === resultExpected[0].id ? resultExpected[0].name : resultExpected[1].name;
    } else {
      return resultExpected[0].name;
    }
  }





  getParameterManagementId(element): number {
    if (this.recId) {
      if (element.parameterManagementId === undefined) {
        return element.id;
      }
      return element.parameterManagementId;
    } else {
      return element.id;
    }
  }



  editTestReportRecord(record: any): void {

    this.testReportParameterId = this.apiService.getTestReportParameterId(record);

    this.testReportId = record.id;

    const selectedTestReportTabRow = this.apiService.getSelectedTestReportRow(this.testReportTabDetails, this.recId, this.testReportId);

    if (this.apiService.isNewRecord(this.recId)) {

      this.openTestReportPopUp(selectedTestReportTabRow.testReportAttachments);

    } else if (this.recId != null && selectedTestReportTabRow !== undefined && !selectedTestReportTabRow.isExpanded) {

      const pageSortFilterInfo = new PageSortFilterInfo();

      pageSortFilterInfo.expandInfo = this.apiService.setTestReportAttachmentSortFilterInfo(pageSortFilterInfo);

      this.partTestReportParameterService.getTestReportDataById(this.testReportParameterId, pageSortFilterInfo).subscribe(data => {

        if (data && data.value.length > 0) {

          if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {

            this.partTestReportAttachments = data.value[0].partTestReportAttachments;

            selectedTestReportTabRow.partTestReportAttachments = [];

            selectedTestReportTabRow.partTestReportAttachments = this.partTestReportAttachments;
          }
        } else {

          selectedTestReportTabRow.partTestReportAttachments = [];
        }

        selectedTestReportTabRow.originalTestReportAttachmentIds = this.apiService.setOriginalTestReportAttachmentIds(selectedTestReportTabRow);

        selectedTestReportTabRow.isExpanded = true;

        this.openTestReportPopUp(selectedTestReportTabRow);

      });
    } else if (this.apiService.isTestReportOnEditAndExpanded(selectedTestReportTabRow, this.recId)) {

      this.openTestReportPopUp(selectedTestReportTabRow);

    } else {

      this.openTestReportPopUp(selectedTestReportTabRow);

    }

  }


  openTestReportPopUp(partTestReportAttachments: any) {
    const modalRef = this.modalService.open(PartTestReportAttachmentViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = partTestReportAttachments;
    modalRef.result.then(
      (response) => {
        const selectedPartTestReportFiles = response;

        const selectedTestReportTabRow = this.testReportTabDetails.find(k => k.id === this.testReportId);

        if (this.apiService.isNewRecord(this.recId)) {

          if (selectedPartTestReportFiles != null && selectedPartTestReportFiles.testReportAttachments != null) {

            selectedTestReportTabRow.testReportAttachments = [];

            selectedTestReportTabRow.testReportAttachments = selectedPartTestReportFiles.testReportAttachments;
          }
        } else if (this.apiService.isTestReportOnEditAndExpanded(selectedTestReportTabRow, this.recId)) {

          selectedTestReportTabRow.partTestReportAttachments = [];

          selectedPartTestReportFiles.testReportAttachments.forEach(element => {

            selectedTestReportTabRow.partTestReportAttachments = this.apiService.setPartTestReportAttachments(element, selectedTestReportTabRow, this.savePath);
          });

          selectedTestReportTabRow.currentTestReportAttachmentIds = this.apiService.setCurrentTestReportAttachmentIds(selectedTestReportTabRow, selectedPartTestReportFiles);

          selectedTestReportTabRow.removedTestReportAttachmentIds = this.apiService.setRemovedTestReportAttachmentIds(selectedTestReportTabRow);

          selectedTestReportTabRow.partTestReportAttachments = this.apiService.clearRemovedTestReportAttachments(selectedTestReportTabRow);

        }
        this.formInput.markAsDirty();

        this.saveAsDraftButtonValidation();
      },
      () => {
      }
    );
  }


  openDrawingAttachmentPopUp(partInspectionDrawingRow: any) {
    partInspectionDrawingRow.isEnabled = true;
    const modalRef = this.modalService.open(PartDrawingViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = partInspectionDrawingRow;
    modalRef.result.then(
      (response) => {

        const selectedPartDrawingRow = response;

        this.modifyDrawingAttachments(selectedPartDrawingRow);

        this.formInput.markAsDirty();

        this.saveAsDraftButtonValidation();

      },
      () => {
      }
    );
  }


  modifyDrawingAttachments(selectedPartDrawingRow: any) {

    const selectedDrawingRow = this.drawingDetails.find(k => k.drawingNumber === selectedPartDrawingRow.drawingNumber);

    selectedDrawingRow.drawingRevisionNumber = selectedPartDrawingRow.drawingRevisionNumber;

    selectedDrawingRow.drawingDescription = selectedPartDrawingRow.drawingDescription;

    if (this.apiService.isNewRecord(this.recId)) {

      if (selectedPartDrawingRow != null && selectedPartDrawingRow.drawingAttachments != null) {


        selectedDrawingRow.drawingAttachments = selectedPartDrawingRow.drawingAttachments;
      }
    } else if (this.apiService.isEditOrView(this.recId)) {

      selectedDrawingRow.partInspectionDrawingAttachments = [];

      if (selectedPartDrawingRow.drawingAttachments) {
        selectedPartDrawingRow.drawingAttachments.forEach(element => {

          selectedDrawingRow.partInspectionDrawingAttachments = this.apiService.setPartDrawingAttachments(element, selectedPartDrawingRow, this.savePath);
        });
      }



      selectedPartDrawingRow.currentDrawingAttachmentIds = this.apiService.setCurrentDrawingAttachmentIds(selectedDrawingRow, selectedPartDrawingRow);


      selectedPartDrawingRow.removedDrawingAttachmentIds = this.apiService.setRemovedDrawingAttachmentIds(selectedDrawingRow);


      selectedPartDrawingRow.partInspectionDrawingAttachments = this.apiService.clearRemovedDrawingAttachments(selectedDrawingRow);

    }
  }

  openSpecAttachmentPopUp(partInspectionSpecAttachments: any) {
    partInspectionSpecAttachments.isEnabled = true;
    const modalRef = this.modalService.open(PartSpecViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = partInspectionSpecAttachments;
    modalRef.result.then(
      (response) => {
        const selectedPartSpecFiles = response;

        this.modifySpecAttachments(selectedPartSpecFiles);

        this.formInput.markAsDirty();

        this.saveAsDraftButtonValidation();
      },
      () => {
      }
    );
  }

  modifySpecAttachments(selectedPartSpecRow: any) {
    const selectedSpecRow = this.specificationDetails.find(k => k.specNumber === selectedPartSpecRow.specNumber);

    selectedSpecRow.specRevisionNumber = selectedPartSpecRow.specRevisionNumber;

    selectedSpecRow.specDescription = selectedPartSpecRow.specDescription;

    if (this.apiService.isNewRecord(this.recId)) {

      if (selectedPartSpecRow != null && selectedPartSpecRow.specAttachments != null) {


        selectedSpecRow.specAttachments = selectedPartSpecRow.specAttachments;
      }
    } else if (this.apiService.isEditOrView(this.recId)) {

      selectedSpecRow.partInspectionSpecAttachments = [];

      selectedPartSpecRow.specAttachments.forEach(element => {

        selectedSpecRow.partInspectionSpecAttachments = this.apiService.setPartSpecificationAttachments(element, selectedSpecRow, this.savePath);
      });

      selectedSpecRow.currentSpecAttachmentIds = this.apiService.setCurrentSpecAttachmentIds(selectedSpecRow, selectedPartSpecRow);

      selectedSpecRow.removedSpecAttachmentIds = this.apiService.setRemovedSpecAttachmentIds(selectedSpecRow);

      selectedSpecRow.partInspectionSpecAttachments = this.apiService.clearRemovedSpecAttachments(selectedSpecRow);

    }
  }

  editDrawingRecord(record: any): void {

    this.partInspectionDrawingId = record.id;

    const selectedDrawingRow = this.apiService.getSelectedDrawingRow(this.drawingDetails, this.recId, record);

    this.getDrawingDetails(selectedDrawingRow);
  }



  getDrawingDetails(selectedDrawingRow: PartDrawingModel) {
    if (selectedDrawingRow !== undefined && (this.apiService.isNewRecord(this.recId))) {

      this.openDrawingAttachmentPopUp(selectedDrawingRow);

    } else if (selectedDrawingRow !== undefined && this.apiService.isDrawingOnEditAndNotExpanded(selectedDrawingRow, this.recId)) {

      const pageSortFilterInfo = new PageSortFilterInfo();

      pageSortFilterInfo.expandInfo = this.apiService.setDrawingAttachmentSortFilterInfo(pageSortFilterInfo);

      this.partInspectionDrawingService.getDrawingDataById(this.partInspectionDrawingId, pageSortFilterInfo).subscribe(data => {

        if (data && data.value.length > 0) {

          if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {

            selectedDrawingRow.partInspectionDrawingAttachments = [];

            selectedDrawingRow.partInspectionDrawingAttachments = data.value[0].partInspectionDrawingAttachments;
          }
        } else {

          selectedDrawingRow.partInspectionDrawingAttachments = [];
        }

        selectedDrawingRow.isExpanded = true;

        selectedDrawingRow.originalDrawingAttachmentIds = this.apiService.setOriginalDrawingAttachmentIds(selectedDrawingRow);

        this.openDrawingAttachmentPopUp(selectedDrawingRow);

      });
    } else if (selectedDrawingRow !== undefined && this.apiService.isDrawingOnEditAndExpanded(selectedDrawingRow, this.recId)) {

      this.openDrawingAttachmentPopUp(selectedDrawingRow);

    } else {

      this.openDrawingAttachmentPopUp(selectedDrawingRow);

    }
  }


  editSpecRecord(record: any): void {

    this.partInspectionSpecificationId = record.id;

    const selectedSpecRow = this.apiService.getSelectedSpecRow(this.specificationDetails, this.recId, record);

    this.getSpecAttachments(selectedSpecRow);
  }


  getSpecAttachments(selectedSpecRow: PartSpecModel) {
    if (selectedSpecRow !== undefined && (this.apiService.isNewRecord(this.recId))) {

      this.openSpecAttachmentPopUp(selectedSpecRow);

    } else if (selectedSpecRow !== undefined && this.apiService.isSpecOnEditAndNotExpanded(selectedSpecRow, this.recId)) {

      const pageSortFilterInfo = new PageSortFilterInfo();

      pageSortFilterInfo.expandInfo = this.apiService.setSpecAttachmentSortFilterInfo(pageSortFilterInfo);

      this.partInspectionSpecificationService.getSpecDataById(this.partInspectionSpecificationId, pageSortFilterInfo).subscribe(data => {

        selectedSpecRow.isExpanded = true;

        if (data && data.value.length > 0) {

          if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && data != null && data.value[0] != null) {

            selectedSpecRow.partInspectionSpecAttachments = [];

            selectedSpecRow.partInspectionSpecAttachments = data.value[0].partInspectionSpecAttachments;
          }
        } else {

          selectedSpecRow.partInspectionSpecAttachments = [];
        }

        selectedSpecRow.originalSpecAttachmentIds = this.apiService.setOriginalSpecAttachmentIds(selectedSpecRow);

        this.openSpecAttachmentPopUp(selectedSpecRow);

      });
    } else if (selectedSpecRow !== undefined && this.apiService.isSpecOnEditAndExpanded(selectedSpecRow, this.recId)) {

      this.openSpecAttachmentPopUp(selectedSpecRow);

    } else {

      this.openSpecAttachmentPopUp(selectedSpecRow);

    }
  }

  getTestReportRadioButtonTypes() {
    this.resultExpectedTestReport['resultExpected'] = [];
    resultExpected.forEach(e => {
      this.resultExpectedTestReport['resultExpected'][e.id] = {
        id: e.id,
        name: e.name,
        isChecked: e.isChecked,
        section: tabType.get(TabType.TestReport)
      };
    });
  }

  getResultOrientedRadioButtonTypes() {
    this.resultExpectedResultParameter['resultExpected'] = [];
    resultExpected.forEach(e => {
      this.resultExpectedResultParameter['resultExpected'][e.id] = {
        id: e.id,
        name: e.name,
        isChecked: e.isChecked,
        section: tabType.get(TabType.ResultOriented)
      };
    });
  }

  getDefaultCountParameter(sAPPartInspectionPlan, commodityId) {
    const commodityID = sAPPartInspectionPlan != null ? sAPPartInspectionPlan.commodityId : commodityId;
    this._parameterManagementService.getParameterManagementDataByCommodityId(commodityID, this.apiService.getPcCodes(this.samplingPlans))
      .subscribe(data => {
        this.countParameterData = data.value;
        this.showHideTab(data.value);
        this.mapCountParameter(tabType.get(TabType.Count), TabType.Count);
        this.getDataTypeRadioButtonTypes();
      });
  }

  titleCaseWord(word: string, isUpper: boolean) {
    if (!isUpper) {
      return word[0].toUpperCase() + word.substr(1);
    } else {
      return word[0].toLowerCase() + word.substr(1);
    }
  }


  expandTestReportTabDynamic() {
    const commodity = this.formInput.controls[this.properties.commodity].value;
    if (!this.isTestReportExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.expandInfo = this.apiService.setTestReportPageSortFilterInfo(pageSortFilterInfo);
      this.getExpandedPartTestReportParameters(pageSortFilterInfo);
    }
  }

  expandCountTabDynamic() {
    const commodity = this.formInput.controls[this.properties.commodity].value;
    if (!this.isCountParameterExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      pageSortFilterInfo.expandInfo = this.apiService.setCountParameterPageSortFilterInfo(pageSortFilterInfo);
      this.getExpandedCountParameters(pageSortFilterInfo);
    }
  }
  expandTabDynamic(tabId: number) {
    const pageSortFilterInfo = new PageSortFilterInfo();
    const commodity = this.formInput.controls[this.properties.commodity].value;
    switch (tabId) {
      case TabType.MPositionTolerance:
        if (!this.isMPositionToleranceExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
          pageSortFilterInfo.expandInfo = this.apiService.setMPositionPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo);
        }
        break;
      case TabType.LPositionTolerance:
        if (!this.isLPositionToleranceExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
          pageSortFilterInfo.expandInfo = this.apiService.setLPositionPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo);
        }
        break;
      case TabType.Measurement:
        if (!this.isMeasurementExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
          pageSortFilterInfo.expandInfo = this.apiService.setMeasurementParametersPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartMeasurementParameters(pageSortFilterInfo);
        }
        break;
      case TabType.MicroSection:
        if (!this.isMicroSectionExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
          pageSortFilterInfo.expandInfo = this.apiService.setMicroSectionPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartMicroSectionParameters(pageSortFilterInfo);
        }
        break;
      case TabType.FUN:
        if (!this.isFUNParameterExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
          pageSortFilterInfo.expandInfo = this.apiService.setFUNPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartFunParameters(pageSortFilterInfo);
        }
        break;
      case TabType.ResultOriented:
        if (!this.isResultOrientedExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)) {
          pageSortFilterInfo.expandInfo = this.apiService.setResultOrientedPageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartResultOrientedParameters(pageSortFilterInfo);
        }
        break;
      case TabType.DateCode:
        if (!this.isDateCodeExpanded && this.apiService.isEditWithSuppliedCommodity(this.recId, commodity)
          && commodity.id === this.sapPartInspectionPlan.commodityId
        ) {
          pageSortFilterInfo.expandInfo = this.apiService.setDateCodePageSortFilterInfo(pageSortFilterInfo);
          this.getExpandedPartDateCode(pageSortFilterInfo);
        }
        this.disabledFutureDate();
        break;
      default:
        break;
    }
  }



  getExpandedPartInspectionMPositionTolerances(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partMPositionTolerances = data.value[0].partMPositionTolerances;
        this.entity = this.sapPartInspectionPlan;
        this.mPositionTolerances = this.apiService.getMPositionToleranceParameters(this.sapPartInspectionPlan);
        this.isMPositionToleranceExpanded = true;
      } else {
        this.mPositionTolerances = [];
      }
    });
  }

  getExpandedPartInspectionLPositionTolerances(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partLPositionTolerances = data.value[0].partLPositionTolerances;
        this.entity = this.sapPartInspectionPlan;
        this.lPositionTolerances = this.apiService.getLPositionToleranceParameters(this.sapPartInspectionPlan);
        this.isLPositionToleranceExpanded = true;
      } else {
        this.lPositionTolerances = [];
      }
    });
  }

  getExpandedPartMeasurementParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partMeasurementParameters = data.value[0].partMeasurementParameters;
        this.entity = this.sapPartInspectionPlan;
        this.measurementParameters = this.apiService.mapMeasurementParameterModel(this.sapPartInspectionPlan.partMeasurementParameters);
        this.isMeasurementExpanded = true;
      } else {
        this.measurementParameters = [];
      }
    });
  }

  getExpandedPartMicroSectionParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partMicrosectionParameters = data.value[0].partMicrosectionParameters;
        this.entity = this.sapPartInspectionPlan;
        this.microSectionParameters = this.apiService.getMicroSectionParameters(this.sapPartInspectionPlan);
        this.isMicroSectionExpanded = true;
      } else {
        this.microSectionParameters = [];
      }
    });
  }

  getExpandedPartFunParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partFunParameters = data.value[0].partFunParameters;
        this.entity = this.sapPartInspectionPlan;
        this.funParameters = this.apiService.mapFunParameterModel(this.sapPartInspectionPlan.partFunParameters);
        this.isFUNParameterExpanded = true;
      } else {
        this.funParameters = [];
      }
    });
  }



  getExpandedPartResultOrientedParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partResultOrientedParameters = data.value[0].partResultOrientedParameters;
        this.entity = this.sapPartInspectionPlan;
        if (this.sapPartInspectionPlan.partResultOrientedParameters !== null && this.sapPartInspectionPlan.partResultOrientedParameters !== undefined &&
          this.sapPartInspectionPlan.partResultOrientedParameters.length > 0) {
          this.resultOrientedTabDetails = [];
          this.sapPartInspectionPlan.partResultOrientedParameters.map(record => {
            this.resultOrientedTabDetail = this.returnDataArray(record);
            this.resultOrientedTabDetails.push(this.resultOrientedTabDetail);
          });
        } else {
          this.getDefaultCommodityResultParameter(this.sapPartInspectionPlan, this.sapPartInspectionPlan.commodityId);
        }
        this.isResultOrientedExpanded = true;
      }
    });
  }

  getExpandedPartTestReportParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partTestReportParameters = data.value[0].partTestReportParameters;
        this.entity = this.sapPartInspectionPlan;
        if (this.apiService.isPartTestReportParameterHasValue(this.sapPartInspectionPlan.partTestReportParameters)) {
          this.testReportTabDetails = [];
          this.testReportTabDetails = this.apiService.mapTestReportModel(this.sapPartInspectionPlan.partTestReportParameters, this.recId);
          if (this.testReportTabDetails.length > 0) {
            for (let counter = 0; counter < this.testReportTabDetails.length; counter ++) {
              const infoForAttachments = new PageSortFilterInfo();
              infoForAttachments.expandInfo = this.apiService.setTestReportAttachmentSortFilterInfo(infoForAttachments);
              const testReportParameterId = this.apiService.getTestReportParameterId(this.testReportTabDetails[counter]);
              this.partTestReportParameterService.getTestReportDataById(testReportParameterId, infoForAttachments).subscribe(attachmentData => {
                  if (attachmentData && attachmentData.value.length > 0) {
                      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && attachmentData != null && attachmentData.value[0] != null) {
                        this.testReportTabDetails[counter].partTestReportAttachments = [];
                        this.testReportTabDetails[counter].partTestReportAttachments = attachmentData.value[0].partTestReportAttachments;
                  }
                } else {
                  this.testReportTabDetails[counter].partTestReportAttachments = [];
                }
              });
            }
          }
        } else {
          this.getDefaultCommodityTestReport(this.sapPartInspectionPlan.commodityId);
        }
        this.isTestReportExpanded = true;
      }
    });
  }


  getExpandedPartDateCode(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partDateCode = data.value[0].partDateCode;
        this.entity = this.sapPartInspectionPlan;
        if (this.sapPartInspectionPlan.partDateCode !== null && this.sapPartInspectionPlan.partDateCode !== undefined) {
          this.formInput.patchValue({
            manufactureDate: this.sapPartInspectionPlan.partDateCode.manufactureDate != null ?
              new Date(this.sapPartInspectionPlan.partDateCode.manufactureDate) : Constants.Empty,
            shelfLifeMonths: this.sapPartInspectionPlan.partDateCode.shelfLifeMonths,
            manufactureDCWeeks: this.sapPartInspectionPlan.partDateCode.manufactureDCWeeks,
            dateCodeLimit: this.sapPartInspectionPlan.partDateCode.dateCodeLimit,
            manufactureDCYears: this.sapPartInspectionPlan.partDateCode.manufactureDCYears,
            surfaceFinishingDate: this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate != null ?
              new Date(this.sapPartInspectionPlan.partDateCode.surfaceFinishingDate) : null,
            dateCodeDetails: this.sapPartInspectionPlan.partDateCode.dateCodeDetails,
            expireDate: this.sapPartInspectionPlan.partDateCode.expireDate != null ?
              new Date(this.sapPartInspectionPlan.partDateCode.expireDate) : null,
          });
        }
      }
      this.isDateCodeExpanded = true;
    });
  }
  getExpandedCountParameters(pageSortFilterInfo: PageSortFilterInfo) {
    this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
      if (this.apiService.isSAPPartInspectionHasValue(this.sapPartInspectionPlan) && this.apiService.isReturnedDataHasValue(data)) {
        this.sapPartInspectionPlan.partCountParameters = data.value[0].partCountParameters;
        this.entity = this.sapPartInspectionPlan;
        if (this.sapPartInspectionPlan.partCountParameters !== null && this.sapPartInspectionPlan.partCountParameters !== undefined &&
          this.sapPartInspectionPlan.partCountParameters.length > 0) {
          this.countParameters = [];
          this.sapPartInspectionPlan.partCountParameters.map(record => {
            this.countParameter = this.apiService.returnCountParameterArray(record, this.recId);
            this.countParameters.push(this.countParameter);
          });
        } else {
          this.getDefaultCountParameter(this.sapPartInspectionPlan, this.sapPartInspectionPlan.commodityId);
        }
        this.isCountParameterExpanded = true;
      }
    });
  }

  labelTransform(name) {
    const label = `${'Label'}${'.'}${this.titleCaseWord(name, false)}`;
    return label;
  }

  showHideTab(data) {
    tabConfiguration.filter(x => x.isVisible === true).map(k => {
      if (k.isVisible === true) {
        k.isVisible = false;
      }
    });
    if (data && data !== null) {
      const uniqueTabs = [...new Set(data.map(item => item.parameterManagementTypeId))];

      tabConfiguration.map(t => {
        uniqueTabs.map(d => {
          if (t.id === d) {
            t.isVisible = true;
          }
        });
      });
    }
    this.tabConfig = tabConfiguration.filter(x => x.isVisible === true);
  }

  mapCountParameter(type: string, parameterTypeId) {
    if (type === tabType.get(TabType.Count)) {
      this.countParameters = this.countParameterData.filter(x => x.parameterManagementTypeId === parameterTypeId).map(element => {
        return {
          id: element.id, name: element.name, toolsType: '', detailsDefine: '', isChecked: element.isChecked,
          isEnabled: element.isEnabled, inspectionToolsTypeId: null, parameterManagementId: element.id, dataTypes: dataTypes[1].name
        };
      });
      this.getAllInspectionToolsType();
    }
  }

  get bowTwist() {
    return this.formInput.get('bowTwist') as FormArray;
  }

  onSpecTypeChanged(event) {
    this.formInput.patchValue({
      specType: event.target.value
    });
    this.formInput.controls[this.properties.specType].markAsDirty();
    this.initializeBowTwistControls();
    this.bowTwistTitles = [];
    this.specTypeId = event.target.value;
    this.bowTwistTitles = this.apiService.initializeBowTwistHeaderInfo(this.specTypeId);
    this.disableSpecificControls();

  }

  disableSpecificControls() {
    const arrayControl = this.formInput.get('bowTwist') as FormArray;
    if (arrayControl != null) {
      const warPageL = arrayControl.at(Numbers.Default);
      warPageL.get(this.properties.width).disable();
      if (this.bowTwistTitles[Numbers.Default] !== undefined) {
        warPageL.get(this.properties.warPageTypeId).patchValue(this.bowTwistTitles[Numbers.Default].rows[Numbers.Default].id);
      }
      const warPageW = arrayControl.at(Numbers.One);
      warPageW.get(this.properties.length).disable();
      if (this.bowTwistTitles[Numbers.Default] !== undefined) {
        warPageW.get(this.properties.warPageTypeId).patchValue(this.bowTwistTitles[Numbers.Default].rows[Numbers.One].id);
      }
      const warPageS = arrayControl.at(Numbers.Two);
      if (this.bowTwistTitles[Numbers.Default] !== undefined) {
        warPageS.get(this.properties.warPageTypeId).patchValue(this.bowTwistTitles[Numbers.Default].rows[Numbers.Two].id);
      }
    }
  }


  initializeBowTwistControls() {
    this.bowTwistFormFields = bowTwistFixedRows;
    this.bowTwist.controls.splice(0, this.bowTwistFormFields);
    Array(this.bowTwistFormFields)
      .fill(1)
      .forEach(() => {
        this.bowTwist.push(
          this.formBuilder.group({
            spec: new FormControl(Constants.Empty),
            length: new FormControl(Constants.Empty),
            width: new FormControl(Constants.Empty),
            unit: new FormControl(Constants.Empty),
            upperLimit: new FormControl({ value: Constants.Empty, disabled: true }),
            bowTwistFormula: new FormControl(Constants.Empty),
            warPageTypeId: new FormControl(Constants.Empty),
          })
        );
      });
    this.bowTwistFormFields = null;
  }

  onSpecChanged(event, bowIndex) {
    this.setUpperLimit(event, bowIndex);
  }

  onBowDataTypeChanged(event) {
    this.formInput.controls[this.properties.dataType].markAsDirty();
    this.formInput.patchValue({ dataType: event.target.value });
  }

  onMPNMatchChanged() {
    const mpnReason = this.formInput.controls[this.properties.mpnReason];
    this.isMPNReasonVisible = this.formInput.controls[this.properties.mpnMatched].value === yesNoOptions[1].name ? true : false;
    if (this.isMPNReasonVisible) {
      this.formInput.controls[this.properties.mpnReason].enable();
      mpnReason.setValidators(Validators.required);
      mpnReason.updateValueAndValidity();
    } else {
      mpnReason.setErrors(null);
      mpnReason.clearValidators();
      mpnReason.updateValueAndValidity();
    }
  }

  patchValueOnInput(bowIndex: any, control: any, value: any) {
    const arrayControl = this.formInput.get('bowTwist') as FormArray;
    const item = arrayControl.at(bowIndex);
    item.get(control).patchValue(value);
    item.get(control).markAsDirty();
  }

  onLengthChanged(event, bowIndex) {
    this.setUpperLimit(event, bowIndex);
  }

  onWidthChanged(event, bowIndex) {
    this.setUpperLimit(event, bowIndex);
  }

  onBowTwistNameSelect(event, bowIndex) {
    this.setUpperLimit(event, bowIndex);
  }

  onUnitChanged(event, bowIndex) {

    this.patchValueOnInput(bowIndex, this.properties.unit, event.target.value);
    this.unitTypeId = event.target.value;
    this.setUpperLimit(event, bowIndex);
  }

  setUpperLimit(event: any, bowIndex: any) {
    if (event.id !== undefined) {
      this.bowTwistFormulaService.getBowTwistDataById(event.id).subscribe(data => {
        const bowTwistFormula = new BowTwistFormula(data);
        this.bowTwistFormulaName = bowTwistFormula.equation;
        this.calculateUpperLimit(bowIndex);
      });
    } else {
      this.calculateUpperLimit(bowIndex);
    }
  }

  calculateUpperLimit(bowIndex: number) {
    const arrayControl = this.formInput.get('bowTwist') as FormArray;
    const item = arrayControl.at(bowIndex);
    const formulaEquation = item.get(this.properties.bowTwistFormula).value != null ? item.get(this.properties.bowTwistFormula).value.equation : undefined;
    const unitType = item.get(this.properties.unit).value;
    if (formulaEquation !== undefined && formulaEquation !== Constants.Empty
      && unitType !== undefined && unitType !== Constants.Empty) {
      this.bowTwistFormulaExpression = formulaEquation;
      const length = item.get(this.properties.length).value === Constants.Empty ? 0 : item.get(this.properties.length).value;
      const spec = item.get(this.properties.spec).value === Constants.Empty ? 0 : (item.get(this.properties.spec).value / 100);
      const width = item.get(this.properties.width).value === Constants.Empty ? 0 : item.get(this.properties.width).value;
      this.bowTwistFormulaExpression = this.bowTwistFormulaService.replaceExpression(spec, length, width, this.bowTwistFormulaExpression);
      // tslint:disable-next-line:no-eval
      this.bowTwistFormulaValue = Number(eval(this.bowTwistFormulaExpression));
      if (Number(unitType) === Unit.mm) {
        if (this.bowTwistFormulaValue > mmUpperLimit) {
          this.bowTwistFormulaValue = mmUpperLimit;
        }
      } else if (Number(unitType) === Unit.inch) {
        if (this.bowTwistFormulaValue > inchUpperLimit) {
          this.bowTwistFormulaValue = inchUpperLimit;
        }
      }
      item.get(this.properties.upperLimit).patchValue(parseFloat(this.bowTwistFormulaValue.toString()).toFixed(this.maxFractionDigits));
    } else {
      item.get(this.properties.upperLimit).patchValue(Numbers.Default);
    }
  }

  onBowTwistNameClear(event, bowIndex) {
    this.patchValueOnInput(bowIndex, this.properties.upperLimit, Constants.Empty);
  }


  getAllInspectionToolsType() {
    this._toolsTypeService.getAllData()
      .subscribe(data => {
        this.dynamicTypeCollection['toolsType'] = [];
        data.value.map(e => {
          this.dynamicTypeCollection['toolsType'][e.id] = e.type;
        });
      });
  }

  private setSurfaceFinishingDate() {
    const manufactureDate = this.formInput.controls[this.properties.manufactureDate].value;
    this.formInput.patchValue({ surfaceFinishingDate: manufactureDate });
  }

  isCommodityPCBPWB(commodity) {
    if (commodity != null && commodity.name != null) { return (commodity.name === CommodityEnum.PCB || commodity.name === CommodityEnum.PWB); } else {
      return false;
    }
  }

  unselectCommodity(event) {
    this.clearDateCodeData();
    this.countParameters = [];
    this.testReportTabDetails = [];
    this.resultOrientedTabDetails = [];
    this.funParameters = [];
    this.measurementParameters = [];
    this.microSectionParameters = [];
    this.lPositionTolerances = [];
    this.mPositionTolerances = [];
    this.bowTwist.clear();
    this.bowTwistTitles = [];
    this.specTypeId = SpecType.Select;
    this.initializeTabExpandedSetting();
  }

  clearDateCodeData() {
    this.formInput.patchValue({
      expireDate: Constants.Empty,
      manufactureDate: Constants.Empty,
      surfaceFinishingDate: Constants.Empty,
      shelfLifeMonths: Numbers.Default,
      manufactureDCWeeks: Numbers.Default,
      manufactureDCYears: Numbers.Default,
      dateCodeDetails: Constants.Empty
    });
  }

  onSurfaceFinishingDateSelect(event) {
    if (event != null) {
      this.setCommodityFlagAndExpiration(event);
    } else {
      this.setCommodityFlag();
      if (this.isCommodityPCBOrPWB) {
        this.formInput.patchValue({
          expireDate: ''
        });
      }
    }

  }

  onShelfLifeSelect(event) {
    this.setCommodityFlagAndExpiration(event);
  }

  onManufactureDateSelect(event) {
    if (event != null) {
      this.setSurfaceFinishingDate();
      this.setCommodityFlagAndExpiration(event);
    } else {
      this.setCommodityFlag();
      if (!this.isCommodityPCBOrPWB) {
        this.formInput.patchValue({
          expireDate: ''
        });
      }
    }
  }

  private setCommodityFlagAndExpiration(event) {
    this.setCommodityFlag();
    this.setExpirationDate(this.isCommodityPCBOrPWB, event);
  }

  private setCommodityFlag() {
    const commodity = this.formInput.controls[this.properties.commodity].value;
    this.isCommodityPCBOrPWB = this.isCommodityPCBPWB(commodity);
  }

  setExpirationDate(isCommodityPCBOrPWB, event) {
    this.isSurfaceFinishingDateEnabled = this.isCommodityPCBOrPWB;
    const shelfLifeMonths = this.formInput.controls[this.properties.shelfLifeMonths].value;
    const surfaceFinishingDate = this.formInput.controls[this.properties.surfaceFinishingDate].value;
    const manufactureDate = this.formInput.controls[this.properties.manufactureDate].value;
    const commodity = this.formInput.controls[this.properties.commodity].value;
    let expiration;
    if (isCommodityPCBOrPWB && surfaceFinishingDate && (commodity != null || (event !== undefined && event.name != null))) {
      expiration = new Date(surfaceFinishingDate);
    } else if (!isCommodityPCBOrPWB && manufactureDate && (commodity != null || (event !== undefined && event.name != null))) {
      expiration = new Date(manufactureDate);
    }
    if (expiration) {
      expiration.setMonth(expiration.getMonth() + shelfLifeMonths);
      this.formInput.patchValue({
        expireDate: expiration
      });
    }
  }

  getAttachmentFromFile(file: FileUpload): Attachment {
    const attachment = new Attachment();
    Automapper.map(file, attachment);
    attachment.id = Constants.Empty as any;
    attachment.savePath = this.getSavePath(file.name, file.filePath);
    return attachment;
  }

  getSavePath(fileName: string, filePath: string) {
    if (filePath && filePath !== Constants.Empty) {
      filePath = decodeURIComponent(filePath);
      return filePath.substring(0, filePath.indexOf(fileName) + fileName.length);
    }
    return Constants.Empty;
  }

  getFileUploadId() {
    return this.authService.getUserId() + '_' + DateHelper.getDateTimeString();
  }


  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }
  isWorkCellModified() {
    return this.isModified(this.properties.workCell);
  }

  isWorkCellEmpty() {
    return this.hasError(this.properties.workCell, ValidationErrorCodes.required);
  }

  isSupplierEmpty() {
    return this.hasError(this.properties.supplier, ValidationErrorCodes.required);
  }

  isSupplierModified() {
    return this.isModified(this.properties.supplier);
  }

  isSupplierContactEmpty() {
    return this.hasError(this.properties.supplierContact, ValidationErrorCodes.required);
  }

  isSupplierContactModified() {
    return this.isModified(this.properties.supplierContact);
  }

  isCommodityModified() {
    return this.isModified(this.properties.commodity);
  }

  isCommodityEmpty() {
    return this.hasError(this.properties.commodity, ValidationErrorCodes.required);
  }

  isAdminCertificationModified() {
    return this.isModified(this.properties.adminCertifications);
  }

  isAdminCertificationEmpty() {
    return this.hasError(this.properties.adminCertifications, ValidationErrorCodes.required);
  }

  isProductLifeCycleStageModified() {
    return this.isModified(this.properties.productLifeCycleStage);
  }

  isProductLifeCycleStageEmpty() {
    return this.hasError(this.properties.productLifeCycleStage, ValidationErrorCodes.required);
  }


  isIPEmpty() {
    return this.hasError(this.properties.iP, ValidationErrorCodes.required);
  }

  isIPHasWhiteSpace() {
    return this.hasError(
      this.properties.iP,
      ValidationErrorCodes.validateWhiteSpace
    );
  }


  isSiteIPModified() {
    return this.isModified(this.properties.siteIP);
  }

  isSiteIPEmpty() {
    return this.hasError(this.properties.siteIP, ValidationErrorCodes.required);
  }

  isCAFNoModified() {
    return this.isModified(this.properties.cafNo);
  }

  isCAFNoEmpty() {
    return this.hasError(this.properties.cafNo, ValidationErrorCodes.required);
  }

  isIPModified() {
    return this.isModified(this.properties.iP);
  }

  isPartNoModified() {
    return this.isModified(this.properties.partNo);
  }

  isPartNoEmpty() {
    return this.hasError(this.properties.partNo, ValidationErrorCodes.required);
  }

  isManufacturePartNumberModified() {
    return this.isModified(this.properties.manufacturePartNumber);
  }

  isManufacturePartNumberEmpty() {
    return this.hasError(this.properties.manufacturePartNumber, ValidationErrorCodes.required);
  }

  isUploadCertificationModified() {
    return this.isModified(this.properties.uploadCertificationFiles);
  }

  isUploadCertificationEmpty() {
    return this.hasError(this.properties.uploadCertificationFiles, ValidationErrorCodes.required);
  }

  isManufactureDateModified() {
    return this.isModified(this.properties.manufactureDate);
  }

  isManufactureDateEmpty() {
    return this.hasError(this.properties.manufactureDate, ValidationErrorCodes.required);
  }

  isManufactureDateHasWhiteSpace() {
    return this.hasError(this.properties.manufactureDate, ValidationErrorCodes.validateWhiteSpace);
  }

  isExpireDateModified() {
    return this.isModified(this.properties.expireDate);
  }

  isExpireDateEmpty() {
    return this.hasError(this.properties.expireDate, ValidationErrorCodes.required);
  }

  isExpireDateHasWhiteSpace() {
    return this.hasError(this.properties.expireDate, ValidationErrorCodes.validateWhiteSpace);
  }

  isShelfLifeMonthsModified() {
    return this.isModified(this.properties.shelfLifeMonths);
  }

  isShelfLifeMonthsEmpty() {
    return this.hasError(this.properties.shelfLifeMonths, ValidationErrorCodes.required);
  }

  isShelfLifeMonthsHasWhiteSpace() {
    return this.hasError(this.properties.shelfLifeMonths, ValidationErrorCodes.validateWhiteSpace);
  }

  isManufactureDCWeeksModified() {
    return this.isModified(this.properties.manufactureDCWeeks);
  }

  isManufactureDCWeeksEmpty() {
    return this.hasError(this.properties.manufactureDCWeeks, ValidationErrorCodes.required);
  }

  isManufactureDCWeeksHasWhiteSpace() {
    return this.hasError(this.properties.manufactureDCWeeks, ValidationErrorCodes.validateWhiteSpace);
  }

  isManufactureDCYearsModified() {
    return this.isModified(this.properties.manufactureDCYears);
  }

  isManufactureDCYearsEmpty() {
    return this.hasError(this.properties.manufactureDCYears, ValidationErrorCodes.required);
  }

  isManufactureDCYearsHasWhiteSpace() {
    return this.hasError(this.properties.manufactureDCYears, ValidationErrorCodes.validateWhiteSpace);
  }


  isAsyncValidationPending() {
    return (
      this.formInput.controls[this.properties.partNo].status ===
      ControlStates.PENDING
    );
  }

  isSaveDisabled() {
    this.saveAsDraftButtonValidation();
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }


  isSubmitDisabled() {
    if (this.stateTypeId !== undefined && this.stateTypeId === PartPlanStateType.Draft && this.formInput.valid) {
      return false;
    }
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }
  editMeasurementParameterRecord(record: any): void {
    const modalRef = this.modalService.open(MeasurementParameterComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.sapPartInspectionId = this.recId;

    modalRef.result.then(
      (response) => {
        this.measurementParameter = this.apiService.getMeasurementParameterModel(response);
        const index = this.measurementParameters.indexOf(record);
        this.measurementParameters.splice(index, 1);
        this.measurementParameters.push(this.measurementParameter);
        this.measurementParameter = new MeasurementParameterModel();
        this.formInput.markAsDirty();
        this.saveAsDraftButtonValidation();
      },
      () => {
      }
    );
  }

  editMicroSectionParameterRecord(record: any): void {
    const modalRef = this.modalService.open(MicroSectionParameterComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.sapPartInspectionId = this.recId;

    modalRef.result.then(
      (response) => {
        this.microSectionParameter = new MicroSectionParameterModel();
        this.microSectionParameter = this.apiService.getMicroSectionParameterModel(response);
        const index = this.microSectionParameters.indexOf(record);
        this.microSectionParameters.splice(index, 1);
        this.microSectionParameters.push(this.microSectionParameter);
        this.microSectionParameter = new MicroSectionParameterModel();
        this.formInput.markAsDirty();
        this.saveAsDraftButtonValidation();
      },
      () => {
      }
    );
  }

  deleteMeasurementParameterRecord(record: any): void {
    const index = this.measurementParameters.indexOf(record);
    this.measurementParameters.splice(index, 1);
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  deleteMicroSectionParameterRecord(record: any): void {
    const index = this.microSectionParameters.indexOf(record);
    this.microSectionParameters.splice(index, 1);
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  deleteSpecificationRecord(record: any): void {
    const index = this.specificationDetails.indexOf(record);
    this.specificationDetails.splice(index, 1);
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  deleteDrawingRecord(record: any): void {
    const index = this.drawingDetails.indexOf(record);
    this.drawingDetails.splice(index, 1);
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  openMeasurementParameterModel(): void {
    const modalRef = this.modalService.open(MeasurementParameterComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.result.then(
      (response) => {
        this.measurementParameter = this.apiService.getMeasurementParameterModel(response);
        if (this.checkExistenceRecord(this.measurementParameters, this.measurementParameter.parameterName)) {
          this.notificationService.showError(ToastMessage.DataExist);
        } else {
          this.measurementParameters.push(this.measurementParameter);
          this.formInput.markAsDirty();
          this.saveAsDraftButtonValidation();
        }
        this.measurementParameter = new MeasurementParameterModel();
      },
      () => {
      }
    );
  }

  openMicroSectionParameterModel(): void {
    const modalRef = this.modalService.open(MicroSectionParameterComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.result.then(
      (response) => {
        this.microSectionParameter = new MicroSectionParameterModel();
        this.microSectionParameter = this.apiService.getMicroSectionParameterModel(response);
        if (this.checkExistenceRecord(this.microSectionParameters, this.microSectionParameter.parameterName)) {
          this.notificationService.showError(ToastMessage.DataExist);
        } else {
          this.microSectionParameters.push(this.microSectionParameter);
          this.formInput.markAsDirty();
          this.saveAsDraftButtonValidation();
        }
        this.microSectionParameter = new MicroSectionParameterModel();
      },
      () => {
      }
    );
  }



  editFunParameterRecord(record: any): void {
    const modalRef = this.modalService.open(FunParameterComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.componentInstance.sapPartInspectionId = this.recId;

    modalRef.result.then(
      (response) => {
        this.funParameter = this.apiService.getFunParameterModel(response);
        const index = this.funParameters.indexOf(record);
        this.funParameters.splice(index, 1);
        this.funParameters.push(this.funParameter);
        this.funParameter = new FunParameterModel();
        this.formInput.markAsDirty();
        this.saveAsDraftButtonValidation();
      },
      () => {
      }
    );
  }

  deleteFunParameterRecord(record: any): void {
    const index = this.funParameters.indexOf(record);
    this.funParameters.splice(index, 1);
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();

  }

  openFunParameterModel(): void {
    const modalRef = this.modalService.open(FunParameterComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.result.then(
      (response) => {
        this.funParameter = this.apiService.getFunParameterModel(response);
        if (this.checkExistenceRecord(this.funParameters, this.funParameter.parameterName)) {
          this.notificationService.showError(ToastMessage.DataExist);
        } else {
          this.funParameters.push(this.funParameter);
          this.formInput.markAsDirty();
          this.saveAsDraftButtonValidation();
        }
        this.funParameter = new FunParameterModel();
      },
      () => {
      }
    );
  }

  openDrawingModel(): void {
    const currentUser = this.authService.retrieveUser();
    const modalRef = this.modalService.open(PartDrawingViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.result.then(
      (response) => {
        this.drawingRecord = this.apiService.getDrawingParameterModel(response);
        this.drawingRecord.submittedByUserId = currentUser.id;
        if (this.checkDrawingExistenceRecord(this.drawingDetails, this.drawingRecord.drawingNumber)) {

          this.notificationService.showError(ToastMessage.DataExist);
        } else {

          this.drawingRecord.isExpanded = true;

          this.drawingDetails.push(this.drawingRecord);

          const selectedPartDrawingRow = this.drawingRecord;

          this.modifyDrawingAttachments(selectedPartDrawingRow);

          this.formInput.markAsDirty();

          this.saveAsDraftButtonValidation();
        }
        this.drawingRecord = new PartDrawingModel();
      },
      () => {
      }
    );
  }

  openSpecModel(): void {
    const currentUser = this.authService.retrieveUser();
    const modalRef = this.modalService.open(PartSpecViewComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.result.then(
      (response) => {
        this.specRecord = this.apiService.getSpecParameterModel(response);

        this.specRecord.submittedByUserId = currentUser.id;

        if (this.checkSpecExistenceRecord(this.specificationDetails, this.specRecord.specNumber)) {

          this.notificationService.showError(ToastMessage.DataExist);
        } else {

          this.specRecord.isExpanded = true;

          this.specificationDetails.push(this.specRecord);

          const selectedPartSpecRow = this.specRecord;

          this.modifySpecAttachments(selectedPartSpecRow);

          this.formInput.markAsDirty();

          this.saveAsDraftButtonValidation();
        }
        this.specRecord = new PartSpecModel();
      },
      () => {
      }
    );
  }

  editMPositionToleranceRecord(record: any): void {
    const modalRef = this.modalService.open(MPositionToleranceComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.result.then(
      (response) => {
        this.mPositionTolerance = new MPositionToleranceModel();
        this.mPositionTolerance = this.apiService.getMPositionToleranceModel(response);
        const index = this.mPositionTolerances.indexOf(record);
        this.mPositionTolerances.splice(index, 1);
        this.mPositionTolerances.push(this.mPositionTolerance);
        this.mPositionTolerance = new MPositionToleranceModel();
        this.formInput.markAsDirty();
        this.saveAsDraftButtonValidation();
      },
      () => {
      }
    );
  }

  deleteMPositionToleranceRecord(record: any): void {
    const index = this.mPositionTolerances.indexOf(record);
    this.mPositionTolerances.splice(index, 1);
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  openMPositionToleranceModel(): void {
    const modalRef = this.modalService.open(MPositionToleranceComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.result.then(
      (response) => {
        this.mPositionTolerance = new MPositionToleranceModel();
        this.mPositionTolerance = this.apiService.getMPositionToleranceModel(response);
        if (this.checkMMCExistenceRecord(this.mPositionTolerances, this.mPositionTolerance.parameterName, this.mPositionTolerance.dimensionNumber)) {
          this.notificationService.showError(ToastMessage.DataExist);
        } else {
          this.mPositionTolerances.push(this.mPositionTolerance);
          this.formInput.markAsDirty();
          this.saveAsDraftButtonValidation();
        }
        this.mPositionTolerance = new MPositionToleranceModel();
      },
      () => {
      }
    );
  }


  checkMMCExistenceRecord(objectModelData: any, name: string, dimensionNumber: string): boolean {
    return objectModelData.some(r => (r.parameterName === name && r.dimensionNumber === dimensionNumber));
  }


  checkExistenceRecord(objectModelData: any, name: string): boolean {
    return objectModelData.some(r => (r.parameterName === name));
  }

  checkLMCExistenceRecord(objectModelData: any, name: string, dimensionNumber: string): boolean {
    return objectModelData.some(r => (r.parameterName === name && r.dimensionNumber === dimensionNumber));
  }


  checkDrawingExistenceRecord(objectModelData: any, name: string): boolean {
    return objectModelData.some(r => r.drawingNumber === name);
  }

  checkSpecExistenceRecord(objectModelData: any, name: string): boolean {
    return objectModelData.some(r => r.specNumber === name);
  }

  editLPositionToleranceRecord(record: any): void {
    const modalRef = this.modalService.open(LPositionToleranceComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.componentInstance.detail = record;
    modalRef.result.then(
      (response) => {
        this.lPositionTolerance = new LPositionToleranceModel();
        this.lPositionTolerance = this.apiService.getLPositionToleranceModel(response);
        const index = this.lPositionTolerances.indexOf(record);
        this.lPositionTolerances.splice(index, 1);
        this.lPositionTolerances.push(this.lPositionTolerance);
        this.lPositionTolerance = new LPositionToleranceModel();
        this.formInput.markAsDirty();
        this.saveAsDraftButtonValidation();
      },
      () => {
      }
    );
  }

  deleteLPositionToleranceRecord(record: any): void {
    const index = this.lPositionTolerances.indexOf(record);
    this.lPositionTolerances.splice(index, 1);
    this.formInput.markAsDirty();
    this.saveAsDraftButtonValidation();
  }

  openLPositionToleranceModel(): void {
    const modalRef = this.modalService.open(LPositionToleranceComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });
    modalRef.result.then(
      (response) => {
        this.lPositionTolerance = new LPositionToleranceModel();
        this.lPositionTolerance = this.apiService.getLPositionToleranceModel(response);
        if (this.checkLMCExistenceRecord(this.lPositionTolerances, this.lPositionTolerance.parameterName, this.lPositionTolerance.dimensionNumber)) {
          this.notificationService.showError(ToastMessage.DataExist);
        } else {
          this.lPositionTolerances.push(this.lPositionTolerance);
          this.formInput.markAsDirty();
          this.saveAsDraftButtonValidation();
        }
        this.lPositionTolerance = new LPositionToleranceModel();
      },
      () => {
      }
    );
  }


  saveAsDraftButtonValidation() {
    if (this.recId) {
      if (!this.formInput.valid || !this.formInput.dirty) {
        document.getElementById('buttonSaveAsDraft').setAttribute('disabled', 'true');
      } else {
        document.getElementById('buttonSaveAsDraft').removeAttribute('disabled');
      }
    }
  }

  getBowTwistData() {
    this.dataTypeList = dataTypes;
    this.formInput.patchValue({
      dataType: dataTypes[1].name
    });
    this.expandSetBowTwist();
  }

  getDefaultMPNMatched() {
    this.yesNoList = yesNoOptions;
    this.formInput.patchValue({
      mpnMatched: this.setMPNMatched()
    });
  }

  onSupplierSelect(event) {
    this.supplierId = event.id;
    this.formInput.patchValue({
      supplierContact: null
    });
    this.supplierContactEmail = '';
  }

  onSupplierUnSelect(event) {
    this.supplierId = null;
    this.formInput.patchValue({
      supplierContact: null
    });
    this.supplierContactEmail = '';
  }
  onSupplierContactSelect(event) {
    this.supplierContactEmail = event.email;
  }
  onSupplierContactUnSelect(event) {
    this.supplierContactEmail = '';
  }

  cancel() {
    this.location.back();
  }

  GenerateIP() {
    if (this.recId === null) {
      const siteCode = this.GetSiteCode();
      const supplier = this.formInput.controls[this.properties.supplier].value as Supplier;
      const partNo = this.formInput.controls[this.properties.partNo].value;
      const vendorCode = supplier != null ? supplier.vendorCode : Constants.Empty;
      const ipNumber = `${siteCode}${Symbol.Hyphen}${vendorCode}${Symbol.Hyphen}${partNo}${Symbol.Hyphen}${new Date().getFullYear()}`;
      if (this.isCAFNoMandatory) {
        this.formInput.patchValue({
          iP: ipNumber
        });
      } else {
        this.formInput.patchValue({
          iP: ipNumber,
          siteIP: ipNumber
        });
      }
    }
  }

  GenerateCAFNo(event) {
    if (this.recId === null) {
      const siteId = this.GetSiteId();
      const workCell = event;
      const ip = this.formInput.controls[this.properties.iP].value;
      this.partService.getCAFNoPrefix(siteId, workCell.id).subscribe(data => {
        if (data) {
          this.isCAFNoMandatory = true;
          this.formInput.patchValue({
            cafNo: data,
            siteIP: data
          });
        } else {
          this.isCAFNoMandatory = false;
          this.formInput.patchValue({
            cafNo: '',
            siteIP: ip
          });
        }
      });
    }
  }

  onUnselectWorkCell(event) {
    this.isCAFNoMandatory = false;
    this.formInput.patchValue({
      cafNo: '',
      siteIP: ''
    });

  }

  onCAFNoChange(event) {
    this.formInput.patchValue({
      siteIP: event
    });

  }

  GetSiteId(): number {
    return this.authService.retrieveSite().id;
  }

  GetSiteCode(): string {
    const code = this.authService.retrieveSite().code;
    return code;
  }

  disabledFutureDate() {
    const dtTemp = new Date();
    dtTemp.setDate(dtTemp.getDate());
    this.maxDate = dtTemp;
  }

  dataTypeRadioButtonChangedEvent(event) {
    if (event !== undefined && event.row !== undefined) {
      const resultData = this.countParameters.filter(x => x.id === event.row.id)[0];
      resultData.dataTypes = event.radioButtonChangedEvent;
      resultData.dataTypeId = event.radioButtonChangedEvent === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;
      this.formInput.markAsDirty();
      this.saveAsDraftButtonValidation();
    }
  }

  getDataTypeRadioButtonTypes() {
    this.dataTypeResult['dataTypes'] = [];
    dataTypes.forEach(e => {
      this.dataTypeResult['dataTypes'][e.id] = {
        id: e.id,
        name: e.name,
        section: tabType.get(TabType.Count)
      };
    });
  }

  onCopyClicked() {
    const element = document.getElementById('copy');
    const part = this.formInput.controls[this.properties.partNo].value;
    if (part && part !== undefined && part !== null) {
      this.copyMessage = 'Part No copied successfully.';
      element.setAttribute('style', 'color: green');
      this.clipboard.copy(part);
    } else {
      element.setAttribute('style', 'color: red');
      this.copyMessage = 'Please select Part No.';
    }
  }

}
