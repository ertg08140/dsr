import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import React from 'react';

import { Container } from 'react-bootstrap';

const AlarmTable = ({ alarms }) => {
	const columns = [
		{
			dataField: 'severity',
			text: 'SEVERITY',
			headerStyle: { color: 'white' },
			sort: true,
			style: function callback(cell) {
				const cellColor = {};
				if (cell === 'Critical') {
					cellColor.backgroundColor = 'red';
				}
				if (cell === 'Major') {
					cellColor.backgroundColor = 'gold';
				}

				if (cell === 'Clear') {
					cellColor.backgroundColor = '#87CEFA';
				}
				return cellColor;
			}
		},
		{
			dataField: 'time',
			text: 'TIME',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'server',
			text: 'SERVER',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'type',
			text: 'TYPE',
			headerStyle: { color: 'white' },
			sort: true
		},

		{
			dataField: 'name',
			text: 'NAME',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'description',
			text: 'DESCRIPTION',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'instance',
			text: 'INSTANCE',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'eventNumber',
			text: 'Event',
			headerStyle: { color: 'white' },
			sort: true
		}
	];

	const { SearchBar } = Search;

	return (
		<>
			<ToolkitProvider keyField='id' data={alarms} columns={columns} search>
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
								// selectRow={selectRow}
								// rowStyle={rowStyle}
								// sort={{
								// 	dataField: 'severity',
								// 	order: 'asc',
								// 	dataField: 'time',
								// 	order: 'desc'
								// }}
							/>
						</>
					);
				}}
			</ToolkitProvider>
			{/* {showPrt && (
				<PrtModal
					showPrt={showPrt}
					handlePrtModalClose={handlePrtModalClose}
					prts={prtsTable}
				/>
			)} */}
		</>
	);
};

export default AlarmTable;
