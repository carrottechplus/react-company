import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const [Video, setVideo] = useState([]);
	useEffect(() => {
		const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
		const list = 'PLQZTVbf9_qAn_Nwrz2maZG64AaEBcFZfb';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		// useEffect 바깥에 async await으로 빼고, 안에는 호출만 하도록 변경해보기.
		axios.get(`${url}`).then((data) => {
			console.log(data.data.items);
			setVideo(data.data.items);
		});
	}, []);
	return (
		<>
			<Layout name={'Youtube'}>
				{Video.map((video, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
							</div>
							<h2>
								{video.snippet.title.length > 50 ? video.snippet.title.substr(0, 50) + '...' : video.snippet.title}
							</h2>
							<div className='txt'>
								<p>
									{video.snippet.description.length > 200
										? video.snippet.description.substr(0, 200) + '...'
										: video.snippet.description}
								</p>
								<span>{video.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal />
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
