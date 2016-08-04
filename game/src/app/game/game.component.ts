import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Router } from '@angular/router';
import { Hero } from './hero';

@Component({
  selector: 'game',  // <game></game>
  pipes: [ ],
  styleUrls: [ './game.style.css' ],
  templateUrl: './game.template.html'
})
export class Game {
  localState = { nickname: '' };
  hero: Hero;

  constructor(public appState: AppState,  private router: Router) {

    let nickname = this.appState.get('nickname');
    if (typeof nickname === "string") {
      this.hero = new Hero(nickname);
    } else {
      this.router.navigate(['']);
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
