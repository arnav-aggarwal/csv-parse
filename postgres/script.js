function formatState(state) {
	return state.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function script(data) {
	const columnTitles = data.splice(0, 1)[0];
	const finalData = [];

	data.forEach(row => {
		const obj = {};

		columnTitles.forEach((col, index) => {
			obj[col] = row[index];
		});

		delete obj.state_original;
		delete obj.city_original;
		delete obj.id;

		if (obj.state === undefined) {
			return;
		}

		obj.state = formatState(obj.state);
		finalData.push(obj);
	});

	return finalData;
}

module.exports = script;
