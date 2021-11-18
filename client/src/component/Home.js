import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect } from 'react';
import { checkTokenValidity } from '../reducer/actions/userActions';
import { useDispatch } from 'react-redux';

const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkTokenValidity());
	}, [dispatch]);

	return (
		<Container>
			<CardGroup>
				<LinkContainer to='/alarms'>
					<Card
						style={{ width: '18rem' }}
						className='text-center me-3 shadow-lg'
					>
						<Card.Body style={{ cursor: 'pointer' }}>
							<Card.Title>ALARMS</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								View alarm list
							</Card.Subtitle>
							<hr />
							<Card.Text>
								<NotificationsActiveIcon
									className='m-auto'
									sx={{ fontSize: 80, color: 'red' }}
								/>
								<hr />
								View alarm list from Ala_SOAM, Nur_SOAM, NOAM. Alarm list is
								auto refreshed periodicaly.
							</Card.Text>
							<Button variant='primary'>Check Alarms</Button>
						</Card.Body>
					</Card>
				</LinkContainer>

				<LinkContainer to='/diameter'>
					<Card
						style={{ width: '18rem' }}
						className='text-center  me-3 shadow-lg'
					>
						<Card.Body style={{ cursor: 'pointer' }}>
							<Card.Title>DIAMETER</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								View diameter peers
							</Card.Subtitle>
							<hr />
							<Card.Text>
								<CloseFullscreenIcon
									className='m-auto'
									sx={{ fontSize: 80, color: 'blue' }}
								/>
								<hr />
								View diameter peers list and current status from Ala_SOAM,
								Nur_SOAM, NOAM.
							</Card.Text>
							<Button variant='primary'>Check Diameter Peers</Button>
						</Card.Body>
					</Card>
				</LinkContainer>

				<LinkContainer to='/help'>
					<Card style={{ width: '18rem' }} className='text-center shadow-lg'>
						<Card.Body style={{ cursor: 'pointer' }}>
							<Card.Title>HELP</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								Help questions
							</Card.Subtitle>
							<hr />
							<Card.Text>
								<HelpOutlineIcon
									className='m-auto'
									sx={{ fontSize: 80, color: 'black' }}
								/>
								<hr />
								If you have questions about alarms, please check help section
							</Card.Text>
							<Button variant='primary'>Check Help</Button>
						</Card.Body>
					</Card>
				</LinkContainer>
			</CardGroup>
		</Container>
	);
};

export default Home;
