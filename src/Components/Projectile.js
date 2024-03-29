import { rotatePoint } from "./helpers";

class Projectile {
    constructor(props) {
        // console.log(props);
        const posDelta = rotatePoint({x:0, y:-20}, {x:0,y:0}, props.ship.rotation * Math.PI / 180)
        this.position = {
            x: props.ship.position.x + posDelta.x,
            y: props.ship.position.y + posDelta.y
        }
        this.projectileSpeed = 2;
        this.rotation = props.ship.rotation;
        this.velocity = {
            x: posDelta.x / this.projectileSpeed,
            y: posDelta.y / this.projectileSpeed
        }
        this.radius = props.size;
        this.maxLife = 1500;
        this.born = Date.now();
        this.delete = false;
    }

    remove() {
        // console.log('removing projectile');
        this.delete = true;
    }

    render(state) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // console.log(this.position);
        
        if (this.position.x > state.screen.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = state.screen.width;
        }
        if (this.position.y > state.screen.height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = state.screen.height;
        }

        if (Date.now() - this.born > this.maxLife) {
            this.remove();
        } else {
            // console.log(this.life);
            this.life++;
        }
        
        // console.log(this.position);
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        // context.rotate(this.rotation * Math.PI /180);
        context.fillStyle = '#FFF';
        context.lineWidth = 0.5;
        context.beginPath();
        context.arc(0,0,2,0,2*Math.PI);
        context.closePath();
        context.fill();
        context.restore();
    }
}

export default Projectile;
