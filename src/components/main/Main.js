import React from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';

function Main() {
	return (
		<main>
			{/* 메인 전용 라우터에는 main 문자값을 전달 */}
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Banner />
		</main>
	);
}

export default Main;
