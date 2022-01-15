import Sprite from "./Sprite.js";

const invader_img = new Image(30, 30);
invader_img.src = "./assets/invader.png";

class Invader extends Sprite {
    constructor (x, dy) {
        super(x, -30);   // y = -30 since invader always starts at top, and height = 30
        this.dy = dy;
        this.dx = 1; // enables invader to wobble back and forth
        this.width = 30;
        this.height = 30;
        this.img = invader_img;
        this.defeatedPlayer = false;
        // used to create wobble effect:
        this.jiggleCounter = 0;
        this.jiggleFactor = 10;
    }

    move() {
        super.move();
        if (this.x + this.width + this.dx * this.jiggleFactor > 480) {
            this.x = 450;
        }
        else if (this.x + this.dx * this.jiggleFactor < 0) {
            this.x = 0;
        }
        if (this.jiggleCounter % this.jiggleFactor == 0) { 
            this.dx = -this.dx; // after every jiggleFactor movements in one x-direction, change direction
            this.internalCounter = 0; // reset counter so it doesn't approach infinitely large
        }
        this.jiggleCounter++;
        if (this.y + this.height >= 600) { // 600 == height of canvas, so if this is true, invader's foot has touched the floor and thus won
            this.defeatedPlayer = true;
        }
    }

}

export default Invader;