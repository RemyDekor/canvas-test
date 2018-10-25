var simplex = new SimplexNoise()

const wrapper = document.getElementById('wrapper')

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.style.display= 'inline';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

width = window.innerWidth;
height = window.innerHeight;

wrapper.appendChild(canvas);


let t = 0; // t en milisecondes

let qtty = 10;

var now = Date.now()
var lastTime = now
var deltaTime = 16
var expectedFPS = 1000 / 60 // 60 fps

/* --- --- --- --- */


animate();

function animate() {
    requestAnimationFrame( animate  );

    now = Date.now()
    deltaTime =  now - lastTime
    lastTime = now
    // deltaTime/expectedFPS
    t += deltaTime; // t en milisecondes

    background(25, 35, 35, 1);


    ctx.fillStyle = `rgba(255, 127, 127, 1)`;
    ctx.strokeStyle = `rgba(255, 127, 127, 0.8)`;

    for (let i = 0 ; i <= qtty ; i++) {
        ctx.beginPath();
        ctx.lineTo(i*width/qtty, height/2 + simplex.noise2D(t*0.001+i*0.1,1)*height/3);
        ctx.arc(i*width/qtty, height/2 + simplex.noise2D(t*0.001+i*0.1,1)*height/3, 3, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    ctx.beginPath();
    for (let i = 0 ; i <= qtty ; i++) {
        ctx.lineTo(i*width/qtty, height*0.4 + simplex.noise2D(t * 0.001 + i * 0.1, 1) * height/3);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    for (let i = 0 ; i <= qtty ; i++) {
        ctx.lineTo(i*width/qtty, height*0.6 + simplex.noise2D(t*0.001+i*0.1,1)*height/3);
    }
    ctx.stroke();
    ctx.closePath();
}


// Eviter d'utiliser canvas.width directement
function background(r,g,b,a) {
    ctx.beginPath()
    ctx.fillStyle = `rgba(${r},${g},${b},${a})` 
    ctx.rect( 0, 0, window.innerWidth, window.innerHeight )
    ctx.fill()
    ctx.closePath()
}

function mapValue(x, minIn, maxIn, minOut, maxOut) {
    return ((x-minIn)/(maxIn-minIn))*(maxOut-minOut)+minOut;
}