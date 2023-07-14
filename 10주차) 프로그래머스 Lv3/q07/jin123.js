function solution(gems) {
  const type = new Set(gems).size;
  let result = [1, gems.length];
  let min = gems.length + 1;
  let l = 0,
    r = 0;
  const apeach = new Map();
  apeach.set(gems[0], 1);
  while (r < gems.length) {
    if (apeach.size < type) {
      r++;
      apeach.set(gems[r], apeach.get(gems[r]) + 1 || 1);
    } else {
      if (min > r - l) {
        min = r - l;
        result = [l + 1, r + 1];
      }
      const lValue = apeach.get(gems[l]);
      if (lValue > 1) apeach.set(gems[l], lValue - 1);
      else apeach.delete(gems[l]);
      l++;
    }
  }
  return result;
}
