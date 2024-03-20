
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddRoleModel } from 'src/app/model/role/add-role-model';
import { Role } from 'src/app/model/role/role';
import { UpdateRoleModel } from 'src/app/model/role/update-role-model';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseDataService {
  private apiUrl = 'api/Role';
  private oDataUrl = 'odata/Role';
  private oDataUrlForNonJabilUser = 'odata/Role/GetRoleForNonJabilUser';
  private oDataUrlForJabilUser = 'odata/Role/GetRoleForJabilUser';


  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddRoleModel): Observable<Role> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateRoleModel): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return super.delete(url, request);
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.createFilter(name, field);
    pageSortFilterInfo.expandInfo = {
      select: ['id'],
    };

    return super.isExists(this.oDataUrl, pageSortFilterInfo);
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Role>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(
      map(result => {
        return new ApiResponse<Role>(result);
      })
    );
  }

  getDataById(id: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Role>> {
    const url = `${this.oDataUrl}(${id})`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<Role>(result);
    }));
  }


  searchByField(field: string, value: string): Observable<ApiResponse<Role>> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading,
    };

    pageSortFilterInfo.createFilter(value, field, ColumnType.String, Constants.Empty, SearchOperator.Contains);

    return super.get(this.oDataUrl, options, pageSortFilterInfo).pipe(
      map((result) => {
        return new ApiResponse(result);
      })
    );
  }

  getRoleForNonJabilUser(): Observable<ApiResponse<Role>> {
    const url = `${this.oDataUrlForNonJabilUser}`;
    return super.get(url, undefined).pipe(map((result) => {
      return new ApiResponse<Role>(result);
    }));
  }

  expandRoleEnum(): Record<string, ExpandSelectCountInfo> {
    return {
      'roleEnum': <ExpandSelectCountInfo>{
      }
    };
  }

  getRoleForJabilUser(): Observable<ApiResponse<Role>> {
    const url = `${this.oDataUrlForJabilUser}`;
    return super.get(url, undefined).pipe(map((result) => {
      return new ApiResponse<Role>(result);
    }));
  }

  getDataByIds(ids: number[]): Observable<ApiResponse<Role>> {
    const pageSortFilterInfo = new PageSortFilterInfo();

    ids.forEach((id: number) => {
      pageSortFilterInfo.createFilter(id, 'id', ColumnType.Number, Constants.Empty, SearchOperator.IsEqualTo, FilterCondition.Or);
    });
    return super.get(this.oDataUrl, undefined, pageSortFilterInfo).pipe(map((result) => {
      return new ApiResponse(result);
    }));
  }
}
