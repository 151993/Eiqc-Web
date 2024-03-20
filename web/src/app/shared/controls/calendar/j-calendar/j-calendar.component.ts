import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeNGDateSelectionMode } from 'src/app/shared/constant/global';

export const CUSTOM_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JCalendarComponent),
  multi: true,
};

@Component({
  selector: 'app-j-calendar',
  templateUrl: './j-calendar.component.html',
  styleUrls: ['./j-calendar.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class JCalendarComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  _minYear = 1998;

  _maxYear = 2099;

  @Input() appendTo: any;

  @Input() disabled = false;

  @Input() showTime = false;

  @Input() timeOnly = false;

  @Input() selectionMode = PrimeNGDateSelectionMode.Single;

  @Output() dateSelect: EventEmitter<any> = new EventEmitter<any>();


  _minDate: Date;
  @Input()
  public set minDate(_value: Date) {
    this._minDate = _value;
  }
  public get minDate(): Date {
    return this._minDate;
  }

  _maxDate: Date;
  @Input()
  public set maxDate(_value: Date) {
    this._maxDate = _value;
  }
  public get maxDate(): Date {
    return this._maxDate;
  }

  dtModel: Date | Date[];
  @Input()
  public set dateTimeValue(_value: Date | Date[]) {
    this.dtModel = _value;
  }
  public get dateTimeValue(): Date | Date[] {
    return this.dtModel;
  }

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    // this._minYear = new Date().getFullYear() - 5;
    // this._maxYear = new Date().getFullYear() + 5;
  }

  //#region ControlValueAccessor
  onChanged = (_: any) => { };
  onTouched = () => { };

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: Date | Date[]) {
    if (value == null) {
      return;
    }

    this.dtModel = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  //#endregion ControlValueAccessor

  selectedEvent(value) {
    this.dateTimeValue = value;
    this.onChanged(this.dateTimeValue);
  }

  onClose($event) {
    $event.value = this.dateTimeValue;
    this.dateSelect.emit($event);
  }

  onClearClick(event: Event) {
    this.dateTimeValue = null;
    this.onChanged(this.dateTimeValue);
    this.dateSelect.emit(null);
  }
}
