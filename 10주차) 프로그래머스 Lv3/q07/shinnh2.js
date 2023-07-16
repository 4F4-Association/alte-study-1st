//의사코드
/*
문제의 원리: 두 포인터 start와 end를 늘려가면서 보석 종류를 확인하고, 그 범위를 좁히는 것이다. 
0. 필요한 변수
- 보석의 종류를 보관할 gemHash(키는 보석 종류, 값은 등장횟수. Map으로 처리할 것)
- 구간을 저장할 시작점 start=0, 끝점 end=0
- 전체 보석 종류를 저장할 gemsKind
- 효율적인 답을 저장해갈 answer=[1, gems.length]
1. 전체 보석의 종류를 gemsKind에 저장한다.
2. gemHash를 생성하고 gems의 시작점의 값을 1로 저장한다. 
(이유: end를 일단 증가시킨 후 그 end자리의 값을 확인해야 종류를 효율적으로 저장할 수 있다.
그렇다고 end를 1부터 시작하면 첫 값을 확인할 수 없으므로 시작점을 먼저 기록하고 시작한다.)
3. gems[start]부터 gems[end]까지 살펴보며 gemHash에 종류를 기록한다. 
4. 전체 보석의 종류 수와 현재 보석 종류 수가 같다면
	4.1. answer범위와 현재 start,end 사이 범위를 비교하여 더 작은 것으로 answer를 갱신한다. 보다 효율적인 값을 저장하는 것이다.
	4.2. 현재 start자리의 보석 종류수를 하나 줄여서 gemHash를 갱신한다.
	4.3. 만약 빈도수가 0이라면 종류가 하나 줄은 것이므로 gemHash에서 start자리의 보석 종류를 삭제한다.
	4.4. start의 값을 1 늘린다. 
5. 그 외, 즉 전체 보석의 종류 수보다 현재 보석 종류 수가 적다면
	5.1. end의 값을 1 늘린다.
	5.2. end의 보석 종류와 빈도수를 확인하여 gemHash를 갱신한다.
6. 4-5번 과정을 end가 gems의 길이보다 작을 동안만 반복한다.
7. answer를 반환한다.
*/
function solution(gems) {
	let start = 0,
		end = 0;
	let answer = [1, gems.length];
	let gemsKind = new Set(gems).size;
	let gemHash = new Map();
	gemHash.set(gems[start], 1);
	while (end < gems.length) {
		if (gemHash.size === gemsKind) {
			if (answer[1] - answer[0] > end - start) answer = [start + 1, end + 1];
			gemHash.set(gems[start], gemHash.get(gems[start]) - 1);
			if (gemHash.get(gems[start]) <= 0) gemHash.delete(gems[start]);
			start++;
		} else {
			end++;
			gemHash.set(
				gems[end],
				gemHash.get(gems[end]) ? gemHash.get(gems[end]) + 1 : 1
			);
		}
	}
	return answer;
}
