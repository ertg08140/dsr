import { useEffect } from 'react';
import HelpTable from './HelpTable';
import HelpAddForm from './HelpAddForm';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../utiliComponents/Spinner';
import Error from '../utiliComponents/Error';

import { helpGet } from '../../reducer/actions/helpActions';

const HelpScreen = () => {
	const dispatch = useDispatch();
	const { helpList, loading, errorMessage } = useSelector(
		(state) => state.helpReducer
	);
	const { userRole } = useSelector((state) => state.userReducer);

	useEffect(() => {
		dispatch(helpGet());
	}, [dispatch]);
	return (
		<>
			{' '}
			{errorMessage && <Error errorMessage={errorMessage} variant='danger' />}
			{loading && <Loader />}
			{userRole === 'admin' ? <HelpAddForm /> : ''}
			<HelpTable helpList={helpList} userRole={userRole} helpGet={helpGet} />
		</>
	);
};

export default HelpScreen;
