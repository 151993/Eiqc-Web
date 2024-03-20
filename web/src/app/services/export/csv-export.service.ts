import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ColumnInfo, TableColumn, ColumnType } from 'src/app/model/table/table';
import * as moment from 'moment-timezone';

export interface IExportService {
  getRecDisplayName(rec: any, mapField: string);
  getRecDisplayNameMulti(rec: any[], mapField: string);
}


@Injectable()
export class CSVExportService implements IExportService {

  showInactiveStatus = true;

  getRecDisplayName(rec: any, mapField: string) {
    if (rec) {
      const trans = this.translateService;
      if (this.showInactiveStatus) {
        return rec.isEnabled ? rec[mapField] : `${rec[mapField]} (${trans.instant('Label.Disabled')})`;
      }
      return rec[mapField];
    }
  }

  getRecDisplayNameMulti(rec: any[], mapField: string) {
    if (rec) {
      const trans = this.translateService;
      const obj = this;
      return _.map(rec, function (el) {
        if (obj.showInactiveStatus) {
          return el.isEnabled ? el[mapField] : `${el[mapField]} (${trans.instant('Label.Disabled')})`;
        }
        return el[mapField];
      }).join(', ');
    }
  }

  constructor(private translateService: TranslateService) {
  }

  ExportCSV(dataColumn: TableColumn[], data: any, filename: string = 'download') {
    const timezone = JSON.parse(localStorage.getItem('timezone'));
    filename = `${filename}_${moment.tz(new Date(), timezone).format('MM-DD-YYYY_HH-mm-ss')}`;

    const csvData = this.convertToCSV(dataColumn, data);
    const link: any = document.createElement('a');
    link.setAttribute('style', 'display:none;');
    document.body.appendChild(link);
    const blob = new Blob([csvData], { type: 'text/csv' });
    link.href = window.URL.createObjectURL(blob);

    const isIE = !!(<any>document).documentMode;

    if (isIE) {
      navigator.msSaveBlob(blob, filename + '.csv');
    } else {
      link.download = filename + '.csv';
    }
    link.click();
    link.remove();
  }

  private convertToCSV(dataColumn: TableColumn[], data: any): string {
    const head = [];
    const col = [];
    const delimiter = ',';
    let row = '';

    const trans = this.translateService;
    // creating the header
    for (const item of dataColumn) {
      head.push(item.header);
      if (item.field === 'enable_Display') {
        col.push('isEnabled');
      } else {
        col.push(item.field);
      }

      row += trans.instant('Label.' + item.header) + delimiter;
    }

    row += '\r\n';
    //  start with the rows
    for (const dataset of data) {
      let line = '';
      for (let i = 0; i < col.length; i++) {
        const column = dataColumn.filter(x => x.header === head[i])[0];
        let dataToAdd = dataset[col[i]];
        if (dataToAdd == null || dataToAdd === undefined) {
          dataToAdd = '';
        } else if (typeof (dataToAdd) === 'object') {
          const colInfo: ColumnInfo = column.columnInfo;
          if (colInfo.type === ColumnType.MultiStatus) {
            dataToAdd = this.getRecDisplayNameMulti(dataToAdd, colInfo.mappingField);
          } else {
            dataToAdd = this.getRecDisplayName(dataToAdd, colInfo.mappingField);
          }
        } else if (typeof (dataToAdd) === 'boolean' && column.header === this.translateService.instant('Status')) {
          dataToAdd = dataToAdd ? this.translateService.instant('Label.Enabled') : this.translateService.instant('Label.Disabled');
        } else if (typeof (dataToAdd) === 'boolean') {
          dataToAdd = dataToAdd ? this.translateService.instant('Label.Yes') : this.translateService.instant('Label.No');
        } else if (typeof (dataToAdd) === 'string' && column.header === this.translateService.instant('CreatedDate')) {
          const timezone = JSON.parse(localStorage.getItem('timezone'));
          dataToAdd = moment(new Date(dataToAdd)).tz(timezone).format('MMM DD, YYYY, hh:mm:ss A');
        }

        line += '"' + dataToAdd + '"' + delimiter;

      }
      row += line + '\r\n';
    }
    return row;
  }
}
