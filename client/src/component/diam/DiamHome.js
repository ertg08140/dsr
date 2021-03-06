import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { nodeCheck } from '../../reducer/actions/checkActions';
import { checkTokenValidity } from '../../reducer/actions/userActions';

import Error from '../utiliComponents/Error';
import Loader from '../utiliComponents/Spinner';
import DiamTable from './DiamTable';

import DsrTab from '../utiliComponents/DsrTab';

const DiamHome = () => {
	const user = useSelector((state) => state.userReducer);
	const node = useSelector((state) => state.nodeCheckReducer);

	const [dsrName, setDsrName] = useState('ala');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(nodeCheck(dsrName));
		} else {
			return <Redirect to='/login' />;
		}
	}, [dispatch, user.token, dsrName]);

	const nodes = node.nodes;

	const handleRefresh = () => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(nodeCheck(dsrName));
		} else {
			return <Redirect to='/login' />;
		}
	};

	const handleSelectTab = (dsrName) => {
		setDsrName(dsrName);
		dispatch(nodeCheck(dsrName));
	};

	return (
		<>
			{node.errorMessage && (
				<Error errorMessage={node.errorMessage} variant='danger' />
			)}
			{node.loading && <Loader />}

			<DsrTab
				dsrName={dsrName}
				refreshButtonText={'Refresh Diameter Peers List'}
				handleRefresh={handleRefresh}
				handleSelectTab={handleSelectTab}
			/>
			<DiamTable nodes={nodes} dsrName={dsrName} />
		</>
	);
};

export default DiamHome;
