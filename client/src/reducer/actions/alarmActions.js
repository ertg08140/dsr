import https from 'https';
import axios from 'axios';

import { addId, sendRequest } from '../../utils/alarmUtils';

import {
	ALARM_CHECK_FAIL,
	ALARM_CHECK_REQUEST,
	ALARM_CHECK_SUCCESS,
	ALARM_FILTER_CHECK_FAIL,
	ALARM_FILTER_CHECK_REQUEST,
	ALARM_FILTER_CHECK_SUCCESS,
	ALARM_FILTER_ADD_FAIL,
	ALARM_FILTER_ADD_REQUEST,
	ALARM_FILTER_ADD_SUCCESS,
	ALARM_FILTER_UPDATE_FAIL,
	ALARM_FILTER_UPDATE_REQUEST,
	ALARM_FILTER_UPDATE_SUCCESS
} from '../actionTypes';

export const alarmCheck = () => async (dispatch, getState) => {
	dispatch({ type: ALARM_CHECK_REQUEST });
	const {
		userReducer: { token }
	} = getState();

	const {
		userReducer: { userAlarmFilter }
	} = getState();

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': token
		},
		httpsAgent: new https.Agent({ rejectUnauthorized: false })
		// timeout: 10000
	};

	const urlAla = `/ala/${process.env.REACT_APP_URL_MMI}`;
	const urlNur = `/nur/${process.env.REACT_APP_URL_MMI}`;
	const urlNoam = `/noam/${process.env.REACT_APP_URL_MMI}`;

	let tempPayload = {};

	try {
		const alaAlarms = await sendRequest(`${urlAla}/mon/alarms`, config);
		const noamAlarms = await sendRequest(`${urlNoam}/mon/alarms`, config);
		const nurAlarms = await sendRequest(`${urlNur}/mon/alarms`, config);

		const alarmsAll = [...alaAlarms, ...nurAlarms, ...noamAlarms];

		const alaAlarmsid = addId(alarmsAll, userAlarmFilter);

		dispatch({
			type: ALARM_CHECK_SUCCESS,
			payload: alaAlarmsid
		});
	} catch (error) {
		if (error.response) {
			tempPayload = error.response.data.messages
				? error.response.data.messages[0].message
				: error.response.data;
		} else {
			tempPayload = error.message;
		}

		dispatch({
			type: ALARM_CHECK_FAIL,
			payload: tempPayload
		});
	}
};

export const addAlarmToFilter =
	(severity, type, alarmName, alarmId) => async (dispatch, getState) => {
		dispatch({ type: ALARM_FILTER_ADD_REQUEST });
		const {
			userReducer: { token }
		} = getState();

		const urlLocal = `/api/alarms`;

		let tempPayload = {};

		try {
			const addAlarm = await axios.post(urlLocal, {
				severity,
				type,
				alarmName,
				alarmId
			});

			dispatch({
				type: ALARM_FILTER_ADD_SUCCESS,
				payload: addAlarm.data
			});
		} catch (error) {
			if (error.response) {
				tempPayload = error.response.data.messages
					? error.response.data.messages[0].message
					: error.response.data;
			} else {
				tempPayload = error.message;
			}

			dispatch({
				type: ALARM_FILTER_ADD_FAIL,
				payload: tempPayload
			});
		}
	};

export const getAlarmListFromFilter = () => async (dispatch, getState) => {
	dispatch({ type: ALARM_FILTER_CHECK_REQUEST });

	const urlLocal = `/api/alarms`;

	let tempPayload = {};

	try {
		const alarmListFilter = await axios.get(urlLocal);

		dispatch({
			type: ALARM_FILTER_CHECK_SUCCESS,
			payload: alarmListFilter.data
		});
	} catch (error) {
		if (error.response) {
			tempPayload = error.response.data.messages
				? error.response.data.messages[0].message
				: error.response.data;
		} else {
			tempPayload = error.message;
		}

		dispatch({
			type: ALARM_FILTER_CHECK_FAIL,
			payload: tempPayload
		});
	}
};

export const updateAlarmListFromFilter =
	(alarmFilter) => async (dispatch, getState) => {
		dispatch({ type: ALARM_FILTER_UPDATE_REQUEST });

		const urlLocal = `/api/user`;
		const {
			userReducer: { username }
		} = getState();

		let tempPayload = {};

		try {
			const alarmListFilter = await axios.put(urlLocal, {
				userName: username,
				alarmFilter
			});

			dispatch({
				type: ALARM_FILTER_CHECK_SUCCESS,
				payload: alarmListFilter.data.alarmFilter
			});
		} catch (error) {
			if (error.response) {
				tempPayload = error.response.data.messages
					? error.response.data.messages[0].message
					: error.response.data;
			} else {
				tempPayload = error.message;
			}

			dispatch({
				type: ALARM_FILTER_UPDATE_FAIL,
				payload: tempPayload
			});
		}
	};
