import Table from 'react-bootstrap/Table';

const PrtTable = ({ prts }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th className='table-dark'>Name</th>
					<th className='table-dark'>Route List</th>
					<th className='table-dark'>PRIO</th>
					<th className='table-dark'>App Id</th>
					<th className='table-dark'>Command Code</th>
					<th className='table-dark'>Dest Host</th>
					<th className='table-dark'>Dest Realm</th>
					<th className='table-dark'>Origin Host</th>
					<th className='table-dark'>Origin Realm</th>
				</tr>
			</thead>
			<tbody>
				{prts.map((prt) => (
					<tr key={prt.id}>
						<td>{prt.name}</td>
						<td>{prt.routeListName}</td>
						<td>{prt.priority}</td>
						<td>
							{prt.conditions.appId.operator} {prt.conditions.appId.value}
						</td>
						<td>
							{prt.conditions.cmdCode.operator} {prt.conditions.cmdCode.value}
						</td>
						<td>
							{prt.conditions.destHost.operator} {prt.conditions.destHost.value}
						</td>
						<td>
							{prt.conditions.destRealm.operator}{' '}
							{prt.conditions.destRealm.value}
						</td>
						<td>
							{prt.conditions.origHost.operator} {prt.conditions.origHost.value}
						</td>
						<td>
							{prt.conditions.origRealm.operator}{' '}
							{prt.conditions.origRealm.value}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default PrtTable;
