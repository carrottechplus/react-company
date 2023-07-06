import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const btnSet = useRef(null);
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
					enableEvent.current = true;
				}
			};
		});
	};

	// 기존 갤러리 초기화 함수
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => {
			el.classList.remove('on');
		});

		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	// useEffect(() => getFlickr({ type: 'interest' }), []);
	// useEffect(() => getFlickr({ type: 'search', tags: 'landscape' }), []);
	useEffect(() => getFlickr({ type: 'user', user: '198484213@N03' }), []);

	return (
		<Layout name={'Gallery'}>
			<div className='btnSet' ref={btnSet}>
				<button
					onClick={(e) => {
						if (!enableEvent.current) return; //모션중이면 return 으로 끊음.
						if (e.target.classList.contains('on')) return;
						resetGallery(e);
						getFlickr({ type: 'interest' });
					}}
				>
					Interest Gallery
				</button>
				<button
					className='on'
					onClick={(e) => {
						if (!enableEvent.current) return;
						if (e.target.classList.contains('on')) return;
						resetGallery(e);
						getFlickr({ type: 'user', user: '198484213@N03' });
					}}
				>
					my Gallery
				</button>
			</div>
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
