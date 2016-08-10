import { Rectangle } from './rectangle';
import { Creature } from './creature';
var AXIS = {
  NONE: "none",
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  BOTH: "both"
};

export class Camera {
  xView: number = 0;
  yView: number = 0;
  xDeadZone: number = 0;
  yDeadZone: number = 0;
  wView: number;
  hView: number;
  axis: string = AXIS.BOTH;
  followed: Creature;
  viewportRect: Rectangle;
  worldRect: Rectangle;

  constructor(xView: number, yView: number, canvasWidth: number, canvasHeight: number, worldWidth: number, worldHeight: number){
    // position of camera (left-top coordinate)
    this.xView = xView || 0;
    this.yView = yView || 0;

    // distance from followed object to border before camera starts move
    this.xDeadZone = 0; // min distance to horizontal borders
    this.yDeadZone = 0; // min distance to vertical borders

    // viewport dimensions
    this.wView = canvasWidth;
    this.hView = canvasHeight;

    // allow camera to move in vertical and horizontal axis
    this.axis = AXIS.BOTH;

    // object that should be followed
    this.followed = null;

    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

    // rectangle that represents the world's boundary (room's boundary)
    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
  }

  follow(creature: Creature, xDeadZone:number, yDeadZone:number) {
    this.followed = creature;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  update() {
    // keep following the player (or other desired object)
    if(this.followed != null)
    {
      let location = this.followed.physics.location;
      if(this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH)
      {
        // moves camera on horizontal axis based on followed object position
        if(location.x - this.xView  + this.xDeadZone > this.wView)
          this.xView = location.x - (this.wView - this.xDeadZone);
        else if(location.x  - this.xDeadZone < this.xView)
          this.xView = location.x  - this.xDeadZone;

      }
      if(this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH)
      {
        // moves camera on vertical axis based on followed object position
        if(location.y - this.yView + this.yDeadZone > this.hView)
          this.yView = location.y - (this.hView - this.yDeadZone);
        else if(location.y - this.yDeadZone < this.yView)
          this.yView = location.y - this.yDeadZone;
      }

    }

    // update viewportRect
    this.viewportRect.set(this.xView, this.yView);

    // don't let camera leaves the world's boundary
    if(!this.viewportRect.within(this.worldRect))
    {
      if(this.viewportRect.left < this.worldRect.left)
        this.xView = this.worldRect.left;
      if(this.viewportRect.top < this.worldRect.top)
        this.yView = this.worldRect.top;
      if(this.viewportRect.right > this.worldRect.right)
        this.xView = this.worldRect.right - this.wView;
      if(this.viewportRect.bottom > this.worldRect.bottom)
        this.yView = this.worldRect.bottom - this.hView;
    }

  }
}
