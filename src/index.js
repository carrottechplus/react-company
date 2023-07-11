import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

//브라우저 라우터를 쓰는게 맞는데 깃허브에 올리는 제한사항으로 hashrouter를 씀.
ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);

// redux 시작 (react18버전에서는 x)
// npm i redux
// npm i react-redux
