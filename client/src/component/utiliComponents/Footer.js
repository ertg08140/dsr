import { Navbar } from 'react-bootstrap';

const Footer = () => {
	return (
		<Navbar
			bg='dark'
			variant='dark'
			expand='lg'
			collapseOnSelect
			fixed='bottom'
			className='justify-content-end mt-5 flex-column'
		>
			<Navbar.Text>DSR Tool v1.3.0 </Navbar.Text>
			<Navbar.Text style={{ display: 'block' }}>
				In case of alarm monitoring problems e-mail to{' '}
				<a href='mailto: kirill.klimov@kcell.kz'>Kirill Klimov</a>
			</Navbar.Text>
		</Navbar>
	);
};

export default Footer;
