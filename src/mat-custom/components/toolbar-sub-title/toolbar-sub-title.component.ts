import { Component, Input } from '@angular/core';

@Component({
  selector: 'cm-toolbar-sub-title',
  template: `
    <md-toolbar>
      <div class="sub-title-container">
        <h2>{{subTitle}}</h2>
      </div>
      <div class="cmp-container">
        <ng-content></ng-content>
      </div>
    </md-toolbar>
  `,
  styleUrls: ['./toolbar-sub-title.component.scss']
})
export class ToolbarSubTitle {
  @Input()
  public subTitle: string;
}