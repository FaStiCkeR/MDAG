class Graph {
    constructor(n, edges) {
        this.n = n;              // количество вершин
        this.edges = edges;       // массив рёбер в формате [u, v] (вершины нумеруются с 1)
    }

    // ------------------------------------------------------------
    // 1. Матрица смежности (A)
    // ------------------------------------------------------------
    buildAdjacencyMatrix() {
        let A = Array.from({length: this.n}, () => Array(this.n).fill(0));
        for (let [u, v] of this.edges) {
            A[u - 1][v - 1] = 1;
            A[v - 1][u - 1] = 1;
        }
        return A;
    }

    // ------------------------------------------------------------
    // 2. Матрица инцидентности (B)
    // ------------------------------------------------------------
    buildIncidenceMatrix() {
        const m = this.edges.length;   // фактическое количество рёбер
        let B = Array.from({length: this.n}, () => Array(m).fill(0));

        this.edges.forEach(([u, v], idx) => {
            B[u - 1][idx] = 1;
            B[v - 1][idx] = 1;
        });

        return B;
    }

    // ------------------------------------------------------------
    // 3. Матрица смежности графа рёбер (Line Graph) L
    // ------------------------------------------------------------
    buildLineGraphMatrix(B) {
        const m = B[0].length;          // количество рёбер исходного графа
        let L = Array.from({length: m}, () => Array(m).fill(0));

        for (let e1 = 0; e1 < m; e1++) {
            for (let e2 = e1 + 1; e2 < m; e2++) {
                for (let v = 0; v < this.n; v++) {
                    if (B[v][e1] === 1 && B[v][e2] === 1) {
                        L[e1][e2] = 1;
                        L[e2][e1] = 1;
                        break;
                    }
                }
            }
        }
        return L;
    }

    // ------------------------------------------------------------
    // 4. BFS от заданной вершины (возвращает массив расстояний)
    // ------------------------------------------------------------
    bfs(start, adjacencyMatrix) {
        const n = adjacencyMatrix.length;
        let dist = Array(n).fill(-1);
        dist[start] = 0;
        let queue = [start];

        while (queue.length) {
            let v = queue.shift();
            for (let u = 0; u < n; u++) {
                if (adjacencyMatrix[v][u] === 1 && dist[u] === -1) {
                    dist[u] = dist[v] + 1;
                    queue.push(u);
                }
            }
        }
        return dist;
    }

    // ------------------------------------------------------------
    // 5. Эксцентриситеты, радиус, диаметр
    // ------------------------------------------------------------
    computeGraphMetrics(adjacencyMatrix) {
        const n = adjacencyMatrix.length;
        let eccentricities = [];

        for (let v = 0; v < n; v++) {
            let dist = this.bfs(v, adjacencyMatrix);
            eccentricities[v] = Math.max(...dist);
        }

        const radius = Math.min(...eccentricities);
        const diameter = Math.max(...eccentricities);

        return {eccentricities, radius, diameter};
    }

    // ------------------------------------------------------------
    // 6. Красивый вывод матрицы с опциональным разбиением на блоки
    // ------------------------------------------------------------
    printMatrix(matrix, title = '', colsPerRow = 8) {
        if (title) console.log(title);

        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i];
            // Если строка длиннее colsPerRow, разбиваем на блоки с отступом
            if (row.length > colsPerRow) {
                console.log(`Строка ${i + 1}:`);
                for (let j = 0; j < row.length; j += colsPerRow) {
                    const chunk = row.slice(j, j + colsPerRow).join(' ');
                    console.log(`  ${chunk}`);
                }
            } else {
                // Обычный случай: выводим строку целиком
                console.log(row.join(' '));
            }
        }
    }

    // ------------------------------------------------------------
    // 7. Удобные методы для вывода конкретных матриц
    // ------------------------------------------------------------
    showAdjacencyMatrix() {
        const A = this.buildAdjacencyMatrix();
        this.printMatrix(A, 'Матрица смежности A:');
    }

    showIncidenceMatrix() {
        const B = this.buildIncidenceMatrix();
        this.printMatrix(B, 'Матрица инцидентности B:');
    }

    showLineGraphMatrix() {
        const B = this.buildIncidenceMatrix();
        const L = this.buildLineGraphMatrix(B);
        this.printMatrix(L, 'Матрица смежности графа рёбер L:');
    }

    showMetrics() {
        const A = this.buildAdjacencyMatrix();
        const {eccentricities, radius, diameter} = this.computeGraphMetrics(A);
        console.log('Эксцентриситеты:', eccentricities);
        console.log('Радиус =', radius);
        console.log('Диаметр =', diameter);
    }
}

// ------------------------------------------------------------
// Пример использования
// ------------------------------------------------------------
const graph1 = new Graph(8, [[1, 2]])
graph1.showAdjacencyMatrix();
graph1.showIncidenceMatrix();
graph1.showLineGraphMatrix();
graph1.showMetrics();