/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddSiteModel } from 'src/app/model/site/add-site-model';
import { Site } from 'src/app/model/site/site';
import { UpdateSiteModel } from 'src/app/model/site/update-site-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class SiteService extends BaseDataService {
    private apiUrl = 'api/Site';
    private oDataUrl = 'odata/Site';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddSiteModel): Observable<Site> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateSiteModel): Observable<Site> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<Site> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=${field} eq '${encodeURIComponent(name)}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Site>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<Site>(result);
        }));
    }

    getDataById(id: number): Observable<Site> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new Site());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<Site>> {
        const capitalLetterValue = value?.charAt(0).toUpperCase() + value.slice(1);
        const url = `${this.oDataUrl}?$filter=contains(tolower(${field}),'${encodeURIComponent(value)}') or contains(${field},'${encodeURIComponent(capitalLetterValue)}')`;
        const options: IRequestOptions = {
            headers: this.headerWithoutLoading
        };
        return super.get(url, options).pipe(
            map(result => {
                return new ApiResponse(result);
            })
        );
    }

    syncFromTM1(): Observable<boolean> {
        const url = `${this.apiUrl}/SyncSiteFromTM1`;
        return super.get(url, undefined);
    }

    getTM1LastSyncDate(): Observable<any> {
        const url = `${this.apiUrl}/GetTM1LastSyncDate`;
        return super.get(url, undefined);
    }
}
