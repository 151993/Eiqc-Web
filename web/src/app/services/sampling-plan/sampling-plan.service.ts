/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient } from '../WebHttpClient';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { AuthService } from 'src/app/auth/auth.service';
import { SearchOperator } from 'src/app/shared/constant/global';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { IBaseModel } from 'src/app/model/base/base-model';
import { SamplingPlan } from 'src/app/model/sampling-plan/sampling-plan';

@Injectable({
    providedIn: 'root'
})
export class SamplingPlanService extends BaseDataService {

    private oDataPartSAPUrl = 'odata/SamplingPlanSAPData';
    Site = 'SITE';
    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
        private _authService: AuthService,
    ) {
        super(http, odataQueryBuilderService);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SamplingPlan>> {
        if (pageSortFilterData === undefined) {
            pageSortFilterData = new PageSortFilterInfo();
        }
        this.getFilterByColumnName(this.GetSiteCode(), this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
        const url = `${this.oDataPartSAPUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<SamplingPlan>(result);
        }));
    }

    addData(request: IBaseModel): Observable<IBaseModel> {
        throw new Error('Method not implemented.');
    }
    updateData(id: number, request: IBaseModel): Observable<IBaseModel> {
        throw new Error('Method not implemented.');
    }
    deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
        throw new Error('Method not implemented.');
    }
    isAlreadyExists(field: string, name: string): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    searchByField(field: string, name: string): Observable<ApiResponse<IBaseModel>> {
        throw new Error('Method not implemented.');
    }


    GetSiteCode(): string {
        const code = this._authService.retrieveSite().code;
        return code;
    }
}
