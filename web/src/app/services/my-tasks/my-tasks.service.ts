/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

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
import { ApproveRejectSAPPartInspectionPlanModel } from 'src/app/model/sap-part-inspection-plan/approve-reject-sap-part-inspection-plan-model';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { AssignReassignSAPPartInspectionPlanToUserModel } from '../../model/sap-part-inspection-plan/assign-reassign-sap-part-inspection-plan-to-user-model';
import { SearchOperator } from 'src/app/shared/constant/global';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MyTasksService extends BaseDataService {
    private apiUrl = 'api/SAPPartInspectionPlan';
    private oDataUrl = 'odata/SAPPartInspectionPlan';
    private oDataDccTaskUrl = 'odata/SAPPartInspectionPlan/GetDccTasksData';
    private oDataSQEDCCApprovedDataByUserUrl = 'odata/SAPPartInspectionPlan/GetSQEDCCApprovedDataByUser';
    private oDataApprovedRejectDataByUserUrl = 'odata/SAPPartInspectionPlan/GetApprovedRejectDataByUser';
    private oDataApprovedRejectedDataBySite = 'odata/SAPPartInspectionPlan/GetApprovedRejectedDataBySite';
    Site = 'Ip';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
        private _authService: AuthService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: IBaseModel): Observable<IBaseModel> {
        throw new Error('Method not implemented.');
    }
    updateData(id: number, request: ApproveRejectSAPPartInspectionPlanModel): Observable<SAPPartInspectionPlan> {
        const url = `${this.apiUrl}/ApproveReject/${id}`;
        return super.update(url, request);
    }
    deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
        throw new Error('Method not implemented.');
    }
    isAlreadyExists(field: string, name: string): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<MyTasks>> {
        const url = `${this.oDataUrl}`;
        if (pageSortFilterData === undefined) {
            pageSortFilterData = new PageSortFilterInfo();
        }
        this.getFilterByColumnName(this._authService.retrieveSite().code, this.Site, SearchOperator.StartsWith, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<MyTasks>(result);
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
        const siteId = this._authService.retrieveSite().id;
        const url = `${this.oDataDccTaskUrl}(${'siteId='}${siteId})`;
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

    getApprovedRejectDataByUser(userId: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<MyTasks>> {
        const url = `${this.oDataApprovedRejectDataByUserUrl}(${'userId='}${userId})`;

        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {

            return new ApiResponse<MyTasks>(result);

        }));

    }

    getApprovedRejectedDataBySite(siteId: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<MyTasks>> {
        const url = `${this.oDataApprovedRejectedDataBySite}(${'siteId='}${siteId})`;

        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {

            return new ApiResponse<MyTasks>(result);

        }));

    }
}
