class Node {
    constructor(x, y, r, num) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.num = num;
    }
    show(col) {
        push();
        push();
        noFill();
        strokeWeight(3);
        stroke(col);
        circle(this.x, this.y, this.r);
        pop();
        fill(col);
        textSize(20);
        noStroke();
        textAlign(CENTER, CENTER);
        text(this.num, this.x, this.y);
        pop();
    }
    mouseIn() {
        return ((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2 <= (this.r / 2) ** 2);
    }
    update() {
        if (this.x + sz / 2 >= width) {
            this.x = width - sz / 2;
        }
        if (this.x - sz / 2 <= 0) {
            this.x = sz / 2;
        }
        if (this.y + sz / 2 >= height) {
            this.y = height - sz / 2;
        }
        if (this.y - sz / 2 <= 0) {
            this.y = sz / 2;
        }
    }
    separate(close_node) {
        if (dist(this.x, this.y, close_node.x, close_node.y) < 2.5 * sz) {
            if (this.x <= close_node.x && close_node.y >= this.y) {
                this.x--;
                this.y--;
                close_node.x++;
                close_node.y++;
            } else if (this.x >= close_node.x && close_node.y >= this.y) {
                this.x++;
                this.y--;
                close_node.x--;
                close_node.y++;
            } else if (close_node.x <= this.x && this.y >= close_node.y) {
                close_node.x--;
                close_node.y--;
                this.x++;
                this.y++;
            } else {
                close_node.x++;
                close_node.y--;
                this.x--;
                this.y++;
            }
        }

    }

}