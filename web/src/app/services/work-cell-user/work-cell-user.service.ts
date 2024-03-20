/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddWorkCellUserModel } from 'src/app/model/work-cell-user/add-work-cell-user-model';
import { WorkCellUser } from 'src/app/model/work-cell-user/work-cell-user';
import { UpdateWorkCellUserModel } from 'src/app/model/work-cell-user/update-work-cell-user-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { WorkCellSite } from 'src/app/model/work-cell-site/work-cell-site';
import { SearchOperator } from 'src/app/shared/constant/global';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class WorkCellUserService extends BaseDataService {
    private apiUrl = 'api/WorkCellUser';
    private oDataUrl = 'odata/WorkCellUser';
    Site = 'SiteId';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
        private _authService: AuthService
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddWorkCellUserModel): Observable<WorkCellUser> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateWorkCellUserModel): Observable<WorkCellUser> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<WorkCellUser> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<WorkCellUser>> {
        const url = `${this.oDataUrl}`;
        if (pageSortFilterData === undefined) {
            pageSortFilterData = new PageSortFilterInfo();
        }
        this.getFilterByColumnName(this._authService.retrieveSite().id, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            pageSortFilterData.filterInfo = [];
            return new ApiResponse<WorkCellUser>(result);
        }));
    }

    getSiteData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<WorkCellSite>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<WorkCellSite>(result);
        }));
    }

    getDataById(id: number): Observable<WorkCellUser> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new WorkCellUser());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<WorkCellUser>> {
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
}
