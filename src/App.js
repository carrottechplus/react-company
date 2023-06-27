import { Route, Switch } from 'react-router-dom';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// main
import Visual from './components/main/Visual';
import Pics from './components/main/Pics';
import News from './components/main/News';
import Vids from './components/main/Vids';
import Banner from './components/main/Banner';

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
				<Route exact path='/'>
					{/* 메인 전용 라우터에는 main 문자값을 전달 */}
					<Header type={'main'} />
					<Visual />
					<Pics />
					<News />
					<Vids />
					<Banner />
				</Route>
				<Route path='/'>
					{/* 메인 전용 라우터에는 sub 문자값을 전달 */}
					<Header type={'sub'} />
				</Route>
			</Switch>
			<Route path='/department'>
				<Department />
			</Route>
			<Route path='/community'>
				<Community />
			</Route>
			<Route path='/gallery'>
				<Gallery />
			</Route>
			<Route path='/youtube'>
				<Youtube />
			</Route>
			<Route path='/contact'>
				<Contact />
			</Route>
			<Route path='/member'>
				<Member />
			</Route>
			<Footer />
		</>
	);
}

export default App;
