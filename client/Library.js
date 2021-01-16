export class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

export class Rectangle {
    
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contain(p) {
        return (p.x > this.x && p.x < this.x + this.w &&
            p.y > this.y && p.y < this.y + this.h ) ? true : false;
    }

    draw(g, color) {
        g.fillStyle = color;
        g.fillRect(this.x, this.y, this.w, this.h);
    }
    
}