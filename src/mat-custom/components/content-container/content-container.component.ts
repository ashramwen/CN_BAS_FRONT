import {
  Component,
  OnInit,
  ElementRef,
  HostBinding,
  ViewChild,
  AfterViewInit,
  ContentChild,
  TemplateRef
} from '@angular/core';

import { ToolbarSubTitle } from './toolbar-sub-title.component';

@Component({
  selector: 'cm-content-container',
  template: `
    <ng-content select="cm-toolbar-sub-title"></ng-content>
    <div class="cm-content-container-inner">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    
  `]
})
export class ContentContainer implements AfterViewInit {

  @ContentChild(ToolbarSubTitle)
  public subTitleCmp: ToolbarSubTitle;

  constructor(
    private ele: ElementRef
  ) { }

  public ngAfterViewInit() {
    if (!!this.subTitleCmp) {
      this.ele.nativeElement.getElementsByClassName('cm-content-container-inner')[0]
        .classList.add('has-sub-title');
    }
  }
}
