import { useSelector } from 'react-redux';

function Pics({ Scrolled, Pos }) {
	const { flickr } = useSelector((store) => store.flickrReducer);
	// console.log(flickr);
	const currentPos = Scrolled - Pos;
	const base = window.innerHeight / 3;
	const modifiedPos = currentPos + base;
	// console.log(Scrolled); 이건 스크롤될 때 마다 계속 재호출되는데 그게맞음. 왜냐하면 강제로 줄여버리면..모션이 끊길것..
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${currentPos}px)` }}>FLICKR</h1>

			<article
				style={{
					transform: `translate(-50%, -50%) rotate(${Scrolled >= Pos - base ? modifiedPos : 0}deg) scale(${
						Scrolled >= Pos - base ? 1 + modifiedPos / 500 : 1
					})`,
					opacity: `${Scrolled >= Pos - base ? 1 - modifiedPos / 500 : 1}`,
				}}
			></article>
			<ul>
				{flickr.map((pic, idx) => {
					if (idx >= 4) return null;

					return (
						<li key={pic.id}>
							<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
