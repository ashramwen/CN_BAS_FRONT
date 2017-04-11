import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationEnd
} from '@angular/router';

@Component({
  selector: 'bas-nav-item',
  template: `
    <a md-list-item 
        [routerLink]="routerLink"
        [routerLinkActive]="'active'">
      <md-icon md-list-icon [class.mat-primary]="">{{ icon }}</md-icon>
      <span md-line><ng-content></ng-content></span>
      <span md-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styleUrls: ['./nav-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavItemCmp implements OnInit {
  @Input() public icon = '';
  @Input() public hint = '';
  @Input() public routerLink: string = '/';

  constructor(private router: Router) { }

  public ngOnInit() {
    // let reg = new RegExp('/' + this.routerLink.replace(/\//, '\\/') + '$');
    // this.router.events.subscribe((event: RouterEvent) => {
    //   if (!(event instanceof NavigationEnd)) return;
    //   if (event.url.match(reg)) {
    //     this.activate.emit();
    //   }
    // });
  }
}
