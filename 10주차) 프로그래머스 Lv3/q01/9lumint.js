function solution(n, edges) {
  const adjList = new Array(n).fill([]).map((el) => []);

  for (let edge of edges) {
    adjList[edge[0] - 1].push(edge[1] - 1);
    adjList[edge[1] - 1].push(edge[0] - 1);
  }

  let visitedNode = [1], idxOfList = [0];

  while (idxOfList.length) {
    let idx = idxOfList.shift();

    for (let n of adjList[idx]) {
      if (!visitedNode[n]) {
        visitedNode[n] = visitedNode[idx] + 1;
        idxOfList.push(n);
      }
    }
  }

  let max = Math.max(...visitedNode);

  return visitedNode.filter((el) => el === max).length;
}
