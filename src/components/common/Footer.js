import { useSelector } from 'react-redux';

function Footer() {
	const memberData = useSelector((store) => store.memberReducer.member);

	console.log(memberData);
	return (
		<footer>
			<h1>DCODELAB</h1>
			<p>2023 DECODELAB &copy; ALL RIGHTS RESERVED.</p>
			<p>{`This Company was founded by ${memberData[0]?.name} in 1995.`}</p>
		</footer>
	);
}

export default Footer;
