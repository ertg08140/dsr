import {
	STP_CHECK_FAIL,
	STP_CHECK_REQUEST,
	STP_CHECK_SUCCESS
} from '../actionTypes';

const initialState = {
	stpNodes: [],
	errorMessage: '',
	loading: false
};

export const stpNodesReducer = (state = initialState, action) => {
	switch (action.type) {
		case STP_CHECK_REQUEST:
			return {
				...state,
				loading: true,
				errorMessage: ''
			};
		case STP_CHECK_FAIL:
			return {
				...state,
				stpNodes: [],
				loading: false,
				errorMessage: action.payload
			};
		case STP_CHECK_SUCCESS:
			return {
				...state,
				loading: false,
				stpNodes: action.payload,
				errorMessage: ''
			};

		default:
			return state;
	}
};
