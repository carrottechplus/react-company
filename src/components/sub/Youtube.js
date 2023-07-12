import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setYoutube } from '../../redux/action';

function Youtube() {
	// 1.  Vids라는 지역 State값이 필요 없게 되어 전역으로 바꿔야함.
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);

	// 2. 데이터가 받아지는 시점. 지역State가 아니라 action 객체로 전달해야함.
	const dispatch = useDispatch();

	const fetchYoutube = async () => {
		const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
		const list = 'PLQZTVbf9_qAn_Nwrz2maZG64AaEBcFZfb';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		const result = await axios.get(url);
		dispatch(setYoutube(result.data.items));
	};

	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
					return (
						<article key={idx}>
							<h2>{vid.snippet.title.length > 50 ? vid.snippet.title.substr(0, 50) + '...' : vid.snippet.title}</h2>
							<div className='txt'>
								<p>
									{vid.snippet.description.length > 200
										? vid.snippet.description.substr(0, 200) + '...'
										: vid.snippet.description}
								</p>
								<span>{vid.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
							</div>
							<div
								className='pic'
								onClick={() => {
									modal.current.open();

									// 썸네일 출력 시 현재 클릭한 요소의 순번값으로 index state 값 변경
									setIndex(idx);
								}}
							>
								{/* {current: aside.modal} */}
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			{/* 
			두번 렌더링 
			첫번째는 빈데이터 
			두번째에 youtube data 담기는 형식 
			
			Vids를 빈배열로 출력 후 article~ 반복이므로 오류 안남 
			iframe은 vids 아예 없는 객체에 id값 불러오려고 하니까 오류 
			그러므로 다음 사이클에돌려야 오류가 안남. (다음 렌더링떄) 
			결론, 객체가 없을때는 무시하도록 작업해야함
			
			"첫 렌더링 사이클에서는 Vids[0]의 객체값 자체가 없으므로 없는 요소의 id값 호출시 오류가 남 > 옵셔널 체이닝으로 해결 (물음표)"		

			
			 */}
			<Modal ref={modal}>
				<iframe
					title={Vids[Index]?.id}
					src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}
				></iframe>
				유튜브 컨텐츠
			</Modal>
		</>
	);
}
export default Youtube;
