import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Member() {
	const initVal = {
		userId: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};

	const [Val, setVal] = useState(initVal);

	const handleChange = (e) => {
		//현재 입력하고 있는 input 요소의 name,vale값을 비구조할당으로 뽑아서 출력
		const { name, value } = e.target;
		// console.log(name, value);

		// 기존 초기의 Val State 값을 deep copy하여, 현재 입력하고 있는 항목의 name값과 value값으로 기존 State를 덮어쓰기해서 변경(불변성 유지)
		setVal({ ...Val, [name]: value }); //변경함수 호출해서
	};

	const check = (value) => {
		//인수로 현재 State 값을 전달받아서 인증 통과시 true, 실패시 false를 반환하는 로직
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('현재 state 값', Val);

		//check가 true 값을 반환하면 인증통과 그렇지 않으면 인증 실패
		console.log(check(Val));
	};

	useEffect(() => {
		console.log(Val);
	}, [Val]);

	return (
		<Layout name={'Member'}>
			<form action='' onSubmit={handleSubmit}>
				<fieldset>
					<legend className='hidden'>회원가입 폼 양식</legend>
					<table>
						<thead>
							<tr>
								<th scope='row'>
									<label htmlFor='userID'>아이디</label>
								</th>
								<td>
									<input
										type='text'
										name='userId'
										id='userId'
										placeholder='아이디를 입력하세요'
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>비밀번호</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>비밀번호 확인</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='email'>이메일</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일 주소를 입력하세요'
										onChange={handleChange}
									/>
								</td>
							</tr>
						</thead>

						{/* form buttons */}
						<tbody>
							<tr>
								<th colSpan='2'>
									<input type='reset' value='Cancel' />
									<input type='submit' value='Send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Member;
