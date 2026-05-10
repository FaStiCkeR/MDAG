import heapq

graph = {
    1: {2: 7, 3: 4, 4: 2},
    2: {1: 7, 5: 5},
    3: {1: 4, 4: 6},
    4: {1: 2, 3: 6},
    5: {2: 5}
}


def dijkstra(start, finish):
    distances = {vertex: float('inf') for vertex in graph}
    parents = {vertex: None for vertex in graph}

    distances[start] = 0
    queue = [(0, start)]

    while queue:
        current_distance, current_vertex = heapq.heappop(queue)

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex].items():
            new_distance = current_distance + weight

            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                parents[neighbor] = current_vertex
                heapq.heappush(queue, (new_distance, neighbor))

    path = []
    current = finish

    while current is not None:
        path.append(current)
        current = parents[current]

    path.reverse()

    return distances[finish], path


distance, path = dijkstra(1, 5)

print("Кратчайшее расстояние:", distance)
print("Кратчайший путь:", path)
