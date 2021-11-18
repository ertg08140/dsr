import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Tab, Tabs, Button } from 'react-bootstrap';

import { nodeCheck } from '../../reducer/actions/checkActions';
import { checkTokenValidity } from '../../reducer/actions/userActions';

const MainTab = () => {
	const [key, setKey] = useState('ala');
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer);

	const handleSelectTab = (eventKey) => {
		setKey(eventKey);
		dispatch(nodeCheck(eventKey));
	};
	const handleRefresh = () => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(nodeCheck(key));
		} else {
			return <Redirect to='/login' />;
		}
	};

	return (
		<Tabs
			id='main-tab'
			activeKey={key}
			onSelect={(eventKey) => handleSelectTab(eventKey)}
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
					Refresh Diametr Peers List
				</Button>
			</Tab>
		</Tabs>
	);
};

export default MainTab;
