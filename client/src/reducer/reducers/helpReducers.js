import {
	HELP_ADD_REQUEST,
	HELP_ADD_SUCCESS,
	HELP_ADD_FAIL,
	HELP_GET_REQUEST,
	HELP_GET_SUCCESS,
	HELP_GET_FAIL,
	HELP_DELETE_REQUEST,
	HELP_DELETE_SUCCESS,
	HELP_DELETE_FAIL,
	HELP_UPDATE_REQUEST,
	HELP_UPDATE_SUCCESS,
	HELP_UPDATE_FAIL
} from '../actionTypes';

const initialState = {
	helpList: [],
	errorMessage: '',
	loading: false
};

export const helpReducer = (state = initialState, action) => {
	switch (action.type) {
		case HELP_ADD_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case HELP_ADD_FAIL:
			return {
				...state,
				loading: false,
				errorMessage: action.payload
			};
		case HELP_ADD_SUCCESS:
			return {
				...state,
				loading: false,
				helpList: [...state.helpList, action.payload.data]
			};

		case HELP_GET_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case HELP_GET_FAIL:
			return {
				...state,
				loading: false,
				errorMessage: action.payload
			};
		case HELP_GET_SUCCESS:
			return {
				...state,
				loading: false,
				helpList: action.payload.data
			};

		case HELP_DELETE_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case HELP_DELETE_FAIL:
			return {
				...state,
				loading: false,
				errorMessage: action.payload
			};
		case HELP_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				helpList: state.helpList.filter((help) => help._id !== action.payload)
			};

		case HELP_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case HELP_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				errorMessage: action.payload
			};
		case HELP_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				helpList: [
					...state.helpList.filter((item) => item._id !== action.payload._id),
					action.payload
				]
			};
		default:
			return state;
	}
};
