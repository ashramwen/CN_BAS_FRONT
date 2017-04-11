import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'bas-toolbar',
  template: `
    <md-toolbar>
      <ng-content></ng-content>
      <button md-icon-button (click)="showUser.emit()">
        <md-icon class="portrait">account_circle</md-icon>
      </button>
    </md-toolbar>
  `,
  styleUrls: [
    `./toolbar.component.scss`
  ],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarCmp {
  @Input() public menuVisible: boolean;
  @Output() public showUser: EventEmitter<any> = new EventEmitter();
}
