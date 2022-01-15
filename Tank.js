import Sprite from "./Sprite.js";

const tank_img = new Image(50, 50);
tank_img.src = "./assets/tank.png";

class Tank extends Sprite{

    constructor(x, y) {
        super(x, y);
        this.width = 50;
        this.height = 50;
        this.dx = 0;
        this.dy = 0;
        this.displacement = 4; 
        this.img = tank_img;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = this.displacement;
        } 
        else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = -this.displacement;
        }
    }

    keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 0;
        } 
        else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = 0;
        }
    }

    move(canvasWidth) {
        super.move();
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
    }

    colides(invader) {
        if (this.intersects(invader)) {
            return true;
        }
    }

}

export default Tank;