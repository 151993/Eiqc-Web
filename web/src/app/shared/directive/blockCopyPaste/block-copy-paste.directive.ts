import { Directive, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective implements OnInit, OnChanges {
  constructor() { }
    ngOnChanges(changes: SimpleChanges): void {

    }
    ngOnInit(): void {

    }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}
