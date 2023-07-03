import Layout from '../common/Layout';

function Member() {
	return (
		<Layout name={'Member'}>
			<form action=''>
				<fieldset>
					<legend className='hidden'>회원가입 폼 양식</legend>
					<table>
						<thead>
							<tr>
								<th scope='row'>
									<label htmlFor='userID'>아이디</label>
								</th>
								<td>
									<input type='text' name='userId' id='userId' placeholder='아이디를 입력하세요' />
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>비밀번호</label>
								</th>
								<td>
									<input type='password' name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요' />
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>비밀번호 확인</label>
								</th>
								<td>
									<input type='password' name='pwd2' id='pwd2' placeholder='비밀번호를 재입력하세요' />
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='userEmail'>이메일</label>
								</th>
								<td>
									<input type='text' name='userEmail' id='userEmail' placeholder='이메일 주소를 입력하세요' />
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
