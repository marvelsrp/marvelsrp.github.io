import { Vector } from './vector';
import { Creature } from './creature';
import { Food } from './food';
import { Camera } from './camera';

export class World {
  public static context: CanvasRenderingContext2D;

  private static countCreatures: number = 30;
  private static countFoods: number = 30;

  public static canvasWidth: number = window.innerWidth;
  public static canvasHeight: number = window.innerHeight;

  public static width: number = 2500;
  public static height: number = 1500;

  public static camera:Camera;
  public static image:HTMLImageElement = new Image();

  public static init() {
    Creature.active = Creature.add(true);

    World.camera = new Camera(0, 0, World.canvasWidth, World.canvasHeight, World.width, World.height);
    World.camera.follow(Creature.active, World.canvasWidth/2, World.canvasHeight/2);

    for (let i = 0; i < World.countCreatures; i++)
      Creature.add();

    for (let i = 0; i < World.countFoods; i++)
      Food.add()
  }

  public static setContext(context: CanvasRenderingContext2D){
    World.context = context;
    World.image.src = context.canvas.toDataURL("image/png");
  }

  public static getRandomCoord(){
    let x = Math.random() * World.width;
    let y = Math.random() * World.height;
    return new Vector(x, y);
  }

  public static draw(){

    World.context.fillStyle="#ffffff";
    World.context.fillRect(0, 0, World.canvasWidth, World.canvasHeight);

    var rows = ~~(this.width/44) + 1;
    var columns = ~~(this.height/44) + 1;

    World.context.save();
    World.context.fillStyle = '#CCCCCC';
    World.context.strokeStyle = '#000000';

    for (var x = 0, i = 0; i < rows; x+=44, i++) {
      World.context.beginPath();
      for (var y = 0, j=0; j < columns; y+=44, j++) {
        World.context.rect (World.convertX(x), World.convertY(y), 40, 40);
      }
      World.context.fill();
      World.context.closePath();
    }

    World.context.beginPath();
      World.context.lineWidth = 3;
      World.context.moveTo(World.convertX(World.width/2 - 20), World.convertY(World.height/2));
      World.context.lineTo(World.convertX(World.width/2 + 20), World.convertY(World.height/2));
      World.context.moveTo(World.convertX(World.width/2), World.convertY(World.height/2 - 20));
      World.context.lineTo(World.convertX(World.width/2), World.convertY(World.height/2 + 20));
    World.context.closePath();
    World.context.stroke();

    World.context.restore();

    Food.list.forEach((food) => food.draw());
    Creature.list.forEach((creature) => creature.process());


    World.context.font="20px Tahome";
    World.context.fillStyle = 'black';
    World.context.fillText("Expirience: " + Creature.active.experience, 20, 20);
    World.context.fillText("Level: " + Creature.active.level, 20, 40);
    World.context.fillText("Health: " + Creature.active.health + '/' + Creature.active.maxHealth, 20, 60);
    World.context.fillText("Location: " + Math.round(Creature.active.physics.location.x) + ':'
      + Math.round(Creature.active.physics.location.y), 20, 80);

    let sx, sy, dx, dy;
    let sWidth, sHeight, dWidth, dHeight;
    sx = World.camera.xView;
    sy = World.camera.yView;
    sWidth =  World.context.canvas.width;
    sHeight = World.context.canvas.height;
    // if cropped image is smaller than canvas we need to change the source dimensions
    if(World.image.width - sx < sWidth){
      sWidth = World.image.width - sx;
    }
    if(World.image.height - sy < sHeight){
      sHeight = World.image.height - sy;
    }

    // location on canvas to draw the croped image
    dx = 0;
    dy = 0;
    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;;
    World.context.drawImage(World.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

  }

  static convert(x: number, y: number){
    return [x - World.camera.xView, y - World.camera.yView];
  }

  static convertX(x: number){
    return x - World.camera.xView;
  }

  static convertY(y: number){
    return y - World.camera.yView;
  }
}
