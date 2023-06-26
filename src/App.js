import { Route } from 'react-router-dom';

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

function App() {
	return (
		<>
			<Header />

			<Route exact path='/'>
				<Visual />

				<Pics />
				<News />
				<Vids />
				<Banner />
			</Route>

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
