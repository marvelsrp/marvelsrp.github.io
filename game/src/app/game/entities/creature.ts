import { Vector } from './vector';
import { World } from './world';
import { Food } from './food';
import { Patron } from './patron';

const KEYS = {
  W: 87,
  S: 83,
  A: 65,
  D: 68,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32
};

export class Creature {
  public static list: Array<Creature> = [];
  public static active: Creature;
  public name: string;
  public location: Vector;
  public velocity: Vector = new Vector(0, 0);
  public rotation: Vector = new Vector(0, 0);
  public acceleration: Vector = new Vector(0, 0);
  public mass: number = 1;
  private maxspeed: number = 5;
  private maxforce: number = .1;
  public lookRange = 700;
  public color: string = '#0066FA';
  public bgcolor: string = '#00CCFA';
  public experience = 0;
  public level = 1;
  public isPlayer: boolean;
  public isBot: boolean;
  public static counter = 0;
  public targetFood: Food;
  public patrons: Array<Patron> = [];
  public id;

  constructor(coord: Vector, isPlayer: boolean = false){
    Creature.counter++;
    this.id = Creature.counter;
    this.name = "bot-" + this.id;
    this.location = coord;
    this.rotation.random();
    this.isPlayer = isPlayer;
    this.isBot = !isPlayer;
  }

  public static add(isPlayer:boolean = false){
    let creature = new Creature(World.getRandomCoord(), isPlayer);
    Creature.list.push(creature);
    return creature;
  }

  public static kill(creature: Creature){
    let index = Creature.list.findIndex((item) => {
      return creature.id === item.id;
    });
    Creature.list.splice(index, 1);
  }

  public process() {
    this.patrons.forEach((patron) => patron.process());
    if (this.isPlayer) {
      this._processPlayer();
    }
    if (this.isBot) {
      this._processBot();
    }

    this._checkLevel();
    this._draw();
  }

  private _processPlayer(){
    //Перебор по всем целям, расчет вхождения
    let eating = Food.list.filter((food) => {
      let distance = this.location.dist(food.location);
      return (distance < food.size + this.mass * 10);
    });

    eating.forEach((food) => {
      this.experience += food.experience;
      Food.kill(food);
      Food.add();
    });
  }

  private _processBot(){
    if (this.targetFood) {
      let distance = this.location.dist(this.targetFood.location);
      if (distance < this.targetFood.size * 2){
        this.experience += this.targetFood.experience;
        Food.kill(this.targetFood);
      }
    } else {
      this._findTarget();
    }

    if (this.targetFood){
      let coord = this.targetFood.location;
      this._moveTo(coord);
    } else {
      this._moveTo(World.getRandomCoord());
    }

  }

  private _findTarget(){

    //Перебор по всем целям, расчет вхождения
    let looked = Food.list.filter((food) => {
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
      this.targetFood.addTargeting(this);
    }
  }

  public control(keyPress:{ [key:number]:boolean; } ){
    if (keyPress[KEYS.LEFT] || keyPress[KEYS.A]) {
      this.rotation.rotate(Vector.inRadAngle(-10));
    }

    if (keyPress[KEYS.UP]  || keyPress[KEYS.W]) {
      this.velocity.add(this.rotation);
    }

    if (keyPress[KEYS.RIGHT]  || keyPress[KEYS.D]) {
      this.rotation.rotate(Vector.inRadAngle(10));
    }

    if (keyPress[KEYS.DOWN]  || keyPress[KEYS.S]) {
      this.velocity.sub(this.rotation);
    }

    if (//default speed
      !keyPress[KEYS.LEFT] && !keyPress[KEYS.A] &&
      !keyPress[KEYS.UP]  && !keyPress[KEYS.W] &&
      !keyPress[KEYS.RIGHT] && !keyPress[KEYS.D] &&
      !keyPress[KEYS.DOWN] && !keyPress[KEYS.S])
    {
      this.velocity.setMag(0.5);
    }

    if (keyPress[KEYS.SPACE]) {
      this.fire();
    }
  }

  private _moveTo(target: Vector) {
    var force = new Vector(0,0);
    var cohesion = this._seek(target);

    force.add(cohesion);

    this._applyForce(force);
  }

  private _draw() {
    this._update();

    var context = World.context;

    var angle = this.rotation.angle();

    var viewX = this.location.x + Math.cos(angle) * this.mass * 11;
    var viewY = this.location.y + Math.sin(angle) * this.mass * 11;

    context.save();
    context.beginPath();

    context.fillStyle = this.bgcolor;
    context.lineWidth = 1;
    context.strokeStyle = this.color;

    //bot
    context.arc(this.location.x, this.location.y, this.mass * 10, 0, 2 * Math.PI, false);
    context.fill();

    //move vector
    context.moveTo(this.location.x, this.location.y);
    context.lineTo(viewX, viewY);
    context.stroke();

    // context.fill();
    context.closePath();
    context.stroke();

    context.globalAlpha = 1;
    if (this.isBot){
      World.context.fillText("Bot " + this.level + " level", this.location.x + this.mass * 10 + 10, this.location.y + this.mass * 10 + 10);
    }
    if (this.isPlayer){
      World.context.fillText("Player", this.location.x +  this.mass * 10 + 10, this.location.y + this.mass * 10 + 10);
    }

    context.restore() ;
  }

  private _update() {
    this._boundaries();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);

    this.location.add(this.velocity);
    this.acceleration.mul(0);
  }

  private _applyForce(force) {
    this.acceleration.add(force);
    this.rotation = this.velocity;
  }

  private _boundaries() {
    if (this.location.x < 50)
      this._applyForce(new Vector(this.maxforce * 2, 0));

    if (this.location.x > World.width - 50)
      this._applyForce(new Vector(-this.maxforce * 2, 0));

    if (this.location.y < 50)
      this._applyForce(new Vector(0, this.maxforce * 2));

    if (this.location.y > World.height - 50)
      this._applyForce(new Vector(0, -this.maxforce * 2));

  }

  private _seek(target) {
    var seek = target.copy().sub(this.location);
    seek.normalize();
    seek.mul(this.maxspeed);
    seek.sub(this.velocity).limit(0.3);

    return seek;
  }

  public fire(){
    this.patrons.push(new Patron(this));
  }

  public removePatron(patron: Patron){
    let index = this.patrons.findIndex((item) => {
      return patron.id === item.id;
    });
    this.patrons.splice(index, 1);
  }

  private _checkLevel(){
    let limit = 100;
    if (this.experience >= limit) {
      this.level++;
      this.experience = 0;
      this.mass += 0.3;
    }
  }
}
