class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Rectangle {
    
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

    drawRect(g, color) {
        g.fillStyle = color;
        g.fillRect(this.x, this.y, this.w, this.h);
    }

    drawCircle(g, color) {
        g.fillStyle = color;
        g.lineWidth = 3;
        g.beginPath();
        g.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, 2 * Math.PI);
        g.fill();
    }
    
}