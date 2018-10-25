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
let qtty = 70;
let threshold = Math.max(75, width/qtty*10);

particles = [];
for(let i = 0; i < qtty ; i++) {
    particles[i] = new Particle(Math.random()*width, Math.random()*height, 2.5+Math.random()*(2*i/qtty));
}

animate();

function animate() {
    requestAnimationFrame( animate  );
    frameCount++;

    background(100+Math.sin(0.3+frameCount*0.017)*60, 45 + Math.cos(frameCount*0.013)*120, 90 + Math.sin(frameCount*0.01)*100, 1);
    ctx.fillStyle = `#ffffff`;

    ctx.strokeStyle = `#ffffff`; 

    for(let i = 0; i < qtty ; i++) {

        particles[i].update();

        for(let j = 0; j < qtty ; j++) {
            if (vec2.dist(particles[i].pos, particles[j].pos) < threshold) {
                ctx.beginPath();
                ctx.lineWidth = 1 - vec2.dist(particles[i].pos, particles[j].pos) / threshold ;
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
    console.log("moved")
    if(mousePressed) {
        mouse = vec2.fromValues(e.clientX, e.clientY);
    }
}

// TO-DO : resize canvas dynamically