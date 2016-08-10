import { Vector } from './vector';
import { Creature } from './creature';
import { World } from './world';

export class Food {
  public static list: Array<Food> = [];

  public physics = {
    location:  new Vector(0, 0),
    mass: 1,
    size: 700
  };
  public type: string;
  public experience = 10;
  public static counter = 0;
  public creaturesTargeting: Array<Creature> = [];
  public id;

  constructor(type: string, coord:Vector) {
    Food.counter++;
    this.id = Food.counter;
    this.type = type;
    this.physics.location = coord;
    let EXP = {
      'circle': 30,
      'triangle': 10,
      'square': 50
    };
    this.experience = EXP[type];
    let SIZES = {
      'circle': 6,
      'triangle': 6,
      'square': 8
    };
    this.physics.size = SIZES[type];
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
        context.fillStyle = '#CCCCCC';
        context.strokeStyle = '#000000';
        context.arc(World.convertX(this.physics.location.x), World.convertY(this.physics.location.y), this.physics.size, 0, 2 * Math.PI, false);
        break;
      case 'triangle':
        context.fillStyle = '#CCCCCC';
        context.strokeStyle = '#000000';

        context.moveTo(World.convertX(this.physics.location.x), World.convertY(this.physics.location.y - this.physics.size));
        context.lineTo(World.convertX(this.physics.location.x - this.physics.size), World.convertY(this.physics.location.y + this.physics.size));
        context.lineTo(World.convertX(this.physics.location.x + this.physics.size), World.convertY(this.physics.location.y + this.physics.size));
        break;
      case 'square':
        context.fillStyle = '#CCCCCC';
        context.strokeStyle = '#000000';
        context.rect(World.convertX(this.physics.location.x - this.physics.size) , World.convertY(this.physics.location.y - this.physics.size), this.physics.size * 2, this.physics.size * 2);
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
