function stringToNumber(numberString) {
	if (typeof numberString !== 'string') {
		return numberString;
	}

	return Number(numberString.replace(/,/g, ''));
}

function toHundreds(num) {
	if (typeof num !== 'number') {
		num = stringToNumber(num);
	}

	return Number(num.toFixed(2));
}

function removeFirst2(arr) {
	return arr.splice(0, 2);
}

function script(data) {
	const store = [];

	const headers = data.shift();
	removeFirst2(headers);

	data.forEach(row => {
		const yearData = {};
		const [year, population] = removeFirst2(row);

		for (let i = 0; i < row.length; i += 2) {
			const obj = { year, population };
			store.push(obj);
			obj.category = headers[i];
			obj.crimes = stringToNumber(row[i]);
			obj.crimes_per_capita = toHundreds(row[i + 1]);
		}
	});

	return store;
}

module.exports = script;
