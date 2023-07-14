/**
 * Programmers
 * https://school.programmers.co.kr/learn/courses/30/lessons/49189
 * Problem Number: 49189
 * Level: 3
 * Algorithm: 그래프
 */

/* pseudocode
   1. 간선 정보를 그래프로 바꿔주는 함수 edgeToGraph
      1-1. 양방향 그래프이므로 from 노드에 to 정보를 저장
      1-2. to 노드에 from 노드 정보를 저장
   2. 최단 경로로 이동한다고 하였으므로 BFS 이용
      2-1. 방문 여부를 판단하는 visit
      2-2. 특정 깊이에 어떤 노드들이 존재하는지 판단하는 depth
      2-3. 방문 순서를 위한 queue (queue에는 방문할 노드와 노드의 깊이 정보 저장)
      2-4. 현재 노드에서 방문 가능한 노드를 반복문으로 탐색
      2-5. 다음에 방문할 노드가 방문 기록이 없는 노드라면
      2-6. depth의 깊이 인덱스에 해당 노드를 push
      2-7. queue에 해당 노드와 깊이를 push
      2-8. 방문 여부를 참으로 변경
      2-9. depth의 가장 마지막 인덱스가 가장 깊은 깊이이므로 해당 깊이에 일치하는 개수 반환
*/
const edgeToGraph = (n, edge) => {
  const graph = Array(n + 1)
    .fill()
    .map((_) => []);

  for (const el of edge) {
    const [from, to] = el;

    graph[from].push(to);
    graph[to].push(from);
  }

  return graph;
};

function solution(n, edge) {
  const graph = edgeToGraph(n, edge);
  /* [ [], [3, 2], [3, 1, 4, 5], [6, 4, 2, 1], [3, 2], [2] ] */

  const BFS = (start, n, graph) => {
    const visit = Array(n + 1).fill(0);
    const depth = [];

    visit[start] = 1;

    const queue = [[start, 1]];

    while (queue.length) {
      const [cur, dep] = queue.shift();

      for (const el of graph[cur]) {
        if (!visit[el]) {
          // depth에 노드 정보가 있는 경우
          if (depth[dep + 1]) {
            depth[dep + 1].push(el);
          }
          // depth에 노드 정보가 없는 경우
          else depth[dep + 1] = [el];

          queue.push([el, dep + 1]);
          visit[el] = 1;
        }
      }
    }

    return depth[depth.length - 1].length;
    /* [ <2 empty items>, [ 3, 2 ], [ 6, 4, 5 ] ] */
  };

  return BFS(1, n, graph);
}
