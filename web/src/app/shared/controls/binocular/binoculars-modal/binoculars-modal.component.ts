import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModel } from 'src/app/model/base/base-model';
import { BaseFilterPageSort } from 'src/app/shared/base/base-filter-page-sort/base-filter-page-sort';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';

@Component({
  selector: 'app-binoculars-modal',
  templateUrl: './binoculars-modal.component.html',
  styleUrls: ['./binoculars-modal.component.css']
})

export class BinocularsModalComponent extends BaseFilterPageSort implements OnInit {
  recordId: number;
  displayColumns: any;
  dataSource: any;
  totalRecords: any = 0;
  selectedRecord: BaseModel;
  permissions: [];
  private apiDataService: any;
  selectedRecords: BaseModel[] = [];


  // START : Title
  @Input() title = '';
  // END : Title

  @Output()
  public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private activeModal: NgbActiveModal) {
    super(new PageSortFilterInfo());
  }

  ngOnInit() {
  }

  onFilterEvent(event) {
    this.updateFilter(event);
    this.getData();
  }

  getData() {
    if (this.permissions && this.permissions.length > 0) {
      this.apiDataService.usersByPermission({ permissionTypes: this.permissions }, this.pageSortFilterInfo).subscribe(result => {
        this.totalRecords = result.count;
        this.dataSource = result.value;
      });
    } else {
      this.apiDataService.getAllData(this.pageSortFilterInfo).subscribe(data => {
        this.totalRecords = data.count;
        this.dataSource = data.value;
      });
    }
  }

  onPageSortEvent(event) {
    this.updateSort(event.sortInfo);
    this.updatePage(event);
    this.getData();
  }

  selectRecord(record: BaseModel) {
    this.selectedRecord = record;
    if (this.selectedRecords.indexOf(record) === -1) {
      this.selectedRecords.push(record);
    }
  }

  submitRecords() {
    this.closeClickedEvent.emit(this.selectedRecords);
    this.activeModal.dismiss('Click X');
  }

  close() {
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }
}
