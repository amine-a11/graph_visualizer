class Edge {
    constructor(u, v) {
        this.u = u;
        this.v = v;
    }
    showEdge() {
        strokeWeight(4);
        stroke(60, 115, 121);
        const cord = this.getCord(1);
        line(cord[0], cord[1], cord[2], cord[3]);
    }

    getCord(per) {
        let ang = (this.u.x === this.v.x ? (this.u.y > this.v.y ? -1 : 1) * atan(10000000) : atan((this.u.y - this.v.y) / (this.u.x - this.v.x)));
        if (this.u.x > this.v.x) ang += 180;
        let x1, y1, x2, y2;
        x1 = this.u.x + this.u.r / 2 * cos(ang);
        y1 = this.u.y + this.u.r / 2 * sin(ang);
        x2 = this.v.x - this.v.r / 2 * cos(ang);
        y2 = this.v.y - this.v.r / 2 * sin(ang);
        let a = (y2 - y1) / (x2 - x1);
        let b = y1 - a * x1;
        x2 = x1 + per * (x2 - x1);
        y2 = a * x2 + b;
        return [x1, y1, x2, y2];
    }
}