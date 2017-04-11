import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'bas-sidenav-container',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host{
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    `
  ]
})
export class SideNavContainerCmp {
  

}
