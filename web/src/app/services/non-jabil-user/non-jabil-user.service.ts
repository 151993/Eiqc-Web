/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddNonJabilUserModel } from 'src/app/model/non-jabil-user/add-non-jabil-user-model';
import { NonJabilUser } from 'src/app/model/non-jabil-user/non-jabil-user';
import { UpdateNonJabilUserModel } from 'src/app/model/non-jabil-user/update-non-jabil-user-model';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { SearchOperator, UserType } from 'src/app/shared/constant/global';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NonJabilUserService extends BaseDataService {
    private apiUrl = 'api/User';
    private oDataUrl = 'odata/User';
    private columnName = 'userTypeId';
    Site = 'SiteId';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
        private _authService: AuthService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddNonJabilUserModel): Observable<NonJabilUser> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateNonJabilUserModel): Observable<NonJabilUser> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<NonJabilUser> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<NonJabilUser>> {
        const url = `${this.oDataUrl}`;
        if (!pageSortFilterData) {
            pageSortFilterData = new PageSortFilterInfo();
        }
        if (pageSortFilterData.filterInfo.length === 0 || pageSortFilterData.filterInfo.find(x  => x.columnName === 'userTypeId' && x.value === UserType.Supplier) === undefined) {
            const supplierUserTypeFilterInfo = new FilterInfo();
            supplierUserTypeFilterInfo.columnName = this.columnName;
            supplierUserTypeFilterInfo.columnType = ColumnType.Number;
            supplierUserTypeFilterInfo.mappingField = '';
            supplierUserTypeFilterInfo.value = UserType.Supplier;
            supplierUserTypeFilterInfo.operator = SearchOperator.IsEqualTo;
            supplierUserTypeFilterInfo.filterCondition = FilterCondition.Or;
            pageSortFilterData.filterInfo.push(supplierUserTypeFilterInfo);
        }

        if (pageSortFilterData.filterInfo.length === 0 || pageSortFilterData.filterInfo.find(x  => x.columnName === 'userTypeId' && x.value === UserType.Customer) === undefined) {
            const customerUserTypeFilterInfo = new FilterInfo();
            customerUserTypeFilterInfo.columnName = this.columnName;
            customerUserTypeFilterInfo.columnType = ColumnType.Number;
            customerUserTypeFilterInfo.mappingField = '';
            customerUserTypeFilterInfo.value = UserType.Customer;
            customerUserTypeFilterInfo.operator = SearchOperator.IsEqualTo;
            customerUserTypeFilterInfo.filterCondition = FilterCondition.Or;
            pageSortFilterData.filterInfo.push(customerUserTypeFilterInfo);
        }

        this.getFilterByColumnName(this._authService.retrieveSite().id, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<NonJabilUser>(result);
        }));
    }

    getDataById(id: number): Observable<NonJabilUser> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new NonJabilUser());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<NonJabilUser>> {
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
