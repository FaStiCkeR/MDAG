/**
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n, m;
let edges = [];
let lineCount = 0;

rl.on('line', (line) => {
    const parts = line.trim().split(' ').map(Number);

    if (lineCount === 0) {
        // первая строка: n m
        n = parts[0];
        m = parts[1];
    } else {
        // дальше рёбра
        edges.push([parts[0], parts[1]]);
    }

    lineCount++;

    if (lineCount === m + 1) {
        rl.close();
    }
});

rl.on('close', () => {
    // строим список смежности
    const graph = {};

    for (let i = 1; i <= n; i++) {
        graph[i] = [];
    }

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u); // граф неориентированный
    }

    bfs(graph, 1); // стартуем с вершины 1
});
*/
const graph = {
    1: [2],
    2: [1, 3, 4],
    3: [2],
    4: [2, 5, 6],
    5: [4, 7],
    6: [4],
    7: [5, 8],
    8: [7]
};

function bfs(graph, start) {

    if (!start || !graph) return;

    const visited = new Set();
    const queue = [];

    visited.add(start);
    queue.push(start);

    while (queue.length > 0) {
        const current = queue.shift();
        console.log(current);

        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}

bfs(graph, 1);
