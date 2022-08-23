let nodes = [];
let vals = {};
let drag = false;
let node_index = 0;
let edges = [];
let sz = 40;
let textA = document.querySelector("textarea");
function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    document.querySelector("main").prepend(textA);
}
function mousePressed() {
    nodes.forEach((node, index) => {
        if (node.mouseIn()) {
            drag = true;
            node_index = index;
        }
    })
}
function mouseReleased() {
    drag = false;
}
function draw() {
    background(200);
    nodes.forEach(node => {
        node.show();
        if (drag) {
            nodes[node_index].x = mouseX;
            nodes[node_index].y = mouseY;
            if (nodes[node_index].x + sz / 2 >= width) {
                nodes[node_index].x = width - sz / 2;
            }
            if (nodes[node_index].x - sz / 2 <= 0) {
                nodes[node_index].x = sz / 2;
            }
            if (nodes[node_index].y + sz / 2 >= height) {
                nodes[node_index].y = height - sz / 2;
            }
            if (nodes[node_index].y - sz / 2 <= 0) {
                nodes[node_index].y = sz / 2;
            }

        }
        if (node.x + sz / 2 >= width) {
            node.x = width - sz / 2;
        }
        if (node.x - sz / 2 <= 0) {
            node.x = sz / 2;
        }
        if (node.y + sz / 2 >= height) {
            node.y = height - sz / 2;
        }
        if (node.y - sz / 2 <= 0) {
            node.y = sz / 2;
        }
    })
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y) < 2.5 * sz) {
                if (nodes[i].x <= nodes[j].x && nodes[j].y >= nodes[i].y) {
                    nodes[i].x--;
                    nodes[i].y--;
                    nodes[j].x++;
                    nodes[j].y++;
                } else if (nodes[i].x >= nodes[j].x && nodes[j].y >= nodes[i].y) {
                    nodes[i].x++;
                    nodes[i].y--;
                    nodes[j].x--;
                    nodes[j].y++;
                } else if (nodes[j].x <= nodes[i].x && nodes[i].y >= nodes[j].y) {
                    nodes[j].x--;
                    nodes[j].y--;
                    nodes[i].x++;
                    nodes[i].y++;
                } else {
                    nodes[j].x++;
                    nodes[j].y--;
                    nodes[i].x--;
                    nodes[i].y++;
                }
            }

        }
    }
    edges.forEach(edge => {
        edge.showEdge();
    })
}
textA.addEventListener("keyup", (event) => {
    if (keyCode === 8 && !textA.value) {
        nodes = [];
        vals = {};
        edges = [];

    }
    if (event.keyCode < 48 || event.keyCode > 90) {
        return;
    }
    let text = textA.value.split('\n').filter((elem) => {
        return (elem || elem.split(" ").length >= 3);
    });
    // console.log(text);
    nodes = [];
    vals = {};
    edges = [];
    text.forEach((ele) => {
        if (ele.split(" ").length == 1) {
            if (!vals[ele]) {
                if (vals[ele] !== 0) {
                    nodes.push(new Node(random(sz, width - sz), random(sz, height - sz), sz, ele));
                    vals[ele] = nodes.length;
                    // console.log(vals);
                }
            }
        } else {
            let ans = ele.split(" ");
            if (!vals[ans[0]]) {
                if (vals[ans[0]] !== 0) {
                    nodes.push(new Node(random(sz, width - sz), random(sz, height - sz), sz, ans[0]));
                    vals[ans[0]] = nodes.length - 1;
                }
            }
            if (!vals[ans[1]]) {
                if (vals[ans[1]] !== 0) {
                    nodes.push(new Node(random(sz, width - sz), random(sz, height - sz), sz, ans[1]));
                    vals[ans[1]] = nodes.length - 1;
                }
            }
            edges.push(new Edge(nodes[vals[ans[0]]], nodes[vals[ans[1]]]));
            // console.log(vals);
        }
    })
})