import { Output, EventEmitter, Input, Directive } from '@angular/core';
import { BinocularsModalComponent } from '../binocular/binoculars-modal/binoculars-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { ControlValueAccessor } from '@angular/forms';
import { BaseModel } from 'src/app/model/base/base-model';
import { FilterInfo } from '../../odata-query-builder/page-sort-filter-config';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';

@Directive()
export class BaseBinocularsDirective implements ControlValueAccessor {
   // tslint:disable-next-line:no-output-on-prefix
   @Input() disabled = false;
   filter: FilterInfo;

   @Input() permissions = [];
   @Input() customFilters: FilterInfo[];

   @Output() OnBinocularsClick = new EventEmitter();
   private _value: any[];

   private _entity: BaseModel;
   @Output() sendSelectedValOnModalClose = new EventEmitter();

   @Output() autoCompleteSelect = new EventEmitter();
   @Output() autoCompleteUnSelect = new EventEmitter();
   @Output() autoCompleteClear = new EventEmitter();

   constructor(
      protected apiDataService: BaseDataService,
      protected translateService: TranslateService,
      protected modalService: NgbModal,
      protected entity: BaseModel
   ) {
      this._entity = entity;
   }

   showBinocularsModel(event: Event) {
      const pageSortFilterInfo = new PageSortFilterInfo();
      if (this.customFilters && this.customFilters.length > 0) {
         pageSortFilterInfo.filterInfo = this.customFilters;
      }

      const modalRef = this.modalService.open(BinocularsModalComponent, {
         ariaLabelledBy: 'modal-basic-title',
         windowClass: 'table-modal',
         size: 'lg'
      });

      modalRef.componentInstance.title = this.translateService.instant(
         'Label.Binacular'
      );

      modalRef.componentInstance.displayColumns = (this._entity).displayColumns();
      modalRef.componentInstance.entity = this._entity;
      modalRef.componentInstance.apiDataService = this.apiDataService;
      modalRef.componentInstance.displayColumns = (this.entity).displayColumns();
      modalRef.componentInstance.pageSortFilterInfo = pageSortFilterInfo;
      modalRef.componentInstance.pageSortFilterInfo.entity = this.entity;

      if (this.filter !== undefined) {
         modalRef.componentInstance.pageSortFilterInfo.filterInfo.push(this.filter);
      }

      modalRef.componentInstance.closeClickedEvent.subscribe(data => {
         this.value = data;
         this.propagateChange(data);
         this.sendSelectedValOnModalClose.emit(data);
      });
   }

   get value() {
      return this._value;
   }
   set value(val: any[]) {
      this._value = val;
      this.propagateChange(this._value);
   }

   writeValue(v: any[]) {
      this.value = v;
   }

   propagateChange = (_: any) => { };
   onChanged = () => { };

   registerOnChange(fn) {
      this.propagateChange = fn;
   }

   registerOnTouched(fn: any) {
      this.onChanged = fn;
   }

   setDisabledState(isDisabled: boolean) {
      this.disabled = isDisabled;
   }

   select(event) {
      this.autoCompleteSelect.emit(event);
   }

   unSelect(event) {
      this.autoCompleteUnSelect.emit(event);
   }

   clear() {
      this.autoCompleteClear.emit();
   }

}
