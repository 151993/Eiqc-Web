import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes, ComponentType } from 'src/app/shared/constant/global';
import { AuditLog } from 'src/app/model/audit-log/audit-log';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AuditModalComponent } from 'src/app/shared/controls/modal/auditModal/audit-modal/audit-modal.component';

@Component({
  selector: 'app-audit-log-list',
  templateUrl: './audit-log-list.component.html',
  styleUrls: ['./audit-log-list.component.css']
})
export class AuditLogListComponent extends BaseListComponent implements OnInit {
  @Input() recordId: number;
  @Input() entity: AuditLogEntityTypes;
  isPopup = false;
  // START : Display Time
  @Input() displayTime = true;
  // END : Display Time

  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: AuditLogService, // tslint:disable-line
    authService: AuthService,
    auditLogService: AuditLogService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    csvExportService: CSVExportService,
    modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
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
      csvExportService,
      new PageSortFilterInfo(new AuditLog())
    );
    this.displayColumns = new AuditLog().displayColumns();
  }

  ngOnInit() {
    this.route.data.subscribe(params => {
      if (params && params.action) {
        this.isPopup = params.action === ComponentType.List ? true : false;
      }
    });

    this.fileName = AuditLogEntityTypes.AuditTrail;
    this.isAuditLog = true;

    this.cdr.detectChanges();
  }

  getData() {
    this.dataSource = null;
    if (this.recordId) {

      this.auditLogService
        .getAuditLogByEntityId(
          this.recordId,
          this.entity,
          this.pageSortFilterInfoAudit
        )
        .subscribe(data => {
          this.totalRecords = data.count;
          this.dataSource = data.value;
        });
    } else {
      this.pageSortFilterInfo = this.pageSortFilterInfoAudit;
      this.pageSortFilterInfo.entity = new AuditLog();
      super.getData();
    }
  }

  onExportEvent(event) {
    const pageSortFilterInfoClone = Object.create(this.pageSortFilterInfoAudit);
    pageSortFilterInfoClone.paginationInfo.pageSize = 0;

    if (this.recordId) {
      this.auditLogService
        .getAuditLogByEntityId(
          this.recordId,
          this.entity,
          pageSortFilterInfoClone
        )
        .subscribe(data => {
          this.csvExportService.ExportCSV(
            event.dataColumn,
            data.value,
            event.fileName
          );
        });
    } else {
      this.apiDataService
        .getAllData(pageSortFilterInfoClone)
        .subscribe(data => {
          this.csvExportService.ExportCSV(
            event.dataColumn,
            data.value,
            event.fileName
          );
        });
    }
  }

  detailSelected(record: any): void {
    const modalRef = this.modalService.open(AuditModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });

    modalRef.componentInstance.recordId = record.id;
    modalRef.componentInstance.detail = record;
  }

  close() {
    this.isPopup ? this._router.navigate(['../']) : this.closeClickedEvent.emit();
  }
}
