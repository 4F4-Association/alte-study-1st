//의사코드
/*
1. enroll개수만큼 수익 기록장부 result를 만든다.
2. seller를 순회하며 각 i번째 요소를 확인한다.
    2.1. amount의 i번째 * 칫솔금액 100을 곱해서 총 판매량을 계산한다.
    2.2. enroll과 referral을 참고하여 추천인이 없을 때까지 수익을 계산한다.
3. x의 수익 계산하기 (판매수익 n): 
참고: 효율성을 위해 한 번 확인한 사람의 인덱스는 확인하지 않도록 확인할 enroll의 범위를 줄여준다.
    3.1. enroll에서 x를 찾아 인덱스 nowIdx를 기억한다.
    3.2. referral[nowIdx]가 "-"라면: result[nowIdx]에 판매수익 n-(n*0.1)을 더하고 끝낸다.  
    3.2. referral[nowIdx]가 "-"가 아니라면: 
        - n*0.1이 1미만이라면 result[now]에 판매수익 n을 더하고 끝낸다.
        - 아니라면 result[nowIdx]에 판매수익 n-(n*0.1)을 더한다.
    3.4. referral[now]와 판매수익 n*0.1로 3번 과정을 반복한다.
4. result를 리턴한다.
*/

function solution(enroll, referral, seller, amount) {
	let result = Array(enroll.length).fill(0);
	const calc = (arr, person, n) => {
		let nowIdx = arr.lastIndexOf(person);
		if (referral[nowIdx] === "-") {
			result[nowIdx] += n - Math.floor(n * 0.1);
			return;
		} else {
			if (Math.floor(n * 0.1) < 1) {
				result[nowIdx] += n;
				return;
			}
			result[nowIdx] += n - Math.floor(n * 0.1);
		}
		calc(arr.slice(0, nowIdx), referral[nowIdx], Math.floor(n * 0.1));
	};
	for (let i = 0; i < seller.length; i++) {
		calc(enroll, seller[i], amount[i] * 100);
	}
	return result;
}
