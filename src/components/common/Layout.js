import { useEffect, useRef } from 'react';

function Layout({ name, children }) {
	const frame = useRef(null);
	useEffect(() => {
		// 마운트 됐을때 class="on" 추가 (unmount 됐을때 제거는 꼭 할필요 없다)
		frame.current.classList.add('on');
	}, []);
	return (
		<section className={`content ${name}`} ref={frame}>
			<figure></figure>

			<div className='inner'>
				<h1>{name}</h1>
				{children}
			</div>
		</section>
	);
}

export default Layout;
