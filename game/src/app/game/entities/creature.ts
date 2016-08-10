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
  public physics = {
    location:  new Vector(0, 0),
    velocity: new Vector(0, 0),
    rotation: new Vector(0, 0),
    acceleration: new Vector(0, 0),
    mass: 1,
    maxspeed: 5,
    maxforce: 0.1,
    lookRange: 700
  };
  public experience = 0;
  public level = 1;
  public health = 100;
  public maxHealth = 100;
  public patronInterval = 1/5;

  public isPlayer: boolean;
  public isBot: boolean;
  public targetFood: Food;
  public patrons: Array<Patron> = [];
  public id;
  public static counter = 0;
  public static maxLevel = 20;

  constructor(coord: Vector, isPlayer: boolean = false){
    Creature.counter++;
    this.id = Creature.counter;
    this.name = "bot-" + this.id;
    this.physics.location = coord;
    this.physics.rotation.random();
    this.isPlayer = isPlayer;
    this.isBot = !isPlayer;
  }

  public damage(damage:number){
    this.health -= damage;
    let killed = this.health <= 0;
    if (killed) {
      Creature.kill(this);
    }
    return killed;
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

   this._processDamage();

    this._checkLevel();
    this._draw();
  }

  private _processDamage(){
    //Перебор по всем сущностям, нанесение урона при таране
    let damageCreatures = Creature.list.filter((creature) => {
      let distance = this.physics.location.dist(creature.physics.location);
      let minDistance = creature.physics.mass * 10 + this.physics.mass * 10;
      return (distance < minDistance && this.id != creature.id);
    });

    damageCreatures.forEach((creature) => {
      var diff = this.physics.location.copy().sub(creature.physics.location);
      diff.normalize();
      diff.mul(3);
      this._applyForce(diff);

      this.damage(Math.round(creature.physics.mass * 10  + Math.random() * 5));
    });
  }

  private _fire(){
    this.patrons.push(new Patron(this));
  }

  public removePatron(patron: Patron){
    let index = this.patrons.findIndex((item) => {
      return patron.id === item.id;
    });
    this.patrons.splice(index, 1);
  }

  private _processPlayer(){
    //Перебор по всем целям, расчет вхождения
    let eating = Food.list.filter((food) => {
      let distance = this.physics.location.dist(food.physics.location);
      return (distance < food.physics.size + this.physics.mass * 10);
    });

    eating.forEach((food) => {
      this.experience += food.experience;
      Food.kill(food);
      Food.add();
    });
  }

  private _processBot(){
    if (this.targetFood) {
      let distance = this.physics.location.dist(this.targetFood.physics.location);
      if (distance < this.targetFood.physics.size * 2){
        this.experience += this.targetFood.experience;
        Food.kill(this.targetFood);
        Food.add();
      }
    } else {
      this._findTarget();
    }

    if (this.targetFood){
      let coord = this.targetFood.physics.location;
      this._moveTo(coord);
    } else {
      this._moveTo(World.getRandomCoord());
    }

  }

  private _findTarget(){

    //Перебор по всем целям, расчет вхождения
    let looked = Food.list.filter((food) => {
      let distance = this.physics.location.dist(food.physics.location);
      return (distance < this.physics.lookRange);
    });
    if (looked.length) {
      let sortLooked = looked.sort((a, b) => {
        let aDist = this.physics.location.dist(a.physics.location);
        let bDist = this.physics.location.dist(b.physics.location);
        return aDist - bDist;
      });
      this.targetFood = sortLooked[0];
      this.targetFood.addTargeting(this);
    }
  }

  public control(keyPress:{ [key:number]:boolean; } ){
    if (keyPress[KEYS.LEFT] || keyPress[KEYS.A]) {
      this.physics.rotation.rotate(Vector.inRadAngle(-10));
    }

    if (keyPress[KEYS.UP]  || keyPress[KEYS.W]) {
      this.physics.velocity.add(this.physics.rotation);
    }

    if (keyPress[KEYS.RIGHT]  || keyPress[KEYS.D]) {
      this.physics.rotation.rotate(Vector.inRadAngle(10));
    }

    if (keyPress[KEYS.DOWN]  || keyPress[KEYS.S]) {
      this.physics.velocity.sub(this.physics.rotation);
    }

    if (//default speed
      !keyPress[KEYS.LEFT] && !keyPress[KEYS.A] &&
      !keyPress[KEYS.UP]  && !keyPress[KEYS.W] &&
      !keyPress[KEYS.RIGHT] && !keyPress[KEYS.D] &&
      !keyPress[KEYS.DOWN] && !keyPress[KEYS.S])
    {
      this.physics.velocity.setMag(0.5);
    }

    if (keyPress[KEYS.SPACE]) {
      this._fire();
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
    let bgcolor = '#00CCFA';
    let color = '#0066FA';
    let percentHealth = this.health / this.maxHealth;
    if (percentHealth < 0.3){
      bgcolor = '#CC6666';
      color = '#333333';
    } else if (percentHealth < 0.6){
      bgcolor = '#ffcc66';
      color = '#cc8800';
    }

    var context = World.context;

    var angle = this.physics.rotation.angle();

    var viewX = this.physics.location.x + Math.cos(angle) * this.physics.mass * 11;
    var viewY = this.physics.location.y + Math.sin(angle) * this.physics.mass * 11;

    context.save();
    context.beginPath();

    context.fillStyle = bgcolor;
    context.lineWidth = 1;
    context.strokeStyle = color;

    //bot
    context.arc(this.physics.location.x, this.physics.location.y, this.physics.mass * 10, 0, 2 * Math.PI, false);
    context.fill();

    //move vector
    context.moveTo(this.physics.location.x, this.physics.location.y);
    context.lineTo(viewX, viewY);
    context.stroke();

    // context.fill();
    context.closePath();
    context.stroke();

    context.globalAlpha = 1;
    context.font="14px Tahome";
    context.fillStyle = 'black';
    let x = this.physics.location.x + this.physics.mass * 10 + 10;
    let y = this.physics.location.y + this.physics.mass * 10 + 10;
    if (this.isBot){
      World.context.fillText("Bot " + this.level + " level", x, y);
    }
    if (this.isPlayer){
      World.context.fillText("Player", x, y);
    }
    World.context.fillText("Health: " + this.health + '/' + this.maxHealth, x, y + 14);

    context.restore() ;
  }

  private _update() {
    this._boundaries();
    this.physics.velocity.add(this.physics.acceleration);
    this.physics.velocity.limit(this.physics.maxspeed);

    this.physics.location.add(this.physics.velocity);
    this.physics.acceleration.mul(0);
  }

  private _applyForce(force) {
    this.physics.acceleration.add(force);
    this.physics.rotation = this.physics.velocity;
  }

  private _boundaries() {
    if (this.physics.location.x < 50)
      this._applyForce(new Vector(this.physics.maxforce * 2, 0));

    if (this.physics.location.x > World.width - 50)
      this._applyForce(new Vector(-this.physics.maxforce * 2, 0));

    if (this.physics.location.y < 50)
      this._applyForce(new Vector(0, this.physics.maxforce * 2));

    if (this.physics.location.y > World.height - 50)
      this._applyForce(new Vector(0, -this.physics.maxforce * 2));

  }

  private _seek(target) {
    var seek = target.copy().sub(this.physics.location);
    seek.normalize();
    seek.mul(this.physics.maxspeed);
    seek.sub(this.physics.velocity).limit(0.3);

    return seek;
  }



  private _checkLevel(){
    let limit = 100;
    if (this.experience >= limit && this.level < Creature.maxLevel) {
      this.level++;
      this.health += Math.round(this.level/3 * 20);
      this.maxHealth += Math.round(this.level/3 * 20);
      this.experience = 0;
      this.physics.mass += 0.3;
    }
  }
}
