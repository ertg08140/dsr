import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { userLogin, checkTokenValidity } from '../reducer/actions/userActions';

import Loader from './utiliComponents/Spinner';
import Error from './utiliComponents/Error';

const LoginForm = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [DSR, setDSR] = useState('AlaDSR');

	const dispatch = useDispatch();

	const user = useSelector((state) => state.userReducer);

	useEffect(() => {
		dispatch(checkTokenValidity(false));
	}, [dispatch, user]);

	if (user.token) {
		return <Redirect to='/' />;
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(userLogin(userName, password, DSR));
	};

	return (
		<Container>
			{user.errorMessage && (
				<Error errorMessage={user.errorMessage} variant='danger' />
			)}
			{user.loading && <Loader />}
			<Row className='justify-content-md-center'>
				<Col xs={12} md={6}>
					{user.loading && <Loader />}
					<Form onSubmit={submitHandler}>
						<Form.Group className='mb-3' controlId='formBasicText'>
							<Form.Label>Username:</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter username'
								className='mb-2'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
							<Form.Text className='text-muted'>
								Please, use DSR credentials
							</Form.Text>
						</Form.Group>

						<Form.Group className='mb-3' controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						<Form.Group as={Row} className='mb-3'>
							<Form.Label as='legend' column sm={4}>
								Choose DSR:
							</Form.Label>
							<Col sm={8}>
								<Form.Check
									type='radio'
									label='ALA DSR'
									name='DSR'
									id='AlaDSR'
									value='AlaDSR'
									checked={DSR === 'AlaDSR'}
									onChange={(e) => setDSR(e.target.value)}
								/>
								<Form.Check
									type='radio'
									label='NUR DSR'
									name='DSR'
									id='NurDSR'
									value='NurDSR'
									checked={DSR === 'NurDSR'}
									onClick={(e) => setDSR(e.target.value)}
								/>
							</Col>
						</Form.Group>
						<div className='d-grid gap-2'>
							<Button variant='primary' type='submit' disabled={user.loading}>
								Submit
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginForm;
