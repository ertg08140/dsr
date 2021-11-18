import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { nodeCheck } from '../../reducer/actions/checkActions';
import { checkTokenValidity } from '../../reducer/actions/userActions';

import Error from '../utiliComponents/Error';
import Loader from '../utiliComponents/Spinner';
import DiamTable from './DiamTable';
import MainTab from './MainTab';

const DiamHome = () => {
	const user = useSelector((state) => state.userReducer);
	const node = useSelector((state) => state.nodeCheckReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkTokenValidity());
		if (user.token) {
			dispatch(nodeCheck());
		} else {
			return <Redirect to='/login' />;
		}
	}, [dispatch, user]);

	const nodes = node.nodes;

	return (
		<>
			{node.errorMessage && (
				<Error errorMessage={node.errorMessage} variant='danger' />
			)}
			{node.loading && <Loader />}
			<MainTab />
			<DiamTable nodes={nodes} />
		</>
	);
};

export default DiamHome;
