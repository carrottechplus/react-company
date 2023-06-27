function Layout({ name, children }) {
	return (
		<section className={`content ${name}`}>
			<figure></figure>

			<div className='inner'>
				<h1>{name}</h1>
				{children}
			</div>
		</section>
	);
}

export default Layout;
