import { forwardRef, useState, useImperativeHandle } from 'react';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			toggle: () => setOpen(!Open),
		};
	});
	return <>{Open && <nav>Menu</nav>}</>;
});

export default Menu;
