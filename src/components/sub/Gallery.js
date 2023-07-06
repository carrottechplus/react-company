import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const btnMine = useRef(null);
	const btnInterest = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true); // true 로딩바가 맨처음에 보여야하니까

	const getFlickr = async (opt) => {
		let counter = 0; //state에 담으면 계속 재랜더링 그러므로 useRef썻는데,, 값이 사라지는게 아니라서 초기화가 필요함.
		const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1`;
		const key = '6c70577e2661042cd0ab587b17f6c944';
		const num = 60;
		// const myID = '198484213@N03';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';

		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url); //동기화
		console.log(result);
		setItems(result.data.photos.photo);

		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter;
				console.log(counter);

				if (counter === imgs.length - 1) {
					setLoader(false);

					frame.current.classList.add('on');

					// 모션 중 재이벤트 방지시 모션이 끝날 떄까지 이벤트를 방지를 시켜도, 모션이  끝나는 순간에도 이벤트가 많이 발생하면 특정앖이 바뀌는 순간보다 이벤트가 더 빨리 들어가서 오류가 발새할 수 있음.
					// 해결방법 - 물리적으로 이벤트 호출을 지연시키여서 마지막 발생한 이벤트만 동작처리 (debouncing)
					// 단 시간에 많이 발생하는 이벤트시 함수 호출을 줄이는 방법
					// debouncing
					// throttling
					enableEvent.current = true;
				}
			};
		});
	};

	// useEffect(() => getFlickr({ type: 'interest' }), []);
	// useEffect(() => getFlickr({ type: 'search', tags: 'landscape' }), []);
	useEffect(() => getFlickr({ type: 'user', user: '198484213@N03' }), []);

	return (
		<Layout name={'Gallery'}>
			<button
				ref={btnInterest}
				onClick={(e) => {
					if (!enableEvent.current) return; //모션중이면 return 으로 끊음.
					if (e.target.classList.contains('on')) return;
					btnMine.current.classList.remove('on');
					e.target.classList.add('on');
					enableEvent.current = false;
					setLoader(true);
					frame.current.classList.remove('on');
					getFlickr({ type: 'interest' });
				}}
			>
				Interest Gallery
			</button>
			<button
				className='on'
				ref={btnMine}
				onClick={(e) => {
					if (!enableEvent.current) return;
					if (e.target.classList.contains('on')) return;
					btnInterest.current.classList.remove('on');
					e.target.classList.add('on');
					enableEvent.current = false;
					setLoader(true);
					frame.current.classList.remove('on');
					getFlickr({ type: 'user', user: '198484213@N03' });
				}}
			>
				my Gallery
			</button>
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{Items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											alt={item.title}
										/>
									</div>
									<h2>{item.title}</h2>
									<div className='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											alt={item.title}
											onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
										/>
										<span
											onClick={(e) => {
												setLoader(true);
												frame.current.classList.remove('on');
												console.log(e.target.innerText);
												getFlickr({ type: 'user', user: e.target.innerText });
											}}
										>
											{item.owner}
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
			{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alg='loader' />}
		</Layout>
	);
}

export default Gallery;
