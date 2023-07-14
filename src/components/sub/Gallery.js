import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/actionType';

/* 
갤러리 컴포넌트에서 전역 비동기 데이터 변경방법
- dispatch로 액션 객체를 보낼 떄 opt도 같이 전달하면 됨.

각각의 showInterest, ~~ showUser 함수가 실행될때마다 내부적으로 opt지역 스테이트 변경
useEffect 에 opt 스테이트값을 의존성 배열해서 dispatch로 opt가 바뀔때마다 action 객체를 전달하도록 설정
 */

function Gallery() {
	const dispatch = useDispatch();
	const Items = useSelector((store) => store.flickrReducer.flickr);
	const openModal = useRef(null);
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const counter = useRef(0);
	const firstLoaded = useRef(true);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);

	// 초기 Opt state에 내 계정 정보 등록 : 해당 페이지 새로고침시 my Gallery를 default로 출력하기 위함.
	const [Opt, setOpt] = useState({ type: 'user', user: '198484213@N03' });

	// const getFlickr = useCallback(async (opt) => {
	// 	let counter = 0;

	// 	if (result.data.photos.photo.length === 0) {
	// 		setLoader(false);
	// 		frame.current.classList.add('on');
	// 		const btnMine = btnSet.current.children;
	// 		btnMine[1].classList.add('on');
	// 		getFlickr({ type: 'user', user: '198484213@N03' });
	// 		enableEvent.current = true;
	// 		return alert('결과값이 없습니다.');
	// 	}
	// 	setItems(result.data.photos.photo);
	// 	console.log(result.data);

	// 	const imgs = frame.current.querySelectorAll('img');
	// 	console.log('imgDOM의 전체 갯수', imgs.length);

	// 	imgs.forEach((img) => {
	// 		img.onload = () => {
	// 			++counter;

	// 			if (counter === imgs.length - 2) {
	// 				setLoader(false);

	// 				frame.current.classList.add('on');
	// 				enableEvent.current = true;
	// 			}
	// 		};
	// 	});
	// }, []);

	// 이벤트 발생시 각각 interest, user, search, userGallery 호출할때마다 기존 사라지게 하고 로딩이미지 보이게 하는 공통 초기화 함수
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

	// interest 방식 갤러리 호출
	const showInterest = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		//
		setOpt({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);

		setOpt({ type: 'user', user: '198484213@N03' });
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;
		console.log(tag);

		resetGallery(e);
		setOpt({ type: 'search', tags: tag });

		searchInput.current.value = '';
		isUser.current = false;
	};

	// 액션에 추가로 전달되어야 할 Opt값이 변경딜때마다 ㅐ롭게 액션객체를 생성해서 리튜서에 ㅓ전달
	useEffect(() => {
		dispatch({ type: types.FLICKR.start, opt: Opt });
	}, [Opt, dispatch]);

	// 전역 state정보값이 변경이 될때마다 해당 구문 실행
	// 다시 이벤트 기능 활성화, 이미=지 로딩이벤트 발생해서 이미지소스 출력완료시 다시 갤러리 보이게 처리, 버튼도 활성화
	useEffect(() => {
		counter.current = 0;

		if (Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			setOpt({ type: 'user', user: '198484213@N03' });
			enableEvent.current = true;
			return alert('결과값이 없습니다.');
		}

		firstLoaded.current = false;

		const imgs = frame.current.querySelectorAll('img');

		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;

				if (counter.current === imgs.length - 2) {
					setLoader(false);

					frame.current.classList.add('on');
					enableEvent.current = true;
				}
			};
		});
	}, [Items]);

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
													setOpt({ type: 'user', user: e.target.innerText });
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
