var canvas = document.getElementById("table");

canvas.width = 600;
canvas.height = 400;


var tableWidth = canvas.width;
var tableHeight = canvas.height;

var context = canvas.getContext("2d");
function drawTable() {
    context.fillStyle = "black";
    context.fillRect(tableWidth / 2 - 2, 0, 2, tableHeight);
}
function clearBackground() {
    //context.fillStyle="white"//todo:  is this necessary
    context.clearRect(0, 0, tableWidth, tableHeight);
}
function drawState() {
    clearBackground();
    drawTable();
    pad1.draw();
    pad2.draw();
    ball.draw();
}

var pad = function (x, y) {
    this.width = 10,
        this.height = 50,
        this.x = x,
        this.y = y,
        this.draw = function () {
            context.fillStyle = "black";
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        this.moveUp = function () {
            if (this.y > 0) {
                this.y -= 5;//error
            }
        },
        this.moveDown = function () {
            if (this.y < tableHeight - this.height) {
                this.y += 5;//error
            }
        }
};
var pad1 = new pad(0, 0);
var pad2 = new pad(tableWidth - pad1.width, 0);

bat = pad1;
var ball = {
    "x": pad1.x + pad1.width,
    "y": pad1.y + pad1.height / 2,
    "radius": 10,
    "draw": function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 360 * Math.PI / 180, true);
        context.fillStyle = 'green';
        context.fill();

        //context.fillRect(this.x, this.y, this.radius, this.radius);
    }

};
var direction = 'right';
var direction2 = 'down';

var updateState = function () {


    if (direction == 'left' &&
        //ball.x>tableWidth-ball.radius&&
        ball.x == /*pad.x*/pad1.width + ball.radius &&
        (ball.y <= pad1.y + pad1.height && ball.y >= pad1.y )

        ) {
        direction = 'right';//induced
    } else {
        if (ball.x <= 0) {
            direction = '';
            direction2 = '';
            console.log('Game over');
        }

    }
    if (direction2 == 'down' && ball.y > tableHeight - ball.radius) {
        direction2 = 'up';
    }


    if (direction == 'right' &&

        ball.x == tableWidth - (pad2.width + ball.radius) &&
        //ball.x>-ball.radius&&
        (ball.y <= pad2.y + pad2.height && ball.y >= pad2.y )


        ) {//induced
        direction = 'left';
    }
    if (direction2 == 'up' && ball.y < (ball.radius)) {
        direction2 = 'down';
    }


    if (direction == 'left') {
        ball.x--;
    }
    else if (direction == 'right') {
        ball.x++;
    }

    if (direction2 == 'down') {
        ball.y++;
    }
    else if (direction2 == 'up') {
        ball.y--;
    }


};

window.onkeydown = function (event) {
    event.preventDefault();

    switch (event.keyCode) {
        case 38://key up
            pad1.moveUp();
            break;
        case 40://key down
            pad1.moveDown();
            break;
        case 87://key W
            pad2.moveUp();
            break;
        case 83://key S
            pad2.moveDown();
            break;
        default :
            console.log("Keyboard event : " + event.keyCode);

    }
};
//drawState();
setInterval("drawState()", 20);
setInterval("updateState()", 10);