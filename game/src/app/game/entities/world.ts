import { Vector } from './vector';
import { Creature } from './creature';
import { Food } from './food';

export class World {
  private static _instance:World;
  public creatures: Array<Creature> = [];
  public foods: Array<Food> = [];
  public context: CanvasRenderingContext2D;
  private countCreatures: number = 3;
  private countFoodsCircle: number = 20;
  private countFoodsTriangle: number = 15;
  private countFoodsSquare: number = 10;
  public width = 1000;
  public height = 1000;

  // constructor(){
  //   return World._instance;
  // }

  public static getInstance():World
  {
    if (!World._instance){
      World._instance = new World();
    }
    console.log('World::getInstance', World._instance);
    return World._instance;
  }
  public getRandomCoord(){
    let x = Math.random() * this.context.canvas.clientWidth;
    let y = Math.random() * this.context.canvas.clientHeight;
    return new Vector(x, y);
  }

  public init() {
    for (let i = 0; i < this.countCreatures; i++)
    {
      let creature = new Creature(this, this.getRandomCoord());
      this.creatures.push(creature);
    }

    for (let i = 0; i < this.countFoodsCircle; i++)
    {
      let circle = new Food(this, 'circle', this.getRandomCoord());
      this.foods.push(circle);
    }

    for (let i = 0; i < this.countFoodsTriangle; i++)
    {
      let triangle = new Food(this, 'triangle', this.getRandomCoord());
      this.foods.push(triangle);
    }

    for (let i = 0; i < this.countFoodsSquare; i++)
    {
      let square = new Food(this, 'square', this.getRandomCoord());
      this.foods.push(square);
    }


  }

  public draw(){
    this.context.fillStyle="#ffffff";
    this.context.fillRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);

    this.foods.forEach((goal) => {
      goal.draw();
    });
    this.creatures.forEach((creature) => {
      let x = Math.random() * this.context.canvas.clientWidth;
      let y = Math.random() * this.context.canvas.clientHeight;
      let target = new Vector(x,y);
      creature.moveTo(target);
      creature.draw();
    });

  }
}
