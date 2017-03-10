import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'bas-nav-item',
  template: `
    <a md-list-item 
        [routerLink]="routerLink" 
        (click)="activate.emit()" 
        [routerLinkActive]="'active'">
      <md-icon md-list-icon>{{ icon }}</md-icon>
      <span md-line><ng-content></ng-content></span>
      <span md-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [`
    a.active{
      color: rgba(255,255,255,0.8);
      pointer-events: none;
      cursor: default;
    }
    a.active .secondary {
      color: rgba(255,255,255,0.5);
    }
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `]
})
export class NavItemCmp {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() activate = new EventEmitter();
}
