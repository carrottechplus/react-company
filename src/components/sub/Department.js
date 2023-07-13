import { useSelector } from 'react-redux';
import Layout from '../common/Layout';

function Department() {
	const Members = useSelector((store) => store.memberReducer.member);

	return (
		//txt={['Hello', <br />, 'World!']}

		// prop으로 자식 요소에 줄바꿈된 text를 전달하고 싶을 때, 줄바꿈될 부분에 구분자가 될 문자값을 넣어서 전달
		<Layout name={'Department'} txt={'Hello-World'}>
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
