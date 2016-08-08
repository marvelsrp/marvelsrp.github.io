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

  public static width: number;
  public static height: number;
  public static player:Player;

  constructor(context: CanvasRenderingContext2D, nickname: string) {
    World.context = context;
    World.width = context.canvas.clientWidth;
    World.height = context.canvas.clientHeight;

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
    let x = Math.random() * World.width;
    let y = Math.random() * World.height;
    return new Vector(x, y);
  }

  public draw(){
    World.context.fillStyle="#ffffff";
    World.context.fillRect(0, 0, World.width, World.height);

    World.foods.forEach((goal) => {
      goal.draw();
    });
    World.creatures.forEach((creature) => {
      let target = World.getRandomCoord();
      creature.moveTo(target);
      creature.draw();
    });
    World.player.draw();

  }
}
