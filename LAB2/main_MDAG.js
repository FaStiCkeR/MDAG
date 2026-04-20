// Граф задаём списком смежности
// вершина: [смежные вершины]


const graph = {
    x1: ["x2", "x3"],
    x2: ["x1", "x4"],
    x3: ["x1", "x5"],
    x4: ["x2"],
    x5: ["x3"]
};

const vertices = Object.keys(graph);

function isIndependent(set, graph) {
    for (let v of set) {
        for (let u of graph[v]) {
            if (set.includes(u)) {
                return false;
            }
        }
    }
    return true;
}
function getIndependentSets(vertices, graph) {
    const results = [];

    function backtrack(index, current) {
        if (index === vertices.length) {
            if (isIndependent(current, graph)) {
                results.push([...current]);
            }
            return;
        }

        // не берём вершину
        backtrack(index + 1, current);

        // берём вершину
        current.push(vertices[index]);
        backtrack(index + 1, current);
        current.pop();
    }

    backtrack(0, []);
    return results;
}

function getMaximalSets(sets) {
    return sets.filter(set =>
        !sets.some(other =>
            other.length > set.length &&
            set.every(v => other.includes(v))
        )
    );
}

const independentSets = getIndependentSets(vertices, graph);
const maximalSets = getMaximalSets(independentSets);

const maxSize = Math.max(...maximalSets.map(s => s.length));

const largestSets = maximalSets.filter(s => s.length === maxSize);

console.log("Максимальные независимые множества:");
console.log(maximalSets);

console.log("Наибольшие независимые множества:");
console.log(largestSets);

console.log("α₀(G) =", maxSize);