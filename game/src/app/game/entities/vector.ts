export class Vector {

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
      this.x = x;
      this.y = y;

      return this;
  }

  add(v) {
      this.x += v.x;
      this.y += v.y;

      return this;
  }

  sub(v) {
      this.x -= v.x;
      this.y -= v.y;

      return this;
  }

  mul(s){
      this.x *= s;
      this.y *= s;

      return this;
  }

  div(s) {
      !s && console.log("Division by zero!");

      this.x /= s;
      this.y /= s;

      return this;
  }

  mag(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    var mag = this.mag();
    mag && this.div(mag);
    return this;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  setMag(m) {
    var angle = this.angle();
    this.x = m * Math.cos(angle);
    this.y = m * Math.sin(angle);
    return this;
  }

  setAngle(a) {
    var mag = this.mag();
    this.x = mag * Math.cos(a);
    this.y = mag * Math.sin(a);
    return this;
  }

  rotate(a) {
      this.setAngle(this.angle() + a);
      return this;
  }

  limit(l) {
      var mag = this.mag();
      if(mag > l)
          this.setMag(l);
      return this;
  }

  angleBetween(v) {
      return this.angle() - v.angle();
  }

  dot(v) {
      return this.x * v.x + this.y * v.y;
  }

  lerp(v, amt) {
      this.x += (v.x - this.x) * amt;
      this.y += (v.y - this.y) * amt;
      return this;
  }

  dist(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      return Math.sqrt(dx * dx + dy * dy);
  }

  copy() {
      return new Vector(this.x, this.y);
  }

  random(){
      this.set(1,1);
      this.setAngle(Math.random() * Math.PI * 2);
      return this;
  }

  static inGradAngle(val) {
    return val * 180 / Math.PI;
  }

  static inRadAngle(val) {
    return val * Math.PI / 180;
  }

  static getAngleBeetween(velocity_2:Vector, position1:Vector, position2:Vector){
      var angle = Vector.inGradAngle(Math.atan2(velocity_2.y, velocity_2.x));
      var angle2 = Vector.inGradAngle(
          Math.atan2(
            position1.x - position2.x,
            position1.y - position2.y
          )
      );

      var angle_between = Math.abs(angle2-angle);
      if (angle_between > 180)
          angle_between -= 180;
      return angle_between;
  }

}
