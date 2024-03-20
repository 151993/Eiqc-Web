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
import { IBaseModel } from 'src/app/model/base/base-model';
import { CommodityClassification } from 'src/app/model/commodity/commodity-classification';

@Injectable({
    providedIn: 'root'
})
export class CommodityClassificationService extends BaseDataService {


    private oDataUrl = 'odata/CommodityClassification';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
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

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<CommodityClassification>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<CommodityClassification>(result);
        }));
    }

    syncFromSAPData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<CommodityClassification>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<CommodityClassification>(result);
        }));
    }
}
