import { Component, OnInit } from '@angular/core';
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
import { AlertModal } from '../../shared/components/alert-modal/alert-modal.service';

@Component({
  selector: 'bas-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginCmp implements OnInit {

  public credentials: Credential = {
    userName: '',
    password: '',
    permanentToken: false
  };

  public loginForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

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
        this.store.dispatch(go(['portal/landing']));
      }
    });
  }

  public login() {
    this.store.dispatch(new ShowLoadingAction());

    Object.assign(this.credentials, this.loginForm.value);
    this.loginService
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
}
