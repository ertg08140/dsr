import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alarmCheck } from '../../reducer/actions/alarmActions';
import { checkTokenValidity } from '../../reducer/actions/userActions';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import FilterListIcon from '@mui/icons-material/FilterList';

import Error from '../utiliComponents/Error';
import Loader from '../utiliComponents/Spinner';
import AlarmTable from './AlarmTable';
import AlarmNumberSummaryTable from './AlarmNumberSummaryTable';

import AlarmFilterModal from './AlarmFilterModal';

const AlarmHome = () => {
	// set state for date

	const [date, setDate] = useState('');
	const [intervalIdR, setIntervalIdR] = useState(0);
	const [refreshInterval, setrefreshInterval] = useState(30000);
	const [refreshText, setRefreshText] = useState('30');

	const [showAlarmFilter, setShowAlarmFilter] = useState(false);

	const handleAlarmFilterModalClose = () => setShowAlarmFilter(false);
	const showAlarmFilterModal = () => setShowAlarmFilter(true);

	const user = useSelector((state) => state.userReducer);
	const { alarms, errorMessage, loading } = useSelector(
		(state) => state.alarmCheckReducer
	);
	const { userAlarmFilter } = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(alarmCheck());
			setDate(Date.now());
			if (refreshText !== '0') {
				const intervalId = setInterval(() => {
					dispatch(checkTokenValidity());
					dispatch(alarmCheck());
					setDate(Date.now());
				}, refreshInterval);
				setIntervalIdR(intervalId);
				return () => clearInterval(intervalId);
			}
		} else {
			return <Redirect to='/login' />;
		}
	}, [dispatch, refreshInterval, userAlarmFilter, refreshText, user.token]);

	// const nodes = node.nodes;

	const intervalHandle = (e) => {
		setrefreshInterval(parseInt(e.target.innerText) * 1000);
		setRefreshText(e.target.innerText);
	};

	const intervalHandle0 = (e) => {
		clearInterval(intervalIdR);
		setRefreshText(e.target.innerText);
	};

	let time = new Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		fractionalSecondDigits: 3
	}).format(date);

	return (
		<>
			{errorMessage && <Error errorMessage={errorMessage} variant='danger' />}
			<p className='px-3'>
				Time of Alarm List refresh: {time}. Refresh interval equals{' '}
				{refreshText} seconds
			</p>
			<p className='px-3'>Choose alarm refresh interval in seconds:</p>
			<div className='alarm-buttons'>
				<ButtonGroup className='pb-3 px-3' aria-label='Refresh Interval'>
					<ToggleButton
						variant={refreshText === '0' ? 'info' : 'outline-info'}
						onClick={intervalHandle0}
						value='0'
					>
						0
					</ToggleButton>

					<ToggleButton
						variant={refreshText === '20' ? 'info' : 'outline-info'}
						onClick={intervalHandle}
						value='20'
					>
						20
					</ToggleButton>
					<ToggleButton
						variant={refreshText === '30' ? 'info' : 'outline-info'}
						onClick={intervalHandle}
						value='30'
					>
						30
					</ToggleButton>
					<ToggleButton
						variant={refreshText === '60' ? 'info' : 'outline-info'}
						onClick={intervalHandle}
						value='60'
					>
						60
					</ToggleButton>

					<ToggleButton
						variant={refreshText === '120' ? 'info' : 'outline-info'}
						onClick={intervalHandle}
						value='120'
					>
						120
					</ToggleButton>
				</ButtonGroup>
				<AlarmNumberSummaryTable alarms={alarms} />
				<Button
					className='me-5'
					variant='primary'
					onClick={showAlarmFilterModal}
				>
					Open Alarm Filter <FilterListIcon className='ml-3' />
				</Button>
			</div>

			{loading && <Loader />}
			<AlarmFilterModal
				handleAlarmFilterModalClose={handleAlarmFilterModalClose}
				showAlarmFilterModal={showAlarmFilterModal}
				showAlarmFilter={showAlarmFilter}
			/>

			<AlarmTable alarms={alarms} />
		</>
	);
};

export default AlarmHome;
