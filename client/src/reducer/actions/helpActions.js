import axios from 'axios';

import {
	HELP_ADD_REQUEST,
	HELP_ADD_SUCCESS,
	HELP_ADD_FAIL,
	HELP_GET_REQUEST,
	HELP_GET_SUCCESS,
	HELP_GET_FAIL,
	HELP_UPDATE_REQUEST,
	HELP_UPDATE_SUCCESS,
	HELP_UPDATE_FAIL,
	HELP_DELETE_REQUEST,
	HELP_DELETE_SUCCESS,
	HELP_DELETE_FAIL
} from '../actionTypes';

export const helpAdd = (help) => async (dispatch) => {
	dispatch({ type: HELP_ADD_REQUEST });
	let tempPayload = {};
	try {
		const data = await axios.post('/api/help', help);

		dispatch({
			type: HELP_ADD_SUCCESS,
			payload: data
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
			type: HELP_ADD_FAIL,
			payload: tempPayload
		});
	}
};

export const helpGet = () => async (dispatch) => {
	dispatch({ type: HELP_GET_REQUEST });
	let tempPayload = {};
	try {
		const data = await axios.get('/api/help');

		dispatch({
			type: HELP_GET_SUCCESS,
			payload: data
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
			type: HELP_GET_FAIL,
			payload: tempPayload
		});
	}
};

export const helpDelete = (help) => async (dispatch) => {
	dispatch({ type: HELP_DELETE_REQUEST });
	let tempPayload = {};
	try {
		await axios.delete(`/api/help/${help._id}`, help);

		dispatch({
			type: HELP_DELETE_SUCCESS,
			payload: help._id
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
			type: HELP_DELETE_FAIL,
			payload: tempPayload
		});
	}
};

export const helpUpdate = (help) => async (dispatch) => {
	dispatch({ type: HELP_UPDATE_REQUEST });
	let tempPayload = {};
	try {
		const { data } = await axios.put('/api/help/', help);

		dispatch({
			type: HELP_UPDATE_SUCCESS,
			payload: data
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
			type: HELP_UPDATE_FAIL,
			payload: tempPayload
		});
	}
};
