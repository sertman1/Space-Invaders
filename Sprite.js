class Sprite {
    constructor(x, y, width, height, dx, dy, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.img = img;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    clear() {
        this.width = 0;
        this.height = 0;
    }

    intersects(other) {
        let tw = this.width;
        let th = this.height;
        let rw = other.width;
        let rh = other.width;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
            return false;
        }
        let tx = this.x;
        let ty = this.y;
        let rx = other.x;
        let ry = other.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        return (
            (rw < rx || rw > tx) &&
            (rh < ry || rh > ty) &&
            (tw < tx || tw > rx) &&
            (th < ty || th > ry)
        );
    }

}
export default Sprite;
