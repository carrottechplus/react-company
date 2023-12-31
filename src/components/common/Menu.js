import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const active = { color: 'aqua' };
	const [Open, setOpen] = useState(false);

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) {
				setOpen(false);
			}
		});
	}, []);

	useImperativeHandle(ref, () => {
		return {
			toggle: () => setOpen(!Open),
		};
	});
	return (
		<AnimatePresence>
			{/* 항상 헤더 안쪽에 마운트 되어 있으며 open t/f에 따라 보여지고 안보여지는 상태. */}
			{Open && (
				<motion.nav
					id='mobilePanel'
					initial={{ x: -280 }}
					animate={{ x: 0, transition: { duration: 0.3 } }}
					exit={{ opacity: 0, x: -280, transition: { duration: 0.3 } }}
					onClick={() => setOpen(false)}
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
});

export default Menu;
