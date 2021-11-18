import { Modal } from 'react-bootstrap';

import AlarmFilterTable from './AlarmFilterTable';

const AlarmFilterModal = (props) => {
	return (
		<Modal
			show={props.showAlarmFilter}
			onHide={props.handleAlarmFilterModalClose}
			dialogClassName='modal-90w'
			scrollable={true}
			// size='xl'
			//fullscreen
			aria-labelledby='example-custom-modal-styling-title'
		>
			<Modal.Header closeButton>
				<Modal.Title id='example-custom-modal-styling-title'>
					{/* {prts.length > 0 ? prts[0].peerRouteTableName : ''} */}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* <PrtTable prts={prts} /> */}
				<AlarmFilterTable close={props.handleAlarmFilterModalClose} />
			</Modal.Body>
		</Modal>
	);
};

export default AlarmFilterModal;
