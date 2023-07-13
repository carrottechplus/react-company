// reducer에 action 요청이 처음 들어왔을 때 중간에서 가로채서 대신 중간작업을 수행하는 뒤 다시 새롭게 반환될 action객체를 reduce에 다시 전달 (미들웨어 : 중간 특정시점에 간섭을 해서 부가적인 기능을 수행)

import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchMember } from './api';
import * as types from './actionType';

// youtube saga
function* callYoutube() {
	yield takeLatest(types.Youtube.start, returnYoutube);
}

function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.Youtube.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.Youtube.fail, payload: err });
	}
}

// member (department) saga
function* callMember() {
	yield takeLatest(types.Member.start, returnMember);
}

function* returnMember() {
	try {
		const response = yield call(fetchMember);
		yield put({ type: types.Member.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.Member.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callMember)]);
}
