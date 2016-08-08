import { Vector } from './vector';
import { World } from './world';
import { Food } from './food';
const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export class Player {
  public static nickname: string;
  public static location: Vector;
  public static velocity: Vector = new Vector(0, 0);
  public static rotation: Vector = new Vector(0, 0);
  public static acceleration: Vector = new Vector(0, 0);
  public static mass: number = 1;
  private static maxspeed: number = 5;
  private static maxforce: number = .1;
  public static color: string = '#0066FA';
  public static bgcolor: string = '#00CCFA';
  public static experience = 0;
  public static level = 1;

  constructor(nickname: string, coord: Vector){
    Player.nickname = nickname;
    Player.location = coord;
    Player.rotation.random();
  }

  public process(keyPress:{ [key:number]:boolean; } ) {
    this._control(keyPress);


    //Перебор по всем целям, расчет вхождения
    let eating = World.foods.filter((food) => {
      let distance = Player.location.dist(food.location);
      return (distance < Food.size + Player.mass);
    });

    eating.forEach((food) => {
      Player.experience += food.experience;
      World.eatFood(food);
    });
    this._checkLevel();
    this._draw();
  }

  private _control(keyPress:{ [key:number]:boolean; } ){
    var force = new Vector(0,0);

    if (keyPress[KEYS.LEFT]) {
      Player.rotation.rotate(Vector.inRadAngle(-10));
    }
    //
    if (keyPress[KEYS.UP]) {
      Player.velocity.add(Player.rotation);
    } else {
      // Player.velocity.random();
    }

    if (keyPress[KEYS.RIGHT]) {
      Player.rotation.rotate(Vector.inRadAngle(10));
    }
    //
    if (keyPress[KEYS.DOWN]) {
      Player.velocity.sub(Player.rotation);
    }
    // this._applyForce(force);
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

    var angle = Player.rotation.angle();

    var viewX = Player.location.x + Math.cos(angle) * 40;
    var viewY = Player.location.y + Math.sin(angle) * 40;

    context.save();
    context.beginPath();

    context.fillStyle = Player.bgcolor;
    context.lineWidth = 1;
    context.strokeStyle = Player.color;

    //bot
    context.arc(Player.location.x, Player.location.y, Player.mass * 10, 0, 2 * Math.PI, false);
    context.fill();

    //move vector
    context.moveTo(Player.location.x, Player.location.y);
    context.lineTo(viewX, viewY);
    context.stroke();

    // context.fill();
    context.closePath();
    context.stroke();


    context.globalAlpha = 1;
    context.font="20px Tahome";
    context.fillStyle = 'black';
    context.fillText("Expirience: " + Player.experience, 20, 20);
    context.fillText("Level: " + Player.level, 20, 40);
    context.restore() ;
  }

  private _update() {
    this._boundaries();
    Player.velocity.add(Player.acceleration);
    Player.velocity.limit(Player.maxspeed);
    // if(Player.velocity.mag() < 1.5)
    //   Player.velocity.setMag(1.5);
    Player.location.add(Player.velocity);
    Player.acceleration.mul(0);
  }

  private _applyForce(force) {
    Player.acceleration.add(force);
  }

  private _boundaries() {
    if (Player.location.x < 50)
      this._applyForce(new Vector(Player.maxforce * 2, 0));

    if (Player.location.x > World.width - 50)
      this._applyForce(new Vector(-Player.maxforce * 2, 0));

    if (Player.location.y < 50)
      this._applyForce(new Vector(0, Player.maxforce * 2));

    if (Player.location.y > World.height - 50)
      this._applyForce(new Vector(0, -Player.maxforce * 2));

  }

  private _seek(target) {
    var seek = target.copy().sub(Player.location);
    seek.normalize();
    seek.mul(Player.maxspeed);
    seek.sub(Player.velocity).limit(0.3);

    return seek;
  }

  private _checkLevel(){
    let limit = 100;
    switch (Player.level){
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
    if (Player.experience >= limit) {
      Player.level++;
      Player.experience = 0;
      switch (Player.level){
        case 2:
          Player.mass = 1.2;
          break;
        case 3:
          Player.mass = 1.3;
          break;
        case 4:
          Player.mass = 1.5;
          break;
        case 5:
          Player.mass = 1.6;
          break;
        case 6:
          Player.mass = 1.7;
          break;
        case 7:
          Player.mass = 1.8;
          break;
        case 8:
          Player.mass = 1.9;
          break;
        case 9:
          Player.mass = 2;
          break;
        case 10:
          Player.mass = 2.2;
          break;
      }
    }
  }
}
