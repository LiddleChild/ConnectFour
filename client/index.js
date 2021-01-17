import { Point } from "./Library.js";
import { Rectangle } from "./Library.js";

const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

const restart = $(".restart");

const SIZE = 50;
const BOARD_SIZE = 7;
const EMPTY_CELL = 0;
const WIDTH = SIZE * BOARD_SIZE; canvas.width = WIDTH;
const HEIGHT = SIZE * BOARD_SIZE; canvas.height = HEIGHT;

let win = -1;
let team = 1;
let coins = [];
let board = new Array(BOARD_SIZE);

for (let x = 0; x < BOARD_SIZE; x++) {
    board[x] = new Array(BOARD_SIZE);
}

reset();

const interval = setInterval(() => {

    g.fillStyle = "white";
    g.fillRect(0, 0, WIDTH, HEIGHT);
    
    update();

    //GRID
    for (let i = 1; i <= BOARD_SIZE - 1; i++) {
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
    //update coin position
    coins.forEach((e) => {
        if (e.rect.y + SIZE >= HEIGHT - e.row * SIZE) {
            e.fall = false;
            e.rect.y = HEIGHT - SIZE * (e.row + 1);
        } else e.rect.y += BOARD_SIZE * 2;
        
        if (e.team == 1) e.rect.drawCircle(g, "red");
        else if (e.team == 2) e.rect.drawCircle(g, "blue");
    });
}

$(".restart button").click(reset);
function reset() {
    restart.hide();
    coins = [];
    win = -1;
    team = 1;

    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            board[x][y] = EMPTY_CELL;
        }
    }
}

function check() {
    for (let team = 1; team < 3; team++) {
        for (let y = BOARD_SIZE - 1; y >= 0; y--) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                
                //right
                if (x + 3 <= BOARD_SIZE - 1 &&
                    team == board[x][y] &&
                    team == board[x + 1][y] &&
                    team == board[x + 2][y] &&
                    team == board[x + 3][y])
                    return team;
                    
                if (y - 3 >= 0) {
                    //top
                    if (team == board[x][y] &&
                        team == board[x][y - 1] &&
                        team == board[x][y - 2] &&
                        team == board[x][y - 3])
                        return team;
                    
                    //top-right
                    if (x + 3 <= BOARD_SIZE - 1 &&
                        team == board[x][y] &&
                        team == board[x + 1][y - 1] &&
                        team == board[x + 2][y - 2] &&
                        team == board[x + 3][y - 3])
                    return team;

                    //top-left
                    if (x - 3 >= 0 &&
                        team == board[x][y] &&
                        team == board[x - 1][y - 1] &&
                        team == board[x - 2][y - 2] &&
                        team == board[x - 3][y - 3])
                    return team;
                }
            }
        }
    }
    
    return -1;
}

canvas.addEventListener("mousedown", (e) => {
    
    if (win == -1) {
        //add coin
        let col = parseInt(e.offsetX / SIZE);
        
        if (board[col][0] == EMPTY_CELL) {
            let row;

            for (let i = 0; i < BOARD_SIZE; i++) {
                if (board[col][i] != EMPTY_CELL) {
                    board[col][i - 1] = team;
                    row = i - 1;
                    break;
                } else if (i == BOARD_SIZE - 1) {
                    board[col][i] = team;
                    row = BOARD_SIZE - 1;
                    break;
                }
            }
            
            coins.push( {
                fall: true,
                rect: new Rectangle(col * SIZE, 0, SIZE, SIZE),
                team: team,
                row: BOARD_SIZE - 1 - row
            } );
            
            win = check();
            if (team == win) {
                $(".restart p").text(((win == 1) ? "RED" : "BLUE") + " won the game!");

                restart.show();
            }

            team = (team == 1) ? 2 : 1;
        }
    }
});