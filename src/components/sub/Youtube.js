import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Youtube() {
	const [Video, setVideo] = useState([]);

	useEffect(() => {
		const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
		const list = 'PLQZTVbf9_qAn_Nwrz2maZG64AaEBcFZfb';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		axios.get(`${url}`).then((data) => {
			console.log(data.data.items);
			setVideo(data.data.items);
		});
	}, []);
	return (
		<Layout name={'Youtube'}>
			{Video.map((video, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
						</div>
						<h2>{video.snippet.title}</h2>
						<p>{video.snippet.description}</p>
						<span>{video.snippet.videoOwnerChannelTitle}</span>
						<span>{video.snippet.publishedAt}</span>
					</article>
				);
			})}
		</Layout>
	);
}

// const title = data.snippet.title;
// const desc = data.snippet.description;
// const name = data.snippet.videoOwnerChannelTitle;
// const date = data.snippet.publishedAt;

// const channelId = data.snippet.resourceId.videoId;
// const thumbUrl = data.snippet.thumbnails.standard.url;
export default Youtube;
