import axios from 'axios';
import https from 'https';
import { v4 as uuidv4 } from 'uuid';
import sortBy from 'lodash.sortby';

import {
	NODE_CHECK_FAIL,
	NODE_CHECK_REQUEST,
	NODE_CHECK_SUCCESS,
	PRT_CHECK_FAIL,
	PRT_CHECK_REQUEST,
	PRT_CHECK_SUCCESS
} from '../actionTypes';

export const nodeCheck =
	(eventKey = 'ala') =>
	async (dispatch, getState) => {
		let tempPayload = {};
		try {
			dispatch({ type: NODE_CHECK_REQUEST });
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

			const url = `/${eventKey}/${process.env.REACT_APP_URL_MMI}`;

			const data_nodes_res = await axios.get(
				`${url}/diameter/peernodes`,
				config
			);

			const data_status_res = await axios.get(
				`${url}/diameter/peernodes/status`,
				config
			);

			const data_nodes = data_nodes_res.data.data;
			const data_status = data_status_res.data.data;

			const data = [];

			let i = 0,
				lenNodes = data_nodes.length;
			while (i < lenNodes) {
				let j = 0,
					lenStatus = data_status.length;
				while (j < lenStatus) {
					if (data_nodes[i].name === data_status[j].peerNodeName) {
						let id = uuidv4();
						const dataObj = {
							...data_nodes[i],
							...data_status[j],
							id,
							number: i
						};
						data.push(dataObj);
						break;
					}

					j++;
				}

				i++;
			}

			dispatch({
				type: NODE_CHECK_SUCCESS,
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
				type: NODE_CHECK_FAIL,
				payload: tempPayload
			});
		}
	};

export const prtCheck =
	(prtTable, dsrName = 'ala') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: PRT_CHECK_REQUEST });
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

			const data_prts_res = await axios.get(
				`${url}/diameter/peerrouterules/`,
				config
			);

			const all_data_prts = data_prts_res.data.data;

			const one_data_prt = all_data_prts.filter((prt) => {
				prt.id = uuidv4();
				return prt.peerRouteTableName === prtTable;
			});

			dispatch({
				type: PRT_CHECK_SUCCESS,
				payload: sortBy(one_data_prt, 'priority')
			});
		} catch (error) {
			dispatch({
				type: PRT_CHECK_FAIL,
				payload: error.response.data.messages
					? error.response.data.messages[0].message
					: error.response.data
			});
		}
	};
