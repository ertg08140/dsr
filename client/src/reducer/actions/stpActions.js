import axios from 'axios';
import https from 'https';
import stpDataConvert from '../../utils/stpUtils';

import {
	STP_CHECK_FAIL,
	STP_CHECK_REQUEST,
	STP_CHECK_SUCCESS
} from '../actionTypes';

export const stpNodesCheck =
	(dsrName = 'ala') =>
	async (dispatch, getState) => {
		let tempPayload = {};
		try {
			dispatch({ type: STP_CHECK_REQUEST });
			const {
				userReducer: { token }
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					'X-Auth-Token': token
				},
				httpsAgent: new https.Agent({ rejectUnauthorized: false })
			};

			const url = `/${dsrName}/${process.env.REACT_APP_URL_MMI}`;

			const { data: rspData } = await axios.get(
				`${url}/vstp/remotesignalingpoints/status`,
				config
			);

			let { data: linkData } = await axios.get(
				`${url}/vstp/links/status`,
				config
			);

			const stpResultArr = stpDataConvert(rspData.data, linkData.data);

			dispatch({
				type: STP_CHECK_SUCCESS,
				payload: stpResultArr
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
				type: STP_CHECK_FAIL,
				payload: tempPayload
			});
		}
	};
