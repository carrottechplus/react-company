import { memo, useRef } from 'react';
// import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';

function BtnRolling() {
	const swiper = useSwiper();
	const btnStart = useRef(null);
	const btnStop = useRef(null);

	return (
		<nav className='controls'>
			<FontAwesomeIcon
				icon={faPlay}
				ref={btnStart}
				onClick={() => {
					btnStart.current.classList.add('on');
					btnStop.current.classList.remove('on');
					swiper.autoplay.start();
				}}
			/>
			<FontAwesomeIcon
				icon={faPause}
				ref={btnStop}
				onClick={() => {
					btnStop.current.classList.add('on');
					btnStart.current.classList.remove('on');
					swiper.autoplay.stop();
				}}
			/>
		</nav>
	);
}

function Vids() {
	// const Vids = useSelector((store) => store.youtube.data);

	const { data: Vids, isSuccess } = useYoutubeQuery();

	return (
		<section id='vids' className='myScroll'>
			<Swiper
				modules={[Autoplay, Pagination, Navigation]}
				loop={true}
				spaceBetween={50}
				slidesPerView={3}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				pagination={{ clickable: true }}
				navigation={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
					768: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
				}}
			>
				<BtnRolling />
				{isSuccess &&
					Vids.map((vid, idx) => {
						if (idx >= 10) return null;
						return (
							<SwiperSlide key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
										<h2 className='title'>
											{vid.snippet.title.length >= 30 ? vid.snippet.title.substr(0, 30) + '...' : vid.snippet.title}
										</h2>
										<p className='desc'>
											{vid.snippet.description.length >= 120
												? vid.snippet.description.substr(0, 120) + '...'
												: vid.snippet.description}
										</p>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
