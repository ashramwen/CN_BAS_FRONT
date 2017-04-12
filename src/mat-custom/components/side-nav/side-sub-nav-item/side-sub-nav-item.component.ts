import { Component, Input } from '@angular/core';
import { NavSection } from '../section.interface';

@Component({
  selector: 'cm-side-subnav-item',
  template: `
    <a md-list-item 
        [routerLink]="section.path"
        [routerLinkActive]="'active'" #rla="routerLinkActive">
      <md-icon md-list-icon [class.mat-primary]="rla.isActive">{{ section.icon }}</md-icon>
      <span md-line>{{section.text}}</span>
    </a>
  `
})
export class CMSideSubnavItem {
  @Input()
  public section: NavSection;
}
