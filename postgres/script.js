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
		
		finalData.push(obj);
	});

	return finalData;
}

module.exports = script;
