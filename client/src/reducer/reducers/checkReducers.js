import {
	NODE_CHECK_FAIL,
	NODE_CHECK_REQUEST,
	NODE_CHECK_SUCCESS,
	PRT_CHECK_FAIL,
	PRT_CHECK_REQUEST,
	PRT_CHECK_SUCCESS
} from '../actionTypes';

const initialState = {
	nodes: [],
	prts: [],
	errorMessage: '',
	isError: false,
	loading: false
};

export const nodeCheckReducer = (state = initialState, action) => {
	switch (action.type) {
		case NODE_CHECK_REQUEST:
			return {
				...state,
				isError: false,
				loading: true,
				errorMessage: ''
			};
		case NODE_CHECK_FAIL:
			return {
				...state,
				nodes: [],
				loading: false,
				isError: true,
				errorMessage: action.payload
			};
		case NODE_CHECK_SUCCESS:
			return {
				...state,
				loading: false,
				nodes: action.payload,
				isError: false,
				errorMessage: ''
			};

		default:
			return state;
	}
};

export const prtCheckReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRT_CHECK_REQUEST:
			return {
				...state,
				loading: true,
				isError: false,
				errorMessage: ''
			};
		case PRT_CHECK_FAIL:
			return {
				...state,
				loading: false,
				isError: true,
				errorMessage: action.payload
			};
		case PRT_CHECK_SUCCESS:
			return {
				...state,
				loading: false,
				prts: action.payload,
				isError: false,
				errorMessage: ''
			};

		default:
			return state;
	}
};
