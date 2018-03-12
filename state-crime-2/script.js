function stringToNumber(numberString) {
	if (typeof numberString !== 'string') {
		return numberString;
	}

	return Number(numberString.replace(/,/g, ''));
}

function perCapita(a, b) {
	a = stringToNumber(a);
	b = stringToNumber(b);
	const answer = stringToNumber((1000 * a / b).toFixed(2));

	if(answer === Infinity || isNaN(answer)) {
		return null;
	}

	return answer;
}

function formatState(state) {
	return state
		.replace(/\d|,/g, '')
		.trim()
		.toUpperCase();
}

function addProps(obj, property, value, population) {
	value = stringToNumber(value);
	population = stringToNumber(population);

	if(typeof value !== 'number') {
		obj[property] = null;
		obj[property + '_per_capita'] = null;
		return;
	}

	obj[property] = value;

	if(typeof population !== 'number' || population === 0) {
		obj[property + '_per_capita'] = null;
		return;
	}

	obj[property + '_per_capita'] = Number((1000 * value / population).toFixed(2));
}

function script(data, year) {
	// Get rid of column titles
	data.shift();

	// This is a mess, but clearning it up leads to more problems than it solves.
	const formattedData = [];
	for (let i = 0; i < data.length; i += 2) {
		let population, originalState, state;

		{
			const obj = {};
			formattedData.push(obj);

			population = data[i][data[i].length - 1];
			const [
				stateStr,
				_,
				total,
				violent,
				property,
				murder,
				rape,
				robbery,
				agg,
				burglary,
				larceny,
				motor,
				arson,
				otherAssaults,
				forgery,
				fraud,
				embezzlement,
				stolenProperty,
				vandalism,
				weapons,
				prostitution,
				sex,
				drug,
				gambling,
				family,
				dui,
				liquor,
				drunkenness,
				disorderly,
				vagrancy,
				other,
				suspicion,
				curfew,
				agencies,
				pop
			] = data[i];
			originalState = stateStr;
			state = formatState(originalState);
			population = pop;

			obj.state = state;
			obj.state_original = state;
			obj.under_18 = 1;

			addProps(obj, 'total_arrests', total);
			addProps(obj, 'violent_crimes', violent);
			addProps(obj, 'property_crimes', property);
			addProps(obj, 'murder_and_nonnegligent_manslaughter', murder);
			addProps(obj, 'forcible_rape', rape);
			addProps(obj, 'robbery', robbery);
			addProps(obj, 'aggravated_assault', agg);
			addProps(obj, 'burglary', burglary);
			addProps(obj, 'larceny_theft', larceny);
			addProps(obj, 'motor_vehicle_theft', motor);
			addProps(obj, 'arson', arson);
			addProps(obj, 'other_assaults', otherAssaults);
			addProps(obj, 'forgery_and_counterfeiting', forgery);
			addProps(obj, 'fraud', fraud);
			addProps(obj, 'embezzlement', embezzlement);
			addProps(obj, 'stolen_property', stolenProperty);
			addProps(obj, 'embezzlement', embezzlement);
			addProps(obj, 'stolen_property', stolenProperty);
			addProps(obj, 'vandalism', vandalism);
			addProps(obj, 'weapons_posession', weapons);
			addProps(obj, 'prostitution', prostitution);
			addProps(obj, 'sex_offenses', sex);
			addProps(obj, 'drug_abuse_violations', drug);
			addProps(obj, 'gambling', gambling);
			addProps(obj, 'offenses_agains_family_and_children', family);
			addProps(obj, 'dui', dui);
			addProps(obj, 'liquor_laws', liquor);
			addProps(obj, 'drunkenness', drunkenness);
			addProps(obj, 'disorderly_conduct', disorderly);
			addProps(obj, 'vagrancy', vagrancy);
			addProps(obj, 'all_others', other);
			addProps(obj, 'suspicion', suspicion);
			addProps(obj, 'curfew_and_loitering', curfew);
			addProps(obj, 'runaways');

			obj.estimated_population = stringToNumber(population);
			obj.number_of_agencies = stringToNumber(agencies);
			obj.year = stringToNumber(year);
		}

		{
			const obj = {};
			formattedData.push(obj);

			const [
				__,
				_,
				total,
				violent,
				property,
				murder,
				rape,
				robbery,
				agg,
				burglary,
				larceny,
				motor,
				arson,
				otherAssaults,
				forgery,
				fraud,
				embezzlement,
				stolenProperty,
				vandalism,
				weapons,
				prostitution,
				sex,
				drug,
				gambling,
				family,
				dui,
				liquor,
				drunkenness,
				disorderly,
				vagrancy,
				other,
				suspicion,
				curfew,
				agencies,
			] = data[i + 1];

			obj.state = state;
			obj.state_original = state;

			obj.under_18 = 0;

			addProps(obj, 'total_arrests', total, population);
			addProps(obj, 'violent_crimes', violent, population);
			addProps(obj, 'property_crimes', property, population);
			addProps(obj, 'murder_and_nonnegligent_manslaughter', murder, population);
			addProps(obj, 'forcible_rape', rape, population);
			addProps(obj, 'robbery', robbery, population);
			addProps(obj, 'aggravated_assault', agg, population);
			addProps(obj, 'burglary', burglary, population);
			addProps(obj, 'larceny_theft', larceny, population);
			addProps(obj, 'motor_vehicle_theft', motor, population);
			addProps(obj, 'arson', arson, population);
			addProps(obj, 'other_assaults', otherAssaults, population);
			addProps(obj, 'forgery_and_counterfeiting', forgery, population);
			addProps(obj, 'fraud', fraud, population);
			addProps(obj, 'embezzlement', embezzlement, population);
			addProps(obj, 'stolen_property', stolenProperty, population);
			addProps(obj, 'vandalism', vandalism, population);
			addProps(obj, 'weapons_posession', weapons, population);
			addProps(obj, 'prostitution', prostitution, population);
			addProps(obj, 'sex_offenses', sex, population);
			addProps(obj, 'drug_abuse_violations', drug, population);
			addProps(obj, 'gambling', gambling, population);
			addProps(obj, 'offenses_agains_family_and_children', family, population);
			addProps(obj, 'dui', dui, population);
			addProps(obj, 'liquor_laws', liquor, population);
			addProps(obj, 'drunkenness', drunkenness, population);
			addProps(obj, 'disorderly_conduct', disorderly, population);
			addProps(obj, 'vagrancy', vagrancy, population);
			addProps(obj, 'all_others', other, population);
			addProps(obj, 'suspicion', suspicion, population);
			addProps(obj, 'curfew_and_loitering', curfew, population);
			addProps(obj, 'runaways');

			obj.estimated_population = stringToNumber(population);
			obj.number_of_agencies = stringToNumber(agencies);
			obj.year = year;
		}
	}

	return formattedData;
}

module.exports = script;
