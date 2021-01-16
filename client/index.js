import Point from "./Library.js";
import Rectangle from ".Library.js";

const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const SIZE = 50;

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

}