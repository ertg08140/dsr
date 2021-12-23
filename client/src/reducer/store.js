import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducers';
import { stpNodesReducer } from './reducers/stpReducers';
import { nodeCheckReducer, prtCheckReducer } from './reducers/checkReducers';
import {
	alarmCheckReducer,
	addAlarmToFilterReducer,
	getAlarmListFromFilterReducer,
	updateAlarmListFromFilterReducer
} from './reducers/alarmReducers';

import { helpReducer } from './reducers/helpReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	userReducer,
	nodeCheckReducer,
	prtCheckReducer,
	alarmCheckReducer,
	addAlarmToFilterReducer,
	getAlarmListFromFilterReducer,
	updateAlarmListFromFilterReducer,
	helpReducer,
	stpNodesReducer
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
