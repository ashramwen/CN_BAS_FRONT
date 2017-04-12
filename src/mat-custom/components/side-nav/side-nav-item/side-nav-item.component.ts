import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavSection } from '../section.interface';

@Component({
  selector: 'cm-sidenav-item',
  template: `
    <a md-list-item 
        [routerLink]="section.path"
        [routerLinkActive]="'active'" #rla="routerLinkActive">
      <md-icon md-list-icon [class.mat-primary]="rla.isActive">{{ section.icon }}</md-icon>
      <span md-line>{{section.text}}</span>
    </a>
    <div *ngIf="section.children" [mcCollapse]="!rla.isActive">
      <cm-sub-sidenav-list [navRoot]="section"></cm-sub-sidenav-list>
    </div>
  `
})
export class CMSideNavItem {
  @Input()
  public section: NavSection;

  constructor() { }
}
