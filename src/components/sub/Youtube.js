import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [Vids, setVids] = useState([]);
	useEffect(() => {
		const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
		const list = 'PLQZTVbf9_qAn_Nwrz2maZG64AaEBcFZfb';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		// useEffect 바깥에 async await으로 빼고, 안에는 호출만 하도록 변경해보기.
		axios.get(`${url}`).then((data) => {
			console.log(data.data.items);
			setVids(data.data.items);
		});
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
							<div className='pic' onClick={() => modal.current.open()}>
								{/* {current: aside.modal} */}
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			<Modal ref={modal} />
		</>
	);
}

// const title = data.snippet.title;
// const desc = data.snippet.description;
// const name = data.snippet.videoOwnerChannelTitle;
// const date = data.snippet.publishedAt;

// const channelId = data.snippet.resourceId.videoId;
// const thumbUrl = data.snippet.thumbnails.standard.url;
export default Youtube;
