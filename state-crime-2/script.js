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
				__,
				pop
			] = data[i];
			originalState = stateStr;
			state = formatState(originalState);
			population = pop;

			obj.state = state;
			obj.state_original = originalState;

			obj.under_18 = 1;

			obj.total_arrests = total;
			obj.total_arrests_per_capita = null;

			obj.violent_crimes = violent;
			obj.violent_crimes_per_capita = null;

			obj.property_crimes = property;
			obj.property_crimes_per_capita = null;

			obj.murder_and_nonnegligent_manslaughter = murder;
			obj.murder_and_nonnegligent_manslaughter_per_capita = null;

			obj.forcible_rape = rape;
			obj.forcible_rape_per_capita = null;

			obj.burglary = burglary;
			obj.burglary_per_capita = null;

			obj.larceny_theft = larceny;
			obj.larceny_theft_per_capita = null;

			obj.motor_vehicle_theft = motor;
			obj.motor_vehicle_theft_per_capita = null;

			obj.arson = arson;
			obj.arson_per_capita = null;

			obj.other_assaults = otherAssaults;
			obj.other_assaults_per_capita = null;

			obj.forgery_and_counterfeiting = forgery;
			obj.forgery_and_counterfeiting_per_capita = null;

			obj.fraud = fraud;
			obj.fraud_per_capita = null;

			obj.embezzlement = embezzlement;
			obj.embezzlement_per_capita = null;

			obj.stolen_property = stolenProperty;
			obj.stolen_property_per_capita = null;

			obj.vandalism = vandalism;
			obj.vandalism_per_capita = null;

			obj.weapons_posession = weapons;
			obj.weapons_posession_per_capita = null;

			obj.prostitution = prostitution;
			obj.prostitution_per_capita = null;

			obj.sex_offenses = sex;
			obj.sex_offenses_per_capita = null;

			obj.drug_abuse_violations = drug;
			obj.drug_abuse_violations_per_capita = null;

			obj.gambling = gambling;
			obj.gambling_per_capita = null;

			obj.offenses_agains_family_and_children = family;
			obj.offenses_agains_family_and_children_per_capita = null;

			obj.dui = dui;
			obj.dui_per_capita = null;

			obj.disorderly_conduct = disorderly;
			obj.disorderly_conduct_per_capita = null;

			obj.vagrancy = vagrancy;
			obj.vagrancy_per_capita = null;

			obj.all_others = other;
			obj.all_others_per_capita = null;

			obj.suspicion = suspicion;
			obj.suspicion_per_capita = null;

			obj.curfew_and_loitering = curfew;
			obj.curfew_and_loitering_per_capita = null;

			obj.runaways = null;
			obj.runaways_per_capita = null;

			obj.estimated_population = population;

			obj.year = year;
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
			] = data[i + 1];

			obj.state = state;
			obj.state_original = originalState;

			obj.under_18 = 0;

			obj.total_arrests = total;
			obj.total_arrests_per_capita = perCapita(total, population);

			obj.violent_crimes = violent;
			obj.violent_crimes_per_capita = perCapita(violent, population);

			obj.property_crimes = property;
			obj.property_crimes_per_capita = perCapita(property, population);

			obj.murder_and_nonnegligent_manslaughter = murder;
			obj.murder_and_nonnegligent_manslaughter_per_capita = perCapita(murder, population);

			obj.forcible_rape = rape;
			obj.forcible_rape_per_capita = perCapita(rape, population);

			obj.burglary = burglary;
			obj.burglary_per_capita = perCapita(burglary, population);

			obj.larceny_theft = larceny;
			obj.larceny_theft_per_capita = perCapita(larceny, population);

			obj.motor_vehicle_theft = motor;
			obj.motor_vehicle_theft_per_capita = perCapita(motor, population);

			obj.arson = arson;
			obj.arson_per_capita = perCapita(arson, population);

			obj.other_assaults = otherAssaults;
			obj.other_assaults_per_capita = perCapita(otherAssaults, population);

			obj.forgery_and_counterfeiting = forgery;
			obj.forgery_and_counterfeiting_per_capita = perCapita(forgery, population);

			obj.fraud = fraud;
			obj.fraud_per_capita = perCapita(fraud, population);

			obj.embezzlement = embezzlement;
			obj.embezzlement_per_capita = perCapita(embezzlement, population);

			obj.stolen_property = stolenProperty;
			obj.stolen_property_per_capita = perCapita(stolenProperty, population);

			obj.vandalism = vandalism;
			obj.vandalism_per_capita = perCapita(vandalism, population);

			obj.weapons_posession = weapons;
			obj.weapons_posession_per_capita = perCapita(weapons, population);

			obj.prostitution = prostitution;
			obj.prostitution_per_capita = perCapita(prostitution, population);

			obj.sex_offenses = sex;
			obj.sex_offenses_per_capita = perCapita(sex, population);

			obj.drug_abuse_violations = drug;
			obj.drug_abuse_violations_per_capita = perCapita(drug, population);

			obj.gambling = gambling;
			obj.gambling_per_capita = perCapita(gambling, population);

			obj.offenses_agains_family_and_children = family;
			obj.offenses_agains_family_and_children_per_capita = perCapita(family, population);

			obj.dui = dui;
			obj.dui_per_capita = perCapita(dui, population);

			obj.disorderly_conduct = disorderly;
			obj.disorderly_conduct_per_capita = perCapita(disorderly, population);

			obj.vagrancy = vagrancy;
			obj.vagrancy_per_capita = perCapita(vagrancy, population);

			obj.all_others = other;
			obj.all_others_per_capita = perCapita(other, population);

			obj.suspicion = suspicion;
			obj.suspicion_per_capita = perCapita(suspicion, population);

			obj.curfew_and_loitering = curfew;
			obj.curfew_and_loitering_per_capita = perCapita(curfew, population);

			obj.runaways = null;
			obj.runaways_per_capita = null;

			obj.estimated_population = population;

			obj.year = year;
		}
	}

	return formattedData;
}

module.exports = script;
