import { useState, useEffect, memo } from 'react';

function News() {
	const dummy = [
		{ title: 'Hello06', content: 'Here comes description in detail.' },
		{ title: 'Hello05', content: 'Here comes description in detail.' },
		{ title: 'Hello04', content: 'Here comes description in detail.' },
		{ title: 'Hello03', content: 'Here comes description in detail.' },
		{ title: 'Hello02', content: 'Here comes description in detail.' },
		{ title: 'Hello01', content: 'Here comes description in detail.' },
	];
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data); // data 문자값을 json 형태로 파싱
		else return dummy;
	};

	const [Posts] = useState(getLocalData);

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
		//아래 Posts 꼭 쓸필요 없음. 왜냐 위에 내용이 여기서 바뀌는게 아니고 community에서 바뀌기 때문.
	}, [Posts]);

	return (
		<section id='news' className='myScroll'>
			{Posts.map((post, idx) => {
				if (idx >= 4) return null;
				return (
					<article key={idx}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default memo(News);
