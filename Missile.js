import Sprite from "./Sprite.js";

const missile_img = new Image(10,10);
missile_img.src = "./assets/missile.png";

class Missile extends Sprite {
    constructor(x, y) {
        super(x, y);
        this.width = 0;
        this.height = 0;
        this.dx = 0; 
        this.dy = 0;
        this.img = missile_img;
    }

    clear() {
      super.clear();
      this.dy = 0;
    }

    move() {
      super.move();
      if (this.y + this.height < 0) { // missile now offscreen
        this.clear(); // indicates missile can be fired again since now dy = 0
      }
    }

    colides(invader) {
      if (this.intersects(invader)) {
        this.clear();
        invader.clear();
        return true;
      }
    }

}
export default Missile;
