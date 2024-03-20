import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseFilterPageSort } from 'src/app/shared/base/base-filter-page-sort/base-filter-page-sort';
import { AuditLog } from 'src/app/model/audit-log/audit-log';

@Component({
  selector: 'app-audit-modal',
  templateUrl: './audit-modal.component.html',
  styleUrls: ['./audit-modal.component.css']
})
export class AuditModalComponent extends BaseFilterPageSort implements OnInit, OnDestroy {

  recordId: number;
  entity: AuditLogEntityTypes;

  // START : Display Time
  @Input() displayTime = true;
  // END : Display Time

  // Display AuditLog Details
  @Input() detail = false;

  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private activeModal: NgbActiveModal) {
    super(new PageSortFilterInfo(new AuditLog()));
  }

  ngOnInit() {
  }

  close() {
    this.activeModal.dismiss('X');
    this.closeClickedEvent.emit();
  }

  ngOnDestroy(): void {
  }
}
