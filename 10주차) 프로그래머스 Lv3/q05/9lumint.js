function solution(A, B) {
  let answer = 0;
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);
  for (let idxA = 0, idxB = 0; idxA < A.length; idxA++) {
    if (A[idxA] < B[idxB]) {
      answer++;
      idxB++;
    }
  }
  return answer;
}
