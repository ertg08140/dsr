import { Alert } from 'react-bootstrap';

const Error = ({ errorMessage, variant }) => {
	console.log('error message', errorMessage);
	console.log('error variant', variant);
	return <Alert variant={variant}>{errorMessage}</Alert>;
};

export default Error;
