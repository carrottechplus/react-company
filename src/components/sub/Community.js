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
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		if (!window.confirm('해당 게시물을 삭제하겠습니까 ?')) return;
		setPosts(Posts.filter((_, idx) => idx !== delIndex));
	};

	const enableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = true;
				return post;
			})
		);
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
				<nav className='btnSet'>
					<button type='button' onClick={resetForm}>
						cancel
					</button>
					<button type='button' onClick={createPost}>
						write
					</button>
				</nav>
			</div>
			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{/* 분기처리 */}
							{post.enableUpdate ? (
								// 수정모드
								<>
									<p> 수정 모드 </p>
								</>
							) : (
								// 출력모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>
									<nav className='btnSet'>
										<button type='button' onClick={() => enableUpdate(idx)}>
											Edit
										</button>
										<button type='button' onClick={() => deletePost(idx)}>
											Delete
										</button>
									</nav>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
/* 수정 모드 작업 흐름
1- 수정 버튼 클릭시 해당 순번의 Posts의 객체에 수정관련 property 추가
2- map으로 반복처리시 수정관련 property의 유무에 따라 수정모드, 출력모드 구분해서 분기처리 후 렌더링
3- 출력모드: h2, p로 출력 / 수정모드: input, textarea로 값을 담아서 출력 (수정취소, 수정 버튼 추가)
4- 수정모드에서 수정버튼 클릭시 State값 변경하고 해당 포스트의 수정관련 property 수정 */
