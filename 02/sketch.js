let canvases = [];
let ctx = [];
let x = [];

let canvasesQtty = easingFunctions.length;

const wrapper = document.getElementById('wrapper')

for(let i = 0; i < canvasesQtty; i++) {
    canvases[i] = document.createElement('canvas');
   
    ctx[i] = canvases[i].getContext('2d');
    canvases[i].style.display= 'inline';
    canvases[i].width = window.innerWidth / canvasesQtty;
    canvases[i].height = window.innerHeight;
    wrapper.appendChild(canvases[i]);

    // let canvases[i].backgroundColor = [i*20,i*50,i*10,1];
}

let t = 0;// t en milisecondes

var now = Date.now()
var lastTime = now
var deltaTime = 16
var expectedFPS = 1000 / 60 // 60 fps


/* --- --- --- --- */
function functionsShadows() {
    for(let i = 0; i < canvasesQtty; i++) {
        background(canvases[i], ctx[i], 20 + (i%2)*15, 20 + (i%2)*15, 20 + (i%2)*15, 0.15);
    
        startAnimT = 0;
        d = 5000;
        if (t <= startAnimT+d) {
            x[i] = easingFunctions[i](t, 0, canvases[i].height, d);
        }
    
        ctx[i].beginPath();
        ctx[i].fillStyle = `rgba(120, 50, 50, 1)`
        ctx[i].arc(mapValue(t, startAnimT, startAnimT+d, 0, canvases[i].width), canvases[i].height-x[i], 2, 0, 2*Math.PI);
        ctx[i].fill();
        ctx[i].closePath();
    }
}

function functionsAnimatedBalls() {
    for(let i = 0; i < canvasesQtty; i++) {
        background(canvases[i], ctx[i], 20 + (i%2)*15, 20 + (i%2)*15, 20 + (i%2)*15, 0.15);

        startAnimT = 0;
        d = 5000;
        if (t <= startAnimT+d) {
            x[i] = easingFunctions[i](t, 0, canvases[i].height, d);
        }

        ctx[i].beginPath();
        ctx[i].fillStyle = `rgba(255, 127, 127, 1)`
        ctx[i].arc(mapValue(t, startAnimT, startAnimT+d, 0, canvases[i].width), canvases[i].height-x[i], 3, 0, 2*Math.PI);
        ctx[i].fill();
        ctx[i].closePath();
    }
}

/* --- --- --- --- */
animate();

function animate() {
    requestAnimationFrame( animate  );

    now = Date.now()
    deltaTime =  now - lastTime
    lastTime = now
    // deltaTime/expectedFPS
    t += deltaTime; // t en milisecondes

    functionsShadows();
    functionsAnimatedBalls();
}




// Eviter d'utiliser canvas.width directement
function background(canvas,ctx,r,g,b,a) {
    ctx.beginPath()
    ctx.fillStyle = `rgba(${r},${g},${b},${a})` 
    ctx.rect( 0, 0, canvas.width, canvas.height )
    ctx.fill()
    ctx.closePath()
}


function mapValue(x, minIn, maxIn, minOut, maxOut) {
    return ((x-minIn)/(maxIn-minIn))*(maxOut-minOut)+minOut;
}










