/**
 * Programmers
 * https://school.programmers.co.kr/learn/courses/30/lessons/12987
 * Problem Number: 12987
 * Level: 3
 * Algorithm: Summer/Winter Coding(~2018)
 */

/* pseudocode
   0. A의 높은 숫자를 B의 높은 숫자로 우승할 경우 최대 승점
   1. A와 B를 내림차순으로 정렬
   2. B 점수로 A의 점수를 이길 수 있다면 B의 인덱스를 다음으로 이동
   3. A 인덱스는 비교가 끝났다면 무조건 이동
*/

function solution(A, B) {
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);

  let aIdx = 0;
  let bIdx = 0;
  let answer = 0;

  while (aIdx < A.length) {
    if (A[aIdx] < B[bIdx]) {
      bIdx++;
      answer++;
    }

    aIdx++;
  }

  return answer;
}
