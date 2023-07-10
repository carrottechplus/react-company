import React, { useState } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';
import Btns from './Btns';

function Main({ menu }) {
	const [Scrolled, setScrolled] = useState(0);
	// 얘떄매 메인에 들어가는 모든 컴포넌트가 재호출되고 있음.

	const [Pos, setPos] = useState([]);

	return (
		<main>
			<Header type={'main'} menu={menu} />
			{/* 매개체로만 props 값이 쓰이는 상태 */}
			<Visual />
			<News />

			{/* pics 컴포넌트가 활성화되는 순간부터 Scrolled값을 pics의 제목 스타일과 연동 */}
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Banner />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
