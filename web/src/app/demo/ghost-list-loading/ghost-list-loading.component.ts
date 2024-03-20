import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
// import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
// import { Automapper } from 'src/app/shared/automapper/automapper';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { AuthService } from 'src/app/auth/auth.service';
import { BaseModel } from 'src/app/model/base/base-model';

@Component({
  selector: 'app-ghost-list-loading',
  templateUrl: './ghost-list-loading.component.html',
  styleUrls: ['./ghost-list-loading.component.css'],
})
export class GhostListLoadingComponent extends BaseListComponent
  implements OnInit {
  dataLoading = true;

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: BaseDataService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    authService: AuthService,
    auditLogService: AuditLogService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
  ) {
    super(
      authService,
      auditLogService,
      modalService,
      translateService,
      notificationService,
      _router,
      _activatedRoute,
      _apiService,
      _csvExportService,
      new PageSortFilterInfo(new BaseModel())
    );
  }

  ngOnInit() {
    this.fileName = 'Download';
  }

  getData() {
    this.dataLoading = true;
    this.dataSource = null;
    this.apiDataService
      .getAllData(this.pageSortFilterInfo)
      .subscribe((data) => {
        setTimeout(() => {
          this.totalRecords = data.count;
          this.dataSource = data.value;
          this.dataLoading = false;
        }, 10000);
      });
  }
}
