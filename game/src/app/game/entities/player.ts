export class Player {
  private nickname: string;
  private position: [number, number];

  constructor(nickname: string) {
    this.nickname = nickname;
    this.position = [Math.random() * 1000, Math.random() * 1000];
  }

  say() {
    return "Hello, my name is " + this.nickname;
  }
}
