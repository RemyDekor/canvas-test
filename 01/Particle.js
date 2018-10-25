class Particle{
    constructor(x, y, size) {
        this.pos = vec2.fromValues(x, y);
        this.vel = vec2.fromValues(Math.random()*20-15, Math.random()*30-15);
        this.size = size*1.8;
        this.toMouse = vec2.fromValues(0,0);
        this.dir = vec2.fromValues(0,0);
        this.rotation = 0;
    }

    update() {
        
        if(this.pos[0] < this.size || this.pos[0] > width-this.size) {
            this.vel[0] *= -1;
            this.pos[0] < this.size ? this.pos[0] = this.size  : this.pos[0] = width-this.size;
        }
        if(this.pos[1] < 0 || this.pos[1] > height) {
            this.vel[1] *= -1;
            this.pos[1] < this.size ? this.pos[1] = 0 : this.pos[1] = height;
        }

        this.rotation = Math.atan2(this.vel[1], this.vel[0]) + Math.PI/2;
        vec2.add(this.pos, this.pos, this.vel);
    }

    display() {
        // ctx.save();
        // ctx.beginPath()
        // ctx.arc( this.pos[0], this.pos[1], this.size, 0, Math.PI*2 )
        // ctx.fill()
        // ctx.closePath()
        // ctx.restore()
        

        ctx.save();
        ctx.translate(this.pos[0], this.pos[1])
        ctx.rotate( this.rotation );
        ctx.beginPath()
        ctx.moveTo( -this.size*1.5 , this.size*2 )
        ctx.lineTo( 0, -this.size*2 )
        ctx.lineTo( this.size*1.5 , this.size*2 )
        ctx.lineTo( -this.size*1.5 , this.size*2 )
        ctx.fill()
        ctx.closePath()
        ctx.restore();

        // ctx.save();
        // ctx.beginPath()
        // ctx.arc( this.pos[0]-this.size/2, this.pos[1]-this.size/2, this.size, this.size )
        // ctx.fill()
        // ctx.closePath()
        // ctx.restore()
    }

    moveToMouse() {
        vec2.sub(this.toMouse, mouse, this.pos);
        if(vec2.dist(mouse, this.pos) < 250){
            vec2.mul(this.toMouse, this.toMouse, [easing, easing]);
            vec2.add(this.vel, this.vel, this.toMouse);            
        }
        
    }
}
