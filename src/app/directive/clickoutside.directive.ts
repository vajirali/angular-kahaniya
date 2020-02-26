import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../core/global.service';

@Directive({
  selector: '[clickOutside]'
})
export class ClickoutsideDirective {

  constructor(private _elementRef: ElementRef, public globalservice: GlobalService) { }

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
        if(this.globalservice.clickPopUpNotification){
          this.globalservice.clickPopUpNotification = false;
        }
    }
  }

}
