import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Part } from 'src/app/model/part/part';
import { PartService } from 'src/app/services/part/part.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { BaseBinocularsDirective } from '../../base-binoculars';
import { BinocularsModalComponent } from '../../binoculars-modal/binoculars-modal.component';

export const CUSTOM_BINOCULAR_PART_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,   // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JBinocularsPartComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-binoculars-part',
  templateUrl: './j-binoculars-part.component.html',
  styleUrls: ['./j-binoculars-part.component.css'],
  providers: [CUSTOM_BINOCULAR_PART_CONTROL_VALUE_ACCESSOR]
})
export class JBinocularsPartComponent extends BaseBinocularsDirective implements OnInit {

  @Input() dropdown = false;
  @Output() sendSelectedValOnSearch = new EventEmitter();
  @Output() sendSelectedPart = new EventEmitter();
  entity: Part;
  pageSortFilterInfo = new PageSortFilterInfo(new Part());
  constructor(
    protected partService: PartService, // tslint:disable-line
    protected translateService: TranslateService,
    protected modalService: NgbModal
  ) {
    super(partService, translateService, modalService, new Part());
  }

  ngOnInit() {
  }

  shareSelected(val: any) {
    this.sendSelectedValOnSearch.emit(val);
  }

  showBinocularsModel(event: Event) {
    if (this.customFilters && this.customFilters.length > 0) {
      this.pageSortFilterInfo.filterInfo = this.customFilters;
    }

    const modalRef = this.modalService.open(BinocularsModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'table-modal',
      size: 'lg'
    });

    modalRef.componentInstance.title = this.translateService.instant(
      'Label.Binacular'
    );

    modalRef.componentInstance.displayColumns = (this.entity).displayColumns();
    modalRef.componentInstance.entity = this.entity;
    modalRef.componentInstance.apiDataService = this.apiDataService;
    modalRef.componentInstance.apiDataService.oDataUrl = 'odata/PartSAPData';
    modalRef.componentInstance.displayColumns = (this.entity).displayColumns();
    modalRef.componentInstance.pageSortFilterInfo = this.pageSortFilterInfo;
    modalRef.componentInstance.pageSortFilterInfo.entity = this.entity;

    if (this.filter !== undefined) {
      modalRef.componentInstance.pageSortFilterInfo.filterInfo.push(this.filter);
    }

    modalRef.componentInstance.closeClickedEvent.subscribe(data => {
      this.value = data;
      this.propagateChange(this.value);
      this.sendSelectedValOnModalClose.emit(data);
      this.sendSelectedPart.emit(data);
    });
  }

}
