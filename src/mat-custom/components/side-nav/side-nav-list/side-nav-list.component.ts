import { Component, Input } from '@angular/core';
import { NavSection } from '../section.interface';

@Component({
  selector: 'cm-sidenav-list',
  template: `
    <md-nav-list>
      <cm-sidenav-item [section]="childSection" *ngFor="let childSection of navRoot.children">
      </cm-sidenav-item>
    </md-nav-list>
  `,
})
export class CMSideNavList {
  @Input()
  public navRoot: NavSection;
}
