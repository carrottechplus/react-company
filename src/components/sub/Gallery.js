import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const counter = useRef(0);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true); // true 로딩바가 맨처음에 보여야하니까

	const getFlickr = async (opt) => {
		const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1`;
		const key = '6c70577e2661042cd0ab587b17f6c944';
		const num = 50;
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
		// console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);

		// 외부 데이터가 State에 담기고 DOM이 생성되는 숭간 모든 img 요소를 찾아서 반복 처리
		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img, idx) => {
			// 이미지요소에 load 이벤트가 발생할 때 (소스 이미지까지 로딩이 완료될 때 마다)
			img.onload = () => {
				// 내부적으로 카운터값을 1씩 증가
				++counter.current;
				console.log(counter);

				// 로딩 완료된 이미지 수와 전체 이미지 수 *2가 같아질 때
				if (counter.current === num * 2) {
					// loader 제거하고 이미지 갤러리에 on class 추가
					setLoader(false);

					frame.current.classList.add('on');
				}
			};
		});
	};

	useEffect(() => getFlickr({ type: 'interest' }), []);
	// useEffect(() => getFlickr({ type: 'search', tags: 'landscape' }), []);
	// useEffect(() => getFlickr({ type: 'user', user: '198484213@N03' }), []);

	return (
		<Layout name={'Gallery'}>
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
										<span>{item.owner}</span>
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
