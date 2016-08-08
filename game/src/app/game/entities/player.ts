import { Vector } from './vector';

export class Player {
  public static nickname: string;
  public static position: [number, number]  = [Math.random() * 1000, Math.random() * 1000];

  constructor(nickname: string, coord: Vector){
    Player.nickname = nickname;
    Player.position = coord;
  }

  draw(){

  }
}
