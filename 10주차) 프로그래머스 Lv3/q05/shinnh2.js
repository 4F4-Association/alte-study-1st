//의사코드
/*
0. 필요한 변수
- 승점의 개수를 셀 변수 result=0
- A 포인터 ap=0
- B 포인터 bp=0
1. A와 B를 오름차순 정렬한다.
2. A의 ap번째 요소와 B의 bp번째 요소를 비교하여 
- A가 B보다 크거나 같다면: 지금은 이길 수 없으므로 그냥 넘어간다.
- A가 B보다 작다면 : result를 1 증가시킨다.
ap를 1 증가시킨다.
3. bp를 1 증가시킨다.
4. 2~3의 과정을 ap 또는 bp가 범위를 벗어날 때까지 반복한다.
5. result를 리턴한다.
*/
function solution(A, B) {
	let result = 0;
	let ap = 0,
		bp = 0;
	A.sort((a, b) => a - b);
	B.sort((a, b) => a - b);
	while (ap < A.length && bp < B.length) {
		if (A[ap] < B[bp]) {
			result += 1;
			ap++;
		}
		bp++;
	}
	return result;
}
