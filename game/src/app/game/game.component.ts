import {Component, Input, ViewChild, ElementRef,} from '@angular/core';

import { AppState } from '../app.service';
import { Router } from '@angular/router';
import { Player } from './entities/player';

@Component({
  selector: 'game',
  styleUrls: [ './game.style.css' ],
  templateUrl: './game.template.html'
})

export class Game {
  @ViewChild("gameCanvas") gameCanvas: ElementRef;
  localState = { nickname: '' };
  player: Player;

  constructor(public element: ElementRef, private router: Router, public appState: AppState,  ) {

    //debug
    this.appState.set('nickname', 'test');


    let nickname = this.appState.get('nickname');
    if (typeof nickname === "string") {
      this.player = new Player(nickname);
    } else {
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit() { // wait for the view to init before using the element

    let context: CanvasRenderingContext2D = this.gameCanvas.nativeElement.getContext("2d");
    // happy drawing from here on
    context.fillStyle = 'blue';
    context.fillRect(10, 10, 150, 150);
  }
}
