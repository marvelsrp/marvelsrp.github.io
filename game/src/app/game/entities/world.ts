import { Vector } from './vector';
import { Creature } from './creature';
import { Food } from './food';
import { Player } from './player';

export class World {
  public static creatures: Array<Creature> = [];
  public static foods: Array<Food> = [];
  public static context: CanvasRenderingContext2D;

  private static countCreatures: number = 3;
  private static countFoodsCircle: number = 20;
  private static countFoodsTriangle: number = 15;
  private static countFoodsSquare: number = 10;

  public static clientWidth: number;
  public static clientHeight: number;
  public static width: number = 10000;
  public static height: number = 10000;
  public static player:Player;

  constructor(context: CanvasRenderingContext2D, nickname: string) {
    World.context = context;
    World.clientWidth = context.canvas.clientWidth;
    World.clientHeight = context.canvas.clientHeight;

    for (let i = 0; i < World.countCreatures; i++)
    {
      let creature = new Creature(World.getRandomCoord());
      World.creatures.push(creature);
    }

    for (let i = 0; i < World.countFoodsCircle; i++)
    {
      let circle = new Food('circle', World.getRandomCoord());
      World.foods.push(circle);
    }

    for (let i = 0; i < World.countFoodsTriangle; i++)
    {
      let triangle = new Food('triangle', World.getRandomCoord());
      World.foods.push(triangle);
    }

    for (let i = 0; i < World.countFoodsSquare; i++)
    {
      let square = new Food('square', World.getRandomCoord());
      World.foods.push(square);
    }

    World.player = new Player(nickname, World.getRandomCoord());
  }

  public static getRandomCoord(){
    let x = Math.random() * World.clientWidth;
    let y = Math.random() * World.clientHeight;
    return new Vector(x, y);
  }

  public draw(){
    World.context.fillStyle="#ffffff";
    World.context.fillRect(0, 0, World.clientWidth, World.clientHeight);

    World.foods.forEach((goal) => {
      goal.draw();
    });
    World.creatures.forEach((creature) => creature.process());
  }

  public static eatFood(food: Food) {
    food.location = World.getRandomCoord();
  }
}
