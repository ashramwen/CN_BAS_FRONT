import { Component, Input, ElementRef, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'bas-sidenav',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      width: 3rem;
      height: 100%;
      overflow: hidden;
      transition: all 0.2s;
      border-right: solid 1px #ccc;
      display: block;
      flex-shrink: 0;
    }
    :host-context(.active) {
      width: 14rem;
    }
  `]
})
export class SideNavCmp implements OnChanges{
  @Input()
  public opened: boolean;

  constructor(
    private ele: ElementRef
  ){}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['opened'].previousValue !== changes['opened'].currentValue) {
      let divEle = <HTMLDivElement>this.ele.nativeElement;
      if (this.opened) {
        divEle.classList.add('active');
      } else {
        divEle.classList.remove('active');
      }
    }
  }  
}