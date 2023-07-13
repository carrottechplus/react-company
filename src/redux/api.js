// 외부 비동기 데이터 호출 함수를 외부 파일로 따로 관리
// 모든 axios 호출하는 구문을 여기서

import axios from 'axios';

// 기존 youtube.js에 작업했던 것 가져와서 순수 함수(Pure function)형태로 가공
export const fetchYoutube = async () => {
	const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
	const list = 'PLQZTVbf9_qAn_Nwrz2maZG64AaEBcFZfb';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	// const result = await axios.get(url);
	// setVids(result.data.items);

	return await axios.get(url);
};
