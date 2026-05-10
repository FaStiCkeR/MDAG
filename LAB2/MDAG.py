def find_max_independent_sets(vertices, edges):
    # Проверка: есть ли ребро между вершинами
    def is_adjacent(v1, v2):
        return (v1, v2) in edges or (v2, v1) in edges

    # Начинаем с первого элемента
    independent_sets = [{vertices[0]}]

    # Добавляем вершины по одной
    for i in range(1, len(vertices)):
        new_vertex = vertices[i]
        new_sets = []

        for s in independent_sets:
            # Проверяем: можно ли добавить новую вершину в множество
            if all(not is_adjacent(new_vertex, v) for v in s):
                # Если можно — добавляем
                new_sets.append(s | {new_vertex})
            else:
                # Если нельзя — оставляем как есть
                new_sets.append(s)

                # Пробуем создать новое множество с новой вершиной
                compatible = {v for v in s if not is_adjacent(v, new_vertex)}
                new_sets.append(compatible | {new_vertex})

        # Оставляем только максимальные множества
        maximal_sets = []
        for s in new_sets:
            if not any(s < other for other in new_sets):
                if s not in maximal_sets:
                    maximal_sets.append(s)

        independent_sets = maximal_sets

    return independent_sets


# --- ТАБЛИЦА СМЕЖНОСТИ (задаётся здесь) ---
table = [
    [0, 0, 1, 1, 1],  # x1
    [0, 0, 1, 0, 0],  # x2
    [1, 1, 0, 1, 0],  # x3
    [1, 0, 1, 0, 0],  # x4
    [1, 0, 0, 0, 0]  # x5
]


# --- ФОРМИРОВАНИЕ ВЕРШИН И РЁБЕР ПО ТАБЛИЦЕ ---
def formatTable():
    n = len(table)  # количество вершин
    vertices = [f"x{i + 1}" for i in range(n)]  # имена вершин: x1, x2, ...
    edges = []
    for i in range(n):
        for j in range(i + 1, n):  # проверяем только наддиагональные элементы
            if table[i][j] == 1:
                edges.append((vertices[i], vertices[j]))

    return vertices, edges


vertices, edges = formatTable()
print("Вершины:", vertices)
print("Рёбра:", edges)

# --- ЗАПУСК И ВЫВОД РЕЗУЛЬТАТА ---
result = find_max_independent_sets(vertices, edges)

print("\nМаксимальные независимые множества:")
for i, s in enumerate(result, 1):
    print(f"M{i}: {sorted(s)}")

# Наибольшее множество
max_size = max(len(s) for s in result)
largest = [s for s in result if len(s) == max_size]

print("\nРазмер α₀ =", max_size)
print("Наибольшие внутреустойчивые подмножества:", [sorted(s) for s in largest])
