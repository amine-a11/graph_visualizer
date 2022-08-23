class Node {
    constructor(x, y, r, num) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.num = num;
    }
    show() {
        noFill();
        strokeWeight(3);
        circle(this.x, this.y, this.r);
        fill(100);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.num, this.x, this.y);
    }
    mouseIn() {
        return ((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2 <= (this.r / 2) ** 2);
    }
}