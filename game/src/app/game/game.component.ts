import {Component, ViewChild, ElementRef} from '@angular/core';
import { AppState } from '../app.service';
import { Router } from '@angular/router';
import { Player, World } from './entities';

@Component({
  selector: 'game',
  styleUrls: [ './game.style.css' ],
  templateUrl: './game.template.html'
})

export class Game {
  @ViewChild("gameCanvas") gameCanvas: ElementRef;
  player:Player;
  static context: CanvasRenderingContext2D;
  static world: World;
  private fps = 30;

  constructor(public element: ElementRef, private router: Router, public appState: AppState,  ) {

    //debug
    this.appState.set('nickname', 'test');
  }

  ngAfterViewInit() { // wait for the view to init before using the element

    let nickname = this.appState.get('nickname');
    if (typeof nickname !== "string") {
      return this.router.navigate(['']);
    }
    let context = this.gameCanvas.nativeElement.getContext("2d");
    Game.world = new World(context, nickname);

    this.loop();
  }

  loop() {
    Game.world.draw();

    setTimeout(() => {
      this.loop();
    }, 1000/this.fps);
  };
}
