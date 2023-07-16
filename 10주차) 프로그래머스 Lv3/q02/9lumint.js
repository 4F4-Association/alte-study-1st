function solution(n, costs) {
  const parent = new Array(n).fill().map((el, idx) => idx);
  let answer = 0;

  const findParent = (e) => {
    return parent[e] === e ? e : findParent(parent[e]);
  };

  const unionParent = (a, b) => {
    let parA = findParent(a), parB = findParent(b);
    parA < parB ? (parent[parB] = parA) : (parent[parA] = parB);
  };

  costs.sort((a, b) => a[2] - b[2]);
  for (const cost of costs) {
    let [a, b, c] = cost;
    if (findParent(a) !== findParent(b)) {
      unionParent(a, b);
      answer += c;
    }
  }
  return answer;
}
