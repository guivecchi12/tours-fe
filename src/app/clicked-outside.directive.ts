import { Directive, ElementRef, HostListener, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Directive({
  selector: '[appClickedOutside]',
  standalone: true,
})
export class ClickedOutsideDirective {
  // @Output() clickOutside: EventEmitter<any> = new EventEmitter();
  // @HostListener('document:click', ['$event']) onClick(event: Event) {
  //   if (!this.elemRef.nativeElement.contains(event.target)) {
  //     console.log('NativeElement:', this.elemRef.nativeElement);
  //     this.clickOutside.emit(event);
  //   }
  // }
  // constructor(private elemRef: ElementRef) {}
}
