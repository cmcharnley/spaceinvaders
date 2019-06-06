var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");  //this renders the 2d context

var x = canvas.width/2; //starting point x axis
var y = canvas.height-30; //starting point y axis towards bottom of screen 

var dx = 0; //this makes ball appear to move as it is adding a small value
var dy = -2;

var ballRadius = 4; //variable to hold radius so we can use it in calculations and means it isn't hardcoded

var paddleHeight = 10; //drawing the paddle - we can change this to the chicken
var paddleWidth = 75; 
var paddleX = (canvas.width-paddleWidth)/2; // this is the starting point on the x axis (canvas-width minus paddlewidth)


var rightPressed = false;  //this is initialising the key press. At the beginning, they are not pressed at all, so false
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;  //so they wont touch each other 
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {   //this will loop through rows and columns and create new bricks
    bricks[c] = [];

for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1}; //this status indicates whether we want to paint each brick on the screen or not
    }
}

document.addEventListener("keydown", keyDownHandler, false);  //keyDownHandler will be executed
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {   //when a key is pressed down, this information is stored in a variable and set to true
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {  //This checks all positions of bricks and checks if the ball hits them, and changes direction. ie if position x of ball is greater than position x of brick
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status==1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status=0;
            }
        }
    }
}
}
function drawBall() {  //always begins with beginPath and ends closePath
    
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); //first values are x and y coordinates of the arcs centre. Arc is circle. Then start and end angle
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status==1) {  //if the status is 1, then draw the brick
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft; //this positions the bricks on the page so they arent all drawn in one place 
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();  //this part actually draws the bricks
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the ball as soon as it is drawn, otherwise will be a straight line
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {     //This makes ball bounce off sides but we don't need this
        dx = -dx;
    }
    if(y + dy < ballRadius) {
            dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {  // this will alert Game Over if ball hits bottom wall
            if (x > paddleX && x < paddleX + paddleWidth) { //checks whether center of ball is between left and right edges of paddle/collision detection
            dy = -dy;
            } else {
            alert("GAME OVER");
            document.location.reload(); //resets game
            clearInterval(interval); // Needed for Chrome to end game
        }}

    x += dx; //every frame this will paint the ball in a new position
    y += dy;

    if(rightPressed && paddleX < canvas.width - paddleWidth) {       //this will move the paddle 7 pixels to right and stops it disappearing off edge of canvas                                                                                                                                                                                                                                                                                                                                                                                                                                                               b) {
        paddleX += 7; 
    } else if(leftPressed && paddleX > 0) {
        paddleX -=7;
    }
    }


var interval = setInterval(draw, 10);  //draw function will be executed every 10