import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { userLogout } from '../../reducer/actions/userActions';

const Header = () => {
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(userLogout());
	};

	return (
		<Navbar
			bg='dark'
			variant='dark'
			expand='lg'
			collapseOnSelect
			className='mb-5'
			fixed='top'
		>
			<Container>
				<Navbar.Brand href='/'>DSR Tool</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				{user.token ? (
					<Navbar.Collapse
						id='basic-navbar-nav'
						className='justify-content-end'
					>
						<Nav className='me-right'>
							<Navbar.Text className='py-0 px-3'>
								Hello, {user.username}
							</Navbar.Text>
							<Navbar.Text className='py-0 px-3'>
								Session active till{' '}
								{`${new Date(user.gooduntil).getHours()}:${new Date(
									user.gooduntil
								).getMinutes()}`}
							</Navbar.Text>

							<LinkContainer to='/alarms'>
								<Nav.Link className='py-0'>Alarms</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/diameter'>
								<Nav.Link className='py-0'>Diameter</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/stp'>
								<Nav.Link className='py-0'>STP</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/help'>
								<Nav.Link className='py-0'>Help</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/' exact>
								<Nav.Link className='py-0'>Home</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/logout' onClick={logoutHandler}>
								<Nav.Link className='py-0'>Logout</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				) : (
					<Nav className='me-right'>
						<Nav.Link href='/login'>Login</Nav.Link>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
