/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { PartInspectionManufacturePartNumber } from 'src/app/model/part-inspection-manufacture-part-number/part-inspection-manufacture-part-number';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { IBaseModel } from 'src/app/model/base/base-model';

@Injectable({
    providedIn: 'root'
})
export class PartInspectionManufacturePartNumberService extends BaseDataService {

    private apiUrl = 'api/PartInspectionManufacturePartNumber';
    private oDataUrl = 'odata/PartInspectionManufacturePartNumber';

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
    deleteData(id: number, request: IDeleteModel): Observable<PartInspectionManufacturePartNumber> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PartInspectionManufacturePartNumber>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<PartInspectionManufacturePartNumber>(result);
        }));
    }

    getDataById(id: number): Observable<ApiResponse<PartInspectionManufacturePartNumber>> {
        const url = `${this.oDataUrl}(${id})`;
    return super.get(url, undefined).pipe(map((result) => {
      return new ApiResponse<PartInspectionManufacturePartNumber>(result);
    }));
    }

    searchByField(field: string, value: string): Observable<ApiResponse<PartInspectionManufacturePartNumber>> {
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
