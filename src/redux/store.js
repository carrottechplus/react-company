import { createStore } from 'redux';
import reducers from './reducer';

// 전역으로 관리할 데이터가 저장 될 전역 객체를 생성

const store = createStore(reducers);

export default store;
