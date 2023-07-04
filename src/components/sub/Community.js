import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);
	const [Allowed, setAllowed] = useState(true);

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
		// 수정모드 진입 함수 호출 시 allowed가 true 일때만 로직이 실행되도록 처리
		if (!Allowed) return;
		// 일단 로직이 실행되면 allowed false로 바꿔서 수정모드 재진입되는것 방지
		setAllowed(false);
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = false;
				return post;
			})
		);

		// 글 수정 취소버튼을 눌러서 disableUpdate함수가 호출이 되야지만 Allowed값을 다시 true로 바꿔서 글 수정 가능하게 처리
		setAllowed(true);
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
									<div className='txt'>
										{/* 
										onChange 이벤트로 제어하지 않는 input 요소의 value값은 defaultValue 속성으로 지정.
										value - 리액트의 상태값에 관리되는 폼 요소,
										defalutValue - 일반 돔에 의해 관리되는 폼 요소
										 */}
										<input type='text' defaultValue={post.title} />
										<textarea defaultValue={post.content}></textarea>
									</div>
									<nav className='btnSet'>
										<button type='button' onClick={() => disableUpdate(idx)}>
											Cancel
										</button>
										<button type='button'>Update</button>
									</nav>
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
