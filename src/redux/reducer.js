// 전역 state의 데이터를 action 타입의 종류에 따라서 변형해서 반환하는 함수

import { combineReducers } from 'redux';
import * as types from './actionType';
// actionType에 있는 모든 것들 types로 명명

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.Youtube.start:
			return state;

		case types.Youtube.success:
			return { ...state, youtube: action.payload };

		case types.Youtube.fail:
			return { ...state, youtube: action.payload };

		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer });
export default reducers;
