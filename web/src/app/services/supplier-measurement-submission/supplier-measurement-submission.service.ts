import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddSupplierMeasurementSubmissionModel } from 'src/app/model/supplier-measurement-submission/add-supplier-measurement-submission-model';
import { SupplierMeasurementSubmission } from 'src/app/model/supplier-measurement-submission/supplier-measurement-submission';
import { UpdateSupplierMeasurementSubmissionModel } from 'src/app/model/supplier-measurement-submission/update-supplier-measurement-submission-model';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { SupplierTestReport } from 'src/app/model/supplier-test-report/supplier-test-report';
import { Attachment } from 'src/app/model/attachment/attachment';
import { SupplierTestReportAttachment } from 'src/app/model/supplier-test-report-attachment/supplier-test-report-attachment';
import { Constants, Numbers, SearchOperator, spcChartConstants, spcChartConstantsXBarS, spcChartRangeXBarSConstants } from 'src/app/shared/constant/global';
import * as _ from 'lodash';
import { SampleSize } from 'src/app/model/sample-size/sample-size';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { AuthService } from 'src/app/auth/auth.service';
import { SupplierVisualInspectionDefectType } from 'src/app/model/defect-type-qty-parameter/defect-type-qty-parameter';
import { DateHelper } from 'src/app/shared/helpers/date-helper';
import { SupplierSpcChartCalculation } from 'src/app/model/supplier-measurement-submission/supplier-spc-chart-calculation/supplier-spc-chart-calculation';
import { SupplierSpcChartSummary } from 'src/app/model/supplier-measurement-submission/supplier-spc-chart-summary/supplier-spc-chart-summary';

