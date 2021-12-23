import { Tab, Tabs, Button } from 'react-bootstrap';

const DsrTab = ({
	dsrName,
	refreshButtonText,
	handleRefresh,
	handleSelectTab
}) => {
	return (
		<Tabs
			id='main-tab'
			activeKey={dsrName}
			onSelect={(dsrName) => handleSelectTab(dsrName)}
			className='mb-3'
		>
			<Tab
				eventKey='ala'
				title='ALA DRA'
				className='mx-5 my-3'
				style={{ color: 'red', fontWitght: 'bold', fontSize: 'large' }}
			>
				ALA DSR
				<Button className='ms-3' variant='outline-info' onClick={handleRefresh}>
					Refresh Diametr Peers List
				</Button>
			</Tab>
			<Tab
				eventKey='nur'
				title='NUR DRA'
				className='mx-5 my-3'
				style={{ color: 'red', fontWitght: 'bold', fontSize: 'large' }}
			>
				NUR DSR
				<Button className='ms-3' variant='outline-info' onClick={handleRefresh}>
					{refreshButtonText}
				</Button>
			</Tab>
		</Tabs>
	);
};

export default DsrTab;
