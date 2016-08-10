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
  public canvasWidth: number = World.canvasWidth;
  public canvasHeight: number = World.canvasHeight;

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

    let then = Date.now();
    this.animate(then);
  }

  animate(then) {
    let fpsInterval = 1000 / this.fps;
    requestAnimationFrame(() => {
      this.animate(then);
    });

    let now = Date.now();
    let elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      Creature.active.control(this.keyPress);
      World.camera.update();
      World.draw();
    }
  }

  private _keydown(event:KeyboardEvent) {
    this.keyPress[event.keyCode] = true;
  }

  private _keyup(event:KeyboardEvent) {
    this.keyPress[event.keyCode] = false;
  }
}
