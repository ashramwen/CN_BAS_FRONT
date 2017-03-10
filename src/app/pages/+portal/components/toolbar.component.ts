import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'bas-toolbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="toggleMenu.emit()">
        <md-icon class="menu-toggle" [class.active]="menuVisible">menu</md-icon>
      </button>
      <ng-content></ng-content>
    </md-toolbar>
  `,
  styleUrls: [
    `./toolbar.component.scss`
  ],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarCmp {
  @Input() public menuVisible: boolean;
  @Output() public toggleMenu = new EventEmitter();
}
