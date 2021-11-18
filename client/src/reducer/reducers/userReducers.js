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

const initialState = {
	token: localStorage.getItem('token'),
	gooduntil: localStorage.getItem('gooduntil'),
	username: localStorage.getItem('username'),
	userRole: localStorage.getItem('userRole'),
	userId: null,
	userAlarmFilter: [],
	errorMessage: '',
	loading: false
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case USER_LOGIN_FAIL:
			return {
				...state,
				loading: false,
				token: null,
				errorMessage: action.payload
			};
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				token: action.payload.token,
				gooduntil: action.payload.gooduntil,
				username: action.payload.username,
				userId: action.payload.userId,
				userRole: action.payload.userRole,
				userAlarmFilter: action.payload.userAlarmFilter,
				errorMessage: ''
			};
		case USER_LOGOUT_SUCCESS:
			return {
				...state,
				token: null,
				username: null,
				gooduntil: '',
				userId: null,
				userRole: '',
				userAlarmFilter: [],
				errorMessage: '',
				loading: false
			};
		case USER_GET_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case USER_GET_FAIL:
			return {
				...state,
				loading: false,
				errorMessage: action.payload
			};
		case USER_GET_SUCCESS:
			return {
				...state,
				loading: false,
				userId: action.payload.userId,
				userRole: action.payload.userRole,
				userAlarmFilter: action.payload.userAlarmFilter,
				errorMessage: ''
			};

		case USER_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case USER_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				errorMessage: action.payload
			};
		case USER_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,

				userAlarmFilter: action.payload.userAlarmFilter,
				errorMessage: ''
			};

		default:
			return state;
	}
};
