let nodes = [];
let vals = {};
let visited = {};
let drag = false;
let node_index = 0;
let edges = [];
let sz = 40;
const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let lines = [];
let speed = 10;
let textA = document.querySelector("textarea");
let Start_Node = document.getElementById("snode");
let algo = document.getElementById("algo");
let visualize = document.querySelector(".btn-vis");
let algo_runs = false;

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
            if (lines.length > 0 && !algo_runs) {
                lines = [];
            }
        }
    })
}
function mouseReleased() {
    drag = false;
}


function draw() {
    background(46, 56, 66);
    edges.forEach(edge => {
        edge.showEdge();
    })
    nodes.forEach(node => {
        node.show(color(178, 253, 255));
        node.update();
        if (drag && !algo_runs) {
            nodes[node_index].x = mouseX;
            nodes[node_index].y = mouseY;
            nodes[node_index].update();
        }
    })
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            nodes[i].separate(nodes[j]);
        }
    }
    for (lin of lines) {
        push();
        stroke(238, 108, 77);
        beginShape();
        vertex(lin[0], lin[1]);
        vertex(lin[2], lin[3]);
        endShape();
        pop();
    }
}
textA.addEventListener("keyup", (event) => {
    if (event.key === "Backspace" && !textA.value) {
        nodes = [];
        vals = {};
        edges = [];
    }
    if (!arr.includes(event.key)) {
        return;
    }
    let text = textA.value.split('\n').filter((elem) => {
        return (elem || elem.split(" ").length >= 3);
    });
    nodes = [];
    vals = {};
    edges = [];
    text.forEach((ele) => {
        if (ele.split(" ").length == 1) {
            if (!vals[ele]) {
                if (vals[ele] !== 0) {
                    nodes.push(new Node(random(sz, width - sz), random(sz, height - sz), sz, ele));
                    vals[ele] = nodes.length - 1;
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
        }
    })
})

let adj = {};
visualize.addEventListener('click', async () => {
    adj = {};
    edges.forEach((edge) => {
        if (adj[edge.u.num] === undefined) {
            adj[edge.u.num] = new Array();
            adj[edge.u.num].push(edge.v.num);
        } else {
            adj[edge.u.num].push(edge.v.num);
        }
        if (adj[edge.v.num] === undefined) {
            adj[edge.v.num] = new Array();
            adj[edge.v.num].push(edge.u.num);
        } else {
            adj[edge.v.num].push(edge.u.num);
        }
    });
    visited = {};
    console.log(vals[Start_Node.value]);
    if (vals[Start_Node.value] === undefined) {
        alert("Start Node doesn't exist");
        return;
    }
    algo_runs = true;
    if (algo.value === "bfs") {
        await bfs(Start_Node.value);
    } else if (algo.value === "dfs") {
        await dfs(Start_Node.value);
    }
    algo_runs = false;
})
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawLineSlowly(u, v) {
    for (let i = 0.01; i <= 1.00000001; i += 0.02) {
        lines.push((new Edge(nodes[vals[u]], nodes[vals[v]])).getCord(i));
        await sleep(speed);
        lines.pop();
    }
    lines.push((new Edge(nodes[vals[u]], nodes[vals[v]])).getCord(1));
}


async function dfs(v) {
    if (visited[v]) {
        return;
    }
    visited[v] = true;
    for (let u of adj[v]) {
        await drawLineSlowly(v, u);
        await dfs(u);
    }
}

async function bfs(p) {
    let q = [];
    q.push(p);
    while (q.length > 0) {
        let v = q.shift();
        visited[v] = true;
        for (let u of adj[v]) {
            if (visited[u]) continue;
            await drawLineSlowly(v, u);
            q.push(u);
        }
    }
}