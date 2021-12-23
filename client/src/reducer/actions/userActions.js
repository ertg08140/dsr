import axios from 'axios';
import https from 'https';
import sortBy from 'lodash.sortby';

import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_SUCCESS,
	USER_GET_FAIL,
	USER_GET_REQUEST,
	USER_GET_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS
} from '../actionTypes';

export const userLogin = (username, password, DSR) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const params = new URLSearchParams();
		params.append('username', username);
		params.append('password', password);

		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			httpsAgent: new https.Agent({ rejectUnauthorized: false })
		};

		let url = `/ala/${process.env.REACT_APP_URL_MMI}/auth/tokens`;

		if (DSR === 'NurDSR') {
			url = `/nur/${process.env.REACT_APP_URL_MMI}/auth/tokens`;
		}
		const { data } = await axios.post(url, params, config);

		const resp = await axios.post('/api/user', { userName: username });

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: {
				token: data.data.token,
				username,
				userId: resp.data._id,
				userRole: resp.data.role,
				userAlarmFilter: sortBy(resp.data.alarmFilter, 'alarmId'),
				gooduntil: data.data.gooduntil
			}
		});

		localStorage.setItem('token', data.data.token);
		localStorage.setItem('gooduntil', data.data.gooduntil);
		localStorage.setItem('username', username);
		localStorage.setItem('userRole', resp.data.role);
		localStorage.setItem(
			'userAlarmFilter',
			JSON.stringify(sortBy(resp.data.alarmFilter, 'alarmId'))
		);
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response.data.messages
				? error.response.data.messages[0].message
				: error.response.data
		});
	}
};

export const userLogout = () => async (dispatch) => {
	dispatch({ type: USER_LOGOUT_SUCCESS });
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	localStorage.removeItem('gooduntil');
	localStorage.removeItem('userRole');
	localStorage.removeItem('userAlarmFilter');
	document.location.href = '/login';
};

export const checkTokenValidity =
	(ifRedirect = true) =>
	(dispatch, getState) => {
		const {
			userReducer: { gooduntil }
		} = getState();

		let dateNow = Date.now();
		let dateValidTo = new Date(gooduntil);

		if (dateNow > dateValidTo.getTime()) {
			if (ifRedirect) {
				document.location.href = '/login';
			}

			dispatch({ type: USER_LOGOUT_SUCCESS });
			localStorage.removeItem('token');
			localStorage.removeItem('username');
			localStorage.removeItem('gooduntil');
			localStorage.removeItem('userRole');
			localStorage.removeItem('userAlarmFilter');
		}
	};

export const userGetProfile = (userName) => async (dispatch) => {
	dispatch({ type: USER_GET_REQUEST });
	let tempPayload = {};
	try {
		const { data } = await axios.post('/api/user', { userName });

		dispatch({
			type: USER_GET_SUCCESS,
			payload: {
				userId: data._id,
				userRole: data.role,
				userAlarmFilter: sortBy(data.alarmFilter, 'alarmId')
			}
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
			type: USER_GET_FAIL,
			payload: tempPayload
		});
	}
};

export const userUpdateProfile =
	(userName, alarmFilter) => async (dispatch) => {
		dispatch({ type: USER_UPDATE_REQUEST });
		let tempPayload = {};

		try {
			const { data } = await axios.put('/api/user', {
				userName,
				alarmFilter
			});
			// await axios.get(urlLocal);

			dispatch({
				type: USER_UPDATE_SUCCESS,
				payload: {
					// userId: data._id,
					// userRole: data.role,
					userAlarmFilter: sortBy(data.alarmFilter, 'alarmId')
				}
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
				type: USER_UPDATE_FAIL,
				payload: tempPayload
			});
		}
	};
