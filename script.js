let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
// speed of the snake
let speed = 7;

// for the snake parts
class SnakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
// for the grid system
let tileCount = 20;
// size of each block
let tileSize = canvas.width / tileCount - 2
// head position
let headX = 15;
let headY = 15;
// the snake
const snakeParts = [];

let tailLength = 2;
let score = 0;


let dx = 0;
let dy = 0;

// apple x,y
let appleX = 5;
let appleY = 5;

function drawGame() {
    clearScreen();
    changePosition();
    checkAppleCollision();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(drawGame, 1000 / 7);
}
function drawScore() {
    context.fillStyle='white';
    context.font='20px Verdana';
    context.fillText("Score : " + score, canvas.width - 120, 20);

}

function clearScreen() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
 
    context.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        const part = snakeParts[i];
        context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX,headY))
    if (snakeParts.length > tailLength){
        snakeParts.shift()
    }
    context.fillStyle = 'orange';
    context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}
function changePosition() {
    headX = headX + dx
    headY = headY + dy
}
function drawApple() {
    context.fillStyle = 'red';
    context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++;
        score ++;
    }
}
document.addEventListener("keydown", keyDown)
function keyDown(e) {

    if (e.keyCode == 37) {// left
        if (dx == 1)
            return;
        dx = -1
        dy = 0
    } else if (e.keyCode == 38) { // up
        if (dy == 1)
            return;
        dy = -1
        dx = 0
    } else if (e.keyCode == 39) { // right
        if (dx == -1)
            return;
        dx = 1
        dy = 0
    } else if (e.keyCode == 40) {// down
        if (dy == -1)
            return;
        dy = 1
        dx = 0
    }

}
drawGame()