/**
 * Programmers
 * https://school.programmers.co.kr/learn/courses/30/lessons/92343
 * Problem Number: 92343
 * Level: 3
 * Algorithm: 2022 KAKAO BLIND RECRUITMENT
 */

/* pseudocode
   1. 간선 정보인 edges로 트리 생성
      1-1. 트리 노드의 개수는 info의 길이와 동일
      1-2. 부모 노드 인덱스에 자식 노드를 삽입
   2. 트리를 탐색하기 위한 dfs (최단 루트를 원하는 것이 아니기 때문에 dfs 선택)
      2-1. 현재 노드에 있는 동물이 양(info가 0이라면)이라면 양 증가, 아니라면 늑대 증가
      2-2. 늑대가 양 이상이면 탐색 종료
      2-3. 늑대가 양보다 적을 때 현재 노드까지의 양이 answer보다 크다면 answer 갱신
      2-4. 현재 노드의 자식들을 next에 push
      2-5. next에 존재하는 노드들에 대해 dfs 수행
      2-6. 이 때 next에 바로 다음에 탐색할 노드는 포함되지 않아야 하므로
           node가 아닌 값들만 필터하며 인자로 보내줌
   3. answer 리턴
*/

function solution(info, edges) {
  const tree = Array(info.length)
    .fill()
    .map((_) => []);

  for (const el of edges) {
    const [parent, children] = el;

    tree[parent].push(children);
  }

  let answer = 0;

  const DFS = (start, sheep, wolf, next) => {
    !info[start] ? sheep++ : wolf++;

    if (sheep <= wolf) return;

    answer = Math.max(answer, sheep);

    // 방문하게 될 노드들에 대해 dfs
    next.push(...tree[start]);

    for (const node of next) {
      DFS(
        node,
        sheep,
        wolf,
        next.filter((el) => el !== node)
      );
    }
  };

  DFS(0, 0, 0, []);

  return answer;
}
