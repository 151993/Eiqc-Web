import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Site } from 'src/app/model/site/site';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { SiteService } from 'src/app/services/site/site.service';
import { WorkCellService } from 'src/app/services/workcell/work-cell.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseAutoComplete } from '../base-auto-complete';


export const CUSTOM_AUTOCOMPLETE_WORKCELLSITE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteWorkCellSiteComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-work-cell-site',
  templateUrl: './j-auto-complete-work-cell-site.component.html',
  styleUrls: ['./j-auto-complete-work-cell-site.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_WORKCELLSITE_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompleteWorkCellSiteComponent extends BaseAutoComplete implements OnInit {
  pageSortFilterInfo: PageSortFilterInfo;
  @Input() workCellId: number;
  siteData: Site[] = [];

  constructor(
    private workCellService: WorkCellService, // tslint:disable-line
    private siteService: SiteService // tslint:disable-line
  ) {
    super(workCellService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getSiteList(workCellData) {
    this.siteData = [];
    workCellData.forEach(element => {
      if (element && element.sites) {
        element.sites.forEach(site => {
          const workCellSite = new Site(site);
         if (this.siteData.filter(k => k.name === workCellSite.name || k.code === workCellSite.code).length === 0) {
          workCellSite.name = workCellSite.name +  ' - ' + workCellSite.code;
          this.siteData.push(workCellSite);
         }
        });
      }
    });
  }

  getData() {
    this.GetExpandInfo();
    if (this.workCellId > 0) {
      this.getFilterByColumnName(this.workCellId, 'id', 'id', SearchOperator.IsEqualTo, ColumnType.Number, this.pageSortFilterInfo);
      this.getSiteSuggestions();
    } else {
      this.getSiteSuggestions();
    }
  }

   getSiteSuggestions() {
    this.workCellService.getAllData(this.pageSortFilterInfo).subscribe((data) => {
      this.getSiteList(data.value);
      this.autoCompleteConfig.suggestions = this.siteData;
    });
  }

  GetExpandInfo() {
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.expandInfo = this.workCellService.setSitePageSortFilterInfo(this.pageSortFilterInfo);
  }

  search(event) {
    this.GetExpandInfo();
    if (this.workCellId > 0) {
      if (this.onCompleteMethod.observers.length === 0) {
        if (event.query.trim() !== Constants.Empty) {
          this.getFilterByColumnName(this.workCellId, 'id', 'id', SearchOperator.IsEqualTo, ColumnType.Number, this.pageSortFilterInfo);
          this.getSiteSuggestionsByWorkCellName(event);
        }
      } else {
        this.onCompleteMethod.emit(event);
      }
    } else {
      this.getFilterByColumnName(event.query, this.autoCompleteConfig.mappingField, `tolower(${this.autoCompleteConfig.mappingField})`,
      SearchOperator.IsEqualTo, ColumnType.String, this.pageSortFilterInfo);
      this.getSearchSiteSuggestionsBySiteName(event);
    }
  }

  getSiteSuggestionsByWorkCellName(event: any) {
    this.workCellService
      .getAllData(this.pageSortFilterInfo)
      .subscribe(data => {
        this.getSiteList(data.value);
        this.autoCompleteConfig.suggestions = this.siteData.filter(k => k.name.toLowerCase().includes(event.query.toLowerCase()) || k.code.toLowerCase().includes(event.query.toLowerCase()));
      });
  }

  getSearchSiteSuggestionsBySiteName(event: any) {
    const sitePageSortFilterInfo = new PageSortFilterInfo();
    this.siteData = [];
    this.getFilterByMultipleColumnNames(event.query, ['name', 'code'], ['name', 'code'], [SearchOperator.Contains, SearchOperator.Contains],
    [ColumnType.String, ColumnType.String] , sitePageSortFilterInfo, FilterCondition.Or);
        this.siteService.getAllData(sitePageSortFilterInfo).subscribe((data) => {
        const sites = data.value;
        if (sites.length > 0) {
          sites.forEach(site => {
            const workCellSite = new Site(site);
            workCellSite.name = workCellSite.name +  ' - ' + workCellSite.code;
            this.siteData.push(workCellSite);
          });
          this.autoCompleteConfig.suggestions = this.siteData;
        }
      });
  }
}
