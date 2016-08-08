import { Vector } from './vector';
import { World } from './world';
const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
export class Player {
  public static nickname: string;
  public static location: Vector;
  public static velocity: Vector = new Vector(0, 0);
  public static acceleration: Vector = new Vector(0, 0);
  public static lookRange: number = 20;
  public static lookDistance: number = 150;
  public static mass: number = 1;
  private static maxspeed: number = 5;
  private static maxforce: number = .1;
  public static color: string = '#0066FA';
  public static bgcolor: string = '#00CCFA';


  constructor(nickname: string, coord: Vector){
    Player.nickname = nickname;
    Player.location = coord;
    Player.velocity.random();
  }

  controlV1(keyPress){
    var force = new Vector(0,0);
    var target;
    var gradAngle = Vector.inGradAngle(Player.velocity.angle());

    if (keyPress[KEYS.LEFT]) {
      if (gradAngle  == 0) {
        target = new Vector(Player.location.x - 10, Player.location.y - 10);//fake
      } else {
        target = new Vector(Player.location.x - 1, Player.location.y);
      }
      var cohesion = this.seek(target);
      force.add(cohesion);
    }

    if (keyPress[KEYS.UP]) {
      if (gradAngle == 90) {
        target = new Vector(Player.location.x - 10, Player.location.y - 10);//fake
      } else {
        target = new Vector(Player.location.x, Player.location.y - 1);
      }
      var cohesion = this.seek(target);
      force.add(cohesion);
    }

    if (keyPress[KEYS.RIGHT]) {
      if (gradAngle == 180) {
        target = new Vector(Player.location.x + 10, Player.location.y - 10); //fake
      } else {
        target = new Vector(Player.location.x + 1, Player.location.y);
      }
      var cohesion = this.seek(target);
      force.add(cohesion);
    }

    if (keyPress[KEYS.DOWN]) {
      if (gradAngle == -90) {
        target = new Vector(Player.location.x - 10, Player.location.y + 10);//fake
      } else {
        target = new Vector(Player.location.x, Player.location.y + 1);
      }
      var cohesion = this.seek(target);
      force.add(cohesion);
    }
    this.applyForce(force);
  }

  moveTo(target: Vector) {
    var force = new Vector(0,0);
    var cohesion = this.seek(target);

    force.add(cohesion);

    this.applyForce(force);
  }

  draw() {
    this.update();

    var context = World.context;

    var angle = Player.velocity.angle();

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

    //look range
    context.globalAlpha = 0.3;
    context.moveTo(Player.location.x, Player.location.y);
    context.arc(Player.location.x, Player.location.y, Player.lookDistance,
      angle - Vector.inRadAngle(Player.lookRange), angle + Vector.inRadAngle(Player.lookRange), false);
    // context.fill();
    context.closePath();
    context.stroke();

    context.beginPath();
    context.arc(Player.location.x, Player.location.y, Player.mass * 50, 0, 2 * Math.PI, false);
    // context.fill();
    context.stroke();
    context.closePath();


    context.globalAlpha = 1;
    context.restore() ;
  }

  update() {
    this.boundaries();
    Player.velocity.add(Player.acceleration);
    Player.velocity.limit(Player.maxspeed);
    if(Player.velocity.mag() < 1.5)
      Player.velocity.setMag(1.5);
    Player.location.add(Player.velocity);
    Player.acceleration.mul(0);
  }

  applyForce(force) {
    Player.acceleration.add(force);
  }

  boundaries() {
    if (Player.location.x < 50)
      this.applyForce(new Vector(Player.maxforce * 2, 0));

    if (Player.location.x > World.width - 50)
      this.applyForce(new Vector(-Player.maxforce * 2, 0));

    if (Player.location.y < 50)
      this.applyForce(new Vector(0, Player.maxforce * 2));

    if (Player.location.y > World.height - 50)
      this.applyForce(new Vector(0, -Player.maxforce * 2));

  }

  seek(target) {
    var seek = target.copy().sub(Player.location);
    seek.normalize();
    seek.mul(Player.maxspeed);
    seek.sub(Player.velocity).limit(0.3);

    return seek;
  }
}
