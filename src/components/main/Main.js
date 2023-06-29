import React, { useState } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';
import Btns from './Btns';

function Main() {
	const [Scrolled, setScrolled] = useState(0);

	return (
		<main>
			{/* 메인 전용 라우터에는 main 문자값을 전달 */}

			{/* Btns컴포넌트에서 만들어진 scroll값을 Pics컴포넌트에 전달하는 방법 ::
			부모요소에 State 와 State변경함수를 만들고 
			값을 전달해야 되는 자식 컴포넌트에는 State변경함수를, 
			값을 받아야 되는 자식 컴포넌트에는 State를 prop로 전달
			 */}
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics Scrolled={Scrolled} />
			<Vids />
			<Banner />
			<Btns setScrolled={setScrolled} />
		</main>
	);
}

export default Main;
