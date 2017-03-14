/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { AppState } from './app.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from './shared/redux/index';
import { createSelector } from 'reselect';
import { StateSelectors } from './shared/redux/selectors';
import { LayoutState } from './shared/redux/layout/reducer';
import { ShowLoadingAction, HideLoadingAction } from './shared/redux/layout/actions';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppCmp implements OnInit {
  public url = 'https://cn.kii.com';
  public loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<RootState>,
    translate: TranslateService,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.loading$ = store.select(createSelector(
      StateSelectors.layout,
      (state: LayoutState) => !!state.loading
    ));
  }

  public ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.store.dispatch(new ShowLoadingAction);
    }
    if (event instanceof NavigationEnd) {
      this.store.dispatch(new HideLoadingAction);
    }

    if (event instanceof NavigationCancel) {
      this.store.dispatch(new HideLoadingAction);
    }
    if (event instanceof NavigationError) {
      this.store.dispatch(new HideLoadingAction);
    }
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
