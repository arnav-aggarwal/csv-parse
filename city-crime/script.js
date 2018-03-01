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

function capitalizeFirstLetter(str) {
	if (str.length === 0) {
		return str;
	}

	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function formatCityState(state) {
	state = state
		.replace(/\d|,/g, '')
		.trim()
		.toLowerCase();

	const split = state.split(' ').map(str => {
		if (['the', 'of'].includes(str)) {
			return str;
		}

		return capitalizeFirstLetter(str);
	});

	return split.join(' ');
}

function script(data) {
	// Remove unneeded rows & blank columns
	data.splice(0, 4);

	// Format all column titles
	const columnTitles = data.splice(0, 1)[0].map(formatColumnTitle);

	data = data.map(arr => arr.slice(0, -4)).filter(arr => arr.includes('2016') || arr.includes('2017'));

	// This is a mess, but no good way to clean it up. Transforms data into a much more managable format.
	const formattedData = {};
	let lastState, lastCity;
	for (let i = 0; i < data.length; i++) {
		if (data[i][0]) {
			lastState = formatCityState(data[i][0]);
			formattedData[lastState] = {};
		}

		const thisState = formattedData[lastState];

		if (data[i][1]) {
			lastCity = formatCityState(data[i][1]);
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

			city.forcible_rape = city.rape || 0;
			delete city.rape;

			city.murder_and_nonnegligent_manslaughter = city.murder || 0;
			delete city.murder;
		}
	}

	const dataArray = [];

	for (const stateString in formattedData) {
		const state = formattedData[stateString];

		for (const cityString in state) {
			const city = state[cityString];
			const finalObj = {
				state: stateString,
				city: cityString,
			};

			for (const item in city) {
				finalObj[item] = city[item];

				if (['year', 'population'].includes(item)) {
					continue;
				}

				finalObj[item + '_per_capita'] = Number((city[item] / city.population * 1000).toFixed(4));
			}

			dataArray.push(finalObj);
		}
	}

	return dataArray;
}

module.exports = script;
