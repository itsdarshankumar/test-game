var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
var i=0;
var x, y, r = 30;
var vx_box, vy_bird;
let highscore=0;
x = 200;
y = innerHeight/3;
vx_box = 5;
vy_bird = 10 * (Math.random() - Math.random());
let w = 20, g = 0.35;
canvas.addEventListener('click', function (event) {
    vy_bird = -7;
}, false);
canvas.addEventListener('click', function (event) {
    if(gameOver===2)
    {
        if(score>localStorage.getItem(1)){
            localStorage.setItem(1,score);
        }
        highscore=localStorage.getItem(1);
        gameOver=1;
        restart();
    }
}, false);
let count = 0,score=0,time=0;
let x_box = [], dev = [];
dev.push(Math.random(-1000, 1000));
let gameOver = 3;
function animate() {
    if (gameOver === 1) {
        time++;
        if(time%10==0)
            score++;
        requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth,innerHeight);
        c.fillStyle="skyblue";
        c.fillRect(0,0,innerWidth,innerHeight);
        c.beginPath();
        c.strokeStyle="skyblue";
        c.fillStyle="#ff5601";
        c.arc(x, y, r, 0, 2 * Math.PI, false);
        c.fill();
        y += vy_bird;
        vy_bird += g;
        if (y + r > innerHeight) {
            vy_bird = 0;
            y = innerHeight - r;
        }
        count++;
        let num = 75;
        if (count % num === 0) {
            count = 0;
            x_box.push(innerWidth);
            dev.push(200 * Math.random() - 100);
        }
        let i, w = 60;
        let box_height = 3 * r, box_height_center = innerHeight / 2;
        if(box_height > 2.3*r) box_height*=0.99;
        for (i in x_box) {
            box_height_center = innerHeight / 2 + dev[i];
            x_box[i] -= vx_box;
            if (x_box[i] <= -25 * num - w) {
                x_box.splice(i, 1);
                dev.splice(i, 1);
            }
            c.fillStyle="green";
            c.fillRect(x_box[i], box_height + box_height_center, w, innerHeight);
            c.fillRect(x_box[i], 0, w, box_height_center - box_height);
            if (x_box[i] < x + r && x_box[i] + w > x - r && (y - r < box_height_center - box_height || y + r > box_height_center + box_height) ||(y === innerHeight - r )) {
                gameOver = 2;
            }
        }
        c.fillStyle="blue";
        c.fillRect(innerWidth/2-80,25,150,75);
        c.fillStyle="magenta";
        c.font="20px Georgia";
        c.fillText("score: "+score,innerWidth/2,90);
        c.fillText("HighScore: "+highscore,innerWidth/2,50);
    }
    else if(gameOver===2){
        c.fillStyle="#00000077";
        c.fillRect(0,0,innerWidth,innerHeight);
        c.fill();
        c.fillStyle="cyan";
        c.font='normal 30px Helvetica';
        c.fillRect(innerWidth/2-80,innerHeight/2-35,160,50);
        c.fillStyle="red";
        c.fillText("Game Over",innerWidth/2,innerHeight/2);
        c.font='normal 30px Helvetica';
        c.fillStyle="grey";
        c.fillText("Left click to start a new game",innerWidth/2,innerHeight/2+45);
    }
    else if(gameOver===3)
    {
        x = 200;
        y = innerHeight/3;
        c.fillStyle="skyblue";
        c.fillRect(0,0,innerWidth,innerHeight);
        c.beginPath();
        c.strokeStyle="skyblue";
        c.fillStyle="#ff5601";
        c.arc(x, y, r, 0, 2 * Math.PI, false);
        c.fillStyle="#00000077";
        c.fillRect(0,0,innerWidth,innerHeight);
        c.fill();
        c.font='normal 30px Helvetica';
        c.textAlign='center';
        c.fillText("Left click to start",innerWidth/2,innerHeight/2);
        if(score>localStorage.getItem(1)){
            localStorage.setItem(1,score);
        }
        highscore=localStorage.getItem(1);
        canvas.addEventListener('click', function (event) {
            if(gameOver===3)
            {
                gameOver=1;
                animate();
            }
        }, false);
    }
}
function restart()
{
    x = 200;
    y = innerHeight/3;
    x_box=[];
    dev=[];
    dev.push(200 * Math.random() - 100);
    x_box.push(innerWidth);
    count = 0;
    vx_box = 5;
    vy_bird = -1;
    cancelAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    score=0;
    animate();
}

animate();