import { ToolbarSubTitle } from '../toolbar-sub-title/toolbar-sub-title.component';
import {
  Component,
  OnInit,
  ElementRef,
  HostBinding,
  ViewChild,
  AfterViewInit,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'cm-content-container',
  template: `
    <div class="cm-content-container-inner">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
    }
    :host-context(.has-sub-title) .cm-content-container-inner{
      margin-top: 48px;
    }
    .cm-content-container-inner {
      flex: 1;
      overflow: auto;
    }
  `]
})
export class ContentContainer implements AfterViewInit {

  @HostBinding('class.has-sub-title')
  public hasSubTitle: boolean;

  @ContentChild(ToolbarSubTitle)
  public subTitleCmp: ToolbarSubTitle;

  constructor(
    private ele: ElementRef
  ) { }
  
  public ngAfterViewInit() {
    if (!!this.subTitleCmp) {
      this.hasSubTitle = true;
    } else {
      this.hasSubTitle = false;
    }
  }
}
