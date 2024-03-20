import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { JAutoCompleteConfig } from './j-auto-complete-config';
import * as _ from 'lodash';
import { DisplayFormatAndStatusPipe } from '../../../pipe/displayFormatAndStatus';

export const CUSTOM_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompleteComponent),
  multi: true,
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete',
  templateUrl: './j-auto-complete.component.html',
  styleUrls: ['./j-auto-complete.component.css'],
  providers: [
    DisplayFormatAndStatusPipe,
    CUSTOM_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR,
  ],
})
export class JAutoCompleteComponent implements OnInit, ControlValueAccessor {
  @Input()
  config: JAutoCompleteConfig = {
    field: '',
    minLength: '',
    suggestions: [],
    dropdown: false,
    multiple: true,
    forceSelection: true,
    mappingField: '',
  };
  @Input() isDisabled = false;
  @Output() completeMethod = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUnselect = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() templateClick = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClear = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDropdownClick = new EventEmitter();

  private _internalValue: any[];
  private _value: any[];

  constructor() { }

  ngOnInit() { }

  get value() {
    return this._value;
  }
  set value(val: any[]) {
    this._value = val;
  }

  get internalValue() {
    return this._internalValue;
  }
  set internalValue(val: any) {
    this._internalValue = val;
  }

  writeValue(v: any) {
    v = v === '' ? null : v;
    v = v != null ? (v['value'] !== undefined ? v.value : v) : v;
    if (v != null) {
      if (this.config.multiple) {
        this._internalValue = v;
      } else {
        const data = [];
        data.push(v);
        this.internalValue = data;
      }

      this.value = this.internalValue;
    } else {
      this.internalValue = v;
      this.value = v;
    }
  }

  // tslint:disable-next-line:no-shadowed-variable
  propagateChange = (_: any) => { };
  onChanged = () => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onChanged = fn;
  }

  onCompleteMethod(event) {
    this.completeMethod.emit(event);
  }

  select(item) {
    if (!item.isEnabled) {
      this.internalValue.pop();
    } else {
      if (this.config.multiple) {
        let isExist = false;

        if (this.value) {
          isExist =
            this.internalValue.filter((x) => x.id === item.id).length > 1;
        }

        if (isExist) {
          this.internalValue.pop();
        } else {
          this.value = this.internalValue;
        }
      } else {
        this.value = item;

        if (this.internalValue.length > 1) {
          this.internalValue?.shift();
        }
      }

      this.onSelect.emit({ value: this.value, item: item });
      this.propagateChange(this.value);
      this.onChanged();
    }
  }

  unselect(item) {
    if (!this.config.multiple) {
      this.value = null;
    } else {
      this.value = this.internalValue;
    }
    this.onUnselect.emit({ value: this.value, item: item });
    this.propagateChange(this.value);
    this.onChanged();
  }

  clear() {
    if (!this.config.multiple) {
      this.internalValue?.shift();
    }
    this.value = this.config.multiple ? this.value : null;
    this.onClear.emit();
    this.propagateChange(this.value);
    this.onChanged();
  }

  dropDownClick() {
    this.onDropdownClick.emit();
  }

  onClick(item) {
    this.templateClick.emit(item);
    if (!item.isEnabled) {
      event.stopPropagation();
    }
  }
}
