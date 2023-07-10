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
	const [Pos, setPos] = useState([]);

	return (
		<main>
			{/* 메인 전용 라우터에는 main 문자값을 전달 */}

			{/* Btns컴포넌트에서 만들어진 scroll값을 Pics컴포넌트에 전달하는 방법 ::
			부모요소에 State 와 State변경함수를 만들고 
			값을 전달해야 되는 자식 컴포넌트에는 State변경함수를, 
			값을 받아야 되는 자식 컴포넌트에는 State를 prop로 전달
			 */}
			<Header type={'main'} menu={menu} />
			{/* 
			매개체로만 props 값이 쓰이는 상태 
			Prop Drilling
			- 특정 값을 자식 컴포넌트에게 전달하기 위해서 불필요하게 많은 중간 컴포넌트들이 값을 전달목적으로만 쓰이는 경우
			- 많아지면 많아질수록 유지보수가 힘들어짐
			- Redux : 위와 같은 prop drilling을 방지하기 위해서는 복잡하게 컴포넌트를 통해 전달할 값을 prop이 아닌 컴포넌트 외부에 데이터 전용 객체를 만들어서 어떤 위치의 컴포넌트에서든 편하게 값을 가져오고 수정 할 수 있게 만든 전역 데이터 체계
			 */}
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
