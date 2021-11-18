import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
	alarmCheck,
	addAlarmToFilter
} from '../../reducer/actions/alarmActions';

import {
	userGetProfile,
	userUpdateProfile
} from '../../reducer/actions/userActions';

const AlarmFilterTable = (props) => {
	const dispatch = useDispatch();
	const alarmFilterList = useSelector(
		(state) => state.userReducer.userAlarmFilter
	);

	const userName = useSelector((state) => state.userReducer.username);

	useEffect(() => {
		dispatch(userGetProfile(userName));
	}, [dispatch, userName]);

	const [severity, setSeverity] = useState('');
	const [type, setType] = useState('');
	const [alarmName, setAlarmName] = useState('');
	const [alarmId, setAlarmId] = useState('');

	const handleAlarmOnOff = (alarm) => {
		const updatedAlarmFilterArray = alarmFilterList.filter((item) => {
			return item.alarmId !== alarm.alarmId ? item : null;
		});

		updatedAlarmFilterArray.push({ ...alarm, alarmOn: !alarm.alarmOn });

		dispatch(userUpdateProfile(userName, updatedAlarmFilterArray));
	};

	const handleApplyClick = () => {
		dispatch(alarmCheck());
		props.close();
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(addAlarmToFilter(severity, type, alarmName, alarmId));
		dispatch(userGetProfile(userName));
	};
	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th className='table-dark'>Severity</th>
						<th className='table-dark'>Type</th>
						<th className='table-dark'>Alarm name</th>
						<th className='table-dark'>Alarm Id</th>
						<th className='table-dark'>Alarm On/Off</th>
					</tr>
				</thead>
				<tbody>
					{alarmFilterList &&
						alarmFilterList.map((alarm) => (
							<tr key={alarm._id}>
								<td>{alarm.severity}</td>
								<td>{alarm.type}</td>
								<td>{alarm.alarmName}</td>
								<td>{alarm.alarmId}</td>
								<td>
									<Form.Switch
										id='alarmOnOff-switch'
										checked={alarm.alarmOn}
										onChange={() => handleAlarmOnOff(alarm)}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
			<Button variant='primary' className='mb-3' onClick={handleApplyClick}>
				Apply
			</Button>

			{userName !== 'kklimov' ? (
				''
			) : (
				<Form onSubmit={submitHandler}>
					<Row>
						<Col>
							<Form.Group className='mb-3' controlId='formBasicEmail'>
								<Form.Label>Alarm Severity</Form.Label>
								<Form.Control
									as='select'
									aria-label='Select alarm severity'
									onChange={(e) => setSeverity(e.target.value)}
								>
									<option>Severity</option>
									<option value='Critical'>Critical</option>
									<option value='Major'>Major</option>
									<option value='Minor'>Minor</option>
								</Form.Control>
								<Form.Text className='text-muted'>
									Choose alarm severity
								</Form.Text>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group className='mb-3' controlId='formBasicPassword'>
								<Form.Label>Alarm Type</Form.Label>
								<Form.Control
									as='select'
									aria-label='Default select example'
									onChange={(e) => setType(e.target.value)}
								>
									<option>Chose alarm type</option>
									<option value='vSTP'>vSTP</option>
									<option value='DIAM'>DIAM</option>
									<option value='COLL'>COLL</option>
									<option value='REPL'>REPL</option>
									<option value='HA'>HA</option>
									<option value='CAF'>CAF</option>
									<option value='DCA'>DCA</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col>
							<Form.Group className='mb-3' controlId='formBasicPassword'>
								<Form.Label>Alarm Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Alarm Name'
									onChange={(e) => setAlarmName(e.target.value)}
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group className='mb-3' controlId='formBasicEmail'>
								<Form.Label>Alarm Id</Form.Label>
								<Form.Control
									type='text'
									placeholder='Alarm Id'
									onChange={(e) => setAlarmId(e.target.value)}
								/>
								<Form.Text className='text-muted'>
									Enter correct alarm Id from documentation
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			)}
		</>
	);
};

export default AlarmFilterTable;
