import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { helpAdd } from '../../reducer/actions/helpActions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';

const HelpAddForm = () => {
	const [instance, setInstance] = useState('');
	const [description, setDescription] = useState('');
	const [unit, setUnit] = useState('');
	const [unitPhone, setUnitPhone] = useState('');
	const [unitEmail, setUnitEmail] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(helpAdd({ instance, description, unit, unitPhone, unitEmail }));
		setInstance('');
		setDescription('');
		setUnit('');
		setUnitPhone('');
		setUnitEmail('');
	};

	return (
		<Container>
			<Form onSubmit={submitHandler}>
				<Row>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Instance</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter problem name'
							value={instance}
							onChange={(e) => setInstance(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Enter problem description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Responsible Unit</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter unit who should handle the problem'
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Responsible Unit Phone</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter unit phone'
							value={unitPhone}
							onChange={(e) => setUnitPhone(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Responsible Unit Email</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter unit e-mail'
							value={unitEmail}
							onChange={(e) => setUnitEmail(e.target.value)}
						/>
					</Form.Group>

					<Button variant='primary' type='submit' className='mb-5'>
						Add
					</Button>
				</Row>
			</Form>
		</Container>
	);
};

export default HelpAddForm;
