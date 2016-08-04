import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'game',  // <game></game>
  pipes: [ ],
  styleUrls: [ './game.style.css' ],
  templateUrl: './game.template.html'
})
export class Game {
  localState = { nickname: '' };
  constructor(public appState: AppState,  private router: Router) {
    let hasNickname = this.appState.has('nickname');
    if (!hasNickname) {
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    console.log('hello `Game` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value) {
    this.appState.set('value', value);
    this.localState.nickname = '';
  }

}
