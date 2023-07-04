import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.vale.trim()) {
			resetForm();
			return alert('제목과 본문을 입력하세요.');
		}
		setPosts([...Posts, { title: input.current.value, content: textarea.current.value }]);
		resetForm();
	};

	//post가 바뀔때마다
	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요.' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요.' ref={textarea}></textarea>
				<br />
				<button type='button'>cancel</button>
				<button type='button' onClick={createPost}>
					write
				</button>
			</div>
		</Layout>
	);
}

export default Community;
