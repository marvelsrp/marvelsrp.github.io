import { Vector } from './vector';
import { Creature } from './creature';
import { World } from './world';
import { Food } from './food';

export class Patron {
  public type: string;
  public physics = {
    location:  new Vector(0, 0),
    velocity:  new Vector(0, 0),
    mass: 1,
    maxspeed: 10,
    size: 700
  };

  public static counter = 0;
  public id;
  public owner:Creature;

  constructor(owner: Creature){
    Patron.counter++;
    this.owner = owner;
    this.id = Patron.counter;
    this.physics.location = owner.physics.location.copy();
    let velocity = owner.physics.rotation.copy();
    let vAngle = velocity.angle() + Math.random() * 0.3;
    velocity.setAngle(vAngle);
    this.physics.velocity = velocity;
    this.physics.velocity.limit(this.physics.maxspeed);
    this.physics.velocity.setMag(10);

  }

  public process() {
    //Перебор по всем целям, расчет вхождения
    let eating = Food.list.filter((food) => {
      let distance = this.physics.location.dist(food.physics.location);
      return (distance < food.physics.size + this.physics.mass * 10);
    });
    eating.forEach((food) => {
      this.owner.experience += food.experience;
      Food.kill(food);
      this.owner.removePatron(this);
    });

    this.draw();
  }

  public draw() {
    this._update();

    let color = '#990000';
    let bgcolor = '#FAC6C6';

    var context = World.context;

    context.save();
    context.beginPath();

    context.fillStyle = bgcolor;
    context.lineWidth = 1;
    context.strokeStyle = color;

    //bot
    context.arc(this.physics.location.x, this.physics.location.y, 2, 0, 2 * Math.PI, false);
    context.fill();

    //move vector


    context.globalAlpha = 1;
    context.restore() ;
  }

  private _update() {
    this.physics.location.add(this.physics.velocity);
    this._checkOut();
  }

  private _checkOut() {
    if (
      this.physics.location.x < 0 ||
      this.physics.location.x > World.width ||
      this.physics.location.y < 0 ||
      this.physics.location.y > World.height
    ) {
      this.owner.removePatron(this);
    }

  }

  private _seek(target) {
    var seek = target.copy().sub(this.physics.location);
    seek.normalize();
    seek.mul(this.physics.maxspeed);
    seek.sub(this.physics.velocity).limit(0.3);

    return seek;
  }


}
