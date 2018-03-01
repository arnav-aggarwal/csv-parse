function stringToNumber(numberString) {
	if (typeof numberString !== 'string') {
		return numberString;
	}

	return Number(numberString.replace(/,/g, ''));
}

function formatColumnTitle(title) {
	return title
		.replace(/\n|\s/g, '_') // newlines and whitespace -> single underscore
		.replace(/__/g, '_') // double underscores -> single underscore
		.replace(/\d|-/g, '') // digits, dashes -> empty
		.replace(/_$/, '') // trailing underscore -> empty
		.toLowerCase()
		.trim();
}

function script(data, year) {
	// Remove unneeded rows & blank columns
	data.splice(0, 4);

	// Format all column titles
	const columnTitles = data.splice(0, 1)[0].map(formatColumnTitle);

	data = data.map(arr => arr.slice(0, -4)).filter(arr => arr.includes('2016') || arr.includes('2017'));

	// // This is a mess, but no good way to clean it up. Transforms data into a much more managable format.
	const formattedData = {};
	let lastState, lastCity;
	for (let i = 0; i < data.length; i++) {
		if (data[i][0]) {
			lastState = data[i][0].replace(/\d|,/g, '').trim();
			lastState = lastState[0] + lastState.slice(1).toLowerCase();
			formattedData[lastState] = {};
		}

		const thisState = formattedData[lastState];

		if (data[i][1]) {
			lastCity = data[i][1].replace(/\d|,/g, '').trim();
			lastCity = lastCity[0] + lastCity.slice(1).toLowerCase();
			thisState[lastCity] = {};
		}

		const thisCity = thisState[lastCity];

		for (let j = 0; j < columnTitles.length; j++) {
			const crimeType = columnTitles[j];
			const crimeData = stringToNumber(data[i][j]);

			if (crimeData) {
				thisCity[crimeType] = crimeData;
			}
		}
	}

	// Further formatting, getting property names perfect, removing data
	for (const stateString in formattedData) {
		const state = formattedData[stateString];

		for (const cityString in state) {
			const city = state[cityString];

			city.year = city[''];
			delete city[''];

			city.forcible_rape = city.rape;
			delete city.rape;

			city.murder_and_nonnegligent_manslaughter = city.murder;
			delete city.murder;
		}
	}

	return formattedData;

	// const finalData = {};

	// // Flatten all data
	// for (const stateString in formattedData) {
	// 	finalData[stateString] = {
	// 		population: formattedData[stateString].population,
	// 	};
	// 	const state = formattedData[stateString];

	// 	for (const crimeType in state) {
	// 		if (crimeType === 'population') {
	// 			continue;
	// 		}

	// 		finalData[stateString][crimeType] = state[crimeType].total;
	// 		finalData[stateString][crimeType + '_rate'] = state[crimeType].rate;
	// 		finalData[stateString][crimeType + '_per_capita'] = state[crimeType].perCapita;
	// 	}
	// }

	// // Turn it into an array
	// const dataArray = Object.entries(finalData).map(([state, crimeData]) => {
	// 	const data = { state, year };

	// 	for (const prop in crimeData) {
	// 		data[prop] = crimeData[prop];
	// 	}

	// 	return data;
	// });

	// return dataArray;
}

module.exports = script;
