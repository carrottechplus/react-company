// reducer로 전달되는 action객체 생성 함수

export const setMembers = (data) => {
	return {
		type: 'SET_MEMBERS',
		payload: data,
	};
};

export const setYoutube = (data) => {
	return {
		type: 'SET_YOUTUBE',
		payload: data,
	};
};
