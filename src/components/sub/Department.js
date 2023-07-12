import Layout from '../common/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { setMembers } from '../../redux/action';

function Department() {
	const Members = useSelector((store) => store.memberReducer.members);
	const dispatch = useDispatch();

	return (
		<Layout name={'Department'} txt={'Hello-World'}>
			<button
				onClick={() => {
					// 리액트에선 불변성' 특징떄문에 데이터 변경하려면 원본 유지 후 deep copy하여 작업해야함.
					// 버튼 클릭 시 기존 State값을 Deep copy
					const newMembers = [...Members];
					// Deep copy된 참조형 자료 State정보값을 변경
					newMembers[0].name = 'Emma';
					// action 생성함수의 인수로 넣어 새로운 action 객체 생성
					const newAction = setMembers(newMembers);
					// 그렇게 만들어진 action 객체를 dispatch를 통해 reducer에 전달 (dispatch 안하면 화면에 바뀌진않음)
					dispatch(newAction);
				}}
			>
				멤버 데이터 변경
			</button>
			{Members.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
