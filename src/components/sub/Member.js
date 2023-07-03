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
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	const handleChange = (e) => {
		//현재 입력하고 있는 input 요소의 name,vale값을 비구조할당으로 뽑아서 출력
		const { name, value } = e.target;
		// console.log(name, value);

		// 기존 초기의 Val State 값을 deep copy하여, 현재 입력하고 있는 항목의 name값과 value값으로 기존 State를 덮어쓰기해서 변경(불변성 유지)
		setVal({ ...Val, [name]: value }); //변경함수 호출해서
	};

	const check = (value) => {
		// 인수로 현재 State 값을 전달받아서 항목별로 에러메세지를 객체로 반환하는 함수
		// 반횐되는 에러 메세지가 있으면 인증 실패
		// 에러 메세지가 없으면 인증 성공
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userId.length < 5) {
			errs.userId = '아이디를 5글자 이상 입력하세요.';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일주소는 8글자 이상 @를 포함하세요.';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log('현재 state 값', Val);

		// check가 반환하는 인증 메세지가 있으면 해당 메세지를 화면에 출력하고 전송 중지
		// 그렇지않으면 인증 성공
		console.log(check(Val));
		setErr(check(Val));
		setSubmit(true);
	};

	useEffect(() => {
		// 에러 스테이트 안에 값이 없으면 통과 있으면 실패. 객체의 key값을 반복돌아서 확인

		// 객체의 키 값을 배열로 반환한 다음 해당 배열의 갯수를 저장,
		// len 값이 0 이면 Err 객체에 에러 메세지가 없으니 인증 통과 처리

		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다.');
		}

		console.log(len, 'len');
	}, [Err]);

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
