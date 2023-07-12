import { useSelector } from 'react-redux';

function Footer() {
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<footer>
			<h1>DCODELAB</h1>
			<p>{`This Institute was established by ${Members[0]?.name} in 1995`}</p>
			<p>2023 DECODELAB &copy; ALL RIGHTS RESERVED.</p>
		</footer>
	);
}

export default Footer;
