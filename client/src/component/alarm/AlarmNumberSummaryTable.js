import Table from 'react-bootstrap/Table';

const AlarmNumberSummaryTable = ({ alarms }) => {
	const criticalAlarmList = alarms.filter((alarm) => {
		return alarm.severity === 'Critical';
	});

	const majorAlarmList = alarms.filter((alarm) => {
		return alarm.severity === 'Major';
	});

	const minorAlarmList = alarms.filter((alarm) => {
		return alarm.severity === 'Minor';
	});

	return (
		<Table striped bordered hover style={{ width: '30%' }}>
			<thead>
				<tr>
					<th
						className='alarm-number-summary-table'
						style={{
							backgroundColor: 'red'
						}}
					>
						{criticalAlarmList.length}
					</th>
					<th
						className='alarm-number-summary-table'
						style={{ backgroundColor: 'gold' }}
					>
						{majorAlarmList.length}
					</th>
					<th className='alarm-number-summary-table'>
						{' '}
						{minorAlarmList.length}
					</th>
				</tr>
			</thead>
		</Table>
	);
};

export default AlarmNumberSummaryTable;
