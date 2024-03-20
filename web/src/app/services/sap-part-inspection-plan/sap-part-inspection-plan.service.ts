
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/add-sap-part-inspection-plan-model';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { UpdateSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/update-sap-part-inspection-plan-model';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { SAPPartModel } from 'src/app/model/sap-models/sap-part-model';
import { PartDrawingModel } from 'src/app/model/sap-part-inspection-plan/part-drawing-model';
import { PartSpecModel } from 'src/app/model/sap-part-inspection-plan/part-spec-model';
import { Constants, dataTypes, Numbers, PartPlanStateType, resultExpected, SearchOperator, SortOrderDirection, specType, SpecType, UserType } from 'src/app/shared/constant/global';
import { FunParameterModel } from 'src/app/model/sap-part-inspection-plan/fun-parameter/fun-parameter-model';
import { MeasurementParameterModel } from 'src/app/model/sap-part-inspection-plan/measurement-parameter/measurement-parameter-model';
import { TestReportAttachment } from 'src/app/model/test-report-attachment/test-report-attachment';
import { Attachment } from 'src/app/model/attachment/attachment';
import { PartTestReportParameterService } from '../part-test-report-parameter/part-test-report-parameter.service';
import * as _ from 'lodash';
import { MicroSectionParameterModel } from 'src/app/model/sap-part-inspection-plan/micro-section-parameter/micro-section-parameter-model';
import { MPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/m-position-tolerance/m-position-tolerance-model';
import { LPositionToleranceModel } from 'src/app/model/sap-part-inspection-plan/l-position-tolerance/l-position-tolerance-model';
import { PartInspectionDrawingAttachment } from 'src/app/model/part-inspection-drawing-attachment/part-inspection-drawing-attachment';
import { PartInspectionSpecAttachment } from 'src/app/model/part-inspection-spec-attachment/part-inspection-spec-attachment';
import { SAPPartInspectionPlanComments } from 'src/app/model/sap-part-inspection-plan-comments/sap-part-inspection-plan-comments';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { PartTestReportTab } from 'src/app/model/part-test-report/part-test-report-tab-model';
import { SamplingPlan } from 'src/app/model/sampling-plan/sampling-plan';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { PurchaseOrder } from 'src/app/model/purchase-order/purchase-order';
import { SampleSize } from 'src/app/model/sample-size/sample-size';

@Injectable({
  providedIn: 'root'
})
export class SAPPartInspectionPlanService extends BaseDataService {
  private apiUrl = 'api/SAPPartInspectionPlan';
  private oDataUrl = 'odata/SAPPartInspectionPlan';
  private oDataUrlSAPParts = 'odata/PartSAPData';
  private oDataFullyApprovedPartNo = 'odata/SAPPartInspectionPlan/GetCompletelyApprovedIPPartNoForSupplier';
  private oDataCheckPartNo = 'odata/SamplingPlanSAPData/CheckPartNumberExistsInSamplingModule';
  private oDataCheckPurchaseOrder = 'odata/PurchaseOrder/CheckPartNumberExistsInPurchaseOrderModule';
  private oDataCheckSampleSize = 'odata/SAPSampleSize/CheckPartNumberExistsInSampleSizeCalculationModule';



  //#region Drawing Section
  drawingDetails: PartDrawingModel[];
  drawingDetail = new PartDrawingModel();
  partCommentDetails: SAPPartInspectionPlanComments[];
  partCommentDetail = new SAPPartInspectionPlanComments();
  //#endregion Drawing Section

  //#region Specification Section
  specificationDetails: PartSpecModel[];
  specificationDetail = new PartSpecModel();
  bowTwistTitles: any[] = [];
  funParameters: FunParameterModel[] = [];
  funParameter = new FunParameterModel();
  measurementParameters: MeasurementParameterModel[] = [];
  measurementParameter = new MeasurementParameterModel();
  testReportTabDetail = new PartTestReportTab();
  testReportTabDetails: PartTestReportTab[];
  testReportParameterId: number;
  testReportId: any;
  //#endregion Specification Section

  dataTypeId: any;

  microSectionParameter = new MicroSectionParameterModel();
  funMicroMeasurementParameterColumns = [
    { field: 'parameterName', header: 'ParameterName', isVisible: true },
    { field: 'unit', header: 'Unit', isVisible: true },
    { field: 'normalValue', header: 'NominalValue', isVisible: true },
    { field: 'upperTolerance', header: 'UpperTolerance', isVisible: true },
    { field: 'lowerTolerance', header: 'LowerTolerance', isVisible: true },
    { field: 'instrumentTypeCode', header: 'InstrumentType', isVisible: true },
    { field: 'accuracy', header: 'Accuracy', isVisible: true },
    { field: 'dataType', header: 'DataType', isVisible: true },
    { field: 'chartTypeName', header: 'ChartType', isVisible: true },
    { field: 'calculationPoint', header: 'CalculationPoint', isVisible: true }
  ];

  microSectionParameterColumns = [
    { field: 'parameterName', header: 'ParameterName', isVisible: true },
    { field: 'unit', header: 'Unit', isVisible: true },
    { field: 'normalValue', header: 'NominalValue', isVisible: true },
    { field: 'upperTolerance', header: 'UpperTolerance', isVisible: true },
    { field: 'lowerTolerance', header: 'LowerTolerance', isVisible: true },
    { field: 'instrumentTypeCode', header: 'InstrumentType', isVisible: true },
    { field: 'accuracy', header: 'Accuracy', isVisible: true },
    { field: 'dataType', header: 'DataType', isVisible: true },
    { field: 'chartTypeName', header: 'ChartType', isVisible: true },
    { field: 'calculationPoint', header: 'CalculationPoint', isVisible: true }
  ];

  suppierfunMicroMeasurementParameterColumns = [
    { field: 'parameterName', header: 'ParameterName', isVisible: true },
    { field: 'unit', header: 'Unit', isVisible: true },
    { field: 'normalValue', header: 'NominalValue', isVisible: true },
    { field: 'upperTolerance', header: 'UpperTolerance', isVisible: true },
    { field: 'lowerTolerance', header: 'LowerTolerance', isVisible: true },
    { field: 'instrumentTypeCode', header: 'InstrumentType', isVisible: true },
    { field: 'instrumentNo', header: 'InstrumentNo', isVisible: true },
    { field: 'accuracy', header: 'Accuracy', isVisible: true },
    { field: 'dataType', header: 'DataType', isVisible: true },
    { field: 'chartTypeName', header: 'ChartType', isVisible: true },
    { field: 'calculationPoint', header: 'CalculationPoint', isVisible: true }
  ];

  mPositionToleranceColumns = [
    { field: 'parameterName', header: 'ParameterName', isVisible: true },
    { field: 'dimensionNumber', header: 'DimensionNumber', isVisible: true },
    { field: 'specLimitAtMMC', header: 'SpecLimitAtMMC', isVisible: true },
    { field: 'specLimitAtLMC', header: 'SpecLimitAtLMC', isVisible: true },
    { field: 'spec', header: 'Spec', isVisible: true },
    { field: 'unit', header: 'Unit', isVisible: true },
    { field: 'instrumentTypeCode', header: 'InstrumentType', isVisible: true },
    { field: 'dataType', header: 'DataType', isVisible: true },
  ];

  lPositionToleranceColumns = [
    { field: 'parameterName', header: 'ParameterName', isVisible: true },
    { field: 'dimensionNumber', header: 'DimensionNumber', isVisible: true },
    { field: 'specLimitAtMMC', header: 'SpecLimitAtMMC', isVisible: true },
    { field: 'specLimitAtLMC', header: 'SpecLimitAtLMC', isVisible: true },
    { field: 'spec', header: 'Spec', isVisible: true },
    { field: 'unit', header: 'Unit', isVisible: true },
    { field: 'instrumentTypeCode', header: 'InstrumentType', isVisible: true },
    { field: 'dataType', header: 'DataType', isVisible: true },
  ];

  mPositionTolerances: MPositionToleranceModel[] = [];
  mPositionTolerance = new MPositionToleranceModel();
  lPositionTolerances: LPositionToleranceModel[] = [];
  lPositionTolerance = new LPositionToleranceModel();

  Site = 'Ip';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
    private partTestReportParameterService: PartTestReportParameterService,
    private authService: AuthService
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddSAPPartInspectionPlanModel): Observable<SAPPartInspectionPlan> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateSAPPartInspectionPlanModel): Observable<SAPPartInspectionPlan> {

    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<SAPPartInspectionPlan> {
    const url = `${this.apiUrl}/${id}`;
    return super.delete(url, request);
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
    return super.isExists(url);
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SAPPartInspectionPlan>> {
    const url = `${this.oDataUrl}`;
    if (pageSortFilterData === undefined) {
      pageSortFilterData = new PageSortFilterInfo();
    }
    this.getFilterByColumnName(this.authService.retrieveSite().code, this.Site, SearchOperator.StartsWith, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      pageSortFilterData.filterInfo = [];
      return new ApiResponse<SAPPartInspectionPlan>(result);
    }));
  }

  getCompletelyApprovedIPPartNoForSupplier(supplierId: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SAPPartInspectionPlan>> {
    const url = `${this.oDataFullyApprovedPartNo}(${'supplierId='}${supplierId})`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SAPPartInspectionPlan>(result);
    }));
  }

  checkPartNumberExistsInSamplingModule(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SamplingPlan>> {
    // const url = `${this.oDataCheckPartNo}(${'partNumbers='}'${part}')`;
    const url = `${this.oDataCheckPartNo}`;

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SamplingPlan>(result);
    }));
  }

  checkPartNumberExistsInPurchaseOrderModule(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PurchaseOrder>> {
    const url = `${this.oDataCheckPurchaseOrder}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<PurchaseOrder>(result);
    }));
  }

  checkPartNumberExistsInSampleSizeCalculationModule(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SampleSize>> {
    const url = `${this.oDataCheckSampleSize}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SampleSize>(result);
    }));
  }

  getDataById(id: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SAPPartInspectionPlan>> {
    const url = `${this.oDataUrl}(${id})`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SAPPartInspectionPlan>(result);
    }));
  }

  searchByField(field: string, value: string): Observable<ApiResponse<SAPPartInspectionPlan>> {
    const url = `${this.oDataUrl}?$filter=contains(${field},'${encodeURIComponent(value)}')`;
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading
    };
    return super.get(url, options).pipe(
      map(result => {
        return new ApiResponse(result);
      })
    );
  }

  public searchSAPPartByPartNumber = (value: string): Observable<ApiResponse<SAPPartModel>> => {
    const url = `${this.oDataUrlSAPParts}?$filter=(contains(JABIL_PART_NO,'${encodeURIComponent(value)}'))`;
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading
    };
    return super.get(url, options).pipe(
      map(result => {
        return new ApiResponse(result);
      })
    );
  }

  expandSAPPartInspectionPlanAdminCertifications(): Record<string, ExpandSelectCountInfo> {
    return {
      'sAPPartInspectionPlanAdminCertifications': <ExpandSelectCountInfo>{
        select: ['Id', 'name', 'isEnabled']
      }
    };
  }

  expandAdminCertifications(): Record<string, ExpandSelectCountInfo> {
    return {
      'adminCertifications': <ExpandSelectCountInfo>{
        select: ['Id', 'name', 'isEnabled']
      }
    };
  }

  expandProductLifeCycleStage(): Record<string, ExpandSelectCountInfo> {
    return {
      'productLifeCycleStage': <ExpandSelectCountInfo>{
      }
    };
  }


  expandPartWorkCell(): Record<string, ExpandSelectCountInfo> {
    return {
      'workCell': <ExpandSelectCountInfo>{
      }
    };
  }



  expandSupplier(): Record<string, ExpandSelectCountInfo> {
    return {
      'Supplier': <ExpandSelectCountInfo>{
      }
    };
  }

  expandSupplierContact(): Record<string, ExpandSelectCountInfo> {
    return {
      'SupplierContact': <ExpandSelectCountInfo>{
      }
    };
  }


  expandComments(): Record<string, ExpandSelectCountInfo> {
    return {
      'PartComments': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          {
            'SubmittedByUser': <ExpandSelectCountInfo>{
            }
          }
        ]
      }
    };
  }


  expandCommodity(): Record<string, ExpandSelectCountInfo> {
    return {
      'commodity': <ExpandSelectCountInfo>{
        select: ['Id', 'Name', 'IsEnabled']
      }
    };
  }


  expandPartInspectionCertificationAttachments(): Record<string, ExpandSelectCountInfo> {
    return {
      'partInspectionCertificationAttachments': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          {
            'attachment': <ExpandSelectCountInfo>{
            }
          }
        ]
      }
    };
  }

  expandPartInspectionSpecifications(): Record<string, ExpandSelectCountInfo> {
    return {
      'partInspectionSpecifications': <ExpandSelectCountInfo>{
      }
    };
  }

  expandPartInspectionDrawings(): Record<string, ExpandSelectCountInfo> {
    return {
      'partInspectionDrawings': <ExpandSelectCountInfo>{
      }
    };
  }

  expandPartInspectionSpecAttachments(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'partInspectionSpecAttachments': <ExpandSelectCountInfo>{
          expand: <Record<string, ExpandSelectCountInfo>[]>[
            {
              'attachment': <ExpandSelectCountInfo>{}
            }
          ]
        },
      },
    ];
  }

  expandPartInspectionDrawingAttachments(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'partInspectionDrawingAttachments': <ExpandSelectCountInfo>{
          expand: <Record<string, ExpandSelectCountInfo>[]>[
            {
              'attachment': <ExpandSelectCountInfo>{}
            }
          ]
        },
      },
    ];
  }

  // expandPartInspectionSamplingPlans(): string {
  //   return 'sAPPartInspectionPlanSamplingPlans';
  // }

  expandPartInspectionSamplingPlans(): Record<string, ExpandSelectCountInfo> {
    return {
      'sAPPartInspectionPlanSamplingPlans': <ExpandSelectCountInfo>{
      }
    };
  }

  expandPartInspectionMPositionTolerances(): Record<string, ExpandSelectCountInfo> {
    return {
      'partMPositionTolerances': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandPartDimension()
        ]
      }
    };
  }

  expandPartDimension(): Record<string, ExpandSelectCountInfo> {
    return {
      'partDimension': <ExpandSelectCountInfo>{
        select: ['Id', 'name', 'isEnabled']
      }
    };
  }

  expandPartInspectionLPositionTolerances(): Record<string, ExpandSelectCountInfo> {
    return {
      'partLPositionTolerances': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandPartDimension()
        ]
      }
    };
  }


  expandPartInspectionBowTwistParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'partInspectionBowTwistParameters': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          {
            'bowTwistFormula': <ExpandSelectCountInfo>{
            }
          }
        ]
      }
    };
  }

  expandPartMeasurementParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'partMeasurementParameters': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandChartType()
        ]
      }
    };
  }

  expandPartMicroSectionParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'partMicrosectionParameters': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandChartType()
        ]
      }
    };
  }

  expandChartType(): Record<string, ExpandSelectCountInfo> {
    return {
      'ChartType': <ExpandSelectCountInfo>{
      }
    };
  }

  expandPartFunParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'partFunParameters': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandChartType()
        ]
      }
    };
  }

  expandPartResultOrientedParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'partResultOrientedParameters': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
        ]
      }
    };
  }

  expandCountParameter(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'partCountParameters': <ExpandSelectCountInfo>{
          expand: <Record<string, ExpandSelectCountInfo>[]>[
            this.expandParameterManagement(),
            this.expandInspectionToolsType()
          ]
        },
      },
    ];
  }

  expandInspectionToolsType(): string {
    return 'inspectionToolsType';
  }

  expandParameterManagement(): Record<string, ExpandSelectCountInfo> {
    return {
      'parameterManagement': <ExpandSelectCountInfo>{
        select: ['Id', 'name', 'isEnabled']
      }
    };
  }

  expandUOM(): Record<string, ExpandSelectCountInfo> {
    return {
      'uom': <ExpandSelectCountInfo>{
        select: ['Id', 'name', 'isEnabled']
      }
    };
  }

  expandInstrumentType(): Record<string, ExpandSelectCountInfo> {
    return {
      'instrumentType': <ExpandSelectCountInfo>{
        select: ['Id', 'code', 'isEnabled']
      }
    };
  }

  expandTestReportParameter(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'partTestReportParameters': <ExpandSelectCountInfo>{
          expand: <Record<string, ExpandSelectCountInfo>[]>[
            {
              'testReport': <ExpandSelectCountInfo>{}
            }
          ]
        },
      },
    ];
  }


  expandDateCode(): Record<string, ExpandSelectCountInfo> {
    return {
      'partDateCode': <ExpandSelectCountInfo>{
      }
    };
  }

  expandSubmittedByUser(): Record<string, ExpandSelectCountInfo> {
    return {
      'SubmittedBy': <ExpandSelectCountInfo>{
      }
    };
  }

  expandState(): Record<string, ExpandSelectCountInfo> {
    return {
      'stateType': <ExpandSelectCountInfo>{
      }
    };
  }

  expandCreatedByUser(): Record<string, ExpandSelectCountInfo> {
    return {
      'createdByUser': <ExpandSelectCountInfo>{
      }
    };
  }

  setDrawingProperties(sAPPartInspectionPlan: SAPPartInspectionPlan, userTypeId: number): PartDrawingModel[] {
    this.drawingDetails = [];
    if (sAPPartInspectionPlan.partInspectionDrawings != null) {
      sAPPartInspectionPlan.partInspectionDrawings.forEach(element => {
        const partDrawingModel = new PartDrawingModel();
        partDrawingModel.id = element.id;
        partDrawingModel.drawingNumber = element.drawingNumber;
        partDrawingModel.drawingDescription = element.drawingDescription;
        partDrawingModel.drawingRevisionNumber = element.drawingRevisionNumber;
        this.drawingDetails.push(partDrawingModel);
      });
    }
    return this.drawingDetails;
  }


  setPartCommentDetails(sAPPartInspectionPlan: SAPPartInspectionPlan, timezone: any): SAPPartInspectionPlanComments[] {
    this.partCommentDetails = [];
    if (sAPPartInspectionPlan.partComments != null) {
      sAPPartInspectionPlan.partComments.forEach(element => {
        const partCommentModel = new SAPPartInspectionPlanComments();
        partCommentModel.comments = element.comments;
        partCommentModel.submittedByUser = element.submittedByUser;
        partCommentModel.createdDate = moment(element.created).tz(timezone).format('MMM DD, YYYY, hh:mm:ss A');
        this.partCommentDetails.push(partCommentModel);
      });
    }
    return this.partCommentDetails;
  }


  setSpecProperties(sAPPartInspectionPlan: SAPPartInspectionPlan, userTypeId: number): PartSpecModel[] {
    this.specificationDetails = [];
    if (sAPPartInspectionPlan.partInspectionSpecifications != null) {
      sAPPartInspectionPlan.partInspectionSpecifications.forEach(element => {
        const partSpecModel = new PartSpecModel();
        partSpecModel.id = element.id;
        partSpecModel.specNumber = element.specNumber;
        partSpecModel.specDescription = element.specDescription;
        partSpecModel.specRevisionNumber = element.specRevisionNumber;
        this.specificationDetails.push(partSpecModel);
      });
    }
    return this.specificationDetails;
  }

  returnCountParameterArray(element: any, recId?: number): any {
    return {

      id: element.id,
      name: element.name ?? element.parameterManagement.name,
      detailsDefine: element.detailsDefine ?? '',
      toolsType: element.inspectionToolsType !== null ? element.inspectionToolsType.type : '',
      inspectionToolsTypeId: element.inspectionToolsTypeId ?? null,
      isChecked: element.isChecked,
      isEnabled: element.isEnabled,
      parameterManagementId: element.parameterManagementId ?? null,
      sAPPartInspectionPlanId: recId ?? null,
      selectedDynamicId: element.inspectionToolsTypeId ?? null,
      dataTypeName: recId !== null && element.dataTypeId === dataTypes[1].name ? dataTypes[1].name : dataTypes[0].name,
      dataTypes: this.getDataType(element, recId),
      dataTypeId: recId !== null && element.dataTypeId === dataTypes[1].id ? dataTypes[1].id : dataTypes[0].id
    };
  }

  getDataType(element, recId: number): any {
    if (recId) {
      if (element.dataTypeId === undefined) {
        return dataTypes[0].name;
      }
      return element.dataTypeId === dataTypes[0].id ? dataTypes[0].name : dataTypes[1].name;
    } else {
      return dataTypes[0].name;
    }
  }




  initializeBowTwistHeaderInfo(specTypeId: number) {
    if (Number(specTypeId) === SpecType.Default) {
      this.bowTwistTitles = [];
      this.GetWarPageDefaultRows();
    } else if (Number(specTypeId) === SpecType.Special) {
      this.bowTwistTitles = [];
      this.GetWarPageSpecialRows();
    } else {
      this.bowTwistTitles = [];
    }
    return this.bowTwistTitles;
  }


  setBowTwistPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartInspectionBowTwistParameters(),
            this.expandCommodity()
          ],
        SortOrderDirection: SortOrderDirection.Asc
      };
    return pageSortFilterInfo.expandInfo;
  }

  setMeasurementParametersPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartMeasurementParameters()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setMPositionPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartInspectionMPositionTolerances()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setLPositionPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartInspectionLPositionTolerances()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setFUNPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartFunParameters()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }


  setVisualnspectionParameterPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          this.expandCountParameter()
      };
    return pageSortFilterInfo.expandInfo;
  }

  setResultOrientedPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartResultOrientedParameters()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setTestReportPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          this.expandTestReportParameter()
      };
    return pageSortFilterInfo.expandInfo;
  }

  setCountParameterPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          this.expandCountParameter()
      };
    return pageSortFilterInfo.expandInfo;
  }

  setDateCodePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandDateCode()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setTestReportAttachmentSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          this.partTestReportParameterService.expandTestReportParameterAttachment()
      };
    return pageSortFilterInfo.expandInfo;
  }



  setDrawingAttachmentSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          this.expandPartInspectionDrawingAttachments()
      };
    return pageSortFilterInfo.expandInfo;
  }


  setSpecAttachmentSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          this.expandPartInspectionSpecAttachments()
      };
    return pageSortFilterInfo.expandInfo;
  }

  GetWarPageDefaultRows() {
    this.bowTwistTitles.push(
      {
        id: SpecType.Default,
        spec: specType.get(SpecType.Default),
        displayMessage: 'Bow&Twist based on IPC TM 650',
        rows: [
          {
            id: 1,
            rowTitle: 'Bow L',
            unitId: Numbers.Default
          },
          {
            id: 2,
            rowTitle: 'Bow W',
            unitId: Numbers.Default
          },
          {
            id: 3,
            rowTitle: 'Twist',
            unitId: Numbers.Default
          },
        ]
      }
    );
  }

  GetWarPageSpecialRows() {
    this.bowTwistTitles.push(
      {
        id: SpecType.Special,
        spec: specType.get(SpecType.Special),
        displayMessage: 'Bow&Twist based on Specific Customer Requirements',
        rows: [
          {
            id: 4,
            rowTitle: 'Specific Warpage L',
            unitId: Numbers.Default
          },
          {
            id: 5,
            rowTitle: 'Specific Warpage W',
            unitId: Numbers.Default
          },
          {
            id: 6,
            rowTitle: 'Specific Twist',
            unitId: Numbers.Default
          },
        ]
      }
    );
  }

  isEditWithSuppliedCommodity(recId: number, commodity: any) {
    return recId != null && commodity != null;
  }

  isEditOrView(recId: number) {
    return recId != null;
  }

  isNewDrawingRecordOnEditPage(selectedPartDrawingRow: any) {
    return selectedPartDrawingRow.id === Numbers.Default;
  }

  isSAPPartInspectionHasValue(sapPartInspectionPlan: any) {

    return sapPartInspectionPlan != null && sapPartInspectionPlan !== undefined;
  }

  isReturnedDataHasValue(data: ApiResponse<SAPPartInspectionPlan>) {
    return data != null && data.value[0] != null && data.value.length > 0;
  }

  isPartTestReportParameterHasValue(partTestReportParameters: PartTestReportTab[]) {
    return partTestReportParameters !== null && partTestReportParameters !== undefined &&
      partTestReportParameters.length > 0;
  }

  getPcCodes(samplingPlans) {
    if (samplingPlans && samplingPlans !== null) {
      const pcCodes = samplingPlans.map(x => x.mstrChar).join(',').replace('/', '%2F');
      return pcCodes;
    }
  }

  setMicroSectionPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartMicroSectionParameters()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setMPositionTolerancePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartInspectionMPositionTolerances()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setLPositionTolerancePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartInspectionLPositionTolerances()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }
  expandSAPPartInspectionPlan(): Record<string, ExpandSelectCountInfo> {
    return {
      'SAPPartInspectionPlan': <ExpandSelectCountInfo>{
      }
    };
  }

  getMicroSectionParameterModel(record: any): MicroSectionParameterModel {
    this.microSectionParameter = new MicroSectionParameterModel();
    this.microSectionParameter.parameterManagement = record.parameterManagement;
    this.microSectionParameter.parameterManagementId = record.parameterManagement.id;
    this.microSectionParameter.uom = record.uom;
    this.microSectionParameter.uomId = record.uom.id;
    this.microSectionParameter.normalValue = parseFloat(record.normalValue).toFixed(record.accuracy);
    this.microSectionParameter.upperTolerance = parseFloat(record.upperTolerance).toFixed(record.accuracy);
    this.microSectionParameter.lowerTolerance = parseFloat(record.lowerTolerance).toFixed(record.accuracy);
    this.microSectionParameter.instrumentType = record.instrumentType;
    this.microSectionParameter.instrumentTypeId = record.instrumentType.id;
    this.microSectionParameter.accuracy = record.accuracy;
    this.microSectionParameter.parameterName = record.parameterManagement.name;
    this.microSectionParameter.unit = record.uom.name;
    this.microSectionParameter.parameterName = record.parameterManagement.name;
    this.microSectionParameter.instrumentTypeCode = record.instrumentType.code;
    if (record.dataTypeId !== undefined && record.dataTypeId !== null) {
      this.microSectionParameter.dataType = dataTypes[0].id === record.dataTypeId ? dataTypes[0].name : dataTypes[1].name;
    } else {
      this.microSectionParameter.dataType = record.dataType;
    }
    this.microSectionParameter.dataTypeId = this.microSectionParameter.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;
    this.microSectionParameter.chartTypeId = record.chartType !== null ? record.chartType.id : null;
    this.microSectionParameter.chartType = record.chartType !== null ? record.chartType : null;
    this.microSectionParameter.chartTypeName = record.chartType !== null ? record.chartType.description : '';
    this.microSectionParameter.calculationPoint = (dataTypes[0].id === record.dataTypeId || this.microSectionParameter.dataTypeId === dataTypes[0].id) ? Number(record.calculationPoint) : null;

    return this.microSectionParameter;

  }

  getMPositionToleranceModel(record: any): MPositionToleranceModel {
    this.mPositionTolerance = new MPositionToleranceModel();
    this.mPositionTolerance.parameterManagementId = record.parameterManagement.id;
    this.mPositionTolerance.partDimensionId = record.dimensionNumber === undefined ? record.partDimension.id : record.dimensionNumber.id;
    this.mPositionTolerance.dimensionNumber = record.dimensionNumber === undefined ? record.partDimension.name : record.dimensionNumber.name;
    this.mPositionTolerance.uomId = record.uom.id;
    this.mPositionTolerance.specLimitAtMMC = record.specLimitAtMMC;
    this.mPositionTolerance.specLimitAtLMC = record.specLimitAtLMC;
    this.mPositionTolerance.spec = record.spec;
    this.mPositionTolerance.instrumentTypeId = record.instrumentType.id;
    this.mPositionTolerance.parameterName = record.parameterManagement.name;
    this.mPositionTolerance.unit = record.uom.name;
    this.mPositionTolerance.parameterName = record.parameterManagement.name;
    this.mPositionTolerance.instrumentTypeCode = record.instrumentType.code;
    if (record.dataTypeId !== undefined && record.dataTypeId !== null) {
      this.mPositionTolerance.dataType = dataTypes[0].id === record.dataTypeId ? dataTypes[0].name : dataTypes[1].name;
    } else {
      this.mPositionTolerance.dataType = record.dataType;
    }
    this.mPositionTolerance.dataTypeId = this.mPositionTolerance.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;
    this.mPositionTolerance.parameterManagement = record.parameterManagement;
    this.mPositionTolerance.partDimension = record.dimensionNumber ?? record.partDimension;
    this.mPositionTolerance.instrumentType = record.instrumentType;
    this.mPositionTolerance.uom = record.uom;
    return this.mPositionTolerance;
  }

  getLPositionToleranceModel(record: any): LPositionToleranceModel {
    this.lPositionTolerance = new LPositionToleranceModel();
    this.lPositionTolerance.parameterManagementId = record.parameterManagement.id;
    this.lPositionTolerance.partDimensionId = record.dimensionNumber === undefined ? record.partDimension.id : record.dimensionNumber.id;
    this.lPositionTolerance.dimensionNumber = record.dimensionNumber === undefined ? record.partDimension.name : record.dimensionNumber.name;
    this.lPositionTolerance.uomId = record.uom.id;
    this.lPositionTolerance.specLimitAtMMC = record.specLimitAtMMC;
    this.lPositionTolerance.specLimitAtLMC = record.specLimitAtLMC;
    this.lPositionTolerance.spec = record.spec;
    this.lPositionTolerance.instrumentTypeId = record.instrumentType.id;
    this.lPositionTolerance.parameterName = record.parameterManagement.name;
    this.lPositionTolerance.unit = record.uom.name;
    this.lPositionTolerance.parameterName = record.parameterManagement.name;
    this.lPositionTolerance.instrumentTypeCode = record.instrumentType.code;
    if (record.dataTypeId !== undefined && record.dataTypeId !== null) {
      this.lPositionTolerance.dataType = dataTypes[0].id === record.dataTypeId ? dataTypes[0].name : dataTypes[1].name;
    } else {
      this.lPositionTolerance.dataType = record.dataType;
    }
    this.lPositionTolerance.dataTypeId = this.lPositionTolerance.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;

    this.lPositionTolerance.parameterManagement = record.parameterManagement;
    this.lPositionTolerance.partDimension = record.dimensionNumber ?? record.partDimension;
    this.lPositionTolerance.uom = record.uom;
    this.lPositionTolerance.instrumentType = record.instrumentType;

    return this.lPositionTolerance;
  }

  getMicroSectionParameters(sapPartInspectionPlan): MicroSectionParameterModel[] {
    let microSectionParameters: MicroSectionParameterModel[] = [];
    if (sapPartInspectionPlan.partMicrosectionParameters !== null && sapPartInspectionPlan.partMicrosectionParameters !== undefined &&
      sapPartInspectionPlan.partMicrosectionParameters.length > 0) {
      sapPartInspectionPlan.partMicrosectionParameters.map(record => {
        this.microSectionParameter = new MicroSectionParameterModel();
        this.microSectionParameter = this.getMicroSectionParameterModel(record);
        if (microSectionParameters === undefined) {
          microSectionParameters = [];
        }
        microSectionParameters.push(this.microSectionParameter);
      });
    }
    return microSectionParameters;
  }


  mapFunParameterModel(funParameterModel: FunParameterModel[]): FunParameterModel[] {
    let funParameters: FunParameterModel[] = [];
    funParameterModel.map(record => {
      this.funParameter = new FunParameterModel();
      this.getFunParameterModel(record);
      if (funParameters === undefined) {
        funParameters = [];
      }
      funParameters.push(this.funParameter);
    });
    return funParameters;
  }


  getFunParameterModel(record: any): FunParameterModel {
    {
      this.funParameter = new FunParameterModel();
      this.funParameter.parameterManagement = record.parameterManagement;
      this.funParameter.parameterManagementId = record.parameterManagement.id;
      this.funParameter.uom = record.uom;
      this.funParameter.uomId = record.uom.id;
      this.funParameter.normalValue =  parseFloat(record.normalValue).toFixed(record.accuracy);
      this.funParameter.upperTolerance = parseFloat(record.upperTolerance).toFixed(record.accuracy);
      this.funParameter.lowerTolerance = parseFloat(record.lowerTolerance).toFixed(record.accuracy);
      this.funParameter.instrumentType = record.instrumentType;
      this.funParameter.instrumentTypeId = record.instrumentType.id;
      this.funParameter.accuracy = record.accuracy;
      this.funParameter.parameterName = record.parameterManagement.name;
      this.funParameter.unit = record.uom.name;
      this.funParameter.parameterName = record.parameterManagement.name;
      this.funParameter.instrumentTypeCode = record.instrumentType.code;
      if (record.dataTypeId !== undefined && record.dataTypeId !== null) {
        this.funParameter.dataType = dataTypes[0].id === record.dataTypeId ? dataTypes[0].name : dataTypes[1].name;
      } else {
        this.funParameter.dataType = record.dataType;
      }
      this.funParameter.dataTypeId = this.funParameter.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;
      this.funParameter.chartTypeId = record.chartType !== null ? record.chartType.id : null;
      this.funParameter.chartType = record.chartType !== null ? record.chartType : null;
      this.funParameter.chartTypeName = record.chartType !== null ? record.chartType.description : '';
      this.funParameter.calculationPoint = (dataTypes[0].id === record.dataTypeId || this.funParameter.dataTypeId === dataTypes[0].id) ? Number(record.calculationPoint) : null;

    }
    return this.funParameter;
  }


  getDrawingParameterModel(record: any): PartDrawingModel {
    {
      this.drawingDetail = new PartDrawingModel();
      this.drawingDetail.drawingNumber = record.drawingNumber;
      this.drawingDetail.drawingDescription = record.drawingDescription;
      this.drawingDetail.drawingRevisionNumber = record.drawingRevisionNumber;
      this.drawingDetail.drawingAttachments = record.drawingAttachments;
    }
    return this.drawingDetail;
  }


  getSpecParameterModel(record: any): PartSpecModel {
    {
      this.specificationDetail = new PartSpecModel();
      this.specificationDetail.specNumber = record.specNumber;
      this.specificationDetail.specDescription = record.specDescription;
      this.specificationDetail.specRevisionNumber = record.specRevisionNumber;
      this.specificationDetail.specAttachments = record.specAttachments;
    }
    return this.specificationDetail;
  }

  mapMeasurementParameterModel(measurementParameterModel: MeasurementParameterModel[]): MeasurementParameterModel[] {
    let measurementParameters: MeasurementParameterModel[] = [];
    measurementParameterModel.map(record => {
      this.measurementParameter = new MeasurementParameterModel();
      this.measurementParameter = this.getMeasurementParameterModel(record);
      if (measurementParameters === undefined) {
        measurementParameters = [];
      }
      measurementParameters.push(this.measurementParameter);
    });
    return measurementParameters;
  }


  getMeasurementParameterModel(record: any): MeasurementParameterModel {
    {
      this.measurementParameter = new MeasurementParameterModel();
      this.measurementParameter.parameterManagementId = record.parameterManagement.id;
      this.measurementParameter.uomId = record.uom.id;
      this.measurementParameter.normalValue =  parseFloat(record.normalValue).toFixed(record.accuracy);
      this.measurementParameter.upperTolerance = parseFloat(record.upperTolerance).toFixed(record.accuracy);
      this.measurementParameter.lowerTolerance = parseFloat(record.lowerTolerance).toFixed(record.accuracy);
      this.measurementParameter.instrumentTypeId = record.instrumentType.id;
      this.measurementParameter.accuracy = record.accuracy;
      this.measurementParameter.parameterName = record.parameterManagement.name;
      this.measurementParameter.unit = record.uom.name;
      this.measurementParameter.parameterName = record.parameterManagement.name;
      this.measurementParameter.instrumentTypeCode = record.instrumentType.code;
      this.measurementParameter.parameterManagement = record.parameterManagement;
      this.measurementParameter.uom = record.uom;
      this.measurementParameter.instrumentType = record.instrumentType;
      if (record.dataTypeId !== undefined && record.dataTypeId !== null) {
        this.measurementParameter.dataType = dataTypes[0].id === record.dataTypeId ? dataTypes[0].name : dataTypes[1].name;
      } else {
        this.measurementParameter.dataType = record.dataType;
      }
      this.measurementParameter.dataTypeId = this.measurementParameter.dataType === dataTypes[0].name ? dataTypes[0].id : dataTypes[1].id;
      this.measurementParameter.chartTypeId = record.chartType !== null ? record.chartType.id : null;
      this.measurementParameter.chartType = record.chartType !== null ? record.chartType : null;
      this.measurementParameter.chartTypeName = record.chartType !== null ? record.chartType.description : '';
      this.measurementParameter.calculationPoint = (dataTypes[0].id === record.dataTypeId || this.measurementParameter.dataTypeId === dataTypes[0].id) ? Number(record.calculationPoint) : null;

    }
    return this.measurementParameter;
  }

  mapTestReportModel(testReportTab: PartTestReportTab[], recId: number): PartTestReportTab[] {
    let testReportTabDetails: PartTestReportTab[] = [];
    if (testReportTabDetails === undefined) {
      testReportTabDetails = [];
    }
    testReportTab.map(record => {
      this.testReportTabDetail = this.returnTestReportArray(record, recId);
      testReportTabDetails.push(this.testReportTabDetail);
    });
    return testReportTabDetails;
  }

  returnTestReportArray(element: any, recId: number): any {
    return {
      id: element.id,
      name: element.name ?? element.testReport.name,
      testRequirement: element.testRequirement ?? '',
      inspectionDetails: element.inspectionDetails ?? '',
      isChecked: element.isChecked,
      isEnabled: element.isEnabled,
      testReportId: this.getTestReportId(element, recId),
      sAPPartInspectionPlanId: recId ?? 0,
      testReportAttachments: element.testReportAttachments
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

  getTestReportId(element, recId: number): number {
    if (recId) {
      if (element.testReportId === undefined) {
        return element.id;
      }
      return element.testReportId;
    } else {
      return element.id;
    }
  }

  isTestReportOnEditAndExpanded(selectedTestReportTabRow: PartTestReportTab, recId: any) {
    return recId != null && selectedTestReportTabRow !== undefined
      && selectedTestReportTabRow.partTestReportAttachments !== undefined && selectedTestReportTabRow.isExpanded;
  }

  isTestReportOnEditAndNotExpanded(selectedTestReportTabRow: PartTestReportTab, recId: any) {
    return recId != null && selectedTestReportTabRow !== undefined
      && selectedTestReportTabRow.partTestReportAttachments === undefined && !selectedTestReportTabRow.isExpanded;
  }


  isSpecOnEditAndExpanded(selectedSpecRow: PartSpecModel, recId: any) {
    return recId != null && selectedSpecRow !== undefined
      && selectedSpecRow.partInspectionSpecAttachments !== undefined && selectedSpecRow.isExpanded;
  }

  isSpecOnEditAndNotExpanded(selectedSpecRow: PartSpecModel, recId: any) {
    return recId != null && selectedSpecRow !== undefined
      && selectedSpecRow.partInspectionSpecAttachments.length === 0 && !selectedSpecRow.isExpanded;
  }

  isDrawingOnEditAndExpanded(selectedDrawingRow: PartDrawingModel, recId: any) {
    return recId != null && selectedDrawingRow !== undefined
      && selectedDrawingRow.partInspectionDrawingAttachments !== undefined && selectedDrawingRow.isExpanded;
  }


  isDrawingOnEditAndNotExpanded(selectedDrawingRow: PartDrawingModel, recId: any) {
    return recId != null && selectedDrawingRow !== undefined
      && selectedDrawingRow.partInspectionDrawingAttachments.length === 0 && !selectedDrawingRow.isExpanded;
  }


  isNewRecord(recId: any) {
    return recId == null;
  }

  setPartTestReportAttachments(element: any, selectedTestReportTabRow: PartTestReportTab, savePath: string): TestReportAttachment[] {
    const partInspectionTestReportAttachment = new TestReportAttachment();
    partInspectionTestReportAttachment.attachment = new Attachment();
    partInspectionTestReportAttachment.attachment.id = element.id === Constants.Empty ? 0 : element.id;
    partInspectionTestReportAttachment.attachment.name = element.file.name;
    partInspectionTestReportAttachment.attachment.savePath = savePath;
    partInspectionTestReportAttachment.attachment.tempSavePath = element.filePath;
    if (selectedTestReportTabRow.partTestReportAttachments === undefined) {
      selectedTestReportTabRow.partTestReportAttachments = [];
      selectedTestReportTabRow.partTestReportAttachments.push(partInspectionTestReportAttachment);
    } else {
      selectedTestReportTabRow.partTestReportAttachments.push(partInspectionTestReportAttachment);
    }
    return selectedTestReportTabRow.partTestReportAttachments;
  }


  setPartDrawingAttachments(element: any, selectedPartDrawingRow: PartDrawingModel, savePath: string): PartInspectionDrawingAttachment[] {
    const partInspectionDrawingAttachment = new PartInspectionDrawingAttachment();
    partInspectionDrawingAttachment.attachment = new Attachment();
    partInspectionDrawingAttachment.attachment.id = element.id === Constants.Empty ? 0 : element.id;
    partInspectionDrawingAttachment.attachment.name = element.file.name;
    partInspectionDrawingAttachment.attachment.savePath = savePath;
    partInspectionDrawingAttachment.attachment.tempSavePath = element.filePath;
    if (selectedPartDrawingRow.partInspectionDrawingAttachments === undefined) {
      selectedPartDrawingRow.partInspectionDrawingAttachments = [];
      selectedPartDrawingRow.partInspectionDrawingAttachments.push(partInspectionDrawingAttachment);
    } else {
      selectedPartDrawingRow.partInspectionDrawingAttachments.push(partInspectionDrawingAttachment);
    }
    return selectedPartDrawingRow.partInspectionDrawingAttachments;
  }


  setPartSpecificationAttachments(element: any, selectedPartSpecRow: PartSpecModel, savePath: string): PartInspectionSpecAttachment[] {
    const partInspectionSpecAttachment = new PartInspectionSpecAttachment();
    partInspectionSpecAttachment.attachment = new Attachment();
    partInspectionSpecAttachment.attachment.id = element.id === Constants.Empty ? 0 : element.id;
    partInspectionSpecAttachment.attachment.name = element.file.name;
    partInspectionSpecAttachment.attachment.savePath = savePath;
    partInspectionSpecAttachment.attachment.tempSavePath = element.filePath;
    if (selectedPartSpecRow === undefined) {
      selectedPartSpecRow.partInspectionSpecAttachments = [];
      selectedPartSpecRow.partInspectionSpecAttachments.push(partInspectionSpecAttachment);
    } else {
      selectedPartSpecRow.partInspectionSpecAttachments.push(partInspectionSpecAttachment);
    }
    return selectedPartSpecRow.partInspectionSpecAttachments;
  }


  clearRemovedTestReportAttachments(selectedTestReportTabRow: PartTestReportTab): TestReportAttachment[] {
    selectedTestReportTabRow.removedTestReportAttachmentIds.forEach(
      attachmentId => {
        const index = selectedTestReportTabRow.partTestReportAttachments
          .indexOf(selectedTestReportTabRow.partTestReportAttachments.find(k => k.attachment.id === attachmentId), 0);
        if (index > -1) {
          selectedTestReportTabRow.partTestReportAttachments.splice(index, 1);
        }
      });
    return selectedTestReportTabRow.partTestReportAttachments;
  }

  setRemovedTestReportAttachmentIds(selectedTestReportTabRow: PartTestReportTab) {
    selectedTestReportTabRow.removedTestReportAttachmentIds = [];
    selectedTestReportTabRow.removedTestReportAttachmentIds = _.difference(selectedTestReportTabRow.originalTestReportAttachmentIds,
      selectedTestReportTabRow.currentTestReportAttachmentIds);
    return selectedTestReportTabRow.removedTestReportAttachmentIds;
  }

  setCurrentTestReportAttachmentIds(selectedTestReportTabRow: PartTestReportTab, selectedPartTestReportFiles: any): number[] {
    selectedTestReportTabRow.currentTestReportAttachmentIds = [];
    selectedTestReportTabRow.currentTestReportAttachmentIds = _.map(selectedPartTestReportFiles.testReportAttachments, (x) => Number(x.id));
    return selectedTestReportTabRow.currentTestReportAttachmentIds;
  }

  setOriginalTestReportAttachmentIds(selectedTestReportTabRow: PartTestReportTab): number[] {
    if (selectedTestReportTabRow !== undefined && selectedTestReportTabRow !== undefined) {
      selectedTestReportTabRow.originalTestReportAttachmentIds = [];
      selectedTestReportTabRow.originalTestReportAttachmentIds = JSON.parse(
        JSON.stringify(_.map(selectedTestReportTabRow.partTestReportAttachments, (x) => x.attachment.id))
      );
    }
    return selectedTestReportTabRow.originalTestReportAttachmentIds;
  }


  setRemovedDrawingAttachmentIds(selectedPartDrawingRow: PartDrawingModel) {
    selectedPartDrawingRow.removedDrawingAttachmentIds = [];
    selectedPartDrawingRow.removedDrawingAttachmentIds = _.difference(selectedPartDrawingRow.originalDrawingAttachmentIds,
      selectedPartDrawingRow.currentDrawingAttachmentIds);
    return selectedPartDrawingRow.removedDrawingAttachmentIds;
  }

  setCurrentDrawingAttachmentIds(selectedPartDrawingRow: PartDrawingModel, selectedPartDrawingFiles: any): number[] {
    selectedPartDrawingRow.currentDrawingAttachmentIds = [];
    selectedPartDrawingRow.currentDrawingAttachmentIds = _.map(selectedPartDrawingFiles.drawingAttachments, (x) => Number(x.id));
    return selectedPartDrawingRow.currentDrawingAttachmentIds;
  }

  setOriginalDrawingAttachmentIds(selectedPartDrawingRow: PartDrawingModel): number[] {
    if (selectedPartDrawingRow !== undefined && selectedPartDrawingRow !== undefined) {
      selectedPartDrawingRow.originalDrawingAttachmentIds = [];
      selectedPartDrawingRow.originalDrawingAttachmentIds = JSON.parse(
        JSON.stringify(_.map(selectedPartDrawingRow.partInspectionDrawingAttachments, (x) => x.attachment.id))
      );
    }
    return selectedPartDrawingRow.originalDrawingAttachmentIds;
  }

  clearRemovedDrawingAttachments(selectedPartDrawingRow: PartDrawingModel): PartInspectionDrawingAttachment[] {
    selectedPartDrawingRow.removedDrawingAttachmentIds.forEach(
      attachmentId => {
        const index = selectedPartDrawingRow.partInspectionDrawingAttachments
          .indexOf(selectedPartDrawingRow.partInspectionDrawingAttachments.find(k => k.attachment.id === attachmentId), 0);
        if (index > -1) {
          selectedPartDrawingRow.partInspectionDrawingAttachments.splice(index, 1);
        }
      });
    return selectedPartDrawingRow.partInspectionDrawingAttachments;
  }


  setRemovedSpecAttachmentIds(selectedPartSpecRow: PartSpecModel) {
    selectedPartSpecRow.removedSpecAttachmentIds = [];
    selectedPartSpecRow.removedSpecAttachmentIds = _.difference(selectedPartSpecRow.originalSpecAttachmentIds,
      selectedPartSpecRow.currentSpecAttachmentIds);
    return selectedPartSpecRow.removedSpecAttachmentIds;
  }

  setCurrentSpecAttachmentIds(selectedPartSpecRow: PartSpecModel, selectedPartSpecFiles: any): number[] {
    selectedPartSpecRow.currentSpecAttachmentIds = [];
    selectedPartSpecRow.currentSpecAttachmentIds = _.map(selectedPartSpecFiles.specAttachments, (x) => Number(x.id));
    return selectedPartSpecRow.currentSpecAttachmentIds;
  }

  setOriginalSpecAttachmentIds(selectedPartSpecRow: PartSpecModel): number[] {
    if (selectedPartSpecRow !== undefined && selectedPartSpecRow !== undefined) {
      selectedPartSpecRow.originalSpecAttachmentIds = [];
      selectedPartSpecRow.originalSpecAttachmentIds = JSON.parse(
        JSON.stringify(_.map(selectedPartSpecRow.partInspectionSpecAttachments, (x) => x.attachment.id))
      );
    }
    return selectedPartSpecRow.originalSpecAttachmentIds;
  }

  clearRemovedSpecAttachments(selectedPartSpecRow: PartSpecModel): PartInspectionSpecAttachment[] {
    selectedPartSpecRow.removedSpecAttachmentIds.forEach(
      attachmentId => {
        const index = selectedPartSpecRow.partInspectionSpecAttachments
          .indexOf(selectedPartSpecRow.partInspectionSpecAttachments.find(k => k.attachment.id === attachmentId), 0);
        if (index > -1) {
          selectedPartSpecRow.partInspectionSpecAttachments.splice(index, 1);
        }
      });
    return selectedPartSpecRow.partInspectionSpecAttachments;
  }

  getTestReportParameterId(record: any): any {
    if (record.testReportId === undefined) {
      this.testReportParameterId = 0;
    } else {
      this.testReportParameterId = record.id;
    }
    return this.testReportParameterId;
  }

  getSelectedTestReportRow(testReportTabDetails: PartTestReportTab[], recId: any, testReportId: any) {

    const selectedTestReportTabRow = testReportTabDetails.find(k => k.id === testReportId);

    selectedTestReportTabRow.recId = recId;

    return selectedTestReportTabRow;
  }

  getSelectedSpecRow(specificationDetails: PartSpecModel[], recId: any, record: any) {

    const selectedSpecRow = record.id !== Numbers.Default ?
      specificationDetails.find(k => k.id === record.id) : specificationDetails.find(k => k.specNumber === record.specNumber);

    if (selectedSpecRow !== undefined) {
      selectedSpecRow.recId = recId;
    }

    return selectedSpecRow;
  }

  getSelectedDrawingRow(drawingDetails: PartDrawingModel[], recId: any, record: any) {

    const selectedDrawingRow = record.id !== Numbers.Default ?
      drawingDetails.find(k => k.id === record.id) : drawingDetails.find(k => k.drawingNumber === record.drawingNumber);

    if (selectedDrawingRow !== undefined) {
      selectedDrawingRow.recId = recId;
    }
    return selectedDrawingRow;
  }

  getMPositionToleranceParameters(sapPartInspectionPlan): MPositionToleranceModel[] {
    this.mPositionTolerances = [];
    if (sapPartInspectionPlan.partMPositionTolerances !== null && sapPartInspectionPlan.partMPositionTolerances !== undefined &&
      sapPartInspectionPlan.partMPositionTolerances.length > 0) {
      sapPartInspectionPlan.partMPositionTolerances.map(record => {
        this.mPositionTolerance = new MPositionToleranceModel();
        this.mPositionTolerance = this.getMPositionToleranceModel(record);
        if (this.mPositionTolerances === undefined) {
          this.mPositionTolerances = [];
        }
        this.mPositionTolerances.push(this.mPositionTolerance);
      });
    }
    return this.mPositionTolerances;
  }

  getLPositionToleranceParameters(sapPartInspectionPlan): LPositionToleranceModel[] {
    this.lPositionTolerances = [];
    if (sapPartInspectionPlan.partLPositionTolerances !== null && sapPartInspectionPlan.partLPositionTolerances !== undefined &&
      sapPartInspectionPlan.partLPositionTolerances.length > 0) {
      sapPartInspectionPlan.partLPositionTolerances.map(record => {
        this.lPositionTolerance = new LPositionToleranceModel();
        this.lPositionTolerance = this.getLPositionToleranceModel(record);
        if (this.lPositionTolerances === undefined) {
          this.lPositionTolerances = [];
        }
        this.lPositionTolerances.push(this.lPositionTolerance);
      });
    }
    return this.lPositionTolerances;
  }

  getStateByTypeOfUser(): number {
    const currentUser = this.authService.retrieveUser();
    if (currentUser.userTypeId === UserType.Supplier) {
      return PartPlanStateType.Pending_Approval_By_Jabil;
    } else if (currentUser.userTypeId === UserType.User) {
      return PartPlanStateType.New_Inspection_Plan_Submission_Required_By_Supplier;
    } else {
      return PartPlanStateType.New_Inspection_Plan_Submission_Required_By_Supplier;
    }
  }

}
