import Layout from '../common/Layout';
import { useSelector } from 'react-redux';
import { setMembers } from '../../redux/action';

function Department() {
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<Layout name={'Department'} txt={'Hello-World'}>
			<button
				onClick={() => {
					// 리액트에선 불변성' 특징떄문에 데이터 변경하려면 원본 유지 후 deep copy하여 작업해야함.
					const newMembers = [...Members];
					newMembers[0].name = 'Emma';
					const newAction = setMembers(newMembers);
					console.log(newAction);
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
