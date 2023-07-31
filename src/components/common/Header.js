import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import { memo } from 'react';
import { useGlobalData } from '../../hooks/useGlobalContext';

function Header({ type }) {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	// console.log(data); //전역스테이트값 잘 있는지 확인해보자

	const active = 'on';
	return (
		<>
			<header className={type}>
				<h1>
					<Link to='/'>DCODELAB</Link>
				</h1>
				<ul id='gnb'>
					<li>
						<NavLink to='/department' activeClassName={active}>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeClassName={active}>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName={active}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName={active}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={active}>
							Contact
						</NavLink>
					</li>
					<li>
						<NavLink to='/member' activeClassName={active}>
							Member
						</NavLink>
					</li>
				</ul>
				<button type='button' className='menuOpen' onClick={() => setMenuOpen(!MenuOpen)}>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</header>
		</>
	);
}

export default memo(Header);
