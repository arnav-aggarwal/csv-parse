function stringToNumber(numberString) {
	return Number(numberString.replace(/,/g, ''));
}

function formatColumnTitle(title) {
	title = title
		.replace(/\n|\s/g, '_') // newlines and whitespace -> single underscore
		.replace(/__/g, '_') // double underscores -> single underscore
		.replace(/\d|-/g, '') // digits, dashes -> empty
		.toLowerCase();

	if (title[title.length - 1] === '_') {
		return title.slice(0, -1); // take off trailing underscore
	}

	return title;
}

function script(data, year) {
	// Remove unneeded title rows
	data.splice(0, 3);

	// Format all column titles
	const columnTitles = data.splice(0, 1)[0].map(formatColumnTitle);

	// Strip away several unnessary data rows
	data = data.filter(arr => arr[0] || arr.includes('State Total') || arr.includes('Rate per 100,000 inhabitants'));

	// This is a mess, but no good way to clean it up. Transforms data into a much more managable format.
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

	// Further formatting
	for (const stateString in formattedData) {
		const state = formattedData[stateString];

		if (!state.population) { // Signifies that it's explanatory data that we don't want
			delete formattedData[stateString];
			continue;
		}

		state.population = state.population.total;
		state.forcible_rape = state['rape_(revised_definition)'];
		delete state['rape_(revised_definition)'];
		delete state.state;
		delete state.area;
		delete state[''];
		delete state['rape_(legacy_definition)'];
	}

	const finalData = {};
	
	// Flatten all data
	for (const stateString in formattedData) {
		finalData[stateString] = {
			population: formattedData[stateString].population,
		};
		const state = formattedData[stateString];

		for (const crimeType in state) {
			if (crimeType === 'population') {
				continue;
			}

			finalData[stateString][crimeType] = state[crimeType].total;
			finalData[stateString][crimeType + '_rate'] = state[crimeType].rate;
			finalData[stateString][crimeType + '_per_capita'] = state[crimeType].perCapita;
		}
	}

	// Turn it into an array
	const dataArray = Object.entries(finalData).map(([state, crimeData]) => {
		const data = { state, year };
		
		for (const prop in crimeData) {
			data[prop] = crimeData[prop];	
		}
		
		return data;
	});

	return dataArray;
}

module.exports = script;
