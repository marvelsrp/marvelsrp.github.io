import { Vector } from './vector';
import { World } from './world';
import { Food } from './food';

const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export class Creature {
  public static active: Creature;
  public nickname: string;
  public location: Vector;
  public velocity: Vector = new Vector(0, 0);
  public rotation: Vector = new Vector(0, 0);
  public acceleration: Vector = new Vector(0, 0);
  public mass: number = 1;
  private maxspeed: number = 5;
  private maxforce: number = .1;
  public lookRange = 250;
  public color: string = '#0066FA';
  public bgcolor: string = '#00CCFA';
  public experience = 0;
  public level = 1;
  public isPlayer: boolean;
  public isBot: boolean;
  public static counter = 0;
  public targetFood: Food;
  public id;

  constructor(coord: Vector, nickname: string = ""){
    Creature.counter++;
    this.id = Creature.counter;
    this.nickname = nickname || "bot-" + this.id;
    this.location = coord;
    this.rotation.random();
    this.isPlayer = nickname !== "";
    this.isBot = !this.isPlayer;
    if (this.isPlayer){
      Creature.active = this;
    }
  }

  public process() {
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
    let eating = World.foods.filter((food) => {
      let distance = this.location.dist(food.location);
      return (distance < Food.size + this.mass);
    });
    eating.forEach((food) => {
      this.experience += food.experience;
      World.eatFood(food);
    });
  }

  private _processBot(){
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

    if (this.targetFood){
      let coord = this.targetFood.location;
      this._moveTo(coord);
    } else {
      this._moveTo(World.getRandomCoord());
    }

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

  public control(keyPress:{ [key:number]:boolean; } ){
    if (keyPress[KEYS.LEFT]) {
      this.rotation.rotate(Vector.inRadAngle(-10));
    }

    if (keyPress[KEYS.UP]) {
      this.velocity.add(this.rotation);
    }

    if (keyPress[KEYS.RIGHT]) {
      this.rotation.rotate(Vector.inRadAngle(10));
    }

    if (keyPress[KEYS.DOWN]) {
      this.velocity.sub(this.rotation);
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

    var viewX = this.location.x + Math.cos(angle) * 40;
    var viewY = this.location.y + Math.sin(angle) * 40;

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
      World.context.fillText("isBot: " + this.isBot, this.location.x + 20, this.location.y + 20);
    }
    if (this.isPlayer){
      World.context.fillText("isPlayer: " + this.isPlayer, this.location.x + 20, this.location.y + 20);
    }

    context.restore() ;
  }

  private _update() {
    this._boundaries();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);

    // if(Player.velocity.mag() < 1.5)
    //   Player.velocity.setMag(1.5);
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

  private _checkLevel(){
    let limit = 100;
    switch (this.level){
      case 1:
        limit = 100;
        break;
      case 2:
        limit = 100;
        break;
      case 3:
        limit = 200;
        break;
      case 4:
        limit = 200;
        break;
      case 5:
        limit = 300;
        break;
      case 6:
        limit = 400;
        break;
      case 7:
        limit = 500;
        break;
      case 8:
        limit = 600;
        break;
      case 9:
        limit = 10;
        break;
    }
    if (this.experience >= limit) {
      this.level++;
      this.experience = 0;
      switch (this.level){
        case 2:
          this.mass = 1.2;
          break;
        case 3:
          this.mass = 1.3;
          break;
        case 4:
          this.mass = 1.5;
          break;
        case 5:
          this.mass = 1.6;
          break;
        case 6:
          this.mass = 1.7;
          break;
        case 7:
          this.mass = 1.8;
          break;
        case 8:
          this.mass = 1.9;
          break;
        case 9:
          this.mass = 2;
          break;
        case 10:
          this.mass = 2.2;
          break;
      }
    }
  }
}
