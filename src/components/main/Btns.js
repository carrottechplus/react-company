import { useRef, useEffect, useState } from 'react';

function Btns() {
	const btnRef = useRef(null);
	const pos = useRef([]);

	const [Num, setNum] = useState(0);

	const getPos = () => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');

		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);

		return () => {
			window.removeEventListener('resize', getPos);
		};
	}, []);

	return (
		<ul className='btnNav' ref={btnRef}>
			{/* 현재 새로 위치값이 담겨있는 배열의 갯구로 빈배열을 동적으로 생성하고 버튼을 반복 처리. */}
			{Array(Num)
				.fill()
				.map((data, idx) => {
					return <li key={idx}></li>;
				})}
		</ul>
	);
}

export default Btns;
