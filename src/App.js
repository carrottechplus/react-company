import { Route, Switch } from 'react-router-dom';
import { useCallback, useRef } from 'react';

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

// memu 컴포넌트를 app에서 호출한 뒤 토글 객체를 각각 메인, 서브 헤더로 전달해서 토글 메뉴 기능이 동작하도로 수정해보기
function App() {
	const menu = useRef(null);
	return (
		<>
			{/* Switch는 더 먼저나온 라우터 선택 */}
			<Switch>
				<Route exact path='/' render={() => <Main />} />

				{/* 기본 형태 ( 특정 문자값을 전달해야하는 )
				<Route path='/'>
					<Header type={'sub'} />
				</Route>
				 */}

				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
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

			<Menu ref={menu} />
		</>
	);
}

export default App;
