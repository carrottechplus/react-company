function Pics({ Scrolled, Pos }) {
	const currentPos = Scrolled - Pos;
	const base = window.innerHeight / 3;
	const modifiedPos = currentPos + base;
	// console.log(Scrolled); 이건 스크롤될 때 마다 계속 재호출되는데 그게맞음. 왜냐하면 강제로 줄여버리면..모션이 끊길것..
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${currentPos + 100}px)` }}>FLICKR</h1>

			<article
				style={{
					height: `${Scrolled >= Pos ? 300 - currentPos : 300}px`,
					// transform: `translate(-50%, -50%) rotate(${Scrolled >= Pos - base ? modifiedPos : 0}deg) scale(${
					// 	Scrolled >= Pos - base ? 1 + modifiedPos / 500 : 1
					// })`,
					// opacity: `${Scrolled >= Pos - base ? 1 - modifiedPos / 500 : 1}`,
				}}
			>
				<img src={process.env.PUBLIC_URL + '/img/Community.jpg'} alt='' />
			</article>
		</section>
	);
}

export default Pics;
