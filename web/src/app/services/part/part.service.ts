/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddPartModel } from 'src/app/model/part/add-part-model';
import { Part } from 'src/app/model/part/part';
import { UpdatePartModel } from 'src/app/model/part/update-part-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { Commodity } from 'src/app/model/commodity/commodity';
import { AuthService } from 'src/app/auth/auth.service';
import { SearchOperator } from 'src/app/shared/constant/global';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';

@Injectable({
    providedIn: 'root'
})
export class PartService extends BaseDataService {
    private apiUrl = 'api/Part';
    private oDataUrl = 'odata/Part';
    private oDataMockUrl = 'odata/PartMockData';
    private oDataPartSAPUrl = 'odata/PartSAPData';
    private oDataCommodityUrl = 'odata/Commodity/GetCommodityByPart';
    Site = 'SITE';
    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
        private _authService: AuthService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddPartModel): Observable<Part> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdatePartModel): Observable<Part> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<Part> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Part>> {
        if (pageSortFilterData === undefined) {
            pageSortFilterData = new PageSortFilterInfo();
        }
        this.getFilterByColumnName(this.GetSiteCode(), this.Site, SearchOperator.Contains, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
        const url = `${this.oDataPartSAPUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<Part>(result);
        }));
    }

    getPartDataById(id: number): Observable<Part> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new Part());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<Part>> {
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

    getSAPData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Part>> {
        const url = `${this.oDataMockUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<Part>(result);
        }));
    }

    syncFromSAP(): Observable<boolean> {
        const url = `${this.apiUrl}/SyncPartFromSAP`;
        return super.get(url, undefined);
    }

    getSAPLastSyncDate(): Observable<any> {
        const url = `${this.apiUrl}/GetSAPLastSyncDate`;
        return super.get(url, undefined);
    }

    getCommodityByPart(part: string, code: string): Observable<ApiResponse<Commodity>> {
        const url = `${this.oDataCommodityUrl}(${'part='}'${part}',${'siteCode='}'${code}')`;
        return super.getListById(url, new Commodity());
    }

    getCAFNoPrefix(siteId: number, workCellId: number): Observable<string> {
        const url = `${this.apiUrl}/GetCAFNoPrefix?siteId=${siteId}&workCellId=${workCellId}`;
        return super.get(url, undefined);
    }

    GetSiteCode(): string {
        const code = this._authService.retrieveSite().code;
        return code;
    }
}
