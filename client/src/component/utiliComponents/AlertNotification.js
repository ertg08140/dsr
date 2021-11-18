import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertNotification = ({ showNotification, variant, heading, text }) => {
	const [show, setShow] = useState(showNotification);

	if (show) {
		return (
			<Alert variant={variant} onClose={() => setShow(false)} dismissible>
				<Alert.Heading>{heading}</Alert.Heading>
				<p>{text}</p>
			</Alert>
		);
	}
};

export default AlertNotification;
