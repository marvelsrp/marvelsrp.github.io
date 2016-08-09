import { Vector } from './vector';
import { Creature } from './creature';
import { World } from './world';

export class Patron {
  public type: string;
  public location: Vector;
  public velocity: Vector;
  public mass: number = 1;
  private maxspeed: number = 10;
  public color: string = '#990000';
  public bgcolor: string = '#FAC6C6';
  public static counter = 0;
  public id;
  public owner:Creature;

  constructor(owner: Creature){
    Patron.counter++;
    this.owner = owner;
    this.id = Patron.counter;
    this.location = owner.location.copy();
    this.velocity = owner.velocity.copy();
    this.velocity.limit(this.maxspeed);
    this.velocity.setMag(1.5);

  }

  public process() {
    this.draw();
  }

  public moveTo(target: Vector) {
    var force = new Vector(0,0);
    var cohesion = this._seek(target);

    force.add(cohesion);
    this.velocity.add(force);
  }

  public draw() {
    this._update();

    var context = World.context;

    var angle = this.velocity.angle();

    var viewX = this.location.x + Math.cos(angle) * 40;
    var viewY = this.location.y + Math.sin(angle) * 40;

    context.save();
    context.beginPath();

    context.fillStyle = this.bgcolor;
    context.lineWidth = 1;
    context.strokeStyle = this.color;

    //bot
    context.arc(this.location.x, this.location.y, 10, 0, 2 * Math.PI, false);
    context.fill();

    //move vector
    context.moveTo(this.location.x, this.location.y);
    context.lineTo(viewX, viewY);
    context.stroke();


    context.globalAlpha = 1;
    context.restore() ;
  }

  private _update() {
    this.location.add(this.velocity);
    this._checkOut();
  }

  private _checkOut() {
    if (
      this.location.x < 0 ||
      this.location.x > World.width ||
      this.location.y < 0 ||
      this.location.y > World.height
    ) {
      World.removePatron(this);
    }

  }

  private _seek(target) {
    var seek = target.copy().sub(this.location);
    seek.normalize();
    seek.mul(this.maxspeed);
    seek.sub(this.velocity).limit(0.3);

    return seek;
  }


}
