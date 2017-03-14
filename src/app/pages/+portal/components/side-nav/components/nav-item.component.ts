import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
      background: rgba(0,0,0,0.4);
    }
    a.active .secondary {
      color: rgba(255,255,255,0.5);
    }
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `]
})
export class NavItemCmp implements OnInit{
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string = '/';

  constructor(private router: Router) {
    
  }

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
