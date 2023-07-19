import React from 'react'; //리액트 객체를
import { useEffect, useRef } from 'react';

function Layout({ name, children, txt = 'Default', bg }) {
	const frame = useRef(null);
	useEffect(() => {
		// 마운트 됐을때 class="on" 추가 (unmount 됐을때 제거는 꼭 할필요 없다)
		frame.current.classList.add('on');
	}, []);
	return (
		<section className={`content ${name}`} ref={frame}>
			<figure style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${bg})` }}></figure>

			<div className='inner'>
				<h1>{name}</h1>
				<h2>
					{/* 줄바꿈될 부분에 구분자를 넣어서 구분자로 문자값을 배열로 분리하고 반복을 돌면서 br태그 추가, 이때 주의할 점은 반복도는 요소이므로 key속성을 적용하기 위해서는 React.Fragment 형태로 wrapping 처리해야함. */}
					{txt.split('-').map((el, idx) => {
						return (
							<React.Fragment key={idx}>
								{el}
								<br />
							</React.Fragment>
						);
					})}
				</h2>
				{children}
			</div>
		</section>
	);
}

export default Layout;
