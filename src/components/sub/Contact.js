import Layout from '../common/Layout';
import { useEffect, useRef } from 'react';

function Contact() {
	const container = useRef(null);
	const { kakao } = window; // 이 구문이 없으면 윈도우 객체의 카카오맵 api를 못불러옴. 비구조할당으로 직접 뽑아와야함. 윈도우 객체에서 직접 kakao 상위 객체값을 뽑아옴.
	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};
	// const map = new kakao.maps.Map(container, option); //이구문만 있으면 ref부분 아직 알기 전이라 에러나므로 아래 useEffect 써줘야함.

	useEffect(() => {
		// 인스턴스 호출구문은 컴포넌트 처음 마운트시 호출
		new kakao.maps.Map(container.current, option);
	}, []);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Contact;
