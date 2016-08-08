import {Component, ViewChild, ElementRef} from '@angular/core';
import { AppState } from '../app.service';
import { Router } from '@angular/router';
import { Player, World } from './entities';

console.log('World3',World );

@Component({
  selector: 'game',
  styleUrls: [ './game.style.css' ],
  templateUrl: './game.template.html'
})

export class Game {
  @ViewChild("gameCanvas") gameCanvas: ElementRef;
  localState = { nickname: '' };
  player:Player = Player.getInstance();
  world:World = World.getInstance();
  context: CanvasRenderingContext2D;

  private fps = 30;

  constructor(public element: ElementRef, private router: Router, public appState: AppState,  ) {

    //debug
    this.appState.set('nickname', 'test');


    let nickname = this.appState.get('nickname');
    if (typeof nickname === "string") {
      this.player.nickname = nickname;

    } else {
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.context = this.gameCanvas.nativeElement.getContext("2d");
    this.world.context = this.context;
    this.world.init();
    // happy drawing from here on
    this.loop();
  }

  loop() {
    this.world.draw();

    setTimeout(() => {
      this.loop();
    }, 1000/this.fps);
  };
}
