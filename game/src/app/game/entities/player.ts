export class Player {
  private static _instance:Player = new Player();
  public nickname: string;
  public position: [number, number]  = [Math.random() * 1000, Math.random() * 1000];

  public static getInstance():Player
  {
    console.log('Player::getInstance', Player._instance);
    return Player._instance;
  }

  say() {
    return "Hello, my name is " + this.nickname;
  }
}
