import { Vector } from './vector';
import { Creature } from './creature';
import { World } from './world';

export class Food {
  public static list: Array<Food> = [];

  public type: string;
  public location: Vector;
  public mass: number = 1;
  public size = 10;
  public experience = 10;
  public static counter = 0;
  public creaturesTargeting: Array<Creature> = [];
  public id;

  constructor(type: string, coord:Vector) {
    Food.counter++;
    this.id = Food.counter;
    this.type = type;
    this.location = coord;
    let EXP = {
      'circle': 30,
      'triangle': 10,
      'square': 50
    };
    this.experience = EXP[type];
    let SIZES = {
      'circle': 20,
      'triangle': 15,
      'square': 10
    };
    this.size = SIZES[type];
  }

  public static add(){
    let type = Math.round(Math.random() * 2);
    let TYPES = ['circle', 'triangle', 'square'];
    console.log('addFood', );
    let food = new Food(TYPES[type], World.getRandomCoord());
    Food.list.push(food);
  }

  public static kill(food: Food) {
    food.clearTargeting();
    let index = Food.list.findIndex((item) => {
      return food.id === item.id;
    });
    Food.list.splice(index, 1);

    //clear creature targets
    let foundCreatures = Creature.list.filter((item) => {
      return item.targetFood && food.id === item.targetFood.id;
    });
    foundCreatures.forEach((creature) => {
      creature.targetFood = undefined;
    });
  }

  public addTargeting(creature: Creature) {
    this.creaturesTargeting.push(creature);
  }

  public clearTargeting(){
    this.creaturesTargeting.forEach((creature) => {
      creature.targetFood = undefined;
    })
  }

  public draw() {
    var context = World.context;

    context.save();
    context.beginPath();
    context.lineWidth = 1;

    switch(this.type){
      case 'circle':
        context.fillStyle = '#ff5c33';
        context.strokeStyle = '#ffffff';
        context.arc(this.location.x, this.location.y, this.size, 0, 2 * Math.PI, false);
        break;
      case 'triangle':
        context.fillStyle = '#006600';
        context.strokeStyle = '#ffffff';

        context.moveTo(this.location.x , this.location.y - this.size);
        context.lineTo(this.location.x - this.size, this.location.y + this.size);
        context.lineTo(this.location.x + this.size, this.location.y + this.size);
        break;
      case 'square':
        context.fillStyle = '#0066cc';
        context.strokeStyle = '#ffffff';
        context.fillRect(this.location.x - this.size, this.location.y - this.size, this.size * 2, this.size * 2);
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
