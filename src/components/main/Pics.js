import { useGalleryQuery } from '../../hooks/useGalleryQuery';

function Pics({ Scrolled, Pos }) {
	const { data: Pics, isSuccess } = useGalleryQuery({ type: 'user', user: '198484213@N03' });
	const currentPos = Scrolled - Pos;
	// const base = window.innerHeight / 3;
	// const modifiedPos = currentPos + base;
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${currentPos}px)` }}>FLICKR</h1>

			{/* <article
				style={{
					transform: `translate(-50%, -50%) rotate(${Scrolled >= Pos - base ? modifiedPos : 0}deg) scale(${
						Scrolled >= Pos - base ? 1 + modifiedPos / 500 : 1
					})`,
					opacity: `${Scrolled >= Pos - base ? 1 - modifiedPos / 500 : 1}`,
				}}
			>
				</article> */}
			<div className='picWrap'>
				{isSuccess &&
					Pics.map((pic, idx) => {
						if (idx >= 4) return null;
						return (
							<article key={idx}>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
									alt={pic.title}
								/>
							</article>
						);
					})}
			</div>
		</section>
	);
}

export default Pics;
