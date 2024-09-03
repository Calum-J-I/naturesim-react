import { type P5CanvasInstance } from "@p5-wrapper/react";

export class Particle {
    public pos: any;
    public vel: any;
    public acc: any;
    public r: number;
    public p5: P5CanvasInstance

    public constructor(p5: P5CanvasInstance, x: number, y: number) {
        this.p5 = p5;
        this.pos = p5.createVector(x, y);
        this.vel = p5.createVector(0, 0);
        this.acc = p5.createVector(0, 0);
        this.vel.limit(0.1)
        this.r = 1;
    }

    applyForce(force: any) {
        this.acc.add(force);
    }

    edges() {
        if (this.pos.y >= this.p5.height - this.r) {
            this.move(this.p5.random(this.p5.width), this.p5.random(this.p5.height / 4));
            this.vel.set(0, 0);
            this.acc.set(0, 0);
        }
        if (this.pos.x >= this.p5.width - this.r) {
            // this.move(0, this.pos.y);
            this.vel.x *= -1
        }
    }

    move(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(25);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    show() {
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        this.p5.fill(255);
        this.p5.circle(this.pos.x, this.pos.y, this.r);
    }
}