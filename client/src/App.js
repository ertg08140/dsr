import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './component/utiliComponents/Header';
import Footer from './component/utiliComponents/Footer';
import LoginForm from './component/LoginForm';

import DiamHome from './component/diam/DiamHome';
import AlarmHome from './component/alarm/AlarmHome';
import HelpScreen from './component/help/HelpScreen';
import Home from './component/Home';
function App() {
	return (
		<div className='App'>
			<Router>
				<Header />

				<Route path='/login' component={LoginForm} />
				<Route path='/alarms' component={AlarmHome} />
				<Route path='/diameter' component={DiamHome} />
				<Route path='/help' component={HelpScreen} />
				<Route path='/' component={Home} exact />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
