import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';

@Component({
  selector: 'app-audit-log-detail',
  templateUrl: './audit-log-detail.component.html',
  styleUrls: ['./audit-log-detail.component.css']
})
export class AuditLogDetailComponent implements OnInit {
  displayColumns = [
    { field: 'fieldName', header: 'Field', isVisible: true, isExport: true },
    { field: 'oldValue', header: 'OldValue', isVisible: true, isExport: true },
    { field: 'newValue', header: 'NewValue', isVisible: true, isExport: true }
  ];

  source: any;
  // START : Audit metadata
  _localAuditMeta: any;
  @Input()
  public set auditMeta(_data: any) {
    this._localAuditMeta = _data;
    this.source = _data.auditData.logData.modifiedFields;

  }
  public get auditMeta(): any {
    return this._localAuditMeta;
  }
  // END : Audit metadata

  fileName = AuditLogEntityTypes.AuditTrailDetail;

  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  close() {
    this.closeClickedEvent.emit();
  }
}
