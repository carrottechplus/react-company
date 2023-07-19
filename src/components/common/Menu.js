import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/menuSlice';
import { useEffect } from 'react';

/*
	--Redux-tookit으로 client State전역 관리하는 작업 순서--
	{open: false} false면 메뉴제거 / true면 메뉴오픈 
	menuSlice.js를 만들어서 위의 정보값을 초기 전역 state로 등록
	reducer에는 해당 전역 state값을 변경해주는 함수를 등록 (close, toggle)
	해당 함수를 원하는 컴포넌트에서 자유롭게 호출해서 전역 state변경하도록 
*/

function Menu() {
	const active = { color: 'aqua' };
	const dispatch = useDispatch();
	const menu = useSelector((store) => store.menu.open);

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth > 1200) dispatch(close());
		});
	}, [dispatch]);

	return (
		<AnimatePresence>
			{/* 항상 헤더 안쪽에 마운트 되어 있으며 open t/f에 따라 보여지고 안보여지는 상태. */}
			{menu && (
				<motion.nav
					id='mobilePanel'
					initial={{ x: -280 }}
					animate={{ x: 0, transition: { duration: 0.3 } }}
					exit={{ opacity: 0, x: -280, transition: { duration: 0.3 } }}
					onClick={() => dispatch(close())}
					//닫기버튼 클릭시 전역state를 변경하는 close함수를 호출해서 그 결과값인 action객체를 dispatch로 전달
				>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>
					<ul id='gnbMo'>
						<li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink to='/member' activeStyle={active}>
								Member
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
