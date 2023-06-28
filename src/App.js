import { Route, Switch } from 'react-router-dom';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

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
function App() {
	return (
		<>
			{/* Switch는 더 먼저나온 라우터 선택 */}
			<Switch>
				<Route exact path='/' component={Main} />

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
		</>
	);
}

export default App;
