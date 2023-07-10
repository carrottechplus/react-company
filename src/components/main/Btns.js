import { useRef, useEffect, useState, useCallback, memo } from 'react';
import Anime from '../../asset/anime';

function Btns({ setScrolled, setPos }) {
	const btnRef = useRef(null);
	const pos = useRef([]);

	const [Num, setNum] = useState(0);

	// useCallback으로 memoization 처리, 임시적으로 setPos부분은 풀리게
	const getPos = useCallback(() => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');

		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
		setPos(pos.current);
	}, [setPos]);

	const activation = useCallback(() => {
		//스크롤
		const base = -window.innerHeight / 3;
		const scroll = window.scrollY;
		const btns = btnRef.current.children; // li들
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	}, [setScrolled]);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, [getPos, activation]);

	return (
		<ul className='btnNav' ref={btnRef}>
			{/* 현재 새로 위치값이 담겨있는 배열의 갯구로 빈배열을 동적으로 생성하고 버튼을 반복 처리. */}
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';

					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default memo(Btns);
