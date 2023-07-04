import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { useHistory } from 'react-router-dom';

function Member() {
	const initVal = {
		//실제 입력한 입력값을 담아서 DB에 넘겨지도록해야함
		userId: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		hobby: false,
		edu: '',
		comments: '',
	};

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);
	const history = useHistory();

	const handleChange = (e) => {
		//현재 입력하고 있는 input 요소의 name,vale값을 비구조할당으로 뽑아서 출력
		const { name, value } = e.target;
		// console.log(name, value);

		// 기존 초기의 Val State 값을 deep copy하여, 현재 입력하고 있는 항목의 name값과 value값으로 기존 State를 덮어쓰기해서 변경(불변성 유지)
		setVal({ ...Val, [name]: value }); //변경함수 호출해서
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		setVal({ ...Val, [name]: checked });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');
		// 모든 체크박스를 반복 돌아서 하나라도 체크되어 있으면 반환
		inputs.forEach((el) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	const handleSelect = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
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
		if (!value.gender) {
			errs.gender = '성별을 체크해주세요.';
		}
		if (!value.hobby) {
			errs.hobby = '취미를 1개 이상 체크해주세요.';
		}
		if (value.edu === '') {
			errs.edu = '최종학력을 선택하세요.';
		}
		if (value.comments.length < 10) {
			errs.comments = '내용을 최소 10글자 이상 입력해주세요.';
		}
		return errs;
	};

	useEffect(() => {
		// 에러 스테이트 안에 값이 없으면 통과 있으면 실패. 객체의 key값을 반복돌아서 확인

		// 객체의 키 값을 배열로 반환한 다음 해당 배열의 갯수를 저장,
		// len 값이 0 이면 Err 객체에 에러 메세지가 없으니 인증 통과 처리

		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다.');
			history.push('/');
		}
	}, [Err]);

	return (
		<Layout name={'Member'}>
			<button
				type='button'
				onClick={() => {
					history.goBack();
				}}
			>
				뒤로가기
			</button>
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
										value={Val.userId}
									/>
									<br />
									{Err.userId && <p>{Err.userId}</p>}
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
										value={Val.pwd1}
									/>
									<br />
									{Err.pwd1 && <p>{Err.pwd1}</p>}
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
										value={Val.pwd2}
									/>
									<br />
									{Err.pwd2 && <p>{Err.pwd2}</p>}
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
										value={Val.email}
									/>
									<br />
									{Err.email && <p>{Err.email}</p>}
								</td>
							</tr>
							<tr>
								<th scope='row'>Gender</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input type='radio' name='gender' id='male' onChange={handleRadio} />
									<label htmlFor='female'>Female</label>
									<input type='radio' name='gender' id='female' onChange={handleRadio} />
									<br />
									{Err.gender && <p>{Err.gender}</p>}
								</td>
							</tr>
							<tr>
								<th scope='row'>Interests</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input type='checkbox' name='hobby' id='sports' onChange={handleCheck} />
									<label htmlFor='cleaning'>Cleaning</label>
									<input type='checkbox' name='hobby' id='cleaning' onChange={handleCheck} />
									<label htmlFor='game'>Game</label>
									<input type='checkbox' name='hobby' id='game' onChange={handleCheck} />
									<label htmlFor='cooking'>Cooking</label>
									<input type='checkbox' name='hobby' id='cooking' onChange={handleCheck} />
									<label htmlFor='music'>Music</label>
									<input type='checkbox' name='hobby' id='music' onChange={handleCheck} />
									<br />
									{Err.hobby && <p>{Err.hobby}</p>}
								</td>
							</tr>

							<tr>
								<th scope='row'>
									<label htmlFor='edu'>Edu</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleSelect}>
										<option value=''>최종학력을 선택하세요</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									{Err.edu && <p>{Err.edu}</p>}
								</td>
							</tr>

							<tr>
								<th>
									<label htmlFor='comments'>Leave Message</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='3'
										value={Val.comments}
										onChange={handleChange}
									></textarea>
									<br />
									{Err.comments && <p>{Err.comments}</p>}
								</td>
							</tr>
						</thead>

						{/* form buttons */}
						<tbody>
							<tr>
								<th colSpan='2'>
									<input
										type='reset'
										value='Cancel'
										onClick={() => {
											setVal(initVal);
										}}
									/>
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
