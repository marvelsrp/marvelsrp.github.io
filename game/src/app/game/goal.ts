import { Vector } from './vector';

export class Goal {
  public type: string;
  public location: Vector = new Vector(Math.random() * 1000, Math.random() * 1000);
  public velocity: Vector = new Vector(0, 0);
  public acceleration: Vector = new Vector(0, 0);

  public lookRange: number = 20;
  public lookDistance: number = 150;
  public mass: number = 1;
  private maxspeed: number = 5;
  private maxforce: number = .1;
  public color: string = '#000066';
  public bgcolor: string = '#E6E6FA';

  constructor(type: string) {
    this.type = type;
  }

  say() {
    return "Hello, my type is " + this.type;
  }
  moveTo(networkOutput) {
    // var force = new Vector(0,0);
    //
    // var target = new Vector(networkOutput[0] * this.world.width, networkOutput[1] * this.world.height);
    // var angle = (networkOutput[2] * Math.PI * 2) - Math.PI;
    //
    // var separation = this.separate(this.world.creatures);
    // var cohesion = this.seek(target);
    //
    // force.add(separation);
    // force.add(cohesion);
    //
    // this.applyForce(force);
  }

  draw() {
    //   this.update();
    //
    //   var context = this.world.context;
    //
    //   var angle = this.velocity.angle();
    //
    //   var viewX = this.location.x + Math.cos(angle) * 40;
    //   var viewY = this.location.y + Math.sin(angle) * 40;
    //
    //   context.save();
    //   context.beginPath();
    //   context.fillStyle = "#0000FF";
    //   context.font = "24px Arial";
    //   context.fillText(this.counter,this.location.x-10, this.location.y-14);
    //
    //   context.fillStyle = this.bgcolor;
    //   context.lineWidth = 1;
    //   context.strokeStyle = this.color;
    //
    //   //bot
    //   context.arc(this.location.x, this.location.y, this.length, 0, 2 * Math.PI, false);
    //   context.fill();
    //
    //   //move vector
    //   context.moveTo(this.location.x, this.location.y);
    //   context.lineTo(viewX, viewY);
    //   context.stroke();
    //
    //   //look range
    //   context.globalAlpha = 0.3;
    //   context.moveTo(this.location.x, this.location.y);
    //   context.arc(this.location.x, this.location.y, this.lookDistance,
    //       angle - inRadAngle(this.lookRange), angle + inRadAngle(this.lookRange), false);
    // // context.fill();
    //   context.closePath();
    //   context.stroke();
    //
    //   context.beginPath();
    //   context.arc(this.location.x, this.location.y, this.length*5, 0, 2 * Math.PI, false);
    //  // context.fill();
    //   context.stroke();
    //   context.closePath();
    //
    //
    //   context.globalAlpha = 1;
    //   context.restore() ;
    }

    update() {
      // this.boundaries();
      // this.velocity.add(this.acceleration);
      // this.velocity.limit(this.maxspeed);
      // if(this.velocity.mag() < 1.5)
      //     this.velocity.setMag(1.5);
      // this.location.add(this.velocity);
      // this.acceleration.mul(0);
    }

    applyForce(force) {
      // this.acceleration.add(force);
    }

    boundaries() {
      //
      // if (this.location.x < 15)
      //     this.applyForce(new Vector(this.maxforce * 2, 0));
      //
      // if (this.location.x > this.world.width - 15)
      //     this.applyForce(new Vector(-this.maxforce * 2, 0));
      //
      // if (this.location.y < 15)
      //     this.applyForce(new Vector(0, this.maxforce * 2));
      //
      // if (this.location.y > this.world.height - 15)
      //     this.applyForce(new Vector(0, -this.maxforce * 2));

    }

    seek(target) {
      // var seek = target.copy().sub(this.location);
      // seek.normalize();
      // seek.mul(this.maxspeed);
      // seek.sub(this.velocity).limit(0.3);
      //
      // return seek;
    }

    separate(neighbors) {
      // var sum = new Vector(0,0);
      // var count = 1;
      //
      // for (var i in neighbors)
      // {
      //     if (neighbors[i] != this)
      //     {
      //         var d = this.location.dist(neighbors[i].location);
      //         if (d < this.lookDistance/2 && d > 0)
      //         {
      //             var diff = this.location.copy().sub(neighbors[i].location);
      //             diff.normalize();
      //             diff.div(d);
      //             sum.add(diff);
      //             count++;
      //         }
      //     }
      // }
      // if (!count)
      //     return sum;
      //
      // sum.div(count);
      // sum.normalize();
      // sum.mul(this.maxspeed);
      // sum.sub(this.velocity);
      // sum.limit(this.maxforce);
      //
      // return sum.mul(2);
    }
}
