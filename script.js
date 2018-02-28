function stringToNumber(numberString) {
	return Number(numberString.replace(/,/g, ''));
}

// Change '\n', ' ', and '__' to '_', numbers and '-' to empty string
function formatColumnTitle(title) {
	title = title
		.replace(/\n|\s/g, '_')
		.replace(/__/g, '_')
		.replace(/\d|-/g, '')
		.toLowerCase();
	
	if (title[title.length - 1] === '_') {
		return title.slice(0, -1);
	}

	return title;
}

function script(data) {
	// Remove unneeded rows
	data.splice(0, 3);

	const columnTitles = data.splice(0, 1)[0].map(formatColumnTitle);
	data = data.filter(arr => arr[0] || arr.includes('State Total') || arr.includes('Rate per 100,000 inhabitants'));

	const formattedData = {};
	let lastState;
	for (let i = 0; i < data.length; i++) {
		if (data[i][0]) {
			lastState = data[i][0].replace(/\d|,/g, '');
			lastState = lastState[0] + lastState.slice(1).toLowerCase();
			formattedData[lastState] = {};
		} else {
			const stateData = formattedData[lastState];
			for (let j = 0; j < columnTitles.length; j++) {
				const crimeType = columnTitles[j];
				const crimeData = stringToNumber(data[i][j]);
				if (stateData[crimeType]) {
					stateData[crimeType].rate = Number(crimeData.toFixed());
					stateData[crimeType].perCapita = Number((crimeData / 100).toFixed(2));
				} else {
					stateData[crimeType] = { total: crimeData };
				}
			}
		}
	}

	for (const stateString in formattedData) {
		const state = formattedData[stateString];

		delete state.state;
		delete state.area;
		delete state[''];
		delete state['rape_(legacy_definition)'];

		state.rape = state['rape_(revised_definition)'];
		delete state['rape_(revised_definition)'];

		if (state.population) {
			state.population = state.population.total;
		}
	}

	return formattedData;
}

module.exports = script;
