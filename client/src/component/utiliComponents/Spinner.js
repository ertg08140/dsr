import { Spinner } from 'react-bootstrap';

const Loader = () => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{
				position: 'fixed',
				width: '100px',
				height: '100px',
				top: '30%',
				left: '50%'
				// margin: 'auto',
				// display: 'block'
				// width: '100%',
				// height: '100%'
			}}
		>
			<span className='visually-hidden'>Loading...</span>
		</Spinner>
	);
};

export default Loader;
