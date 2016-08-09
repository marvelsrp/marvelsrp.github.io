import { Vector } from './vector';
import { Creature } from './creature';
import { Food } from './food';


export class World {
  public static context: CanvasRenderingContext2D;

  private static countCreatures: number = 3;
  private static countFoods: number = 30;

  public static clientWidth: number;
  public static clientHeight: number;
  public static width: number = 10000;
  public static height: number = 10000;

  public static init() {
    Creature.active = Creature.add(true);

    for (let i = 0; i < World.countCreatures; i++)
      Creature.add();

    for (let i = 0; i < World.countFoods; i++)
      Food.add()
  }

  public static setContext(context: CanvasRenderingContext2D){
    World.context = context;
    World.clientWidth = context.canvas.clientWidth;
    World.clientHeight = context.canvas.clientHeight;
  }

  public static getRandomCoord(){
    let x = Math.random() * World.clientWidth;
    let y = Math.random() * World.clientHeight;
    return new Vector(x, y);
  }

  public static draw(){
    World.context.fillStyle="#ffffff";
    World.context.fillRect(0, 0, World.clientWidth, World.clientHeight);

    Food.list.forEach((food) => food.draw());
    Creature.list.forEach((creature) => creature.process());


    World.context.font="20px Tahome";
    World.context.fillStyle = 'black';
    World.context.fillText("Expirience: " + Creature.active.experience, 20, 20);
    World.context.fillText("Level: " + Creature.active.level, 20, 40);

  }


  // public static getNearly(pos: Vector){
  //   let foods = World.foods.filter((food) => {
  //     let distance = pos.dist(food.location);
  //     return (distance < Food.size + this.mass);
  //   });
  // }
}
