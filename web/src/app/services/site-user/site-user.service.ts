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
import { SiteUser } from 'src/app/model/siteuser/site-user';
import { AddSiteUserModel } from 'src/app/model/siteuser/add-site-user-model';
import { UpdateSiteUserModel } from 'src/app/model/siteuser/update-site-user-model';
import { AuthService } from 'src/app/auth/auth.service';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { SearchOperator } from 'src/app/shared/constant/global';

@Injectable({
    providedIn: 'root'
})
export class SiteUserService extends BaseDataService {
    private apiUrl = 'api/SiteUser';
    private oDataUrl = 'odata/SiteUser';
    Site = 'SiteId';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
        private _authService: AuthService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddSiteUserModel): Observable<SiteUser> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateSiteUserModel): Observable<SiteUser> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<SiteUser> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=${field} eq '${encodeURIComponent(name)}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SiteUser>> {
        const url = `${this.oDataUrl}`;

        if (pageSortFilterData === undefined) {
            pageSortFilterData = new PageSortFilterInfo();
        }
        this.getFilterByColumnName(this._authService.retrieveSite().id, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<SiteUser>(result);
        }));
    }

    getDataById(id: number): Observable<SiteUser> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new SiteUser());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<SiteUser>> {
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

    public searchByName = (input: string): Observable<any> => {
        const url = `${this.apiUrl}/SearchByName/${encodeURIComponent(input)}`;

        const options: IRequestOptions = {
          headers: this.headerWithoutLoading
        };

        return super.get(url, options);
      }
}
