import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

/* 
axios 활용하여 data fetch (브라우저가 하는 일)
아예 파싱해서 가져옴

가상돔안쪽에서 사용하려면.. 컴포넌트가 마운트가 되어야지 엑시오스를 호출 할 수 있음.
스테이트에 담아야함..
거의 공식으로 useEffect, useState 같이 다님

data라는 프로퍼티값으로 가지고다님

컴포넌트 마운트시 외부 데이터 fetching후 state에 저장한 뒤, 반복 렌더링 처리
*/

function Department() {
	const [Members, setMembers] = useState([]);
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((data) => {
			// console.log(data.data.members);
			setMembers(data.data.members);
		});
	}, []);
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
