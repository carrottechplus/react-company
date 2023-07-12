import { useSelector } from 'react-redux';

function Footer() {
	const President = useSelector((store) => store.memberReducer.members[0].name);

	return (
		<footer>
			<h1>DCODELAB</h1>
			<p>{`This Institute was established by ${President} in 1995`}</p>
			<p>2023 DECODELAB &copy; ALL RIGHTS RESERVED.</p>
		</footer>
	);
}

export default Footer;
