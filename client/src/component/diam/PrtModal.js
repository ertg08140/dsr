import { Modal } from 'react-bootstrap';

import PrtTable from './PrtTable';

const PrtModal = (props) => {
	const { prts } = props;

	return (
		<Modal
			show={props.showPrt}
			onHide={props.handlePrtModalClose}
			dialogClassName='modal-90w'
			scrollable={true}
			// size='xl'
			//fullscreen
			aria-labelledby='example-custom-modal-styling-title'
		>
			<Modal.Header closeButton>
				<Modal.Title id='example-custom-modal-styling-title'>
					{prts.length > 0 ? prts[0].peerRouteTableName : ''}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PrtTable prts={prts} />
			</Modal.Body>
		</Modal>
	);
};

export default PrtModal;
