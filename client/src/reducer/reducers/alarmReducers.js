import {
	ALARM_CHECK_FAIL,
	ALARM_CHECK_REQUEST,
	ALARM_CHECK_SUCCESS,
	ALARM_FILTER_CHECK_FAIL,
	ALARM_FILTER_CHECK_REQUEST,
	ALARM_FILTER_CHECK_SUCCESS,
	ALARM_FILTER_ADD_REQUEST,
	ALARM_FILTER_ADD_FAIL,
	ALARM_FILTER_ADD_SUCCESS,
	ALARM_FILTER_UPDATE_REQUEST,
	ALARM_FILTER_UPDATE_FAIL,
	ALARM_FILTER_UPDATE_SUCCESS
} from '../actionTypes';

const initialState = {
	alarms: [],
	errorMessage: '',
	isError: false,
	loading: false
};

export const alarmCheckReducer = (state = initialState, action) => {
	switch (action.type) {
		case ALARM_CHECK_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: '',
				isError: false
			};
		case ALARM_CHECK_FAIL:
			return {
				...state,
				loading: false,
				isError: true,
				errorMessage: action.payload
			};
		case ALARM_CHECK_SUCCESS:
			return {
				...state,
				loading: false,
				alarms: action.payload,
				errorMessage: '',
				isError: false
			};

		default:
			return state;
	}
};

export const addAlarmToFilterReducer = (state = {}, action) => {
	switch (action.type) {
		case ALARM_FILTER_ADD_REQUEST:
			return {
				loading: true
			};
		case ALARM_FILTER_ADD_FAIL:
			return {
				loading: false,
				errorMessage: action.payload
			};
		case ALARM_FILTER_ADD_SUCCESS:
			return {
				loading: false,
				alarms: action.payload
			};

		default:
			return state;
	}
};

export const getAlarmListFromFilterReducer = (
	state = { alarmFilterList: [] },
	action
) => {
	switch (action.type) {
		case ALARM_FILTER_CHECK_REQUEST:
			return {
				...state,
				loading: true
			};
		case ALARM_FILTER_CHECK_FAIL:
			return {
				loading: false,
				errorMessage: action.payload
			};
		case ALARM_FILTER_CHECK_SUCCESS:
			return {
				loading: false,
				alarmFilterList: action.payload
			};

		default:
			return state;
	}
};

export const updateAlarmListFromFilterReducer = (
	state = { alarmFilterList: [] },
	action
) => {
	switch (action.type) {
		case ALARM_FILTER_UPDATE_REQUEST:
			return {
				...state,
				loading: true
			};
		case ALARM_FILTER_UPDATE_FAIL:
			return {
				loading: false,
				errorMessage: action.payload
			};
		case ALARM_FILTER_UPDATE_SUCCESS:
			return {
				loading: false,
				alarmFilterList: action.payload
			};

		default:
			return state;
	}
};
