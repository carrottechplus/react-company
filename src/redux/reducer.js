// 전역 state의 데이터를 action 타입의 종류에 따라서 변형해서 반환하는 함수

import { combineReducers } from 'redux';
import * as types from './actionType'; // actionType에 있는 모든 것들 types로 명명

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		// 컴포넌트로 부터 넘겨받는 action 객체
		// 해당 객체를 넘겨 받으면 saga가 해당 타입에 대한 비동기 데이터 처리하고 새로운 객체 변환
		case types.Youtube.start:
			return state;

		// saga로 부터 새롭게 넘겨받은 action 객체로 데이터 처리 (데이터 fetching 성공시)
		case types.Youtube.success:
			return { ...state, youtube: action.payload };

		// saga로 부터 새롭게 넘겨받은 action 객체로 데이터 처리 (데이터 fetching 실패시)
		case types.Youtube.fail:
			return { ...state, youtube: action.payload };

		default:
			return state;
	}
};

const memberReducer = (state = { member: [] }, action) => {
	switch (action.type) {
		case types.Member.start:
			return state;

		case types.Member.success:
			return { ...state, member: action.payload };

		case types.Member.fail:
			return { ...state, member: action.payload };

		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return state;
		case types.FLICKR.success:
			return { ...state, flickr: action.payload };
		case types.FLICKR.fail:
			return { ...state, flickr: action.payload };
		default:
			return state;
	}
};
const reducers = combineReducers({ youtubeReducer, memberReducer, flickrReducer });
export default reducers;
