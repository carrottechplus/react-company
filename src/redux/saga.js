// reducer에 action 요청이 처음 들어왔을 때 중간에서 가로채서 대신 중간작업을 수행하는 뒤 다시 새롭게 반환될 action객체를 reduce에 다시 전달 (미들웨어 : 중간 특정시점에 간섭을 해서 부가적인 기능을 수행)

import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube } from './api';
import * as types from './actionType';

// 컴포넌트로 부터 reducer에 전달된 YOUTUBE_START action 요청을 대신 전달받아 데이터 fetching 함수호출해주는 함수

function* callYoutube() {
	yield takeLatest(types.Youtube.start, returnYoutube);
}

// 유튜브 데이터 호출한 뒤 반환된 값으로 새롭게 액션객체를 생성하는 함수
// promise로 처리
function* returnYoutube() {
	try {
		// 데이터 fetching 성공
		const response = yield call(fetchYoutube);
		yield put({ type: types.Youtube.success, payload: response.data.items });
	} catch (err) {
		// 데이터 fetching 실패
		yield put({ type: types.Youtube.fail, payload: err });
	}
}

// 최종적으로 fork를 통해 callYoutube 호출 함수 제작
export default function* rootSaga() {
	yield all([fork(callYoutube)]);
}
