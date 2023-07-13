// state가 저장될 공감을 생성, reducer에서 saga 작업을 미들웨어 적용 설정

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import rootSaga from './saga';
import createSagaMiddleware from '@redux-saga/core';

//sagaMiddleware활성화
const sagaMiddleware = createSagaMiddleware();

//store에 reducer데이터를 전달할 때 sagaMiddleware를 적용해서 전달
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//적용된 sagaMiddleware로 부터 rootSaga함수 호출
sagaMiddleware.run(rootSaga);

//sagaMiddleware가 적용된 reducer 데이터를 store에 저장하고 export
export default store;
