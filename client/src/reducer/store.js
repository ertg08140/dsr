import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducers';
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
	helpReducer
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
