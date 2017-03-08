import {
  Component,
  OnInit,
  Injector
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/providers/login.service';
import { Token } from '../shared/models/token.interface';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    public injector: Injector,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.data.subscribe((res) => {
    //   console.log(res);
    // });
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    this.loginService
      .login({ userName: 'beehive_admin', password: '1qaz2wsx', permanentToken: false })
      .map(res => {
        return <Token>res.json();
      })
      .catch(() => {
        return Observable.of();
      })
      .subscribe((token: Token) => {
        console.log(token);
      });
    // console.log('submitState', value);
    // console.log(this.route.snapshot.data['data']);
    
    // this.appState.set('value', value);
    // this.localState.value = '';
  }
}
