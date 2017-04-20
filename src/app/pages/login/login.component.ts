import { Component, OnInit, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from '../../shared/providers/session.service';
import { RootState } from '../../shared/redux/index';
import { Token } from '../../shared/models/token.interface';
import { LoginSuccessAction, LoginFailureAction } from '../../shared/redux/token/actions';
import { Credential } from '../../shared/models/credential.interface';
import { HttpError } from '../../shared/models/http-error.interface';
import { TokenState } from '../../shared/redux/token/reducer';
import { StateSelectors } from '../../shared/redux/selectors';
import { ShowLoadingAction, HideLoadingAction } from '../../shared/redux/layout/actions';
import { AlertModal } from '../../../mat-custom/components/alert-modal/alert-modal.service';
import { particles } from './particles';

@Component({
  selector: 'bas-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginCmp implements OnInit, AfterViewInit, OnDestroy {

  public credentials: Credential = {
    userName: '',
    password: '',
    permanentToken: false
  };

  public loginForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  private _pJS: any;

  constructor(
    private loginService: SessionService,
    private store: Store<RootState>,
    private router: ActivatedRoute,
    private alert: AlertModal,
    private formBuilder: FormBuilder
  ) {  }

  public ngOnInit() {
    this.store.select(StateSelectors.token).subscribe((tokenState: TokenState) => {
      if (tokenState && tokenState.loggedIn) {
        this.store.dispatch(go(['portal']));
      }
    });
  }

  public ngAfterViewInit() {
    this.renderAnimation();
  }

  public login() {
    this.store.dispatch(new ShowLoadingAction());

    Object.assign(this.credentials, this.loginForm.value);
    let subscription = this.loginService
      .login(this.credentials)
      .map((res) => {
        return <Token> res.json();
      })
      .catch((err: Response) => {
        let msg: HttpError = <any> err.json();
        this.alert.failure('Login.userNamePasswordNotMatch');
        this.store.dispatch(new LoginFailureAction({
          statusCode: err.status,
          errorCode: msg.errorCode,
          errorMessage: msg.errorMessage
        }));
        return Observable.empty();
      })
      .finally(() => {
        this.store.dispatch(new HideLoadingAction());
        subscription.unsubscribe();
      })
      .subscribe((token: Token) => {
        this.store.dispatch(new LoginSuccessAction(token));
        this.router.queryParams.subscribe((params) => {
          let redirectUrl = params['redirectUrl'];
          let newParams = Object.assign({}, params);
          delete newParams['redirectUrl'];

          if (redirectUrl) {
            this.store.dispatch(go([redirectUrl], newParams));
          } else {
            this.store.dispatch(go(['portal/landing']));
          }
        });
      });
  }

  public ngOnDestroy() {
    if (this._pJS) {
      this._pJS.fn.vendors.destroy();
    }
  }

  private renderAnimation() {
    this._pJS = particles('bg-animation', {
      particles: {
        color: '#fff',
        shape: 'circle', // "circle", "edge" or "triangle"
        opacity: 1,
        size: 4,
        size_random: true,
        nb: 150,
        line_linked: {
          enable_auto: true,
          distance: 100,
          color: '#fff',
          opacity: 1,
          width: 1,
          condensed_mode: {
            enable: false,
            rotateX: 600,
            rotateY: 600
          }
        },
        anim: {
          enable: true,
          speed: 1
        }
      },
      interactivity: {
        enable: true,
        mouse: {
          distance: 300
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab',
        line_linked: {
          opacity: .5
        },
        events: {
          onclick: {
            enable: true,
            mode: 'push', // "push" or "remove"
            nb: 4
          }
        }
      },
      /* Retina Display Support */
      retina_detect: true
    });
  }
}
