import React from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';

import { useRef, useEffect } from 'react';

function Main() {
	const main = useRef(null);
	let pos = useRef([]); // [] 빈 배열만 지정할 경우 지역변수니까 다른 컴포넌트에 의해서 재렌더링될때마다 초기화 될 것. useRef를 쓰야험 재호출 막게하기

	// getPos 각각의 myScroll 공통 클래스를 가진 section을 모두 찾아서 해당 요소의 세로 위치값을 참조 객체에 배열로 담아주는 함수. (mount 되는 순간 한번, 브라우저 렌더링될때마다)
	const getPos = () => {
		pos.current = []; //초기화
		const secs = main.current.querySelectorAll('.myScroll'); //main.current는 참조객체

		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	// 위 함수가 마운트 되는 순간 한번만 실행되어야 하니, 의존성배열은 비워둔 useEffect
	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
	}, []);

	return (
		<main ref={main}>
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
