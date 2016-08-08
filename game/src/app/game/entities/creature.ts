import { Vector } from './vector';
import { World } from './world';
import { Food } from './food';
import {combineLatest} from "rxjs/operator/combineLatest";
export class Creature {
  public type: string;
  public location: Vector;
  public velocity: Vector = new Vector(0, 0);
  public acceleration: Vector = new Vector(0, 0);
  public mass: number = 1;
  public length = this.mass * 30;
  public lookRange = 150;
  private maxspeed: number = 5;
  private maxforce: number = .1;
  public color: string = '#990000';
  public bgcolor: string = '#FAC6C6';
  public experience = 0;
  public static counter = 0;
  public id;
  public targetFood: Food;

  constructor(coord: Vector){
    Creature.counter++;
    this.id = Creature.counter;
    this.location = coord;
    this.velocity.random();
  }
  public process() {
    if (this.targetFood) {
      let distance = this.location.dist(this.targetFood.location);
      if (distance < Food.size * 2){
        this.experience += this.targetFood.experience;
        World.eatFood(this.targetFood);
        this.targetFood = null;
      }
    } else {
      this._findTarget();
    }
    let coord = (this.targetFood) ? this.targetFood.location : World.getRandomCoord();

    this.moveTo(coord);
    this.draw();
  }


  private _findTarget(){

    //Перебор по всем целям, расчет вхождения

    let looked = World.foods.filter((food) => {
      let distance = this.location.dist(food.location);
      return (distance < this.lookRange);
    });
    if (looked.length) {
      let sortLooked = looked.sort((a, b) => {
        let aDist = this.location.dist(a.location);
        let bDist = this.location.dist(b.location);
        return aDist - bDist;
      });
      this.targetFood = sortLooked[0];
    }
  }

  public moveTo(target: Vector) {
    var force = new Vector(0,0);

    var separation = this._separate(World.creatures);
    var cohesion = this._seek(target);

    force.add(separation);
    force.add(cohesion);

    this._applyForce(force);
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
    this._boundaries();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    if(this.velocity.mag() < 1.5)
        this.velocity.setMag(1.5);
    this.location.add(this.velocity);
    this.acceleration.mul(0);
  }

  private _applyForce(force) {
     this.acceleration.add(force);
  }

  private _boundaries() {
    if (this.location.x < 15)
        this._applyForce(new Vector(this.maxforce * 2, 0));

    if (this.location.x > World.width - 15)
        this._applyForce(new Vector(-this.maxforce * 2, 0));

    if (this.location.y < 15)
        this._applyForce(new Vector(0, this.maxforce * 2));

    if (this.location.y > World.height - 15)
        this._applyForce(new Vector(0, -this.maxforce * 2));

  }

  private _seek(target) {
    var seek = target.copy().sub(this.location);
    seek.normalize();
    seek.mul(this.maxspeed);
    seek.sub(this.velocity).limit(0.3);

    return seek;
  }

  private _separate(neighbors) {
    var sum = new Vector(0,0);
    var count = 1;

    for (var i in neighbors)
    {
        if (neighbors[i] != this)
        {
            var d = this.location.dist(neighbors[i].location);
            if (d < this.length && d > 0)
            {
                var diff = this.location.copy().sub(neighbors[i].location);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        }
    }
    if (!count)
        return sum;

    sum.div(count);
    sum.normalize();
    sum.mul(this.maxspeed);
    sum.sub(this.velocity);
    sum.limit(this.maxforce);

    return sum.mul(2);
  }


}
