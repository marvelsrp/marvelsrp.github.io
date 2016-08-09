import {Component, ViewChild, ElementRef, Input} from '@angular/core';
import {AppState} from '../app.service';
import {Router} from '@angular/router';
import {Creature, World} from './entities';

@Component({
  selector: 'game',
  styleUrls: ['./game.style.css'],
  templateUrl: './game.template.html',
  host: {
    '(document:keyup)': '_keyup($event)',
    '(document:keydown)': '_keydown($event)',
  },
})

export class Game {
  @ViewChild("gameCanvas") gameCanvas:ElementRef;

  static context:CanvasRenderingContext2D;

  // public creatures:Array<Creature> = World.creatures;
  private fps = 30;
  public keyPress:{ [key:number]:boolean; } = {};

  constructor(public element:ElementRef, private router:Router, public appState:AppState,) {
    //debug
    this.appState.set('nickname', 'test');
  }

  ngAfterViewInit() { // wait for the view to init before using the element

    let nickname = this.appState.get('nickname');
    if (typeof nickname !== "string") {
      return this.router.navigate(['']);
    }
    let context = this.gameCanvas.nativeElement.getContext("2d");
    World.setContext(context);

    World.init();

    this.loop();
  }

  loop() {
    Creature.active.control(this.keyPress);
    World.draw();

    setTimeout(() => {
      this.loop();
    }, 1000 / this.fps);
  };

  private _keydown(event:KeyboardEvent) {
    this.keyPress[event.keyCode] = true;
  }

  private _keyup(event:KeyboardEvent) {
    this.keyPress[event.keyCode] = false;
  }
}
