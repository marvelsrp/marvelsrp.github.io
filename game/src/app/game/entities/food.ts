import { Vector } from './vector';
import { World } from './world';

export class Food {
  public type: string;
  public location: Vector;
  public mass: number = 1;
  public static size = 10;
  public experience = 10;
  public static counter = 0;
  public id;
  constructor(type: string, coord:Vector){
    Food.counter++;
    this.id = Food.counter;
    this.type = type;
    this.location = coord;
  }

  draw() {
    var context = World.context;

    context.save();
    context.beginPath();
    context.lineWidth = 1;

    switch(this.type){
      case 'circle':
        context.fillStyle = '#ff5c33';
        context.strokeStyle = '#ffffff';
        context.arc(this.location.x, this.location.y, Food.size, 0, 2 * Math.PI, false);
        break;
      case 'triangle':
        context.fillStyle = '#006600';
        context.strokeStyle = '#ffffff';

        context.moveTo(this.location.x , this.location.y - Food.size);
        context.lineTo(this.location.x - Food.size, this.location.y + Food.size/2);
        context.lineTo(this.location.x + Food.size, this.location.y + Food.size/2);
        break;
      case 'square':
        context.fillStyle = '#0066cc';
        context.strokeStyle = '#ffffff';
        context.fillRect(this.location.x - Food.size, this.location.y - Food.size, Food.size * 2, Food.size * 2);
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