@Injectable({
  providedIn: 'root'
})
export class SupplierMeasurementSubmissionService extends BaseDataService {
  private apiUrl = 'api/SupplierMeasurementSubmission';
  private oDataUrl = 'odata/SupplierMeasurementSubmission';
  private oDataUrlSAPParts = 'odata/PartMockSAPData';
  private oDataGetSampleSize = 'odata/SAPSampleSize/GetSampleSize';
  private oDataGetSupplierVisualInspectionDefectType = 'odata/SupplierVisualInspectionDefectType/GetSupplierVisualInspectionDefectTypeModelById';
  private oDataSupplierStdAvgUrl = 'odata/SupplierSpcChart/GetSPCCPKChartStandardAverage';
  private oDataSupplierSpcChartSummary = 'odata/SupplierSpcChartSummary/GetSupplierSpcChartSummary';
  actualValueMicroSection = 'ActualValueMicroSection';
  supplierTestReportParameterId: number;
  Site = 'SITE';
  Part = 'PART_NO';
  VendorCode = 'VENDOR_CODE';
  InspMethod = 'INSP_METHOD';
  Ip = 'Ip';
  protected pageSortFilterInfo: PageSortFilterInfo = new PageSortFilterInfo();
  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
    private _authService: AuthService

  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddSupplierMeasurementSubmissionModel): Observable<SupplierMeasurementSubmission> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateSupplierMeasurementSubmissionModel): Observable<SupplierMeasurementSubmission> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<SupplierMeasurementSubmission> {
    const url = `${this.apiUrl}/${id}`;
    return super.delete(url, request);
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
    return super.isExists(url);
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierMeasurementSubmission>> {
    const url = `${this.oDataUrl}`;

    if (pageSortFilterData === undefined) {
      pageSortFilterData = new PageSortFilterInfo();
    }
    this.getFilterByColumnName(this._authService.retrieveSite().code, this.Ip, SearchOperator.StartsWith, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SupplierMeasurementSubmission>(result);
    }));
  }

  getDataById(id: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierMeasurementSubmission>> {
    const url = `${this.oDataUrl}(${id})`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SupplierMeasurementSubmission>(result);
    }));
  }

  public searchSAPPartByPartNumber = (value: string): Observable<ApiResponse<SupplierMeasurementSubmission>> => {
    const url = `${this.oDataUrlSAPParts}?$filter=contains(ToLower(PartNo),'${encodeURIComponent(value)}')`;
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading
    };
    return super.get(url, options).pipe(
      map(result => {
        return new ApiResponse(result);
      })
    );
  }

  searchByField(field: string, value: string): Observable<ApiResponse<SupplierMeasurementSubmission>> {
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



  expandSMSCommentAttachment(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'SMSCommentAttachments': <ExpandSelectCountInfo>{
          expand: <Record<string, ExpandSelectCountInfo>[]>[
            {
              'attachment': <ExpandSelectCountInfo>{}
            }
          ]
        },
      },
    ];
  }



  expandSMSPOStateType(): Record<string, ExpandSelectCountInfo> {
    return {
      'smsPOStateType': <ExpandSelectCountInfo>{
      }
    };
  }

  expandInspector(): Record<string, ExpandSelectCountInfo> {
    return {
      'inspector': <ExpandSelectCountInfo>{
      }
    };
  }

  expandPurchaseOrder(): Record<string, ExpandSelectCountInfo> {
    return {
      'purchaseOrder': <ExpandSelectCountInfo>{
      }
    };
  }

  setSupplierFunctionAttributePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierFunctionAttributes()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  setSupplierVisualInspectionPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierVisualInspection()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierFunctionAttributes(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierFunctionAttributes': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandDefectTypes(),
          this.expandSupplierFunctionAttributeActual()
        ]
      }
    };
  }

  expandSupplierVisualInspection(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierVisualInspections': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          // this.expandCountParameter(),
          this.expandParameterManagement(),
          this.expandDefectTypes(),
          this.expandInspectionToolsType(),
          // this.expandSupplierVisualInspectionDefectTypes()
        ]
      }
    };
  }
  expandSupplierVisualInspectionDefectTypes(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierVisualInspectionDefectTypes': <ExpandSelectCountInfo>{
      }
    };
  }
  expandCountParameter(): Record<string, ExpandSelectCountInfo> {
    return {
      'partCountParameter': <ExpandSelectCountInfo>{
      }
    };
  }

  expandSupplierFunctionAttributeActual(): Record<string, ExpandSelectCountInfo> {
    return {
      'SupplierFunctionAttributeActuals': <ExpandSelectCountInfo>{
      }
    };
  }

  setSupplierMicroSectionPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierMicroSectionParameters()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierMicroSectionParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierMicrosectionParameters': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandInstrument(),
          this.expandSupplierMicroSectionActual(),
          this.expandChartType(),
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

  expandSupplierMicroSectionActual(): Record<string, ExpandSelectCountInfo> {
    return {
      'SupplierMicroSectionActuals': <ExpandSelectCountInfo>{
      }
    };
  }

  setSupplierDimensionMeasurementPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierDimensionMeasurements()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierDimensionMeasurements(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierDimensionMeasurements': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandInstrument(),
          this.expandSupplierDimensionMeasurementActual(),
          this.expandChartType(),
        ]
      }
    };
  }

  setSupplierFunctionVariablePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierFunctionVariables()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierFunctionVariables(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierFunctionVariables': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandParameterManagement(),
          this.expandUOM(),
          this.expandInstrumentType(),
          this.expandInstrument(),
          this.expandChartType(),
          this.expandSupplierFunctionVariableActual(),
        ]
      }
    };
  }
  expandSupplierFunctionVariableActual(): Record<string, ExpandSelectCountInfo> {
    return {
      'SupplierFunctionVariableActuals': <ExpandSelectCountInfo>{
      }
    };
  }
  expandSupplierDimensionMeasurementActual(): Record<string, ExpandSelectCountInfo> {
    return {
      'SupplierDimensionMeasurementActuals': <ExpandSelectCountInfo>{
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

  expandInstrument(): Record<string, ExpandSelectCountInfo> {
    return {
      'instrument': <ExpandSelectCountInfo>{
      }
    };
  }


  expandParameterManagement(): Record<string, ExpandSelectCountInfo> {
    return {
      'parameterManagement': <ExpandSelectCountInfo>{
        select: ['Id', 'name', 'isEnabled']
      }
    };
  }

  expandDefectTypes(): Record<string, ExpandSelectCountInfo> {
    return {
      'defectTypes': <ExpandSelectCountInfo>{
      }
    };
  }


  expandDefectType(): Record<string, ExpandSelectCountInfo> {
    return {
      'defectType': <ExpandSelectCountInfo>{
      }
    };
  }

  expandInspectionToolsType(): string {
    return 'inspectionToolsType';
  }

  expandSupplierSamplingPlans(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierSamplingPlans': <ExpandSelectCountInfo>{
      }
    };
  }

  setSupplierSapBasedParameterPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierSapBasedParameters()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierSapBasedParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierSapBasedParameters': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandCertificateTypeParameter(),
          this.expandDefectTypes()
        ]
      }
    };
  }

  expandCertificateTypeParameter(): Record<string, ExpandSelectCountInfo> {
    return {
      'certificateTypeParameter': <ExpandSelectCountInfo>{
      }
    };
  }

  setSupplierTestReportPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierTestReports()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierTestReports(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierTestReports': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandDefectType(),
        ]
      }
    };
  }


  setSupplierMPositionTolerancePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierMPositionTolerances()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierMPositionTolerances(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierMPositions': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandMPositionActuals(),
        ]
      }
    };
  }

  expandMPositionActuals(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierMPositionActuals': <ExpandSelectCountInfo>{
      }
    };
  }



  setSupplierTestReportAttachmentSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          this.expandSupplierTestReportParameterAttachment()
      };
    return pageSortFilterInfo.expandInfo;
  }

  setSupplierLPositionTolerancePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierLPositionTolerances()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierLPositionTolerances(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierLPositions': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandLPositionActuals(),
        ]
      }
    };
  }

  expandLPositionActuals(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierLPositionActuals': <ExpandSelectCountInfo>{
      }
    };
  }


  expandSupplierTestReportParameterAttachment(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'supplierTestReportAttachments': <ExpandSelectCountInfo>{
          expand: <Record<string, ExpandSelectCountInfo>[]>[
            {
              'attachment': <ExpandSelectCountInfo>{}
            }
          ]
        },
      },
    ];
  }

  expandPartTestReportParameter(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'partTestReportParameter': <ExpandSelectCountInfo>{
        },
      },
    ];
  }

  setPartDateCodePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandPartDateCode()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }


  expandPartDateCode(): Record<string, ExpandSelectCountInfo> {
    return {
      'partDateCode': <ExpandSelectCountInfo>{
      }
    };
  }

  setSupplierDateCodePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierDateCode()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierDateCode(): Record<string, ExpandSelectCountInfo> {
    return {
      'supplierDateCode': <ExpandSelectCountInfo>{
      }
    };
  }

  setSupplierBowTwistPageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSupplierBowTwist()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }

  expandSupplierBowTwist(): Record<string, ExpandSelectCountInfo> {
    return {
      'SupplierBowTwists': <ExpandSelectCountInfo>{
        expand: <Record<string, ExpandSelectCountInfo>[]>[
          this.expandPartInspectionBowTwistParameters(),
          this.expandBowTwistFormula(),
          this.expandSupplierBowTwistActual()
        ]
      }
    };
  }

  expandSupplierBowTwistActual(): Record<string, ExpandSelectCountInfo> {
    return {
      'SupplierBowTwistActuals': <ExpandSelectCountInfo>{
      }
    };
  }

  expandPartInspectionBowTwistParameters(): Record<string, ExpandSelectCountInfo> {
    return {
      'partInspectionBowTwistParameter': <ExpandSelectCountInfo>{
        // expand: <Record<string, ExpandSelectCountInfo>[]>[
        //   {
        //     'bowTwistFormula': <ExpandSelectCountInfo>{
        //     }
        //   }
        // ]
      }
    };
  }

  expandBowTwistFormula(): Record<string, ExpandSelectCountInfo> {
    return {
      'bowTwistFormulas': <ExpandSelectCountInfo>{
      }
    };
  }

  isNewRecord(recId: any) {
    return recId == null;
  }


  isSMSHasValue(sapPartInspectionPlan: any) {
    return sapPartInspectionPlan != null && sapPartInspectionPlan !== undefined;
  }

  setCurrentSupplierTestReportAttachmentIds(selectedSupplierTestReportTabRow: SupplierTestReport, selectedPartTestReportFiles: any): number[] {
    selectedSupplierTestReportTabRow.currentSupplierTestReportAttachmentIds = [];
    selectedSupplierTestReportTabRow.currentSupplierTestReportAttachmentIds = _.map(selectedPartTestReportFiles.testReportAttachments, (x) => Number(x.id));
    return selectedSupplierTestReportTabRow.currentSupplierTestReportAttachmentIds;
  }

  setOriginalSupplierTestReportAttachmentIds(selectedSupplierTestReportTabRow: SupplierTestReport): number[] {
    if (selectedSupplierTestReportTabRow !== undefined && selectedSupplierTestReportTabRow !== undefined) {
      selectedSupplierTestReportTabRow.originalSupplierTestReportAttachmentIds = [];
      selectedSupplierTestReportTabRow.originalSupplierTestReportAttachmentIds = JSON.parse(
        JSON.stringify(_.map(selectedSupplierTestReportTabRow.supplierTestReportAttachments, (x) => x.attachment.id))
      );
    }
    return selectedSupplierTestReportTabRow.originalSupplierTestReportAttachmentIds;
  }



  getSelectedSupplierTestReportRow(supplierTestReportTabDetails: SupplierTestReport[], recId: any, testReportId: any) {

    const selectedTestReportTabRow = supplierTestReportTabDetails.find(k => k.partTestReportParameterId === testReportId);

    selectedTestReportTabRow.recId = recId;

    return selectedTestReportTabRow;
  }

  setRemovedSupplierTestReportAttachmentIds(selectedSupplierTestReportTabRow: SupplierTestReport) {
    selectedSupplierTestReportTabRow.removedSupplierTestReportAttachmentIds = [];
    selectedSupplierTestReportTabRow.removedSupplierTestReportAttachmentIds = _.difference(selectedSupplierTestReportTabRow.originalSupplierTestReportAttachmentIds,
      selectedSupplierTestReportTabRow.currentSupplierTestReportAttachmentIds);
    return selectedSupplierTestReportTabRow.removedSupplierTestReportAttachmentIds;
  }

  clearRemovedSupplierTestReportAttachments(selectedSupplierTestReportTabRow: SupplierTestReport): SupplierTestReportAttachment[] {
    selectedSupplierTestReportTabRow.removedSupplierTestReportAttachmentIds.forEach(
      attachmentId => {
        const index = selectedSupplierTestReportTabRow.supplierTestReportAttachments
          .indexOf(selectedSupplierTestReportTabRow.supplierTestReportAttachments.find(k => k.attachment.id === attachmentId), 0);
        if (index > -1) {
          selectedSupplierTestReportTabRow.supplierTestReportAttachments.splice(index, 1);
        }
      });
    return selectedSupplierTestReportTabRow.supplierTestReportAttachments;
  }


  setPartTestReportAttachments(element: any, selectedSupplierTestReportTabRow: SupplierTestReport, savePath: string): SupplierTestReportAttachment[] {
    const supplierTestReportAttachment = new SupplierTestReportAttachment();
    supplierTestReportAttachment.attachment = new Attachment();
    supplierTestReportAttachment.attachment.id = element.id === Constants.Empty ? 0 : element.id;
    supplierTestReportAttachment.attachment.name = element.file.name;
    supplierTestReportAttachment.attachment.savePath = savePath;
    supplierTestReportAttachment.attachment.tempSavePath = element.filePath;
    supplierTestReportAttachment.attachment.canDelete = element.canDelete;
    supplierTestReportAttachment.savePath = savePath;
    supplierTestReportAttachment.tempSavePath = element.filePath;
    if (selectedSupplierTestReportTabRow.supplierTestReportAttachments === undefined) {
      selectedSupplierTestReportTabRow.supplierTestReportAttachments = [];
      selectedSupplierTestReportTabRow.supplierTestReportAttachments.push(supplierTestReportAttachment);
    } else {
      selectedSupplierTestReportTabRow.supplierTestReportAttachments.push(supplierTestReportAttachment);
    }
    return selectedSupplierTestReportTabRow.supplierTestReportAttachments;
  }



  getSampleSize(partNo: string, vendorCode: string, inspMethod: string, batchQuantity: number, smplProc?: any, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SampleSize>> {
    this.pageSortFilterInfo.filterInfo = [];
    const url = `${this.oDataGetSampleSize}(${'batchQuantity='}${batchQuantity},${'smplProc='}'${smplProc}')`;

    if (pageSortFilterData === undefined) {
      pageSortFilterData = new PageSortFilterInfo();
    }

    this.getFilterByColumnName(partNo, this.Part, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
    this.getFilterByColumnName(this._authService.retrieveSite().code, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
    this.getFilterByColumnName(vendorCode, this.VendorCode, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

    if (inspMethod.includes('-')) {
      const splitInspMethodChar = inspMethod.split('-')[0];
      this.getFilterByColumnName(splitInspMethodChar, this.InspMethod, SearchOperator.Contains, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
    } else {
      this.getFilterByColumnName(inspMethod, this.InspMethod, SearchOperator.Contains, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
    }

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      pageSortFilterData.filterInfo = [];
      return new ApiResponse<SampleSize>(result);
    }));
  }

  getSupplierVisualInspectionDefectTypeModelById(id: number, parameterManagementId: number): Observable<ApiResponse<SupplierVisualInspectionDefectType[]>> {
    const url = `${this.oDataGetSupplierVisualInspectionDefectType}(${'id='}${id},${'parameterManagementId='}${parameterManagementId})`;
    return super.getListById(url, new SupplierVisualInspectionDefectType());
  }

  getFileUploadId() {
    return this._authService.getUserId() + '_' + DateHelper.getDateTimeString();
  }

  getTotalSubmittedApprovedBatchQty(sapPartInspectionPlanId: number, purchaseOrderId: number): Observable<number> {
    const url = `${this.apiUrl}/GetTotalSubmittedApprovedBatchQty?sapPartInspectionPlanId=${sapPartInspectionPlanId}&purchaseOrderId=${purchaseOrderId}`;
    return super.get(url, undefined);
  }

  getSPCCPKChartStandardAverage(iP: string, countValue: number, skipValue: number, tabId: number, smsId: number): Observable<ApiResponse<SupplierSpcChartCalculation>> {
    const url = `${this.oDataSupplierStdAvgUrl}(${'iP='}'${iP}',${'countValue='}${countValue},${'skipValue='}${skipValue},${'tabId='}${tabId},${'smsId='}${smsId})`;
    return super.get(url, undefined, null).pipe(map((result) => {
      return new ApiResponse<SupplierSpcChartCalculation>(result);
    }));
  }

  getSupplierSpcChartSummary(iP: string, smsId?: number): Observable<ApiResponse<SupplierSpcChartSummary>> {
    const url = `${this.oDataSupplierSpcChartSummary}(${'iP='}'${iP}',${'smsId='}${smsId})`;
    return super.get(url, undefined, null).pipe(map((result) => {
      return new ApiResponse<SupplierSpcChartSummary>(result);
    }));
  }

  getSPCChartCalculationUSL(averageValue, stdValue) {
    return averageValue + (3 * stdValue);
  }

  getSPCChartCalculationLSL(averageValue, stdValue) {
    return averageValue - (3 * stdValue);
  }

  getSPCChartCalculationUCLForIMR(averageValue, rangeAverage) {
    return averageValue + (2.66 * rangeAverage);
  }

  getSPCChartCalculationLCLForIMR(averageValue, rangeAverage) {
    return averageValue - (2.66 * rangeAverage);
  }

  getSPCChartCalculationCpkU(upperToleranceValue, averageValue, stdValue) {
    return (upperToleranceValue - averageValue) / (3 * stdValue);
  }

  getSPCChartCalculationCpkL(lowerToleranceValue, averageValue, stdValue) {
    return (averageValue - lowerToleranceValue) / (3 * stdValue);
  }

  getSPCCPKCalculation(cpkU, cpkL) {
    return Math.min(cpkU, cpkL);
  }

  calculateSPSChartAverageStandardDeviation(supplierTabData) {
    if (supplierTabData.length > 0) {
      const spcCharCalculationModel = new SupplierSpcChartCalculation();
      let sumOfActualValues = 0;
      supplierTabData.forEach(element => {
        sumOfActualValues += Number(element.actualTextValue);
      });
      const averageValue = (sumOfActualValues / supplierTabData.length);
      const squareOfActual: any[] = [];
      supplierTabData.forEach(element => {
        squareOfActual.push(Math.pow(Number(element.actualTextValue) - averageValue, 2));
      });
      const sumOfSqr = ((squareOfActual.reduce((a, b) => a + b) / (supplierTabData.length - 1)));
      const stdValue = Math.sqrt(sumOfSqr);
      spcCharCalculationModel.averageValueFor30SMS = averageValue;
      spcCharCalculationModel.standardDeviation30 = stdValue;
      return spcCharCalculationModel;
    }
    return;
  }

  calculateSPSChartAverageStandardDeviationParameterFor25SMS(supplierTabDataParameter, parameterId?: number) {
    if (supplierTabDataParameter.length > 0) {
      const spcCharCalculationModel = new SupplierSpcChartCalculation();
      let sumOfActualValues = 0;
      const supplierTabData = supplierTabDataParameter.filter(x => x.parameterId === parameterId);

      supplierTabData.forEach(element => {
        sumOfActualValues += Number(element.finalTextValue);
      });
      const averageValue = (sumOfActualValues / supplierTabData.length);
      const squareOfActual: any[] = [];
      supplierTabData.forEach(element => {
        squareOfActual.push(Math.pow(Number(element.finalTextValue) - averageValue, 2));
      });
      const sumOfSqr = ((squareOfActual.reduce((a, b) => a + b) / (supplierTabData.length - 1)));
      const stdValue = Math.sqrt(sumOfSqr);
      spcCharCalculationModel.averageValueFor25SMS = averageValue;
      spcCharCalculationModel.standardDeviation25 = stdValue;
      return spcCharCalculationModel;
    }
    return;
  }

  calculateSPSChartAverageStandardDeviationParameterFor30SMS(supplierTabDataParameter, parameterId?: number, chartTypeId?: number) {

    if (supplierTabDataParameter.length > 0) {

      const spcCharCalculationModel = new SupplierSpcChartCalculation();
      let sumOfActualValues = 0;
      const supplierTabData = supplierTabDataParameter.filter(x => x.parameterId === parameterId && x.chartTypeId === chartTypeId);

      supplierTabData.forEach(element => {
        sumOfActualValues += Number(element.finalTextValue);
      });
      const averageValue = (sumOfActualValues / supplierTabData.length);
      const squareOfActual: any[] = [];
      supplierTabData.forEach(element => {
        squareOfActual.push(Math.pow(Number(element.finalTextValue) - averageValue, 2));
      });
      const sumOfSqr = squareOfActual.length > 0 ? ((squareOfActual?.reduce((a, b) => a + b) / (supplierTabData.length - 1))) : 0;
      const stdValue = Math.sqrt(sumOfSqr);
      spcCharCalculationModel.averageValueFor30SMS = averageValue;
      spcCharCalculationModel.standardDeviation30 = stdValue;
      return spcCharCalculationModel;
    }
    return;
  }

  getSPCChartCalculationRBar(supplierTabData) {
    let sumOfRRange = 0;
    if (supplierTabData.length > 0) {
      supplierTabData.forEach(element => {
        sumOfRRange += Number(element.finalTextValue);
      });
      const averageValue = (sumOfRRange / supplierTabData.length);
      return averageValue;
    }
    return;
  }

  getUCLRandLCLRCalculationForRangeXBarR(rangeXBarRAverage, sampleSize) {

    let uclR;
    let lclR;
    if (rangeXBarRAverage !== null) {
      const spcConstantData = spcChartConstants.filter(x => x.id === Number(sampleSize))[Numbers.Default];
      if (spcConstantData !== undefined && sampleSize < Numbers.Twenty) {
        uclR = this.getSPCChartCalculationUCLRandLCR(rangeXBarRAverage, spcConstantData.d4);
        lclR = this.getSPCChartCalculationUCLRandLCR(rangeXBarRAverage, spcConstantData.d3);
      } else {
        if (sampleSize !== 0 && sampleSize > Numbers.Twenty) {
          const spcConstantDefaultTwenty = spcChartConstants.filter(x => x.id === Number(Numbers.Twenty))[Numbers.Default];
          uclR = this.getSPCChartCalculationUCLRandLCR(rangeXBarRAverage, spcConstantDefaultTwenty.d4);
          lclR = this.getSPCChartCalculationUCLRandLCR(rangeXBarRAverage, spcConstantDefaultTwenty.d3);
        }
      }
      return { uclR, lclR };
    }

  }

  getSPCChartCalculationUCLRandLCR(rangeXBarRAverage, xBarConstantValue) {
    return (rangeXBarRAverage * xBarConstantValue);
  }

  getSPCChartCalculationUCL(averageValueFor25SMS, standardDeviation25, sampleSize) {
    let ucl;

    const spcConstantDataXBarS = spcChartConstantsXBarS.filter(x => x.id === Number(sampleSize))[Numbers.Default];
    if (spcConstantDataXBarS !== undefined && sampleSize < Numbers.Hundred) {
      ucl = averageValueFor25SMS + (standardDeviation25 * spcConstantDataXBarS.a3);
    } else {
      if (sampleSize !== 0 && sampleSize > Numbers.Hundred) {
        const spcConstantDefaultHundred = spcChartConstantsXBarS.filter(x => x.id === Number(Numbers.Hundred))[Numbers.Default];
        ucl = averageValueFor25SMS + (standardDeviation25 * spcConstantDefaultHundred.a3);
      }
    }
    return (ucl);
  }

  getSPCChartCalculationLCL(averageValueFor25SMS, standardDeviation25, sampleSize) {
    let lcl;
    const spcConstantDataXBarS = spcChartConstantsXBarS.filter(x => x.id === Number(sampleSize))[Numbers.Default];
    if (spcConstantDataXBarS !== undefined && sampleSize < Numbers.Hundred) {
      lcl = averageValueFor25SMS - (standardDeviation25 * spcConstantDataXBarS.a3);
    } else {
      if (sampleSize !== 0 && sampleSize > Numbers.Hundred) {
        const spcConstantDefaultHundred = spcChartConstantsXBarS.filter(x => x.id === Number(Numbers.Hundred))[Numbers.Default];
        lcl = averageValueFor25SMS - (standardDeviation25 * spcConstantDefaultHundred.a3);
      }
    }
    return (lcl);
  }

  getUCLRandLCLRCalculationForRangeXBarS(rangeXBarRAverage, sampleSize) {
    let uclR;
    let lclR;
    if (rangeXBarRAverage !== null) {
      const spcConstantData = spcChartRangeXBarSConstants.filter(x => x.id === Number(sampleSize))[Numbers.Default];
      if (spcConstantData !== undefined && sampleSize < Numbers.Forty) {
        uclR = this.getSPCChartCalculationUCLRandLCR(rangeXBarRAverage, spcConstantData.b4);
        lclR = this.getSPCChartCalculationUCLRandLCR(uclR, spcConstantData.b3);
      } else {
        if (sampleSize !== 0 && sampleSize > Numbers.Forty) {
          const spcConstantDefaultForty = spcChartRangeXBarSConstants.filter(x => x.id === Number(Numbers.Forty))[Numbers.Default];
          uclR = this.getSPCChartCalculationUCLRandLCR(rangeXBarRAverage, spcConstantDefaultForty.b4);
          lclR = this.getSPCChartCalculationUCLRandLCR(uclR, spcConstantDefaultForty.b3);
        }
      }
      return { uclR, lclR };
    }
  }
}
