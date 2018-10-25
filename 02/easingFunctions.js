const PI_M2 = Math.PI*2;
const PI_D2 = Math.PI/2;

let easingFunctions = [
    easeLinear,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInElastic,
    easeOutElastic,
    easeInOutElastic,
    easeInCircular,
    easeOutCircular,
    easeInOutCircular,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic
]

/*
Linear
---------------------------------------------------------------------------------
*/
function easeLinear (t, b, c, d) {
    return c*t/d + b;
}

/*
Sine
---------------------------------------------------------------------------------
*/
function easeInSine (t, b, c, d) {
    return -c * Math.cos(t/d * PI_D2) + c + b;
}
function easeOutSine (t, b, c, d) {
    return c * Math.sin(t/d * PI_D2) + b;
}
function easeInOutSine (t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}

/*
Quintic
---------------------------------------------------------------------------------
*/
function easeInQuint (t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
}
function easeOutQuint (t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
}
function easeInOutQuint (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
}

/*
Quartic
---------------------------------------------------------------------------------
*/
function easeInQuart (t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
}
function easeOutQuart (t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
}
function easeInOutQuart (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
}

/*
Quadratic
---------------------------------------------------------------------------------
*/
function easeInQuad (t, b, c, d) {
    return c*(t/=d)*t + b;
}
function easeOutQuad (t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
}
function easeInOutQuad (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
}

/*
Exponential
---------------------------------------------------------------------------------
*/
function easeInExpo (t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
}
function easeOutExpo (t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
}
function easeInOutExpo (t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

/*
Elastic
---------------------------------------------------------------------------------
*/
function easeInElastic (t, b, c, d, a, p) {
    var s;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (!a || a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/PI_M2 * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*PI_M2/p )) + b;
}
function easeOutElastic (t, b, c, d, a, p) {
    var s;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (!a || a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/PI_M2 * Math.asin (c/a);
    return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*PI_M2/p ) + c + b);
}
function easeInOutElastic (t, b, c, d, a, p) {
    var s;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (!a || a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/PI_M2 * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*PI_M2/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*PI_M2/p )*.5 + c + b;
}

/*
Circular
---------------------------------------------------------------------------------
*/
function easeInCircular (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}
function easeOutCircular (t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
}
function easeInOutCircular (t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
}

/*
Back
---------------------------------------------------------------------------------
// */
// function easeInBack (t:Number, b:Number, c:Number, d:Number, s:Number=1.70158):Number
// {
//     return c*(t/=d)*t*((s+1)*t - s) + b;
// }
// function easeOutBack (t:Number, b:Number, c:Number, d:Number, s:Number=1.70158):Number
// {
//     return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
// }
// function easeInOutBack (t:Number, b:Number, c:Number, d:Number, s:Number=1.70158):Number
// {
//     if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
//     return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
// }

/*
Bounce
---------------------------------------------------------------------------------
*/
// function easeInBounce (t, b, c, d) {
//     return c - easeOutBounce (d-t, 0, c, d) + b;
// }
// function easeOutBounce (t, b, c, d) {
//     if ((t/=d) < (1/2.75)) {
//         return c*(7.5625*t*t) + b;
//     } else if (t < (2/2.75)) {
//         return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
//     } else if (t < (2.5/2.75)) {
//         return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
//     } else {
//         return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
//     }
// }
// function easeInOutBounce (t, b, c, d) {
//     if (t < d/2) return easeInBounce (t*2, 0, c, d) * .5 + b;
//     else return easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
// }

/*
Cubic
---------------------------------------------------------------------------------
*/
function easeInCubic (t, b, c, d) {
    return c*(t/=d)*t*t + b;
}
function easeOutCubic (t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
}
function easeInOutCubic (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
}