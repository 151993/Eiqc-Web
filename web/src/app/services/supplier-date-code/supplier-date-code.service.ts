/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { SupplierDateCode } from 'src/app/model/supplier-date-code/supplier-date-code';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IBaseModel } from 'src/app/model/base/base-model';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class SupplierDateCodeService extends BaseDataService {

    private supplierDateTimeApiUrl = 'api/SupplierDateCode/GetFirstDateOfWeek';
    private oDataUrl = 'odata/SupplierDateCode';

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
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierDateCode>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<SupplierDateCode>(result);
        }));
    }


    getFirstDateOfWeek(year: number, userTypeId: number): Observable<any> {
        const url = `${this.supplierDateTimeApiUrl}(${'year='}${year},${'weekOfYear='}${userTypeId})`;
        return super.get(url, undefined);
      }


    getDataById(id: number): Observable<SupplierDateCode> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new SupplierDateCode());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<SupplierDateCode>> {
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
