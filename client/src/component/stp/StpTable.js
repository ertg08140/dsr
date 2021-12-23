import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import React from 'react';

import { Container } from 'react-bootstrap';

const StpTable = ({ stpNodes }) => {
	const columns = [
		{
			dataField: 'number',
			text: '#',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header'
		},
		{
			dataField: 'name',
			text: 'NAME',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header'
		},
		{
			dataField: 'pointCode',
			text: 'SPC',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header'
		},
		{
			dataField: 'operationalStatus',
			text: 'STATUS',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header'
		},
		{
			dataField: 'route 1',
			text: 'ROUTE 1 (cost - LS - state)',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header',
			formatter: (cell, row) => {
				return (
					row.links0 &&
					row.links0[0] &&
					`${row.links0[0].routeCost} - ${row.links0[0].linksetName} - ${row.links0[0].routeStatus} `
				);
			}
		},
		{
			dataField: 'route 1 links',
			text: 'ROUTE 1 LINKS (Name - State - Admin State)',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header',
			formatter: (cell, row) => {
				const allLinks = row.links0.map((link) => {
					return ` ${link.name} ${link.operationalStatus} ${link.linkAdminState}      -      `;
				});
				return allLinks;
			}
		},
		{
			dataField: 'routes 2',
			text: 'ROUTE 2 (cost - LS - state)',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header',
			formatter: (cell, row) => {
				return (
					row.routes &&
					row.routes[1] &&
					`${row.routes[1].routeCost} - ${row.routes[1].linksetName} - ${row.routes[1].routeStatus} `
				);
			}
		},
		{
			dataField: 'route 2 links',
			text: 'ROUTE 2 LINKS (Name - State - Admin State)',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header',
			formatter: (cell, row) => {
				if (row.links1) {
					const allLinks = row.links1.map((link) => {
						return `${link.name} ${link.operationalStatus} ${link.linkAdminState}     -      `;
					});

					return allLinks;
				}
			}
		},
		{
			dataField: 'timeOfLastUpdate',
			text: 'SPC Last Status Change',
			headerStyle: { color: 'white' },
			sort: true,
			headerClasses: 'table-header',
			formatter: (cell, row) => {
				let time = new Intl.DateTimeFormat('ru-RU', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				});
				return time.format(new Date(row.timeOfLastUpdate));
			}
		}
	];

	const { SearchBar } = Search;

	const rowStyle = (row, rowIndex) => {
		const style = { backgroundColor: '#bef7f2' };

		if (
			(row.routes && row.routes[0].routeStatus === 'Unavailable') ||
			(row.routes &&
				row.routes[1] &&
				row.routes[1].routeStatus === 'Unavailable')
		) {
			style.backgroundColor = '#f7efbe';
		}

		if (row.operationalStatus === 'Unavailable') {
			style.backgroundColor = '#f7c3be';
		}

		// if (
		// 	row.connection[0].connectionOperationalReason === '0x0000000000000001' &&
		// 	row.connection[1] &&
		// 	row.connection[1].connectionOperationalReason === '0x0000000000000001'
		// ) {
		// 	style.backgroundColor = 'white';
		// }

		return style;
	};

	return (
		<>
			<ToolkitProvider keyField='id' data={stpNodes} columns={columns} search>
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
		</>
	);
};

export default StpTable;
