class BednarekTolbi {
    constructor(graph) {
        this.graph = graph;
        this.vertices = Object.keys(graph);
        this.n = this.vertices.length;

        this.stepLogs = [];
        this.S = [];
    }

    isIndependent(set) {
        for (let v of set) {
            for (let u of set) {
                if (v !== u && this.graph[v].includes(u)) {
                    return false;
                }
            }
        }
        return true;
    }

    unique(sets) {
        const seen = new Set();
        const res = [];

        for (const s of sets) {
            const key = [...new Set(s)].sort().join(",");
            if (!seen.has(key)) {
                seen.add(key);
                res.push([...s]);
            }
        }

        return res;
    }

    maximalSets(sets) {
        return sets.filter(a =>
            !sets.some(b =>
                b.length > a.length &&
                a.every(x => b.includes(x))
            )
        );
    }

    expand(family, v) {
        const keep = [];
        const expanded = [];

        for (const set of family) {
            keep.push([...set]);

            const cand = [...set, v];

            if (this.isIndependent(cand)) {
                expanded.push(cand);
            }
        }

        return { keep, expanded };
    }

    run() {
        let family = [[]];

        for (let i = 0; i < this.n; i++) {
            const v = this.vertices[i];

            const { keep, expanded } = this.expand(family, v);

            const merged = this.unique([...keep, ...expanded]);
            const maximal = this.maximalSets(merged);

            // сохраняем S_k
            this.S.push({
                k: i + 1,
                Sk: maximal
            });

            this.stepLogs.push({
                step: i + 1,
                vertex: v,
                previous: family,
                kept: keep,
                expanded: expanded,
                merged,
                maximal
            });

            family = maximal;
        }

        return family;
    }

    printSteps() {
        for (const log of this.stepLogs) {
            console.log("\n======================");
            console.log(`Шаг ${log.step} (добавляем ${log.vertex})`);

            console.log("Было:");
            console.table(log.previous);

            console.log("Без вершины:");
            console.table(log.kept);

            console.log("С вершиной:");
            console.table(log.expanded);

            console.log("После объединения:");
            console.table(log.merged);

            console.log("Максимальные:");
            console.table(log.maximal);
        }
    }

    printSk() {
        console.log("\nS_k (семейства максимальных независимых множеств)");

        for (const item of this.S) {
            console.log(`\nS_${item.k}:`);
            console.table(item.Sk);
        }
    }

    solve() {
        const result = this.run();

        const maxSize = Math.max(...result.map(s => s.length));

        return {
            maximal: result,
            largest: result.filter(s => s.length === maxSize),
            alpha: maxSize,
            S: this.S
        };
    }
}

const graph = {
    x1: ["x2", "x3"],
    x2: ["x1", "x4"],
    x3: ["x1", "x5"],
    x4: ["x2"],
    x5: ["x3"]
};

const solver = new BednarekTolbi(graph);

const result = solver.solve();

solver.printSteps();
solver.printSk();

console.log("\nМаксимальные:");
console.log(result.maximal);

console.log("\nНВУП:");
console.log(result.largest);

console.log("\nα(G):", result.alpha);