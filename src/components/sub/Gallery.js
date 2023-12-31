import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '../common/Modal';

function Gallery() {
	const openModal = useRef(null);
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);

	const [Mounted, setMounted] = useState(true);

	const getFlickr = useCallback(
		async (opt) => {
			let counter = 0;
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
			if (result.data.photos.photo.length === 0) {
				setLoader(false);
				frame.current.classList.add('on');
				const btnMine = btnSet.current.children;
				btnMine[1].classList.add('on');
				getFlickr({ type: 'user', user: '198484213@N03' });
				enableEvent.current = true;
				return alert('결과값이 없습니다.');
			}

			// 외부 api로 부터 data fetching 시간이 오래 걸리는 경우, 컴포넌트가 unmount시 해당 mount값을 false로 변경처리
			// mounted값이 true일 때에만 fetching된 data를 state에 담음.
			// data fetching전 컴포넌트가 unmount되면 state에 값을 담지 않으므로 불필요한 메모리 누수가 발생하지 않음.
			Mounted && setItems(result.data.photos.photo);

			const imgs = frame.current?.querySelectorAll('img');
			// console.log('imgDOM의 전체 갯수', imgs.length);

			//  만약 imgs에 받아지는 값이 없으면 밑에 반복문이 실행 안되도록 return으로 강제종료
			if (!imgs) return;

			imgs.forEach((img) => {
				img.onload = () => {
					++counter;

					if (counter === imgs.length - 2) {
						setLoader(false);

						frame.current.classList.add('on');
						enableEvent.current = true;
					}
				};
			});
		},
		[Mounted]
	);

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

	const showInterest = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'user', user: '198484213@N03' });
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim(); //글자 양옆에 공백없는지 확인
		if (tag === '') return alert('검색어를 입력하세요.');
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;

		resetGallery(e);
		getFlickr({ type: 'search', tags: tag });

		searchInput.current.value = '';
		isUser.current = false;
	};

	useEffect(() => {
		getFlickr({ type: 'user', user: '198484213@N03' });
		return () => {
			setMounted(false);
		};
	}, [getFlickr]); //state값이 아닌 함수가 들어갈 경우 무한 루프

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='btnSet' ref={btnSet}>
					<button onClick={showInterest}>Interest Gallery</button>
					<button className='on' onClick={showMine}>
						my Gallery
					</button>
				</div>
				<div className='searchBox'>
					<input
						type='text'
						placeholder='검색어를 입력하세요.'
						ref={searchInput}
						onKeyPress={(e) => e.key === 'Enter' && showSearch(e)}
					/>
					<button onClick={showSearch}>Search</button>
				</div>
				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												openModal.current.open();
												setIndex(idx);
											}}
										>
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
													if (isUser.current) return;
													isUser.current = true;
													setLoader(true);
													frame.current.classList.remove('on');
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
			<Modal ref={openModal}>
				<img
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
