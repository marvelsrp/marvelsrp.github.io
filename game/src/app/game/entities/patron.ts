import { Vector } from './vector';
import { Creature } from './creature';
import { World } from './world';
import { Food } from './food';

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
    let velocity = owner.rotation.copy();
    let vAngle = velocity.angle() + Math.random() * 0.3;
    velocity.setAngle(vAngle);
    this.velocity = velocity;
    this.velocity.limit(this.maxspeed);
    this.velocity.setMag(10);

  }

  public process() {
    //Перебор по всем целям, расчет вхождения
    let eating = Food.list.filter((food) => {
      let distance = this.location.dist(food.location);
      return (distance < food.size + this.mass);
    });
    eating.forEach((food) => {
      this.owner.experience += food.experience;
      Food.kill(food);
      this.owner.removePatron(this);
    });

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

    context.save();
    context.beginPath();

    context.fillStyle = this.bgcolor;
    context.lineWidth = 1;
    context.strokeStyle = this.color;

    //bot
    context.arc(this.location.x, this.location.y, 2, 0, 2 * Math.PI, false);
    context.fill();

    //move vector


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
      this.owner.removePatron(this);
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
