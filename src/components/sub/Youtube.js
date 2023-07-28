import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';

function Youtube() {
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);
	const { data: Vids, isSuccess } = useYoutubeQuery();

	return (
		<>
			<Layout name={'Youtube'} bg={'Youtube.jpg'}>
				{isSuccess &&
					Vids.map((vid, idx) => {
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

										setIndex(idx);
									}}
								>
									<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
								</div>
							</article>
						);
					})}
			</Layout>
			<Modal ref={modal}>
				<iframe
					title={isSuccess && Vids[Index]?.id}
					src={`https://www.youtube.com/embed/${isSuccess && Vids[Index]?.snippet.resourceId.videoId}`}
				></iframe>
				유튜브 컨텐츠
			</Modal>
		</>
	);
}
export default Youtube;
