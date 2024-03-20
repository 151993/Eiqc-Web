
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { IBaseModel } from 'src/app/model/base/base-model';
import { MyTasks } from 'src/app/model/my-tasks/my-tasks';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { AssignReassignSAPPartInspectionPlanToUserModel } from '../../model/sap-part-inspection-plan/assign-reassign-sap-part-inspection-plan-to-user-model';
import { SMSMyTasks } from 'src/app/model/sms-my-tasks/sms-my-tasks';
import { ApproveRejectSupplierMeasurementSubmissionPlanModel } from 'src/app/model/supplier-measurement-submission/approve-reject-sap-part-inspection-plan-model';
import { SupplierMeasurementSubmission } from 'src/app/model/supplier-measurement-submission/supplier-measurement-submission';

@Injectable({
  providedIn: 'root'
})
export class SMSMyTasksService extends BaseDataService {
  private apiUrl = 'api/SupplierMeasurementSubmission';
  private oDataUrl = 'odata/SupplierMeasurementSubmission';
  private oDataDccTaskUrl = 'odata/SAPPartInspectionPlan/GetDccTasksData';
  private oDataSQEDCCApprovedDataByUserUrl = 'odata/SupplierMeasurementSubmission/GetSQEDCCApprovedDataByUser';
  Site = 'Ip';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  updateData(id: number, request: ApproveRejectSupplierMeasurementSubmissionPlanModel): Observable<SupplierMeasurementSubmission> {
    const url = `${this.apiUrl}/ApproveReject/${id}`;
    return super.update(url, request);
  }
  deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SMSMyTasks>> {
    const url = `${this.oDataUrl}`;
    if (pageSortFilterData === undefined) {
      pageSortFilterData = new PageSortFilterInfo();
    }
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SMSMyTasks>(result);
    }));
  }

  getDataById(id: number): Observable<MyTasks> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new MyTasks());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<MyTasks>> {
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

  getDccTasksData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<MyTasks>> {
    const url = `${this.oDataDccTaskUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {

      return new ApiResponse<MyTasks>(result);

    }));

  }

  AssignReassignToUser(id: number, request: AssignReassignSAPPartInspectionPlanToUserModel): Observable<SAPPartInspectionPlan> {
    const url = `${this.apiUrl}/AssignReassign/${id}`;
    return super.update(url, request);
  }

  getSQEDCCApprovedDataByUserUrl(userTypeId: number, userId: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<MyTasks>> {

    const url = `${this.oDataSQEDCCApprovedDataByUserUrl}(${'userTypeId='}${userTypeId},${'userId='}${userId})`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {

      return new ApiResponse<MyTasks>(result);

    }));

  }

  getApprovedRejectDataByUser(userId: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SMSMyTasks>> {

    const url = `${this.apiUrl}`;

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {

      return new ApiResponse<SMSMyTasks>(result);

    }));

  }
}
