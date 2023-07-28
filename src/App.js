import { Route, Switch } from 'react-router-dom';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Menu from './components/common/Menu';

// main
import Main from './components/main/Main';

// sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

//scss
import './scss/style.scss';

import { fetchDepartment } from './redux/departmentSlice';
import { fetchFlickr } from './redux/flickrSlice';

//위는 컴포넌트가 마운트한 뒤에여야
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// memu 컴포넌트를 app에서 호출한 뒤 토글 객체를 각각 메인, 서브 헤더로 전달해서 토글 메뉴 기능이 동작하도로 수정해보기
function App() {
	const dispatch = useDispatch();
	const queryClient = new QueryClient();

	useEffect(() => {
		dispatch(fetchDepartment());
		dispatch(fetchFlickr({ type: 'user', user: '198484213@N03' }));
	}, [dispatch]);

	return (
		<QueryClientProvider client={queryClient}>
			{/* Switch는 더 먼저나온 라우터 선택 */}
			<Switch>
				<Route exact path='/' render={() => <Main />} />

				{/* 기본 형태 ( 특정 문자값을 전달해야하는 )
				<Route path='/'>
					<Header type={'sub'} />
				</Route>
				 */}

				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			{/* 기본 형태
			<Route path='/community'>
				<Community />
			</Route> 
			*/}

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />

			<Footer />

			<Menu />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
