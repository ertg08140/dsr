import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const addId = (arrayOriginal, alarmFilterList) => {
	const alarmFilterListFalse = alarmFilterList.filter((alarmF) =>
		alarmF.alarmOn === false ? alarmF : null
	);

	for (let g = 0; g < alarmFilterListFalse.length; g++) {
		let tempArrOrig = arrayOriginal.filter((item) =>
			item.eventNumber !== parseInt(alarmFilterListFalse[g].alarmId)
				? item
				: null
		);

		arrayOriginal = tempArrOrig;
		tempArrOrig = [];
	}

	const arrayNew = [];
	let j = 0;
	while (j < arrayOriginal.length) {
		if (arrayOriginal[j].severity !== 'Clear') {
			let id = uuidv4();
			let time = new Intl.DateTimeFormat('ru-RU', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				fractionalSecondDigits: 3
			}).format(new Date(arrayOriginal[j].timestamp));

			//let time = `${year}-${month}-${date} ${hour}:${minute}:${second}.${miliSeconds}`;

			const el = {
				...arrayOriginal[j],
				id,
				time
			};

			arrayNew.push(el);
		}

		j++;
	}

	arrayNew.sort(function (a, b) {
		if (a.severity === b.severity) {
			let aDate = new Date(a.timestamp);
			var bDate = new Date(b.timestamp);

			//return b.timestamp - a.timestamp;
			return bDate - aDate;
		}
		return a.severity > b.severity ? 1 : -1;
	});

	let i = 0;
	while (i < arrayOriginal.length) {
		if (arrayOriginal[i].severity === 'Clear') {
			let id = uuidv4();

			let time = new Intl.DateTimeFormat('ru-RU', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				fractionalSecondDigits: 3
			}).format(new Date(arrayOriginal[i].timestamp));

			//let time = `${year}-${month}-${date} ${hour}:${minute}:${second}.${miliSeconds}`;

			const el = {
				...arrayOriginal[i],
				id,
				time
			};

			arrayNew.push(el);
		}

		i++;
	}

	return arrayNew;
};

export const sendRequest = (url, config) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url, config)
			.then((response) => {
				resolve(response.data.data);
			})
			.catch((error) => {
				if (error.message) {
					resolve([
						{
							timestamp: new Date(),
							name: 'Internal Error',
							severity: 'Critical',
							error: error.message,
							server: url,
							description: error.message
						}
					]);
				} else {
					reject(error.response);
				}
			});
	});
};
