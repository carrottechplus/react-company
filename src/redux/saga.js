// reducer에 action 요청이 처음 들어왔을 때 중간에서 가로채서 대신 중간작업을 수행하는 뒤 다시 새롭게 반환될 action객체를 reduce에 다시 전달 (미들웨어 : 중간 특정시점에 간섭을 해서 부가적인 기능을 수행)

import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchMember, fetchFlickr } from './api';
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

//flickr saga
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
function* returnFlickr(action) {
	try {
		//컴포넌트에 액션객체 전달시 만약 타입외의 propety값이 있다면 해당 값을 받아서 call함수 두번째 인수로 api함수에 인수로 전달 가능
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: types.FLICKR.success, payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callMember), fork(callFlickr)]);
}
