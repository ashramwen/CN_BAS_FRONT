import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

import { SessionService } from '../../shared/providers/session.service';
import { RootState, StateSelectors } from '../../shared/redux/index';
import { Token } from '../../shared/models/token.interface';
import { LoginSuccessAction, LoginFailureAction } from '../../shared/redux/token/actions';
import { Credential } from '../../shared/models/credential.interface';
import { HttpError } from '../../shared/models/http-error.interface';
import { TokenState } from '../../shared/redux/token/reducer';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginCmp implements OnInit{

  public credentials: Credential = {
    userName: '',
    password: '',
    permanentToken: false
  };

  constructor(
    private loginService: SessionService,
    private store: Store<RootState>
  ) {}

  public ngOnInit() {
    setTimeout(() => {
      debugger;
      this.store.select(StateSelectors.token).subscribe((tokenState: TokenState) => {
        if (tokenState && tokenState.loggedIn) {
          this.store.dispatch(go(['/landing']));
        }
      });
    }, 300);
        
  }

  public login(value: string) {
    this.loginService
      .login(this.credentials)
      .map(res => {
        return <Token>res.json();
      })
      .catch((err: Response) => {
        let msg: HttpError = <any>err.json();
        console.log(err);
        this.store.dispatch(new LoginFailureAction({
          statusCode: err.status,
          errorCode: msg.errorCode,
          errorMessage: msg.errorMessage
        }));
        return Observable.of();
      })
      .subscribe((token: Token) => {
        this.store.dispatch(new LoginSuccessAction(token));
        this.store.dispatch(go(['/landing']));
        console.log(token);
      });
  }
}