import { v4 as uuidv4 } from 'uuid';

const stpDataConvert = (rspArr, linkArr) => {
	let i = 0;
	let links0 = [];
	let links1 = [];
	while (i < rspArr.length) {
		let j = 0;
		while (j < linkArr.length) {
			if (rspArr[i].routes) {
				if (rspArr[i].routes[0].linksetName === linkArr[j].linksetName) {
					links0.push({ ...rspArr[i].routes[0], ...linkArr[j] });
				}
				if (rspArr[i].routes[1]) {
					if (rspArr[i].routes[1].linksetName === linkArr[j].linksetName) {
						links1.push({ ...rspArr[i].routes[1], ...linkArr[j] });
					}
				}
			}
			j++;
		}
		rspArr[i].id = uuidv4();
		rspArr[i].number = i;
		rspArr[i].links0 = links0;
		rspArr[i].links1 = links1;
		links0 = [];
		links1 = [];
		i++;
	}

	return rspArr;
};

export default stpDataConvert;
