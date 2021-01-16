import { Point } from "./Library.js";
import { Rectangle } from "./Library.js";

const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const SIZE = 50;

let coin = {
    rect: new Rectangle(0, 0, SIZE, SIZE),
    falling: true
};

const interval = setInterval(() => {

    g.fillStyle = "white";
    g.fillRect(0, 0, WIDTH, HEIGHT);
    
    update();

    for (let i = 1; i <= 6; i++) {
        g.strokeStyle = "black";
        g.lineWidth = 1;

        g.beginPath();
        g.moveTo(i * SIZE, 0);
        g.lineTo(i * SIZE, HEIGHT);
        g.stroke();
        
        g.beginPath();
        g.moveTo(0, i * SIZE);
        g.lineTo(WIDTH, i * SIZE);
        g.stroke();
    }

}, 1000 / 60);

function update() {
    if (coin.falling) {
        if (coin.rect.y + coin.rect.h >= HEIGHT) {
            coin.falling = false;
            coin.rect.y = HEIGHT - coin.rect.h;
        }
        else coin.rect.y += 10;
    }

    coin.rect.draw(g, "red");
}