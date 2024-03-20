import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appMaxFraction]'
})
export class MaxFractionDirective implements OnInit, OnChanges {

  @Input() fraction: number;
  @Input() isNegative = true;
  regexString: string;
  private regex: RegExp;
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.regexString = this.isNegative ? `^\\-?\\d*\\.?\\d{0,${this.fraction}}$` : `^\\d*\\.?\\d{0,${this.fraction}}$`;
    this.regex = new RegExp(this.regexString, 'g');
  }
  constructor(private el: ElementRef) {

  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key === 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
