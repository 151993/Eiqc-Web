import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { ColumnType } from 'src/app/model/table/table';
import { WorkCellJabilUser } from 'src/app/model/workcell-jabil-user/workcell-jabil-user';
import { AddWorkCellModel } from 'src/app/model/workcell/add-work-cell-model';
import { IDeleteWorkCellModel } from 'src/app/model/workcell/delete-work-cell-model';
import { UpdateWorkCellModel } from 'src/app/model/workcell/update-work-cell-model';
import { WorkCell } from 'src/app/model/workcell/work-cell';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root'
})
export class WorkCellService extends BaseDataService {

  private apiUrl = 'api/WorkCell';
  private oDataUrl = 'odata/WorkCell';
  private oDataGetWorkCellUrl = 'odata/WorkCell/GetWorkCellByUserAndSite';
  private oDataAllWorkCellBySiteUrl = 'odata/WorkCell/GetAllWorkCellBySite';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
    private _authService: AuthService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddWorkCellModel): Observable<WorkCell> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateWorkCellModel): Observable<WorkCell> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteWorkCellModel): Observable<WorkCell> {
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

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<WorkCell>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<WorkCell>(result);
    }));
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<WorkCell>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<WorkCell>(result);
    }));
  }

  getDataById(id: number): Observable<WorkCell> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new WorkCell());
  }

  public searchBySamAccountOrName = (input: string): Observable<any> => {
    const url = `${this.apiUrl}/SearchBySamAccountOrName/${encodeURIComponent(input)}`;

    const options: IRequestOptions = {
      headers: this.headerWithoutLoading
    };

    return super.get(url, options);
  }

  searchByField(field: string, value: string): Observable<ApiResponse<WorkCell>> {
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



  setSitePageSortFilterInfo(pageSortFilterInfo: PageSortFilterInfo): ExpandSelectCountInfo {
    pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
      {
        expand: <Record<string, ExpandSelectCountInfo>[]>
          [
            this.expandSite()
          ]
      };
    return pageSortFilterInfo.expandInfo;
  }


  expandSite(): Record<string, ExpandSelectCountInfo> {
    return {
      'Sites': <ExpandSelectCountInfo>{
        select: ['name', 'id', 'isEnabled', 'code']
      }
    };
  }

  getWorkCellByUserAndSite(userId: number, siteId: number): Observable<ApiResponse<WorkCellJabilUser>> {

    const url = `${this.oDataGetWorkCellUrl}(${'userId='}'${userId}',${'siteId='}'${siteId}')`;
    return super.getListById(url, new WorkCellJabilUser());
  }


  getWorkCellWithSite(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<WorkCell>> {
    const siteId = this._authService.retrieveSite().id;
    const url = `${this.oDataAllWorkCellBySiteUrl}(${'siteId='}'${siteId}')`;

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<WorkCell>(result);
    }));
  }



}
