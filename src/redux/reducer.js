// store의 데이터를 변경해주는 변형자 함수
import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'Julia',
			position: 'President',
			pic: 'member1.jpg',
		},
		{
			name: 'David',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg',
		},
		{
			name: 'Paul',
			position: 'Front-end Engineer',
			pic: 'member4.jpg',
		},
		{
			name: 'Sara',
			position: 'Back-end Engineer',
			pic: 'member5.jpg',
		},
		{
			name: 'Michael',
			position: 'Project Manager',
			pic: 'member6.jpg',
		},
	],
};

const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	// [] youtube 데이터를 모두 가져올 수 없으니 빈 배열값으로 초기세팅, 근데 state에는 무조건 객체형식으로 들어가야하기 떄문에 {}
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers;
