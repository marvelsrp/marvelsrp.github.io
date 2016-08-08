import { Vector } from './vector';
import { World } from './world';
console.log('food World',World );
let world:World = World.getInstance();
//
export class Food {
  public type: string;
  public location: Vector;
  public mass: number = 1;
  public length = this.mass * 10;
  private _world:World;

  constructor(world:World, type: string, coord:Vector){
    this._world = world;;
    this.type = type;
    this.location = coord;
  }

  draw() {
    var context = world.context;

    context.save();
    context.beginPath();
    context.lineWidth = 1;

    switch(this.type){
      case 'circle':
        context.fillStyle = '#ff5c33';
        context.strokeStyle = '#ffffff';
        context.arc(this.location.x, this.location.y, this.length, 0, 2 * Math.PI, false);
        break;
      case 'triangle':
        context.fillStyle = '#006600';
        context.strokeStyle = '#ffffff';

        context.moveTo(this.location.x , this.location.y - this.length);
        context.lineTo(this.location.x - this.length, this.location.y + this.length/2);
        context.lineTo(this.location.x + this.length, this.location.y + this.length/2);
        break;
      case 'square':
        context.fillStyle = '#0066cc';
        context.strokeStyle = '#ffffff';
        context.fillRect(this.location.x - this.length, this.location.y - this.length, this.length * 2, this.length * 2);
        break;
    }
    //bot
    context.fill();

    // context.fill();
    context.closePath();
    context.stroke();


    context.globalAlpha = 1;
    context.restore() ;
  }
}
