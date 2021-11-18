import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Container } from 'react-bootstrap';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch } from 'react-redux';

import { helpDelete, helpUpdate } from '../../reducer/actions/helpActions';

const HelpTable = ({ helpList, userRole, helpGet }) => {
	const dispatch = useDispatch();

	const editButtonHandler = (row) => {
		dispatch(helpUpdate(row));
	};

	const deleteButtonHandler = (e, row) => {
		e.preventDefault();
		if (window.confirm('Do you want to delete this item?')) {
			dispatch(helpDelete(row));
		}
	};

	const columns = [
		{
			dataField: 'instance',
			text: 'Instance',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'description',
			text: 'Description',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'unit',
			text: 'Responsible Unit',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'unitPhone',
			text: 'Phone',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'unitEmail',
			text: 'E-mail',
			headerStyle: { color: 'white' },
			sort: true
		},
		{
			dataField: 'actions',
			text: 'Delete Item',
			headerStyle: { color: 'white' },
			isDummyField: true,
			csvExport: false,
			formatter: (cell, row) =>
				userRole === 'admin' ? (
					<DeleteOutlineOutlinedIcon
						onClick={(e) => deleteButtonHandler(e, row)}
						style={{ marginLeft: '15px', color: 'red', cursor: 'pointer' }}
					/>
				) : (
					<DeleteOutlineOutlinedIcon
						style={{ marginLeft: '15px', color: 'grey' }}
					/>
				)
		}
	];

	const { SearchBar } = Search;

	function beforeSaveCell(oldValue, newValue, row, column, done) {
		if (userRole === 'admin') {
			setTimeout(() => {
				if (window.confirm('Do you want to accept this change?')) {
					editButtonHandler(row);
					done(true);
				} else {
					done(false);
				}
			}, 0);
			return { async: false };
		}
	}

	return (
		<>
			<ToolkitProvider keyField='_id' data={helpList} columns={columns} search>
				{(props) => {
					return (
						<>
							<Container>
								<SearchBar {...props.searchProps} />

								<hr />
							</Container>
							<p>
								{' '}
								{userRole === 'admin' ? '*Double click to edit item' : ''}{' '}
							</p>
							<BootstrapTable
								{...props.baseProps}
								striped
								hover
								condensed
								headerWrapperClasses='bg-primary'
								cellEdit={cellEditFactory({
									mode: userRole === 'admin' ? 'dbclick' : 'disable',
									blurToSave: true,
									beforeSaveCell
								})}

								// selectRow={selectRow}
								//rowStyle={rowStyle}
							/>
						</>
					);
				}}
			</ToolkitProvider>
		</>
	);
};

export default HelpTable;
