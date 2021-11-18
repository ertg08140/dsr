import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { nodeCheck } from '../../reducer/actions/checkActions';
import { checkTokenValidity } from '../../reducer/actions/userActions';

import { Container } from 'react-bootstrap';

import { prtCheck } from '../../reducer/actions/checkActions';

import PrtModal from './PrtModal';

const DiamTable = ({ nodes }) => {
	const [showPrt, setShowPrt] = useState(false);
	const [prtsTable, setPrtsTable] = useState([]);
	const dispatch = useDispatch();

	const { prts } = useSelector((state) => state.prtCheckReducer);
	const user = useSelector((state) => state.userReducer);

	useEffect(() => {
		setPrtsTable(prts);
	}, [prts]);

	useEffect(() => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(nodeCheck());
		} else {
			return <Redirect to='/login' />;
		}
	}, [dispatch, user, prts]);

	const handlePrtClick = (e, cell) => {
		e.preventDefault();
		dispatch(prtCheck(cell));
		setShowPrt(true);
	};

	const handlePrtModalClose = () => {
		setShowPrt(false);
		setPrtsTable([]);
	};

	const checkConnectionStatus = (connectionStatus) => {
		if (connectionStatus === '0x0000000000000400') {
			return 'Enabled';
		}

		if (connectionStatus === '0x0000000000000001') {
			return 'Disabled';
		}
		if (connectionStatus === '0x0000000000000004') {
			return 'Down Listening';
		}
		if (connectionStatus === '0x0000000000000002') {
			return 'Down Connecting';
		}

		return connectionStatus;
	};

	const columns = [
		{
			dataField: 'number',
			text: '#',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'peerNodeName',
			text: 'Node',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'fqdn',
			text: 'FQDN',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'realm',
			text: 'REALM',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'peerOperationalStatus',
			text: 'STATUS',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'ip[0]',
			text: 'IP1',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'ip[1]',
			text: 'IP2',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'tcpPort',
			text: 'Port',
			headerStyle: { color: 'white' },
			sort: true,
			formatter: (cell, row) => {
				return row.tcpPort ? `TCP ${row.tcpPort}` : `SCTP ${row.sctpPort}`;
			}
		},

		{
			dataField: 'connection[0].connectionOperationalReason',
			text: 'Connection 1',
			headerStyle: { color: 'white' },
			sort: true,
			formatter: (cell, row) => {
				return `${
					row.connection[0].connectionOperationalStatus
				} ${checkConnectionStatus(
					row.connection[0].connectionOperationalReason
				)}`;
			}
		},

		{
			dataField: 'connection[1].connectionOperationalReason',
			text: 'Connection 2',
			headerStyle: { color: 'white' },
			sort: true,
			formatter: (cell, row) => {
				if (row.connection[1]) {
					return `${
						row.connection[1].connectionOperationalStatus
					} ${checkConnectionStatus(
						row.connection[1].connectionOperationalReason
					)}`;
				}
			}
		},
		{
			dataField: 'peerRouteTableName',
			text: 'PRT',
			headerStyle: { color: 'white' },
			sort: true,
			formatter: (cell, row) => (
				<a href={cell} onClick={(e) => handlePrtClick(e, cell)}>
					{' '}
					{cell}{' '}
				</a>
			)
		},
		{
			dataField: 'peerTimeOfLastUpdate',
			text: 'Peer Last Status Change',
			headerStyle: { color: 'white' },
			sort: true,
			formatter: (cell, row) => {
				let time = new Intl.DateTimeFormat('ru-RU', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					fractionalSecondDigits: 3
				});
				return time.format(new Date(row.peerTimeOfLastUpdate));
			}
		}
	];

	const { SearchBar } = Search;

	const rowStyle = (row, rowIndex) => {
		const style = { backgroundColor: '#bef7f2' };

		if (
			row.connection[0].connectionOperationalStatus === 'Unavailable' ||
			(row.connection[1] &&
				row.connection[1].connectionOperationalStatus === 'Unavailable')
		) {
			style.backgroundColor = '#f7efbe';
		}

		if (row.peerOperationalStatus === 'Unavailable') {
			style.backgroundColor = '#f7c3be';
		}

		if (
			row.connection[0].connectionOperationalReason === '0x0000000000000001' &&
			row.connection[1] &&
			row.connection[1].connectionOperationalReason === '0x0000000000000001'
		) {
			style.backgroundColor = 'white';
		}

		return style;
	};

	return (
		<>
			<ToolkitProvider keyField='id' data={nodes} columns={columns} search>
				{(props) => {
					return (
						<>
							<Container>
								<SearchBar {...props.searchProps} />

								<hr />
							</Container>

							<BootstrapTable
								{...props.baseProps}
								striped
								hover
								condensed
								headerWrapperClasses='bg-primary'
								rowStyle={rowStyle}
							/>
						</>
					);
				}}
			</ToolkitProvider>
			{showPrt && (
				<PrtModal
					showPrt={showPrt}
					handlePrtModalClose={handlePrtModalClose}
					prts={prtsTable}
				/>
			)}
		</>
	);
};

export default DiamTable;
