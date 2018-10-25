var canvas = document.querySelector('#mycanvas')  
var ctx    = canvas.getContext('2d')

canvas.style.display= 'block';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = window.innerWidth;
let height = window.innerHeight;

let frameCount = 0;

let mousePressed = false;
let mouse = [0,0];
let easing = 0.0002    ;
let qtty = 100;
let threshold = Math.max(75, width/qtty*10);

particles = [];
for(let i = 0; i < qtty ; i++) {
    particles[i] = new Particle(Math.random()*width, Math.random()*height, 2.5);
}

var simplex = new SimplexNoise()
var flowFieldRes = Math.floor(Math.max(width, height)/50);

let noiseFromPos = [[]];

if (frameCount < 3 || frameCount % 3  == 0) {
    for(let x = 0; x < flowFieldRes+1 ; x++) {
        noiseFromPos[x] = [x];
        for(let y = 0; y < flowFieldRes+1 ; y++) {
            noiseFromPos[x][y] = simplex.noise2D(x*0.02+frameCount*0.001, y*0.02+frameCount*0.001);
        }
    }
}

animate();

function animate() {
    requestAnimationFrame( animate  );
    frameCount++;

    background(100+Math.sin(0.3+frameCount*0.017)*60, 45 + Math.cos(frameCount*0.013)*120, 90 + Math.sin(frameCount*0.01)*100, 1);

    //

    if (frameCount < 3 || frameCount % 3  == 0) {
        for(let x = 0; x < flowFieldRes+1 ; x++) {
            noiseFromPos[x] = [x];
            for(let y = 0; y < flowFieldRes+1 ; y++) {
                noiseFromPos[x][y] = simplex.noise2D(x*0.02+frameCount*0.001, y*0.02+frameCount*0.001)*10;
            }
        }
    }

    //

    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    for(let x = 0; x < flowFieldRes+1 ; x++) {
        for(let y = 0; y < flowFieldRes+1 ; y++) {

            ctx.save();
            ctx.translate(x*width/flowFieldRes, y*width/flowFieldRes);
            ctx.rotate(noiseFromPos[x][y]);
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(width, height)/flowFieldRes*0.5, 0, Math.PI*2);
            ctx.lineTo(0, 0);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

        }    
    }

    ctx.fillStyle = `#ffffff`;
    ctx.strokeStyle = `#ffffff`; 

    for(let i = 0; i < qtty ; i++) {

        particles[i].update();

        let x = Math.min(Math.max(Math.floor((particles[i].pos[0]-flowFieldRes/2)*flowFieldRes/width), 0), flowFieldRes);
        let y = Math.min(Math.max(Math.floor((particles[i].pos[1]-flowFieldRes/2)*flowFieldRes/height), 0), flowFieldRes);

        vec2.rotate(particles[i].vel, [0,1], [0,0], noiseFromPos[x][y]+ Math.PI*2);

        for(let j = 0; j < qtty ; j++) {
            if (vec2.dist(particles[i].pos, particles[j].pos) < threshold) {
                ctx.beginPath();
                ctx.lineWidth = 0.7 - vec2.dist(particles[i].pos, particles[j].pos)*0.7 / threshold ;
                ctx.moveTo(...particles[i].pos);
                ctx.lineTo(...particles[j].pos);
                ctx.stroke();
                ctx.closePath();

                vec2.mul(particles[i].vel, particles[i].vel, [0.9995,0.9995]);
                vec2.mul(particles[j].vel, particles[j].vel, [0.9995,0.9995]);               
            }
        }

        if(mousePressed) {
            for(let i = 0; i < qtty ; i++) {
                particles[i].moveToMouse();
            }
        }
        
        particles[i].display();
    }
}

function background(r,g,b,a) {
    ctx.beginPath()
    ctx.fillStyle = `rgba(${r},${g},${b},${a})` 
    ctx.rect( 0, 0, width, height )
    ctx.fill()
    ctx.closePath()
}

/* ----------------------- */

canvas.addEventListener("mousedown", handleMouseDown, false);
function handleMouseDown(e) { 
    mouse = vec2.fromValues(e.clientX, e.clientY);
    mousePressed = true;
}
canvas.addEventListener("mouseup", handleMouseUp, false);
function handleMouseUp(e) {
    mousePressed = false;
}

canvas.addEventListener("mousemove", handleMouseMove, false);
function handleMouseMove(e) {
    if(mousePressed) {
        mouse = vec2.fromValues(e.clientX, e.clientY);
    }
}

// TO-DO : resize canvas dynamically