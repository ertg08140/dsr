import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { stpNodesCheck } from '../../reducer/actions/stpActions';
import { checkTokenValidity } from '../../reducer/actions/userActions';

import Error from '../utiliComponents/Error';
import Loader from '../utiliComponents/Spinner';
import StpTable from './StpTable';
import DsrTab from '../utiliComponents/DsrTab';

const StpHome = () => {
	const [dsrName, setDsrName] = useState('ala');
	const user = useSelector((state) => state.userReducer);
	const { stpNodes, loading, errorMessage } = useSelector(
		(state) => state.stpNodesReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(stpNodesCheck());
		} else {
			return <Redirect to='/login' />;
		}
	}, [dispatch, user.token]);

	const handleRefresh = () => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(stpNodesCheck(dsrName));
		} else {
			return <Redirect to='/login' />;
		}
	};

	const handleSelectTab = (dsrName) => {
		setDsrName(dsrName);
		dispatch(stpNodesCheck(dsrName));
	};

	return (
		<>
			{errorMessage && <Error errorMessage={errorMessage} variant='danger' />}
			{loading && <Loader />}
			<DsrTab
				dsrName={dsrName}
				refreshButtonText={'Refresh STP Peers List'}
				handleRefresh={handleRefresh}
				handleSelectTab={handleSelectTab}
			/>
			<StpTable stpNodes={stpNodes} />
		</>
	);
};

export default StpHome;
