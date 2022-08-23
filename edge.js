class Edge {
    constructor(u, v) {
        this.u = u;
        this.v = v;
    }
    showEdge() {
        strokeWeight(4);
        let ang = atan((this.u.y - this.v.y) / (this.u.x - this.v.x));
        if (this.u.x > this.v.x) ang += 180;
        line(this.u.x + this.u.r / 2 * cos(ang), this.u.y + this.u.r / 2 * sin(ang), this.v.x - this.v.r / 2 * cos(ang), this.v.y - this.v.r / 2 * sin(ang));
    }
}