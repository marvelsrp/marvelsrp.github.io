import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class Home {
  localState = { nickname: '' };
  constructor(public appState: AppState,  private router: Router) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value) {
    this.appState.set('nickname', value);
    this.localState.nickname = '';

    this.router.navigate(['game']);
  }

}
