import { PageSortFilterInfo, FilterInfo, SortingInfo } from '../../odata-query-builder/page-sort-filter-config';
import * as _ from 'lodash';

export class BaseFilterPageSort {
    first = 0;
    pageSize = 10;
    totalRecords = 0;

    protected pageSortFilterInfo: PageSortFilterInfo = new PageSortFilterInfo();
    protected pageSortFilterInfoAudit: PageSortFilterInfo = new PageSortFilterInfo();

    constructor(_pageSortFilterInfo: PageSortFilterInfo) {
        if (_pageSortFilterInfo) {
            this.pageSortFilterInfo = _pageSortFilterInfo;
        }
    }

    updateFilter(event: any, isAuditLog = false) {
        const filterInfo = new FilterInfo();
        filterInfo.columnName = event.fieldName;
        filterInfo.columnType = event.columnType;
        filterInfo.mappingField = event.mapField;
        filterInfo.value = event.valueToFilter;

        if (isAuditLog) {
            this.pageSortFilterInfoAudit = this.updateCorrespondingFilters(this.pageSortFilterInfoAudit, filterInfo, event);
        } else {
            this.pageSortFilterInfo = this.updateCorrespondingFilters(this.pageSortFilterInfo, filterInfo, event);
        }
    }

    updateCorrespondingFilters(correspondingInfo: PageSortFilterInfo, correspondingFilterInfo: FilterInfo, event: any) {
        if (correspondingInfo.filterInfo.length > 0) {
            _.remove(correspondingInfo.filterInfo, function (obj) {
                return obj.columnName === correspondingFilterInfo.columnName;
            });
        }

        if (correspondingFilterInfo.value !== '') {
            correspondingInfo.filterInfo.push(correspondingFilterInfo);
        }

        // update pagination based on filters
        if (correspondingInfo.filterInfo.length > 0) {
            this.updatePage({ currentPage: 0, pageSize: this.pageSize });
            this.first = 0;
        } else {
            this.updatePage({ currentPage: event.currentPage, pageSize: event.pageSize });
            this.first = event.currentPage * event.pageSize;
        }

        return correspondingInfo;
    }

    updateSort(sortInfo: any[], isAuditLog = false) {

        this.pageSortFilterInfo.sortingInfo = [];
        this.pageSortFilterInfoAudit.sortingInfo = [];

        for (const info of sortInfo) {
            const typeAndMapInfo = _.split(info.field, ';');
            const sortingInfo = new SortingInfo();
            sortingInfo.columnType = typeAndMapInfo[1];
            sortingInfo.mappingField = typeAndMapInfo[2];
            sortingInfo.columnName = typeAndMapInfo[0];
            sortingInfo.sortBy = info.order === 1 ? 'asc' : 'desc';

            if (isAuditLog) {
                this.pageSortFilterInfoAudit.sortingInfo.push(sortingInfo);
            } else {
                this.pageSortFilterInfo.sortingInfo.push(sortingInfo);
            }
        }

    }

    updatePage(pageInfo: any, isAuditLog = false) {
        if (isAuditLog) {
            this.pageSortFilterInfoAudit.paginationInfo.currentPage = pageInfo.currentPage + 1;
            this.pageSortFilterInfoAudit.paginationInfo.pageSize = pageInfo.pageSize;
        } else {
            this.pageSortFilterInfo.paginationInfo.currentPage = pageInfo.currentPage + 1;
            this.pageSortFilterInfo.paginationInfo.pageSize = pageInfo.pageSize;
        }
        this.first = pageInfo.currentPage * pageInfo.pageSize;
        this.pageSize = pageInfo.pageSize;
    }

}
